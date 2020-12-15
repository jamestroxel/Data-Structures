# Overview
"app.js" uses a node express module to serve 3 html pages. 

## AA Meetings
The app.get command requests the aa meeting data stored in the RDS database and inserts it between the "hx and "jx" html strings to return the interactove Leaflet map. The query uses the `getWeekDay(date)` function to filter the data according to the currnet day of the week. The "day" key from the returned data is then called in the dynamic title to the right to reflect the current day. A loop adds the "meetings" query aggregation data to a Leaflet marker for each location pin.

## Temp Sensor
The app makes a request o the RDS database where the Particle temperature sensor data is stored, and uses a handlebars module to insert the data into the "data" variable found in "sensor.txt". D3 binds the SQL query data for the day and average temperature to the bar chart. 

## Process Blog
app.js sneds a DynamoDB query that returns individual items according to their primary key, "GameId". The handlebars module is once again used to insert the data into the "data" variable in "pb.txt". A loop iterates over each item in the data and defines the various table items referenced in the "myTable" variable accordingly. 
