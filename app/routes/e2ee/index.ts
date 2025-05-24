import { route as keysQuery } from './keysQuery'
import { route as keysUpload } from './keysUpload'
import { route as roomKeysVersion } from './roomKeysVersion'

export const e2ee = { roomKeysVersion, keysQuery, keysUpload }
