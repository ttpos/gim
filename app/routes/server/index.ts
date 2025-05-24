import { route as api } from './api'
import { route as capabilities } from './capabilities'
import { route as empty } from './empty'
import { route as versions } from './versions'
import { wellKnow } from './well-know'

export * from './well-know'

export const server = { versions, api, wellKnow, capabilities, empty }
