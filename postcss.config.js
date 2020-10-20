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
              'hr',
              'p', 'blockquote', 'ol',
              '__next',
              'input', 'label', 'indicates-required', 'mce_inline_error'
            ],
          },
        ]
      : undefined,
    'postcss-preset-env',
  ],
}
