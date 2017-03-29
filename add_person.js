/*
To be used in with lookup_people_knex.js.
Adds new famous person to famous_people database, taking in first name,
last name and birthdate as command line arguments. Uses knex.
*/
const settings = require("./settings"); // for client credientials
const knex = require('knex')({
  client: 'pg',
  connection: settings
});

function insert(fname, lname, bday) {
  if(!fname || !lname || !bday) {
    console.log('Error: please enter a firstname, lastname, and birthdate(YYYY-MM-DD)')
  }
  knex('famous_people').insert({first_name: fname, last_name: lname, birthdate: bday})
  .catch(function(err) {
    console.log(err);
  })
}

const input = process.argv.slice(2);
insert(input[0], input[1], input[2]);
knex.destroy();
