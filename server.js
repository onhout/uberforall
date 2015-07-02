/**
 * Created by pl on 5/30/15.
 */


var express = require('express');
var jade = require('jade');
var path = require('path');


var bodyParser = require('body-parser');
require('./server/config/mongoose.js');
var app = express();
app.use(bodyParser.json());
require('./server/config/routes.js')(app);


app.set('view engine', 'jade');
app.set('views', path.join(__dirname+ '/client/views'));
app.use(express.static(path.join(__dirname + '/client/static')));
app.use(express.static(path.join(__dirname + '/client/views')));



app.listen(process.env.PORT || 1337, function(){
    console.log('Server start');
});