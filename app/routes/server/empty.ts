import { Hono } from 'hono'

export const route = new Hono()

route.get('/*', async (c) => {
  try {
    return c.json({})
  }
  catch (error) {
    logger.error(error)
    c.json({
      ok: false,
      error,
    })
  }
})

route.put('/*', async (c) => {
  try {
    return c.json({})
  }
  catch (error) {
    logger.error(error)
    c.json({
      ok: false,
      error,
    })
  }
})

route.post('/*', async (c) => {
  try {
    return c.json({})
  }
  catch (error) {
    logger.error(error)
    c.json({
      ok: false,
      error,
    })
  }
})
