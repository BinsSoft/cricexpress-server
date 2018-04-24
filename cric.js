global.express 	= require('express');
global.app     	= global.express();
var http 		= require('http').Server(global.app);
var fs 			= require("fs");
var path 		= require('path');
var multer 		= require('multer');
var bodyParser 	= require('body-parser');
var engine 		= require('ejs-locals');
global.config 			= require("./config/config");
require('dotenv').config();


/* **** VIEW CONFIGURATION **** */
global.app.use(global.express.static(__dirname + '/public'));

global.app.set('views', __dirname + '/views');
global.app.engine('ejs', engine);
global.app.set('view engine', 'ejs');

/* **** SESSION CONFIGURATION **** */


/* **** POST COFIGURATION **** */
global.app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies

global.app.use(bodyParser.urlencoded({ extended: false,
    parameterLimit: 1000000,
	limit: '50mb'}));

global.app.use(require('./routes/web'));

global.app.set('port', process.env.PORT || 5000);

http.listen(global.app.get('port'), function(){
  console.log('Express Chat Server starts it"s run with port ' + global.app.get('port'));
});




