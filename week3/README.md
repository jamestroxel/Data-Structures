This script makes an api request to Texas A&M geo services 

The async module runs a query through the api using each address item read from the file "zone9.html" found in the "data" folder, and by creating a query string from the api url and query object

Each request returns the geo location values for the address items and pushes them to an object array, which is then pushed to the larger address object array, "meetingsData".

"meetingsData" is then converted to a string and written to a file called geoLocations.json in the same "data" folder.
