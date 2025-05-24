import { Hono } from 'hono'

export const route = new Hono()

route.get('/', async (c) => {
  try {
    const data = { user_id: '@roy:a.g.im', is_guest: false, device_id: 'neIjzcFEb6' }
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
