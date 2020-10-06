"use strict";

// dependencies
const fs = require('fs'),
      querystring = require('querystring'),
      request = require('request'),
      async = require('async'),
      dotenv = require('dotenv');

// TAMU api key
dotenv.config({path: '../.env'});
const API_KEY = process.env.TAMU_API;
const API_URL = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx'

// geocode addresses
let meetingsData = [];
let addresses =  JSON.parse(fs.readFileSync('data/zone9.html'));

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
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
        // console.log(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'], apiRequest);
        // console.log(body);
        let latlong = [];
        
        latlong.push(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude']);
        latlong.push(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude']);
        let tamuGeoFinal = new Object();
        tamuGeoFinal.StreetAddress = tamuGeo['InputAddress'];
        tamuGeoFinal.LatLong = latlong;
        meetingsData.push(tamuGeoFinal);
    });

    // sleep for a couple seconds before making the next request
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('data/geoLocations.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log(`Number of meetings in this zone: ${meetingsData.length}`);
});