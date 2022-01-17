# Bible raw query

Tests capabilities of sql.js-httpvfs based static serving Bible query app on gh-pages.

## Caveats

Importing sql.js-httpvfs ain't working.  Ugly related workarounds:

- copy sql.js-httpvfs from `node_modules` to `public` as Vite treats `public`
  content as root level assets and copies it to `dist` in build time
  (<https://issueexplorer.com/issue/phiresky/sql.js-httpvfs/18>)
- include `script src="/sql.js-httpvfs/dist/index.js"` in index.html to expose
  `createDbWorker` as a global.  Trying to import it fails with "no such
  symbol exported".

Github pages base URL path config:

- see vite.config.js

## TODO

- rename repo OR totally replace its contents with vite-managed project
- create/upload gh-pages branch
- static SPA with dual functionality (scriptkit in mind):
  - it may take bible query in `location.search` (query-string)
  - in that case DONT render command input html
  - ... and in scriptkit, include html in iframe
  - (because I cannot use static server as API to serve JSON)

## Contrib

No pull requests accepted ATM.
