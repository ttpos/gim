const listenPort = process.env.IM_PORT || 3000
const listenHost = process.env.IM_HOST || '0.0.0.0'
const serverName = process.env.IM_SERVER_NAME || 'localhost'

export { listenHost, listenPort, serverName }
