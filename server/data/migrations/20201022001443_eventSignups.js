
exports.up = function(knex) {
  return knex.schema.createTable('eventSignups', table => {
    table.increments()
    table.integer('eventID')
      .notNullable()
    table.integer('userID')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('eventSignups')
};
