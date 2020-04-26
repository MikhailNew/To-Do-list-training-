// npm init // Enter
// npm intall express
// node fileName

var items = [];


var express = require('express');
var app = express();

function resolveCors(response) {
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept");
}

app.use('/item', function (req, res) {
    resolveCors(res);
    res.send(items);
});

app.use('/itemAdd', function (req, res) {
    let title = req.query.title;
    resolveCors(res);
    items.push(title);
    res.send(items);
});

app.use('/itemRemove', function (req, res) {
    let title = req.query.title;
    resolveCors(res); 
    items = items.filter(item => {
      return item !== title;
    });
    res.send(items);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


///////




//////////////