/*
This script gets a last name through the command prompt, then searches and
finds the famous person from the famous_people database (PostgreSQL) matching
that last name using the native pg driver.
*/
const name = process.argv.slice(2)[0];

const pg = require('pg');
const settings = require("./settings"); // settings.json
const moment = require('moment');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((error) => {
  if(error) {
    console.log(error);
  }

  client.query(`SELECT * FROM famous_people WHERE last_name = '${name}'`, (error, results) => {
    if(error) {
      console.log(error);
    }

    console.log('Searching...');

    console.log(`Found ${results.rows.length} person(s) by the name '${name}':`);
    if (results.rows.length > 0) {
      results.rows.forEach(printUser);
    }

    client.end((error) => {
      if(error) throw error;
    });
  });
});

function printUser(user) {
  const { id, first_name, last_name, birthdate } = user;
  const date = moment(birthdate).format('YYYY-MM-DD');
  console.log(`-${id}: ${first_name} ${last_name}, born ${date}`);
}
