```
const async = require('async');
var blogEntries = [];
````
An abject array is constructed to conform to the parameters set for a DynamoDB table.

```
class BlogEntry {
  constructor(GameId, date, nytHead, opRank, myRank, win, moves) {
    this.GameId = {};
    this.GameId.N = GameId.toString();
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
```
The items are then pushed to the array.
```
blogEntries.push(new BlogEntry(110022020, 'October 2, 2020', 'TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS', 1489, 1549, true, 34));
blogEntries.push(new BlogEntry(210022020, 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1527, 1557, true, 33));
blogEntries.push(new BlogEntry(310022020, 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1615, 1550, false, 26));
blogEntries.push(new BlogEntry(410022020, 'October 2, 2020', "TRUMP AND FIRST LADY TEST POSITIVE FOR CORONAVIRUS", 1541, 1542, false, 12));
console.log(blogEntries);
```

Cloud9 is then connected to DynamoDb in oder for an async module to loop through the arrayt and pu each item in to the database.
```
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {};
params.TableName = "processblog";
params.Item = blogEntries[0]; 

async.eachSeries(params, function(value, callback) {
  dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data)});  
  setTimeout(callback, 1000);
});
