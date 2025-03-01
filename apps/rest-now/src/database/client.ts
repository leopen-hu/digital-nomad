import knex from 'knex'
import config from './knex-config'

// 初始化 Knex 实例
const db = knex(config.development)
console.log('Knex instance created.', db)

// 执行未应用的迁移
export async function runMigrations() {
  console.log('Running migrations...')
  const xx = await db.migrate.latest()
  console.log('Migrations:', xx)
}

export default db
