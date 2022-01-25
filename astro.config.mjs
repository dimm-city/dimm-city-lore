export default {
  buildOptions: {
    sitemap: false,         // Generate sitemap (set to "false" to disable)
  },
  devOptions: {
    // hostname: 'localhost',  // The hostname to run the dev server on.
    // port: 3000,             // The port to run the dev server on.
  },
  renderers: [
    "@astrojs/renderer-svelte"
  ],
};
