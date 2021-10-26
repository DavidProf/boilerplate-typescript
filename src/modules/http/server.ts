import http from 'http'

export const bootstrapServer = () => {
    const server = http.createServer()

    server.on('request', (req, res) => {
        res.setHeader('content-type', 'application/json')
        res.end({ ok: true })
    })

    server.on('listening', () => console.log('server running'))

    server.listen(3141)
}
