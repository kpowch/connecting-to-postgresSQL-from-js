
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("milestones", (table) => {
      table.increments();
      table.string('description');
      table.date('date_archieved');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("milestones")
  ])
};
