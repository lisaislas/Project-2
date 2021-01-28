

const {Pool, Client} = require('pg')

var fs = require('fs')

const connectionString = 'postgresql://postgres:postgres@localhost:5432/Project_2'

const client = new Client({
  connectionString: connectionString
})

client.connect()

client.query('SELECT * from genre_table', function(err, results, fields) {
    if(err) throw err;

    fs.writeFile('../data/genre.json', JSON.stringify(results), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });



  client.end()
})

