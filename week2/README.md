//This script uses Cheerio to load the text file defined in the variable "content"//

var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('data/0.txt');

var $ = cheerio.load(content);

//Cheerio then loops thorough all table cells in this file with styles matching 'border-bottom:1px solid #e3e3e3; width:260px',

//pushes these contents to the "meetings" variable as html text,  

//splits the text at the 3rd instance of the "<br>" tag to isolate the address line, 

//trims the extra spaces, 

//splits each element again on the first instance of a comma,

//and writes the stringified results in "meetings" as a new html file saved in the "data" folder and titled, "zone9.html"//

var meetings = []; 

$("td[style='border-bottom:1px solid #e3e3e3; width:260px']").each(function(i, elem) {
    meetings.push($(elem).html().split('<br>')[2].trim().split(',')[0]);
});

fs.writeFileSync('data/zone9.html', JSON.stringify(meetings));
