
exports.up = async function(knex) {
  await knex.schema.createTable("dbz", (table) => {
      table.increments()
      table.text("name").notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("dbz")
};
