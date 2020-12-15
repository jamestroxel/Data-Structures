var express = require('express'), 
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');
const handlebars = require('handlebars');
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});  

const indexSource = fs.readFileSync("templates/sensor.txt").toString();
var template = handlebars.compile(indexSource, { strict: true });

const pbSource = fs.readFileSync("templates/pb.txt").toString();
var pbtemplate = handlebars.compile(pbSource, { strict: true });

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'jtroxel';
db_credentials.host = 'data-structures.cj2bazt69614.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// create templates
var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA in Manhattan">
  <meta name="author" content="AA">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Bungee+Hairline&family=Bungee+Outline&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css?v=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
</head>
<body>
<div class="container">
    <div id="mapid" class="map"></div>
    <p id="title"></p>
</div>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script>
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiamFtZXN0cm94ZWwiLCJhIjoiY2tiYjM0NHFyMDBodjJycGJvampmMGp4cyJ9.U3wNu2X0nS8iZPgAfA4H2w'
    }).addTo(mymap);
    for (var i=0; i<data.length; i++) {
        L.marker( [data[i].lat, data[i].long] ).bindPopup(JSON.stringify(data[i].meetings)).addTo(mymap);
    }
    document.getElementById("title").innerHTML = "AA Meetings on " + "<span class='day'>" + data[1].meetings[1].day + "</span>";
    
    </script>
    </body>
    </html>`;


app.get('/', function(req, res) {
    res.send('<h3>Code demo site</h3><ul><li><a href="/aa">aa meetings</a></li><li><a href="/temperature">temp sensor</a></li><li><a href="/processblog">process blog</a></li></ul>');
}); 

// respond to requests for /aa
app.get('/aa', function(req, res) {

    var now = moment.tz(Date.now(), "America/New_York"); 
    var dayy = getWeekDay(now.day()); 
    var hourr = now.format('h').toString(); 

    
    function getWeekDay(date){
    //Create an array containing each day, starting with Sunday.
    var weekdays = new Array(
        "Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"
    );
    //Use the getDay() method to get the day.
    // var day = date.getDay();
    //Return the element that corresponds to that index.
    return weekdays[date];
}
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    // "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision, building varchar(100), floorInfo varchar(150), groupName varchar(50), wcAccess int, day varchar(10), startTime varchar(10), endTime varchar(10), meetingType varchar(30), details varchar(250));"
    // SQL query 
    var thisQuery = `SELECT lat, long, json_agg(json_build_object('loc', building, 'address', address, 'Starts', startTimeChar, 'Ends', endTimeChar, 'name', groupName, 'day', day, 'types', meetingType, 'Wheelchairs', wcAccess)) as meetings
                 FROM aalocations 
                 WHERE day = '` + dayy + "' and startTimeInt >= " + hourr + 
                 ` GROUP BY lat, long
                 ;`;
    //   var thisQuery = `SELECT latLong.lat, latLong.long, building, address, startTimeChar, endTimeChar, groupName, day, meetingType, wcAccess
    //              FROM aalocations 
    //              WHERE day = '` + dayy + "' and startTimeInt >= " + hourr + 
    //              ` GROUP BY lat, long
    //              ;`;
    client.query(thisQuery, (qerr, qres) => {
        console.log(thisQuery)
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

app.get('/temperature', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    // var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
    //          AVG(sensorValue::int) as num_obs
    //          FROM sensorData
    //          GROUP BY sensorday
    //          ORDER BY sensorday;`;
 var q = `SELECT EXTRACT(day FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as sensor_temp
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.end(template({ sensordata: JSON.stringify(qres.rows)}));
            client.end();
            console.log('1) responded to request for sensor graph');
        }
    });
}); 

app.get('/processblog', function(req, res) {
    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName : "processblog-2",
        KeyConditionExpression: "GameId = :GameId", // the query expression
        ExpressionAttributeValues: { // the query values
            ":GameId": {S: "110022020-true"}
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            throw (err);
        }
        else {
            console.log(data.Items)
            res.end(pbtemplate({ pbdata: JSON.stringify(data.Items)}));
            console.log('3) responded to request for process blog data');
        }
    });
});

// serve static files in /public
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log('Server listening...');
});