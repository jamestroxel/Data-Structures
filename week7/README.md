# Part one
This script combines the steps from wekks 2, 3 and 4 
```/////// Full Script ////////////

//Combining weeks 2, 3, and 4
//Week 2 - scape HTML elements
var fs = require('fs');
var cheerio = require('cheerio');
// load the text file into a variable, `content`
var content = fs.readFileSync('data/0.txt');
// load `content` into a cheerio object
```
The files for each zone are read in using the fs module and parsed with cheerio sections. Th parsed information is pushed to a series of corresponding variables.

```var $ = cheerio.load(content);
var address = [];
var floorInfo =[];
var groupName =[];
var dayTime = [];
// var day = [];
// var startTime = [];
// var endTime = [];
var meetingType = [];
var building = [];
var wcAccess = [];
var details = [];
var zip = [];
//work towards targetting the correct element
$("td[style='border-bottom:1px solid #e3e3e3; width:260px']").each(function(i, elem) {
    floorInfo.push($(elem).html().split('<br>')[2].trim().split(',')[1].trim());
    zip.push($(elem).html().split('<br>')[3].trim().slice(- 5));
    address.push($(elem).html().split('<br>')[2].trim().split(',')[0].trim());
    if ($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0] == "125 - TWO FOR ONE - </b>"){
        groupName.push("125 - TWO FOR ONE");
    } else {
        groupName.push($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0].split('-')[0].replace("&apos;","'").trim());
    }
    if ($(elem).html().search("detailsBox") != -1){
        details.push($(elem).html().split('div')[1].split('>')[1].split('<')[0].split('\t')[1].split('\n')[0].trim().replace("&apos;","'").replace("&amp;","&"));
    } else {
        details.push('');
    }
    if ($(elem).html().split('img').length == 2){
        wcAccess.push(1)
    } else {
        wcAccess.push(0)
    }
});
```
A loop was created to handle groups that meet on multiple days and times to ensure that all relevant information stayed together

```
    var seperate = []
$("td[style='border-bottom:1px solid #e3e3e3;width:350px;']").each(function(i, elem) {
    seperate = $(elem).html().split('<br>\n                    \t<br>');
    var daytimes = [];
    for (let i = 0; i < seperate.length-1; i++){
        var daytimeobject = {
            day: "",
            startTime: "",
            endTime: "",
            meetingType: "",
            specialInterest: ""
        }
        daytimeobject.day = seperate[i].trim().split('From')[0].trim().split('<b>')[1];
        daytimeobject.startTime = seperate[i].trim().split('</b>')[1].trim().split('to')[0].split('<b>')[0].trim();
        daytimeobject.endTime = seperate[i].trim().split('<br>')[0].trim().split('</b>' + ' ')[2];
        if (seperate[i].trim().split('</b>').length == 5){
            daytimeobject.specialInterest = seperate[i].trim().split('</b>')[4].trim().split(' \n')[0];
            daytimeobject.meetingType = seperate[i].trim().split('</b>')[3].trim().split('<br>')[0];
        } else {
            daytimeobject.meetingType = seperate[i].trim().split('</b>')[3].trim().split(' \n')[0];
        };
        daytimes.push(daytimeobject);
    }
    dayTime.push(daytimes);
    console.log(daytimes);
});

$('h4[style="margin:0;padding:0;"]').each(function(i, elem) {
    building.push(($(elem).text()).trim().split("\n"));
});
```
The address array is passed to the TAMU Geocode API and the returned geolocation data is then pushed to the new object array along with the rest of the parsed information pushed to the other variables above
```
//Week 3 - Pull Geocodes
// dependencies
var //fs = require('fs'), //already declared in week 2 section
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');
// load the text file into a variable, `content`
//fetch from api
"use strict";
// TAMU api key
dotenv.config({path: '../.env'});
const API_KEY = process.env.TAMU_API;
// console.log(API_KEY);
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx';
// geocode addresses
let meetingsData = [];
var i = 0;
// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(address, function(value, callback) {
    let query = {
        streetAddress: value,
        city: "New York",
        state: "NY",
        apikey: API_KEY,
        format: "json",
        version: "4.01"
    };
    // construct a querystring from the `query` object's values and append it to the api URL
    let apiRequest = API_URL + '?' + querystring.stringify(query);
    request(apiRequest, function(err, resp, body) {
        if (err){ throw err; }
        let tamuGeo = JSON.parse(body);
        console.log(tamuGeo['FeatureMatchingResultType'], apiRequest);
        meetingsData.push({ address: tamuGeo.InputAddress.StreetAddress,
                            latLong:{   lat: tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude,
                                        long: tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude
                            },
                            building: building[i-1],
                            floorInfo: floorInfo[i-1],
                            groupName: groupName[i-1],
                            dayTime: dayTime[i-1],
                            wcAccess: wcAccess[i-1],
                            details: details[i-1],
                            zip: zip[i-1]
                          });
    });
    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
    i++;
}
, function() {
    fs.writeFileSync('data/zone9.json', JSON.stringify(meetingsData));
    // console.log('*** *** *** *** ***');
    // console.log(`Number of meetings in this zone: ${meetingsData.length}`);
    console.log(meetingsData);
 }
 );
 ```
The script spits out a json file for the zone information passd through it.

# Step 2
Create a table in AWS RDS.

```const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'jtroxel';
db_credentials.host = 'data-structures.cj2bazt69614.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
console.log(process.env.AWSRDS_PW);
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: 
 var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision, building varchar(100), floorInfo varchar(150), groupName varchar(50), wcAccess int, day varchar(10), startTime varchar(10), endTime varchar(10), meetingType varchar(30), details varchar(250));";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
```
Columns for the content we want to include form the json are included in the `CREATE TABLE` client query.

```var addressesForDb = JSON.parse(fs.readFileSync('../week7/data/zone10.json'));

async.eachSeries(addressesForDb, function(value, callback) {
    // const client = new Client(db_credentials);
    // client.connect();
    async.eachSeries(value.dayTime, function(entry, callback) {
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.long + ", E'" + value.building[0].replace(/'/g,"") + "', E'" + value.floorInfo.replace(/,/g,"").replace(/'/g,"") + "', E'" + value.groupName.replace(/'/g,"").replace(/,/g,"") + "', " 
                                                        + value.wcAccess + ", E'" + entry.day  + "', E'" + entry.startTime  + "', E'" + entry.endTime  + "', E'" 
                                                        + entry.meetingType.replace(/'/g,"")  + "', E'" + value.details.replace(/,/g,"").replace(/'/g,"") + "');";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
        setTimeout(callback, 1000); 
        console.log(thisQuery);
    }); 
    setTimeout(callback, 1000); 
    // console.log(thisQuery);
});
 ```
 We then read in each json to `INSERT INTO` or table with the specified values and additonal conditions for replacing apostrophes.
 
 Once each json has been entered onto the RDS table, we run `SEARCH` query to verify its contents.
 
 ![Alt text](/week7/finished-table.png?raw=true)