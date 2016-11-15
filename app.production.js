const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const sass = require('sass-loader')
const pageId = require('spike-page-id')
const {UglifyJsPlugin, DedupePlugin, OccurrenceOrderPlugin} = require('webpack').optimize

module.exports = {
  // disable source maps
  devtool: false,
  // webpack optimization and minfication plugins
  plugins: [
    new UglifyJsPlugin(),
    new DedupePlugin(),
    new OccurrenceOrderPlugin()
  ],
  // image optimization
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'image-webpack' },
      { test: /\.scss$/, loader: 'source!postcss!sass?sourceMap', extension: 'css' }      
    ]
  },
  // adds html minification plugin
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: { pageId: pageId(ctx), foo: 'bar' },
      minify: true
    })
  },
  // adds css minification plugin
  postcss: (ctx) => {
    return cssStandards({
      webpack: ctx,
      parser: false,
      minify: true,
      warnForDuplicates: false // cssnano includes autoprefixer
    })
  }
}
