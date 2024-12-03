const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [
      new NodePolyfillPlugin(),
    ],
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        fs: false, // Desabilitar porque não é suportado no navegador
        http2: false,
        child_process: false,
        net: false,
        tls: false,
        events: require.resolve("events/"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        util: require.resolve("util/"),
        assert: require.resolve("assert/"),
        buffer: require.resolve("buffer/"),
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
        os: require.resolve("os-browserify"),
      };
      return webpackConfig;
    },
  },
};
