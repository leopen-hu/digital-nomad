import db from '@database/client'

export class DataService {
  // 获取主题（带类型声明）
  async getTheme(): Promise<string> {
    const result = await db('settings')
      .select('value')
      .where({ key: 'theme' })
      .first();

    return result?.value || 'light';
  }

  // 更新主题（带类型声明）
  async setTheme(theme: string): Promise<void> {
    await db('settings')
      .insert({ key: 'theme', value: theme })
      .onConflict('key')
      .merge(); // SQLite 的 "INSERT OR REPLACE"
  }
}
