const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const { parsed: localEnv } = require('dotenv').config();

module.exports = withSass(
  {
    webpack: (config) => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
      return config
    }
  }
)
