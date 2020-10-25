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

var addressesForDb = JSON.parse(fs.readFileSync('../week7/data/zone10.json'));

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