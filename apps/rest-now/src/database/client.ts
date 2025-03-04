import { Database } from './types' // this is the Database interface we defined earlier
import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import path from 'path'
import { app } from 'electron'

const getDbPath = () => {
  return app.isPackaged
    ? path.resolve('rest-now.db')
    : path.resolve(__dirname, '../../db.sqlite')
}

const getBindingPath = () => {
  return app.isPackaged
    ? path.resolve('resources/app.asar.unpacked/node_modules/better-sqlite3/build/Release/better_sqlite3.node')
    : path.resolve(__dirname, '../../../../node_modules/better-sqlite3/build/Release/better_sqlite3.node')
}

const dialect = new SqliteDialect({
  database: new SQLite(getDbPath(), {
    nativeBinding: getBindingPath(),
  }),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})
