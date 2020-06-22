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
            whitelist: ['h5', 'h6', 'blockquote', 'ol'],
          },
        ]
      : undefined,
    'postcss-preset-env',
  ],
}
