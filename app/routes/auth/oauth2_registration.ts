import { Hono } from 'hono'

export const oauth2RegistrationRoute = new Hono()

oauth2RegistrationRoute.post('/', async (c) => {
  try {
    const data = {
      client_id: 'bldldkkwmd526e0ila59x',
      client_id_issued_at: 1747886595,
      redirect_uris: ['https://sd.sgdev.ds.cc/'],
      grant_types: ['authorization_code', 'refresh_token'],
      application_type: 'web',
      token_endpoint_auth_method: 'none',
      id_token_signed_response_alg: 'RS256',
      client_name: 'Element',
      logo_uri: 'https://app.element.io/vector-icons/1024.png',
      client_uri: 'https://sd.sgdev.ds.cc/',
    }

    return c.json(data)
  } catch (error) {
    logger.error(error)
    c.json({
      ok: false,
      error,
    })
  }
})
