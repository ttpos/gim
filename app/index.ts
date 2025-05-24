import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger as accesslog } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { listenHost, listenPort } from './config'
import { logger } from './logger'
import { account, auth, e2ee, room, server } from './routes'

function customLogger(message: string, ...rest: string[]) {
  const url = message.split(' ')[2]
  if (url && url.startsWith('/_matrix')) {
    logger.info(message, rest)
  }
}

async function run() {
  const app = new Hono()
  app.use(accesslog(customLogger))
  app.use(prettyJSON())

  app.route('/api', server.api)

  app.route('/.well-known/matrix/client', server.wellKnow.client)
  app.route('/.well-known/matrix/server', server.wellKnow.server)
  app.route('/_matrix/client/versions', server.versions)
  app.route('/_matrix/client/v3/capabilities', server.capabilities)

  app.route('/_matrix/client/v1/auth_metadata', auth.metadata)
  app.route('/_matrix/client/unstable/org.matrix.msc2965/auth_metadata', auth.metadata)
  app.route('/_matrix/gim/oauth2/registration', auth.oauth2Registration)

  app.route('/_matrix/client/v3/account/whoami', account.whoami)

  // sync
  app.route('/_matrix/client/v3/user/:id/filter', account.userFilter)
  app.route('/_matrix/client/v3/sync', room.sync)

  // e2ee
  app.route('/_matrix/client/v3/room_keys/version', e2ee.roomKeysVersion)
  app.route('/_matrix/client/v3/keys/query', e2ee.keysQuery)
  app.route('/_matrix/client/v3/keys/upload', e2ee.keysUpload)

  // push
  app.route('/_matrix/client/v3/pushrules/', account.pushRules)

  // empty route
  app.route('/_matrix/client/v3/thirdparty/protocols', server.empty)
  app.route('/_matrix/client/v3/voip/turnServer', server.empty)
  app.route('/_matrix/client/v3/user/:id/account_data', server.empty)
  app.route('/_matrix/client/v3/user/:id/filter/*', server.empty)
  app.route('/_matrix/client/v3/profile/:id', server.empty)
  // Static files for static resources
  app.get('/public/*', serveStatic({ root: './' }))

  // Static files for web client
  app.get('/*', serveStatic({ root: './third/element/web' }))
  app.get('/icons/*', serveStatic({ root: './third/element/web' }))
  app.get('/img/*', serveStatic({ root: './third/element/web' }))
  app.get('/bundles/*', serveStatic({ root: './third/element/web' }))

  const http = Bun.serve({
    fetch: app.fetch,
    port: listenPort,
    hostname: listenHost,
  })

  logger.info(`Running at http://${listenHost}:${listenPort}`)

  process.on('SIGINT', () => {
    logger.warn('Received SIGINT. Shutting down...')
    http.stop()
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    logger.warn('Received SIGTERM. Shutting down...')
    http.stop()
    process.exit(0)
  })
}

run().catch((e) => {
  logger.error(e)
  process.exit(1)
})
