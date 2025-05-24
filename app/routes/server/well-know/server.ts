import { Hono } from 'hono'

export const route = new Hono()

route.get('/', async (c) => {
  try {
    return c.json({
      ok: true,
      req: c.req.header(),
      env: process.env,
    })
  }
  catch (error) {
    logger.error(error)
    c.json({
      ok: false,
      error,
    })
  }
})
