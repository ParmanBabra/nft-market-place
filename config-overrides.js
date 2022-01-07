// config-overrides.js
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");

module.exports = function override(config, env) {

  config.plugins.push(new NodePolyfillPlugin());

  // New config, e.g. config.plugins.push...
  return config;
};
