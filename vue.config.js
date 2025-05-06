// const ManifestPlugin = require('webpack-manifest-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin').WebpackManifestPlugin
const nodeExternals = require('webpack-node-externals');

exports.chainWebpack = (webpackconfig) => {

  webpackconfig
    .entry('app')
    .clear()
    .add('./src/main.server.js');
  webpackconfig.target('node');
  webpackconfig.output.libraryTarget('commonjs2');

  webpackconfig
    .plugin('manifest')
    .use(new ManifestPlugin({ filename: 'ssr-manifest.json' }));
  webpackconfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

  webpackconfig.optimization.splitChunks(false).minimize(false);

  webpackconfig.plugins.delete('hmr');
  webpackconfig.plugins.delete('preload');
  webpackconfig.plugins.delete('prefetch');
  webpackconfig.plugins.delete('progress');
  webpackconfig.plugins.delete('friendly-errors');
};