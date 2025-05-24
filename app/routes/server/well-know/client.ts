import { Hono } from 'hono'

export const route = new Hono()

route.get('/', async (c) => {
  try {
    const data = {
      'm.homeserver': {
        base_url: 'https://sd.sgdev.ds.cc',
      },
      'org.matrix.msc2965.authentication': {
        issuer: 'ttps://sd.sgdev.ds.cc',
        account: 'ttps://sd.sgdev.ds.cc/account/',
      },
      'org.matrix.msc4143.rtc_foci': [
        {
          type: 'livekit',
          livekit_service_url: 'https://livekit-jwt.call.matrix.org',
        },
      ],
    }
    return c.json(data)
  }
  catch (error) {
    logger.error(error)
    c.json({
      ok: false,
      error,
    })
  }
})
