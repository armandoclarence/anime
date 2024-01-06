const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // other webpack configuration...
  mode: 'production',
  optimization: {
    usedExports: true,
  },
  plugins: [
    new CompressionPlugin(),
    // other plugins...
  ],
};
