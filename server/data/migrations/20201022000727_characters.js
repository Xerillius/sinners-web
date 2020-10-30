
exports.up = function(knex) {
  return knex.schema.createTable('characters', table => {
    table.increments()
    table.string('name')
      .unique()
      .notNullable()
    table.integer('userID')
      .notNullable()
    table.boolean('main')
      .defaultTo(false)
    table.string('charClass')
      .notNullable()
    table.string('role')
      .notNullable()
    table.boolean('mcAttuned')
      .defaultTo(false)
    table.boolean('onyAttuned')
      .defaultTo(false)
    table.boolean('bwlAttuned')
      .defaultTo(false)
    table.boolean('naxAttuned')
      .defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('characters')
};
