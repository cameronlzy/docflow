const clients = new Set()

export function sseHandler(req, res) {
  // Required SSE headers
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache, no-transform")
  res.setHeader("Connection", "keep-alive")

  // Immediate flush to open the stream
  res.write(`: connected ${Date.now()}\n\n`)

  // Keep-alive heartbeat to prevent timeouts by proxies
  const heartbeat = setInterval(() => {
    res.write(`: ping ${Date.now()}\n\n`)
  }, 15000)

  // Track this client
  const client = { res }
  clients.add(client)

  const cleanup = () => {
    clearInterval(heartbeat)
    clients.delete(client)
  }

  req.on("close", cleanup)
  res.on("close", cleanup)
}

// Broadcast helper: send to all connected clients
export function publish(eventName, payloadObj) {
  const id = Date.now()
  const data = JSON.stringify(payloadObj)
  const lines = [
    `id: ${id}`,
    eventName ? `event: ${eventName}` : null,
    `data: ${data}`,
    "", // blank line terminates the event
  ].filter(Boolean)

  const message = lines.join("\n")
  for (const { res } of clients) {
    res.write(message + "\n")
  }
}
