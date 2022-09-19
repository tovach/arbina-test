const {CracoAliasPlugin} = require('react-app-alias')
const options = {} // default is empty for most cases
    module.exports = {
      eslint: {
        enable: true
      },
      plugins: [
        {
          plugin: CracoAliasPlugin,
          options: {
            source: 'tsconfig',
            baseUrl: './src',
            tsConfigPath: './tsconfig.path.json',
          },
        },
      ],
    }