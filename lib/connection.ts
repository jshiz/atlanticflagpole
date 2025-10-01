export type ConnectionLike<T> = { nodes?: T[] | null; edges?: { node: T }[] | null } | null | undefined

export function toNodes<T>(conn: ConnectionLike<T>): T[] {
  if (!conn) return []
  if (Array.isArray(conn.nodes)) return conn.nodes.filter(Boolean as any)
  if (Array.isArray(conn.edges)) return conn.edges.map((e) => e?.node).filter(Boolean as any)
  return []
}
