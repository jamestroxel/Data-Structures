# Part 1
This script accesses our postgreSQL database using a pg module that enters our credentials and password to the client. 

```
const { Client } = require('pg');
const cTable = require('console.table');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jtroxel';
db_credentials.host = 'data-structures.cj2bazt69614.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
```
The password is entered using a dotenv module that extracts the password from our .env file
```
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();
```
We then create a query using the ```SELECT``` command that extracts any entries associated with the address '223 E 117TH ST New York NY'
```
var thisQuery = "SELECT address, lat, long FROM aalocations WHERE address = '223 E 117TH ST New York NY ';";
```
a console.table module is used to display the returned query in or terminal.
```
client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});
```

# Part 2
This script accesses our DynamoDB database using an aws-sdk node module that connects our cloud9 environment to our DynamoDB database. 

```
// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
```
Next, we define our query parameters to query items that contain chess ganes i've won, assign a variable to the query method, and cosole log either the error or "Query succeeded" message in the console.
```
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "processblog-2",
    KeyConditionExpression: "GameId = :wins", 
    ExpressionAttributeValues: { 
        ":wins": {S: "true"},
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});
```