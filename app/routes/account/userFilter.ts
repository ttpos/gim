import { Hono } from 'hono'

export const route = new Hono()

route.post('/', async (c) => {
  try {
    const data = { filter_id: '0' }
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
