var express = require('express');
var app = express();
var iw = require('./aps')();
iw.scan(scanresults);
var scanfinalresults;
var counter = 1;
var port = 3000;

function scanresults(err, results) {
    if (err) {
        console.log("err", err);
    } else {
        aps = [];
        for (i = 0; i < results.length; i++) {
            ap = results[i].address + ',' + results[i].essid + ',' + results[i].signal +
             ',' + results[i].quality + ',' + results[i].channel;
            aps.push(ap);
        }
        //console.log(aps.join("\n"));
        console.log(counter++);
        scanfinalresults = aps.join("\r")
    }
}

app.get('/aps', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    iw.scan(scanresults);
    res.send(scanfinalresults);
});

app.listen(port, function() {
    console.log('Example app listening on port ',port);
});
