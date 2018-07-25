var promise = require('bluebird');

// Initialization Options
var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
/*
const databaseConfig= {
  "host": "postgres-database",
  "port": 5432,
  "database": "store",
  "user": "postgres",
  "password": "postgres"
};
var db = pgp(databaseConfig);
*/
var connString = 'postgres://postgres:postgres@postgres-database:5432/store';
//const cn = 'postgres://username:password@host:port/database';
var db = pgp(connString);

// Query Functions
module.exports = {
    getAllKeyValues: getAllKeyValues,
    getKeys: getKeys,
    getValue: getValue,
    postValue: postValue,
    updateValue: updateValue,
    deleteValue: deleteValue
};

function getAllKeyValues(req, res, next) {
    db.any('select * from values order by key')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all records'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function getKeys(req, res, next) {
    db.any('select key from values')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all keys'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function getValue(req, res, next) {
    var key = parseInt(req.params.key);
    db.one('select * from values where key = $1', key)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved the record'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function postValue(req, res, next) {
    db.none('insert into values(value, userId)' +
        'values(${value}, 1)',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted a new record'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function updateValue(req, res, next) {
    var key = parseInt(req.params.key);
    db.none('update values set value=$1 where key=$2',
      [req.body.value, key])
      .then(function (result) {
        console.log('update value' + key, result)
        res.status(200)
        .json({
          status: 'success',
          message: 'Updated the record'
        });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  function deleteValue(req, res, next) {
    var key = parseInt(req.params.key);
    db.result('delete from values where key = $1', key)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} records`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }
