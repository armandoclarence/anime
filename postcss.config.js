// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          purgecss: {
            content: ['./src/**/*.html', './src/**/*.{js,jsx}'],
            // Add more file paths as needed
          },
        }
      : {}),
      ...(process.env.NODE_ENV === 'development'
      ? {
          purgecss: {
            content: ['./src/**/*.html', './src/**/*.{js,jsx}'],
            // Add more file paths as needed
          },
        }
      : {}),
  },
};
