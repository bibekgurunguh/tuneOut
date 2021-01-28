const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './client'),
    historyApiFallback: true,
  },
  entry: {
    popup: path.resolve(__dirname, 'client/src/index-js/index-popup.tsx'),
    options: path.resolve(__dirname, 'client/src/index-js/index-options.tsx'),
    foreground: path.resolve(
      __dirname,
      'client/src/index-js/index-foreground.tsx',
    ),
    background: path.resolve(
      __dirname,
      'client/src/index-js/index-background.ts',
    ),
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: { loader: 'awesome-typescript-loader' },
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  plugins: ['@babel/plugin-proposal-class-properties'],
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'idx-popup.html',
      template: 'client/src/index-html/idx-popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'idx-options.html',
      template: 'client/src/index-html/idx-options.html',
      chunks: ['options'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'client/src/manifest.json', to: '[name].[ext]' },
        { from: 'client/src/inject_script.js', to: '[name].[ext]' },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
