/* eslint-env node */
import json from 'rollup-plugin-json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import swPrecache from 'sw-precache';

/**
 * A rollup plugin to generate the service worker file
 */
function swPrecacheGen() {
  return {
    name: 'sw-precache',
    onwrite: function() {
      return new Promise((resolve) => {
        const rootDir = 'public';
        swPrecache.write(`${rootDir}/sw.js`, {
          staticFileGlobs: [rootDir + '/**/*.{js,html,css,webmanifest}'],
          stripPrefix: rootDir,
          replacePrefix: (process.env.SUBDIRECTORY ? `/${process.env.SUBDIRECTORY}` : '')
        }, resolve);
      });
    }
  };
}

/**
 * A rollup plugin that doesn't go anything
 */
function nullPlugin() {
  return {name: 'null'};
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
      'process.env.NODE_ENV': JSON.stringify(process.env.BUILD || 'development')
    }),
    json({
      preferConst: true
    }),
    vue({
      css: 'public/bundle.css'
    }),
    resolve(),
    process.env.BUILD === 'production' ? uglify() : nullPlugin(),
    swPrecacheGen()
  ]
};
