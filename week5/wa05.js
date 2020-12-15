const async = require('async');
var blogEntries = [];

class BlogEntry {
  constructor(GameId, date, nytHead, opRank, myRank, win, moves) {
    this.GameId = {};
    this.GameId.S = GameId;
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.nytHead = {};
    this.nytHead.S = nytHead.toString();
    this.opRank = {};
    this.opRank.N = opRank.toString();
    this.myRank = {};
    this.myRank.N = myRank.toString();
    this.win = {};
    this.win.BOOL = win; 
    this.moves = {};
    this.moves.N = moves.toString();
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

blogEntries.push(new BlogEntry("110022020-true", 'October 2, 2020', 'TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS', 1489, 1549, true, 34));
blogEntries.push(new BlogEntry("210022020-true", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1527, 1557, true, 33));
blogEntries.push(new BlogEntry("310022020-false", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1615, 1550, false, 26));
blogEntries.push(new BlogEntry("410022020-false", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1541, 1542, false, 12));
blogEntries.push(new BlogEntry("510022020-true", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1530, 1550, true, 33));
blogEntries.push(new BlogEntry("610022020-false", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1573, 1542, false, 34));
blogEntries.push(new BlogEntry("710022020-false", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1547, 1534, false, 28));
blogEntries.push(new BlogEntry("810022020-true", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1435, 1540, true, 40));
blogEntries.push(new BlogEntry("910022020-true", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1566, 1549, true, 32));
blogEntries.push(new BlogEntry("1010022020-false", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1518, 1540, false, 40));
blogEntries.push(new BlogEntry("1110022020-true", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1546, 1548, true, 14));
blogEntries.push(new BlogEntry("1210022020-false", 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1564, 1540, false, 31));
blogEntries.push(new BlogEntry("1310032020-true", 'October 3, 2020', "Trump Hospitalized With Coronavirus", 1483, 1547, true, 20));
blogEntries.push(new BlogEntry("1410032020-false", 'October 3, 2020', "Trump Hospitalized With Coronavirus", 1571, 1539, false, 27));
blogEntries.push(new BlogEntry("1510032020-true", 'October 3, 2020', "Trump Hospitalized With Coronavirus", 1557, 1548, true, 25));
blogEntries.push(new BlogEntry("1610032020-false", 'October 3, 2020', "Trump Hospitalized With Coronavirus", 1593, 1541, false, 28));
blogEntries.push(new BlogEntry("1710042020-true", 'October 4, 2020', "Trump’s Symptoms Described as ‘Very Concerning’ Even as Doctors Offer Rosier Picture", 1465, 1547, true, 27));
blogEntries.push(new BlogEntry("1810042020-true", 'October 4, 2020', "Trump’s Symptoms Described as ‘Very Concerning’ Even as Doctors Offer Rosier Picture", 1578, 1556, true, 17));
blogEntries.push(new BlogEntry("1910042020-false", 'October 4, 2020', "Trump’s Symptoms Described as ‘Very Concerning’ Even as Doctors Offer Rosier Picture", 1578, 1548, false, 36));
blogEntries.push(new BlogEntry("2010042020-false", 'October 4, 2020', "Trump’s Symptoms Described as ‘Very Concerning’ Even as Doctors Offer Rosier Picture", 1447, 1538, false, 42));
blogEntries.push(new BlogEntry("2110042020-false", 'October 4, 2020', "Trump’s Symptoms Described as ‘Very Concerning’ Even as Doctors Offer Rosier Picture", 1640, 1532, false, 21));
blogEntries.push(new BlogEntry("2210042020-true", 'October 4, 2020', "Trump’s Symptoms Described as ‘Very Concerning’ Even as Doctors Offer Rosier Picture", 1496, 1539, true, 19));
blogEntries.push(new BlogEntry("2310042020-false", 'October 4, 2020', "Trump’s Symptoms Described as ‘Very Concerning’ Even as Doctors Offer Rosier Picture", 1502, 1530, false, 16));
blogEntries.push(new BlogEntry("2410052020-true", 'October 5, 2020', "As Trump Seeks to Project Strength, Doctors Disclose Alarming Episodes", 1544, 1539, true, 40));
blogEntries.push(new BlogEntry("2510042020-false", 'October 5, 2020', "As Trump Seeks to Project Strength, Doctors Disclose Alarming Episodes", 1517, 1530, false, 35));
blogEntries.push(new BlogEntry("2610042020-false", 'October 6, 2020', "Trump Leaves Hospital, Minimizing Virus and Urging Americans ‘Don’t Let It Dominate Your Lives’", 1562, 1523, false, 29));
blogEntries.push(new BlogEntry("2710042020-false", 'October 6, 2020', "Trump Leaves Hospital, Minimizing Virus and Urging Americans ‘Don’t Let It Dominate Your Lives’", 1455, 1513, false, 32));
blogEntries.push(new BlogEntry("2810042020-true", 'October 6, 2020', "Trump Leaves Hospital, Minimizing Virus and Urging Americans ‘Don’t Let It Dominate Your Lives’", 1537, 1522, true, 36));
blogEntries.push(new BlogEntry("2910042020-false", 'October 6, 2020', "Trump Leaves Hospital, Minimizing Virus and Urging Americans ‘Don’t Let It Dominate Your Lives’", 1560, 1515, false, 28));
blogEntries.push(new BlogEntry("3010042020-true", 'October 6, 2020', "Trump Leaves Hospital, Minimizing Virus and Urging Americans ‘Don’t Let It Dominate Your Lives’", 1492, 1523, true, 33));
blogEntries.push(new BlogEntry("3110042020-false", 'October 6, 2020', "Trump Leaves Hospital, Minimizing Virus and Urging Americans ‘Don’t Let It Dominate Your Lives’", 1575, 1516, false, 30));
blogEntries.push(new BlogEntry("3210042020-true", 'October 6, 2020', "Trump Leaves Hospital, Minimizing Virus and Urging Americans ‘Don’t Let It Dominate Your Lives’", 1532, 1525, true, 38));
blogEntries.push(new BlogEntry("3310042020-false", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1541, 1517, false, 27));
blogEntries.push(new BlogEntry("3410042020-false", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1483, 1508, false, 59));
blogEntries.push(new BlogEntry("3510042020-false", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1512, 1500, false, 21));
blogEntries.push(new BlogEntry("3610042020-false", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1546, 1493, false, 28));
blogEntries.push(new BlogEntry("3710042020-true", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1491, 1501, true, 25));
blogEntries.push(new BlogEntry("3810042020-true", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1512, 1509, true, 46));
blogEntries.push(new BlogEntry("3910042020-true", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1469, 1516, true, 16));
blogEntries.push(new BlogEntry("4010042020-false", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1502, 1507, false, 35));
blogEntries.push(new BlogEntry("4110042020-false", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1524, 1499, false, 32));
blogEntries.push(new BlogEntry("4210042020-true", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1492, 1507, true, 31));
blogEntries.push(new BlogEntry("4310042020-true", 'October 7, 2020', "Trump Abruptly Ends Stimulus Talks After Fed Chair Urges Economic Support", 1527, 1516, true, 34));
blogEntries.push(new BlogEntry("4410042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1558, 1509, false, 52));
blogEntries.push(new BlogEntry("4510042020-true", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1508, 1517, true, 33));
blogEntries.push(new BlogEntry("4610042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1556, 1510, false, 54));
blogEntries.push(new BlogEntry("4710042020-true", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1538, 1519, true, 31));
blogEntries.push(new BlogEntry("4810042020-true", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1490, 1527, true, 20));
blogEntries.push(new BlogEntry("4910042020-true", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1508, 1535, true, 45));
blogEntries.push(new BlogEntry("5010042020-true", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1510, 1543, true, 35));
blogEntries.push(new BlogEntry("5110042020-true", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1544, 1551, true, 8));
blogEntries.push(new BlogEntry("5210042020-true", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1540, 1559, true, 18));
blogEntries.push(new BlogEntry("5310042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1583, 1551, false, 29));
blogEntries.push(new BlogEntry("5410042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1589, 1544, false, 37));
blogEntries.push(new BlogEntry("5510042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1516, 1535, false, 45));
blogEntries.push(new BlogEntry("5610042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1546, 1527, false, 27));
blogEntries.push(new BlogEntry("5710042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1524, 1519, false, 38));
blogEntries.push(new BlogEntry("5810042020-false", 'October 8, 2020', "Virus Takes Center Stage as Pence and Harris Skirmish in Debate", 1538, 1511, false, 44));

console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();




async.eachSeries(blogEntries, function(value, callback) {
  console.log(value)
var params = {};
params.TableName = "processblog-2";
params.Item = value; 
  dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data)});  
  setTimeout(callback, 1000);
});