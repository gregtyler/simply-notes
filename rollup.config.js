import json from 'rollup-plugin-json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import swPrecache from 'sw-precache';

/**
 * A rollup plugin to generate the service worker file
 */
function swPrecacheGen() {
  return {
    name: 'sw-precache',
    transform: function() {
      return new Promise((resolve) => {
        const rootDir = 'public';
        swPrecache.write(`${rootDir}/sw.js`, {
          staticFileGlobs: [rootDir + '/**/*.{js,html}'],
          stripPrefix: rootDir
        }, resolve);
      });
    }
  };
}

export default {
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
    resolve(),
    swPrecacheGen()
  ]
};
