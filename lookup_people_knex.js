/*
Similarily to lookup_people.js, this script gets a last name through the
command prompt, then searches and finds the famous person from the
famous_people database (PostgreSQL) matching that last name. Unlike
famous_people.js this script uses knex instead of the native pg driver.
*/

const name = process.argv.slice(2)[0];

const settings = require("./settings"); // for client credientials
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

const moment = require('moment');

function printUser(user) {
  const { id, first_name, last_name, birthdate } = user;
  const date = moment(birthdate).format('YYYY-MM-DD');
  console.log(`-${id}: ${first_name} ${last_name}, born ${date}`);
}

knex.select('*').from('famous_people')
.where('last_name', name)
.orWhere('first_name', name)
.asCallback((err, rows) => {
  if (err) {
    return console.error(err);
  }

  console.log('Searching...');

  console.log(`Found ${rows.length} person(s) by the name '${name}'`);
  if (rows.length > 0) {
    rows.forEach(printUser);
  }

  knex.destroy((err) => {
    if (err) {
      return console.error(err);
    }
  })
});
