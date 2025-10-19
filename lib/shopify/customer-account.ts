/**
 * Shopify Customer Account API client
 * Uses OAuth 2.0 with PKCE for authentication
 */

const CUSTOMER_ACCOUNT_API_URL = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL || ""
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || ""

export interface CustomerAccountConfig {
  accessToken: string
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, timeout = 10000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      return response
    } catch (error: any) {
      const isLastRetry = i === retries - 1
      const isTimeout = error.name === "AbortError"

      console.error(`[v0] Customer Account API attempt ${i + 1}/${retries} failed:`, error.message)

      if (isLastRetry) {
        throw new Error(isTimeout ? "Request timeout" : error.message)
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw new Error("Max retries exceeded")
}

async function customerAccountFetch<T>({
  query,
  variables = {},
  accessToken,
}: {
  query: string
  variables?: Record<string, any>
  accessToken: string
}): Promise<{ data: T; errors?: any[] }> {
  try {
    const response = await fetchWithRetry(
      CUSTOMER_ACCOUNT_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        cache: "no-store",
      },
      3, // 3 retries
      10000, // 10 second timeout
    )

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Customer Account API HTTP error! Status: ${response.status}, Body: ${errorBody}`)
    }

    const json = await response.json()

    if (json.errors) {
      console.error("[v0] Customer Account API errors:", json.errors)
      throw new Error(`Customer Account GraphQL errors: ${JSON.stringify(json.errors)}`)
    }

    return json
  } catch (error) {
    console.error("[v0] Customer Account fetch error:", error)
    throw error
  }
}

export async function getCustomer(accessToken: string) {
  const query = /* GraphQL */ `
    query getCustomer {
      customer {
        id
        emailAddress {
          emailAddress
        }
        firstName
        lastName
        phoneNumber {
          phoneNumber
        }
        defaultAddress {
          id
          address1
          address2
          city
          provinceCode
          countryCode
          zip
          firstName
          lastName
          company
          phone
        }
      }
    }
  `

  const { data } = await customerAccountFetch<{
    customer: any
  }>({
    query,
    variables: {},
    accessToken,
  })

  return data.customer
}

export async function getCustomerOrders(accessToken: string, first = 10, after?: string) {
  const query = /* GraphQL */ `
    query getCustomerOrders($first: Int!, $after: String) {
      customer {
        orders(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              number
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const { data } = await customerAccountFetch<{
    customer: {
      orders: any
    }
  }>({
    query,
    variables: { first, after },
    accessToken,
  })

  return data.customer.orders
}

export async function getCustomerAddresses(accessToken: string) {
  const query = /* GraphQL */ `
    query getCustomerAddresses {
      customer {
        addresses(first: 50) {
          edges {
            node {
              id
              address1
              address2
              city
              provinceCode
              countryCode
              zip
              firstName
              lastName
              company
              phone
            }
          }
        }
      }
    }
  `

  const { data } = await customerAccountFetch<{
    customer: {
      addresses: any
    }
  }>({
    query,
    variables: {},
    accessToken,
  })

  return data.customer.addresses
}

export async function createCustomerAddress(
  accessToken: string,
  address: {
    address1: string
    address2?: string
    city: string
    provinceCode: string
    countryCode: string
    zip: string
    firstName: string
    lastName: string
    company?: string
    phone?: string
  },
) {
  const query = /* GraphQL */ `
    mutation createCustomerAddress($address: CustomerAddressInput!) {
      customerAddressCreate(address: $address) {
        customerAddress {
          id
          address1
          address2
          city
          provinceCode
          countryCode
          zip
          firstName
          lastName
          company
          phone
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await customerAccountFetch<{
    customerAddressCreate: {
      customerAddress: any
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>({
    query,
    variables: { address },
    accessToken,
  })

  if (data.customerAddressCreate.userErrors.length > 0) {
    throw new Error(data.customerAddressCreate.userErrors[0].message)
  }

  return data.customerAddressCreate.customerAddress
}

export async function updateCustomerAddress(
  accessToken: string,
  addressId: string,
  address: {
    address1?: string
    address2?: string
    city?: string
    provinceCode?: string
    countryCode?: string
    zip?: string
    firstName?: string
    lastName?: string
    company?: string
    phone?: string
  },
) {
  const query = /* GraphQL */ `
    mutation updateCustomerAddress($addressId: ID!, $address: CustomerAddressInput!) {
      customerAddressUpdate(addressId: $addressId, address: $address) {
        customerAddress {
          id
          address1
          address2
          city
          provinceCode
          countryCode
          zip
          firstName
          lastName
          company
          phone
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await customerAccountFetch<{
    customerAddressUpdate: {
      customerAddress: any
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>({
    query,
    variables: { addressId, address },
    accessToken,
  })

  if (data.customerAddressUpdate.userErrors.length > 0) {
    throw new Error(data.customerAddressUpdate.userErrors[0].message)
  }

  return data.customerAddressUpdate.customerAddress
}

export async function deleteCustomerAddress(accessToken: string, addressId: string) {
  const query = /* GraphQL */ `
    mutation deleteCustomerAddress($addressId: ID!) {
      customerAddressDelete(addressId: $addressId) {
        deletedAddressId
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await customerAccountFetch<{
    customerAddressDelete: {
      deletedAddressId: string
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>({
    query,
    variables: { addressId },
    accessToken,
  })

  if (data.customerAddressDelete.userErrors.length > 0) {
    throw new Error(data.customerAddressDelete.userErrors[0].message)
  }

  return data.customerAddressDelete.deletedAddressId
}

export async function updateCustomer(
  accessToken: string,
  customer: {
    firstName?: string
    lastName?: string
    phoneNumber?: string
  },
) {
  const query = /* GraphQL */ `
    mutation updateCustomer($customer: CustomerUpdateInput!) {
      customerUpdate(customer: $customer) {
        customer {
          id
          firstName
          lastName
          phoneNumber {
            phoneNumber
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data } = await customerAccountFetch<{
    customerUpdate: {
      customer: any
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>({
    query,
    variables: { customer },
    accessToken,
  })

  if (data.customerUpdate.userErrors.length > 0) {
    throw new Error(data.customerUpdate.userErrors[0].message)
  }

  return data.customerUpdate.customer
}
