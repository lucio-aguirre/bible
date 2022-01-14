// TODO: figure out why this isn't working...
// import { createDbWorker } from "sql.js-httpvfs"

const baseUrlPath = location.pathname.slice(0, -1)  // trim trailing /

const workerUrl = new URL(
  `/sql.js-httpvfs/dist/sqlite.worker.js`,
  import.meta.url
)
const wasmUrl = new URL(`/sql.js-httpvfs/dist/sql-wasm.wasm`, import.meta.url)

export async function query(sql) {
  console.log('SQL worker URL:', workerUrl.toString())
  const worker = await createDbWorker(
    [
      {
        from: "jsonconfig",
        configUrl: `${baseUrlPath}/data/config.json`
      }
    ],
    workerUrl.toString(),
    wasmUrl.toString()
  )

  // query
  return await worker.db.query(sql)
}

// Hack to export symbol from module to main page (i.e., console)
window.query = query
