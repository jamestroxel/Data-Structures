// npm install request
// mkdir data
var urls = ['https://parsons.nyc/aa/m01.html',  
    'https://parsons.nyc/aa/m02.html',  
    'https://parsons.nyc/aa/m03.html',  
    'https://parsons.nyc/aa/m04.html',  
    'https://parsons.nyc/aa/m05.html',  
    'https://parsons.nyc/aa/m06.html', 
    'https://parsons.nyc/aa/m07.html',
    'https://parsons.nyc/aa/m08.html',
    'https://parsons.nyc/aa/m09.html',
    'https://parsons.nyc/aa/m10.html'];


var request = require('request');
var fs = require('fs');

function runRequest (urls) {
    for (var i=0; i < urls.length; i++) {
    request(urls[i], function(error, response, body){
        if (!error && response.statusCode == 200) {
            fs.writeFileSync('/home/ec2-user/environment/data/' + [i++ - urls.length] + '.txt', body);
        }
        else {console.log("Request failed!")}
    })}
}
runRequest(urls);
