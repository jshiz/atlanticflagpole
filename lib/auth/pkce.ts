import crypto from "crypto"

/**
 * PKCE (Proof Key for Code Exchange) utilities for OAuth 2.0
 * Used for secure authentication with Shopify Customer Account API
 */

export function generateCodeVerifier(): string {
  return base64URLEncode(crypto.randomBytes(32))
}

export function generateCodeChallenge(verifier: string): string {
  return base64URLEncode(crypto.createHash("sha256").update(verifier).digest())
}

export function generateState(): string {
  return base64URLEncode(crypto.randomBytes(16))
}

function base64URLEncode(buffer: Buffer): string {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

export function generateNonce(): string {
  return base64URLEncode(crypto.randomBytes(16))
}
