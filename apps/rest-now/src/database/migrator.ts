import * as path from 'path'
import { promises as fs } from 'fs'
import {
  Migrator,
  FileMigrationProvider,
  MigrationProvider,
  Migration,
} from 'kysely'
import { db } from './client'
import { app } from 'electron'
import { fileURLToPath } from 'url'

class ESMFileMigrationProvider implements MigrationProvider {
  constructor(private relativePath: string) {}

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {}
    const __dirname = fileURLToPath(new URL('.', import.meta.url))
    const resolvedPath = path.resolve(__dirname, this.relativePath)
    console.log('resolvedPath', __dirname, resolvedPath)
    const files = await fs.readdir(resolvedPath)

    for (const fileName of files) {
      if (!fileName.endsWith('.mjs')) {
        continue
      }

      const importPath = path
        .join(this.relativePath, fileName)
        .replaceAll('\\', '/')
      const migration = await import(importPath)
      console.log('migration', migration)
      const migrationKey = fileName.substring(0, fileName.lastIndexOf('.'))

      migrations[migrationKey] = migration
    }

    return migrations
  }
}

const getMigrtionsFolder = () => {
  return app.isPackaged
    ? path.relative(__dirname, '')
    : path.relative('.', '../../src/database/migrations')
}

export async function migrateToLatest() {
  console.log('migrating...', getMigrtionsFolder())
  const migrator = new Migrator({
    db,
    provider: new ESMFileMigrationProvider(getMigrtionsFolder()),
    allowUnorderedMigrations: true,
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(
        `migration "${it.migrationName}" was executed successfully`,
      )
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}
