/* eslint-env node */
import css from 'rollup-plugin-css-only';
import json from 'rollup-plugin-json';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import workboxBuild from 'workbox-build';

/**
 * A rollup plugin to generate the service worker file
 */
function workbox() {
  return {
    name: 'workbox-build',
    onwrite: function() {
      const rootDir = 'public';
      const modifyURLPrefix = {
        [rootDir]: ''
      };

      if (process.env.SUBDIRECTORY) {
        modifyURLPrefix[`/${process.env.SUBDIRECTORY}`] = '';
      }

      return workboxBuild.generateSW({
        swDest: `${rootDir}/sw.js`,
        globDirectory: rootDir,
        globPatterns: ['**/*.{js,html,css,webmanifest,png}'],
        modifyURLPrefix
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
    css(),
    vue({ css: false }),
    resolve(),
    process.env.BUILD === 'production' ? uglify() : nullPlugin(),
    workbox()
  ]
};
