import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  // For base path URL config (repo name in Github, used in gh-pages).
  // Bundler will prepend `base` to absolute URL paths throuhgout the app on
  // build time.  The `configUrl` option in `createDbWorker` still needs manual
  // prepending.
  base: '/bible/',

  plugins: [svelte()]
})
