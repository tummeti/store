var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cors = require('cors')
var Keycloak = require('keycloak-connect');

var db = require('./queries');
var apiRoot = '/api/v1/';

var app = express();

var keyCloakSettings = {
  "realm": "store",
  "bearer-only": true,
  "auth-server-url": "http://store-keycloak:8080/auth",
  "ssl-required": "none",
  "resource": "store-service"
}
var keycloak = new Keycloak({}, keyCloakSettings);

app.use(cors());
app.use(keycloak.middleware());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get(apiRoot + 'values', keycloak.protect(), db.getAllKeyValues);
app.get(apiRoot + 'keys', keycloak.protect(), db.getKeys);
app.get(apiRoot + 'value/:key', keycloak.protect(), db.getValue);
app.post(apiRoot + 'value', keycloak.protect(), db.postValue);
app.put(apiRoot + 'value/:key', keycloak.protect(), db.updateValue);
app.delete(apiRoot + 'value/:key', keycloak.protect(), db.deleteValue);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;
