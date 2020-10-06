

var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('data/0.txt');

var $ = cheerio.load(content);


var meetings = []; 

$("td[style='border-bottom:1px solid #e3e3e3; width:260px']").each(function(i, elem) {
    meetings.push($(elem).html().split('<br>')[2].trim().split(',')[0]);
});

fs.writeFileSync('data/zone9.html', JSON.stringify(meetings));
