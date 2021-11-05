const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const devtool = env.NODE_ENV !== 'production' ? 'inline-source-map' : '';
  return {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/public/index.html',
        filename: './index.html',
      }),
    ],
    devServer: {
      open: true,
      proxy: {
        '/api': 'http://localhost:5000',
      },
      stats: 'minimal',
    },
    devtool,
  };
};
