const express = require('express');
const app = express();
const errorCallback = console.error.bind(console);

const bodyParser = require('body-parser');

const pg = require('pg');
const url = require('url');

const connectionUrl = process.env.DATABASE_URL || "postgres://Pat@localhost:5432/bulletin-board"; //connection string
const dbUrlParams = url.parse(connectionUrl); 
//console.log(dbUrlParams);
const auth = dbUrlParams.auth.split(':');

const dbConfig = {
    user: auth[0],
    password: auth[1],
    host: dbUrlParams.hostname,
    port: dbUrlParams.port,
    database: dbUrlParams.pathname.split('/')[1],
    ssl: false
};
const pool = new pg.Pool(dbConfig);

app.use(express.static('client/build'));
app.use(bodyParser.json());

app.get("/api/", (req, res) => {
    pool.query("SELECT * FROM notes ORDER BY id").then(function(result) {
        res.send(result.rows);
    }).catch(errorCallback);
});

app.post('/api/', function(req, res) {
    const item = req.body;
    pool.connect().then(function(client) {
        return client.query("INSERT INTO list(item, price) VALUES ($1, $2)",
                             [item.item, item.price])
        .then(function() {
            res.send("SUCCESS");
        });
    }).catch(errorCallback);
});

app.delete('/api/:id', function(req, res) {
    const id = req.params.id;
    pool.query("DELETE FROM list WHERE id = $1", [id]).then(function() {
        res.send("SUCCESS");
    }).catch(errorCallback);
});

app.put('/api/:id', function(req, res) {
    var id = req.params.id;
    var item = req.body;
    pool.connect().then(function(client) {
        return client.query("UPDATE list SET item = $1, price = $2 WHERE ID = $3",
                            [item.item, item.price, id]).then(function() {
            res.send("SUCCESS");
        });
    }).catch(errorCallback);
});

// We can use an environment variable to pick the port this server runs on (this
// will help us if we use Heroku later). Otherwise, default to port 5000.
const PORT = process.env.PORT || 5000;
// Start the server!
app.listen(PORT, () => {
  console.log(`JSON Server is running on ${PORT}`);
});