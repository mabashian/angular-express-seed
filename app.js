
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  piler = require('piler');

var app = module.exports = express();

var clientjs = piler.createJSManager();
var clientcss = piler.createCSSManager();

var srv = http.createServer(app);

clientjs.bind(app,srv); // Make sure to bind to both Express and the server!
clientcss.bind(app,srv);

clientcss.addFile(__dirname + '/public/css/app.css');

clientjs.addFile(__dirname + '/public/bower_components/jquery/dist/jquery.min.js');
clientjs.addFile(__dirname + '/public/bower_components/lodash/lodash.min.js');
clientjs.addFile(__dirname + '/public/bower_components/angular/angular.js');
clientjs.addFile(__dirname + '/public/bower_components/angular-ui-router/release/angular-ui-router.min.js');
clientjs.addFile(__dirname + '/public/bower_components/bootstrap/dist/js/bootstrap.min.js');
clientjs.addFile(__dirname + '/public/bower_components/angular-bootstrap/ui-bootstrap.js');
clientjs.addFile(__dirname + '/public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js');

clientjs.addFile(__dirname + '/public/js/app.js');
clientjs.addFile(__dirname + '/public/js/controllers/app.js');
clientjs.addFile(__dirname + '/public/js/controllers/home.js');

clientjs.addOb({ VERSION: '1.0.0' });

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', function(req, res){
    res.render('index', {
        js: clientjs.renderTags(),
        css: clientcss.renderTags()
    });
});
app.get('/partials/*', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
    res.render('index', {
        js: clientjs.renderTags(),
        css: clientcss.renderTags()
    });
});


/**
 * Start Server
 */

srv.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
