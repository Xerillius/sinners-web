
exports.up = function(knex) {
  return knex.schema.createTable('events', table => {
    table.increments()
    table.string('eventTitle')
      .notNullable()
    table.integer('eventDate')
      .notNullable()
    table.string('eventStartTime')
      .notNullable()
    table.string('eventLocation')
      .notNullable()
    table.integer('eventMaxParticipants')
      .notNullable()
    table.string('eventCreateDate')
      .notNullable()
    table.string('eventModifyDate')
      .defaultTo(null)
    table.string('eventModifyTime')
      .defaultTo(null)
    table.integer('eventModifiedByID')
      .defaultTo(null)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events')
};
