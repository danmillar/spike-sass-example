const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
// Require the sass-loader
const sass = require('sass-loader')
const jsStandards = require('babel-preset-latest')
const pageId = require('spike-page-id')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    // Set the extension to css    
    css: '*(**/)*.css'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md'],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: { pageId: pageId(ctx), foo: 'bar' }
    })
  },
  postcss: (ctx) => {
    // Set parser to false
    return cssStandards({ webpack: ctx, parser: false })
  },
  // here, we add a custom loader for our sass files.
  module: {
    loaders: [
      {
        test: /\.scss$/, 
        loader: 'source!postcss!sass?sourceMap', 
        extension: 'css'
      }
    ]
  },  
  babel: { presets: [jsStandards] },
  plugins: [
    new HardSourcePlugin({
      environmentPaths: { root: __dirname },
      recordsPath: path.join(__dirname, '_cache/records.json'),
      cacheDirectory: path.join(__dirname, '_cache/hard_source_cache')
    })
  ]
}
