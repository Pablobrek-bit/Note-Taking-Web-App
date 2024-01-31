const { table } = require("..")

// The up function is called when we run the migration
exports.up = (knex) =>
  knex.schema.createTable("notes", (table) => {
    table.increments("id")
    table.text("title")
    table.text("description")
    table.integer("user_id").references("id").inTable("users")

    table.timestamps("created_at")
    table.timestamps("updated_at")
  })

// The down function is called when we rollback the migration
exports.down = (knex) => knex.schema.dropTable("notes")
