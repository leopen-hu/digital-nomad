async function up(knex) {
  console.error('up')
  await knex.schema.createTable('settings', (table) => {
    table.string('key').primary()
    table.text('value').notNullable()
  })

  // 插入默认主题
  await knex('settings').insert({ key: 'theme', value: 'light' })
}

async function down(knex) {
  await knex.schema.dropTable('settings')
}

module.exports = { up, down }
