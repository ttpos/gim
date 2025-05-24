// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    jsonc: false,
    yaml: false,
  },
  {
    rules: {
      'node/prefer-global/process': 0,
    },
    ignores: ['third/**'],
  },
)
