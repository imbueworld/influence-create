const webpack = require("webpack");

module.exports = {
  webpack: function (config, env) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      })
    );
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
      })
    );

    config.resolve.fallback = {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
    };
    return config;
  },
};
