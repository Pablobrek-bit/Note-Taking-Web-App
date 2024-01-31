const { table, fn } = require("..")

exports.up = (knex) =>
  knex.schema.createTable("links", (table) => {
    table.increments("id")
    table.text("url")
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE")

    table.timestamps("created_at")
  })

exports.down = (knex) => knex.schema.dropTable("links")
