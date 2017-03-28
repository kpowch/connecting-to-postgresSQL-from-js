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
  if(error) console.log(error);

  client.query(`SELECT * FROM famous_people WHERE last_name = '${name}'`, (error, results) => {
    if(error) console.log(error);
    console.log('Searching...');

    console.log(`Found ${results.rows.length} person(s) by the name '${name}':`);

    for (let row in results.rows) {
      const id = results.rows[row].id;
      const first_name = results.rows[row].first_name;
      const last_name = results.rows[row].last_name;
      const birthdate = results.rows[row].birthdate;
      const date = moment(birthdate).format('YYYY-MM-DD');
      console.log(`-${id}: ${first_name} ${last_name}, born ${date}`);
    }

    client.end((error) => {
      if(error) throw error;
    });
  });
});
