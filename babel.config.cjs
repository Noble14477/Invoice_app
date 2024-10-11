module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    // Add this if needed for ESM support
    plugins: [
      '@babel/plugin-transform-modules-commonjs'
    ]
  };