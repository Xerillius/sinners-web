
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('username')
      .notNullable()
      .unique()
    table.string('password')
      .notNullable()
    table.boolean('approved')
      .defaultTo(true)
    table.boolean('createEvent')
      .defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
