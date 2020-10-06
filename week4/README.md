# Part 1

This script uses RDS PostgreSQL credentials kept in a .env file to connect to an SQL database client. 
```
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jtroxel';
db_credentials.host = 'data-structures.cj2bazt69614.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
console.log(process.env.AWSRDS_PW)
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();
```
Once this happens, a table is created using a query string with the `CREATE TABLE...` command that enters headings for address, latitude and longitude.
```
// Sample SQL statement to create a table: 
var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
```
# Part 2

A geolocation json file is then read in, and an `eachSeries` loop is executed using an async module which inserts the relevant values for each table heading using the query string method.
```
const { Client } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const async = require('async');
dotenv.config({path: '../.env'});  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jtroxel';
db_credentials.host = 'data-structures.cj2bazt69614.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
// console.log(process.env.AWSRDS_PW)

var addressesForDb = JSON.parse(fs.readFileSync('../week3/data/geoLocations.json'));

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.StreetAddress.StreetAddress + "', " + value.LatLong[0] + ", " + value.LatLong[1] + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
});
```
# Part3

This last script file connects to the database and runs a query string the same as before, but instead, to select everything from tha table we just created to verify its contents.
```
const { Client } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const async = require('async');
dotenv.config({path: '../.env'});  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jtroxel';
db_credentials.host = 'data-structures.cj2bazt69614.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM aalocations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});
```
