const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
module.exports = {
  // other webpack configuration...
  mode: 'production',
  optimization: {
    usedExports: true,
  },
  plugins: [
    new CompressionPlugin(),
    // other plugins...
    new ImageMinimizerPlugin({
      minimizer: [
        ['imagemin-gifsicle', { interlaced: true }],
        ['imagemin-mozjpeg', { quality: 80 }],
        ['imagemin-pngquant', { quality: [0.6, 0.8] }],
        ['imagemin-svgo', { plugins: [{ removeViewBox: false }] }],
      ],
    }),
  ],
};
