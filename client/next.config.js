const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const { parsed: localEnv } = require("dotenv").config();
const withImages = require("next-images");

module.exports = withImages(
  withSass({
    webpack: (config) => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    },
  })
);
