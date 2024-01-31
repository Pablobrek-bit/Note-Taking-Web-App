const { table } = require("..")

exports.up = (knex) =>
  knex.schema.alterTable("notes", (table) => {
    table.timestamps(true, true)
  })

exports.down = (knex) =>
  knex.schema.alterTable("notes", (table) => {
    table.dropTimestamps()
  })
