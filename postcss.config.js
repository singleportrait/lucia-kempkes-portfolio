module.exports = {
  plugins: [
    process.env.NODE_ENV === 'production'
      ? [
          '@fullhuman/postcss-purgecss',
          {
            content: [
              './pages/**/*.{js,jsx,ts,tsx}',
              './components/**/*.{js,jsx,ts,tsx}',
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            whitelist: [
              'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
              'p', 'blockquote', 'ol',
              '__next'
            ],
          },
        ]
      : undefined,
    'postcss-preset-env',
  ],
}
