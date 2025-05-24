import { Hono } from 'hono'

const data = { one_time_key_counts: { signed_curve25519: 50 } }

export const route = new Hono()

route.post('/', async (c) => {
  try {
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
