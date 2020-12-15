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

var addressesForDb = JSON.parse(fs.readFileSync('../week7/data/zone1.json'));

async.eachSeries(addressesForDb, function(value, callback) {
    // const client = new Client(db_credentials);
    // client.connect();
    async.eachSeries(value.dayTime, function(entry, callback) {
        const client = new Client(db_credentials);
        client.connect();
    //   "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision, building varchar(100), floorInfo varchar(150), groupName varchar(50), wcAccess int, day varchar(10),  startTimeChar varchar(10), startTimeInt int, endTimeChar varchar(10), endTimeInt int, meetingType varchar(30), details varchar(250));";
        var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.long + ", E'" + value.building[0].replace(/'/g,"") + "', E'" + value.floorInfo.replace(/,/g,"").replace(/'/g,"") + "', E'" + value.groupName.replace(/'/g,"").replace(/,/g,"") + "', '" 
                                                        + value.wcAccess + "', '" + entry.day  + "', '" + entry.startTime + "', '" + entry.startTime.split(":")[0]  + "', '" + entry.endTime + "', '" + entry.endTime.split(":")[0]  + "', E'" 
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