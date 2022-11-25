import esbuild from "esbuild";
import vuePlugin from "esbuild-vue";
import workboxBuild from "workbox-build";

const rootDir = "public";
const config = {
  entryPoints: ["src/main.js"],
  bundle: true,
  outfile: `${rootDir}/bundle.js`,
  plugins: [vuePlugin()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.BUILD || "development"),
  },
};

if (!!process.env.LIVE) {
  esbuild.serve({ servedir: rootDir }, config).then((server) => {
    console.log(`Serving at http://localhost:${server.port}`);
  });
} else {
  esbuild.build(config);
}

// Build ServiceWorker
const modifyURLPrefix = {
  [rootDir]: "",
};

if (process.env.SUBDIRECTORY) {
  modifyURLPrefix[`/${process.env.SUBDIRECTORY}`] = "";
}

workboxBuild.generateSW({
  swDest: `${rootDir}/sw.js`,
  globDirectory: rootDir,
  globPatterns: ["**/*.{js,html,css,webmanifest,png}"],
  modifyURLPrefix,
});
