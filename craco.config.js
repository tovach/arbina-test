import { CracoAliasPlugin } from 'react-app-alias'
const options = {} // default is empty for most cases
    export const eslint = {
  enable: true
}
export const plugins = [
  {
    plugin: CracoAliasPlugin,
    options: {
      source: 'tsconfig',
      baseUrl: './src',
      tsConfigPath: './tsconfig.path.json',
    },
  },
]