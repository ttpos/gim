import { Hono } from 'hono'

export const route = new Hono()

route.get('/', async (c) => {
  try {
    const response = await fetch('https://a.g.im/_matrix/client/versions')
    if (!response.ok) {
      throw new Error('Failed to fetch OpenID configuration')
    }
    // return response
    const data = (await response.json()) as Record<string, unknown>
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
