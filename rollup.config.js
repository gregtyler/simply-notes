import json from 'rollup-plugin-json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default [{
  input: 'src/main.js',
  output: {
    sourcemap: true,
    file: 'public/bundle.js',
    format: 'iife'
  },
  watch: {
    include: ['src/**/*.vue', 'src/**/*.js', 'store/**/*.js'],
    clearScreen: false
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    json({
      preferConst: true
    }),
    vue({
      css: true
    }),
    resolve()
  ]
}, {
  input: 'src/sw.js',
  output: {
    sourcemap: false,
    file: 'public/sw.js',
    format: 'iife'
  },
  watch: {
    include: ['src/**/*.js'],
    clearScreen: false
  }
}];
