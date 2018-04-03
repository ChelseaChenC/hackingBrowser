var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(6001, function () {
  console.log('Example app listening on port 6001!')
});

