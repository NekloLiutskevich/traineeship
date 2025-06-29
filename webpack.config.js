const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      app: path.resolve(__dirname, 'src/app'),
      pages: path.resolve(__dirname, 'src/pages'),
      widgets: path.resolve(__dirname, 'src/widgets'),
      features: path.resolve(__dirname, 'src/features'),
      entities: path.resolve(__dirname, 'src/entities'),
      icons: path.resolve(__dirname, 'src/shared/assets/icons'),
      sounds: path.resolve(__dirname, 'src/shared/assets/sounds'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: false,
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.svg$/,
        issuer: /\.(css|scss)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    compress: false,
    port: 9000,
    open: true,
  },
}
