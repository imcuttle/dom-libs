const HtmlWebpackPlugin = require('html-webpack-plugin')
const globby = require('globby')
const nps = require('path')

const root = __dirname + '/examples'

const entries = globby.sync(['*.html'], { cwd: root }).map((name) => name.replace(/\..+$/, ''))

module.exports = {
  devServer: {
    port: process.env.TEST_SERVER_PORT || 7777
  },
  entry: entries.reduce((acc, name) => {
    acc[name] = nps.join(root, name)
    return acc
  }, {}),
  output: {
    path: nps.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.node']
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    ...entries.map(
      (name) =>
        new HtmlWebpackPlugin({
          chunks: [name],
          filename: `${name}.html`,
          template: nps.resolve(root, name + '.html')
        })
    )
  ]
}
