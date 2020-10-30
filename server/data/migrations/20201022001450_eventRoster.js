
exports.up = function(knex) {
  return knex.schema.createTable('eventRoster', table => {
    table.increments()
    table.integer('eventID')
      .notNullable()
    table.integer('charID')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('eventRoster')
};
