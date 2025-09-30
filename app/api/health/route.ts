export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      timestamp: new Date().toISOString(),
      message: "Atlantic Flagpoles API is healthy",
    }),
    {
      headers: { "content-type": "application/json" },
      status: 200,
    },
  )
}
