const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve.plugins.push(new TSConfigPathsPlugin({}));
          return webpackConfig;
        },
      },
    },
  ],
};
