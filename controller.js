'use strict';
var eliteApp = angular.module('eliteApp', []);
var fs = require('fs');
var jet = require('fs-jetpack');
// var moment = require('moment');
// var readline = require('readline');
// var parse = require('csv-parse');

eliteApp.controller('eliteCtrl', function ($scope) {

  $scope.dir = jet.read('dir') || 'directory'; // load directory from file
  $scope.logs = []; // logs from files
  $scope.loaded = false; // Have the logs been loaded

  $scope.username = '';
  $scope.itemid = '';
  $scope.itemtype = '';

  $scope.log = []; // local log

  $scope.predicate = 'date';
  $scope.reverse = true;

  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.updateDir = function(dir) {
    if(dir[dir.length-1]!='/') {
      dir = dir+'/';
    }
    jet.write('dir', dir);
    $scope.dir = dir;

    $scope.loadLogs();
  };

  $scope.loadLogs = function() {
    $scope.logs = []; // Clear old logs
    $scope.loaded = false;

    jet.list($scope.dir).forEach( function(file, index) {
      if(index>100) {
        return false;
      }
      var array = fs.readFileSync($scope.dir+file).toString().split("\n");
      array.pop();

      for(var i in array) {
        var line = array[i].toString().split(",");
        if(line[1].charAt(0) === ' ') { line[1] = line[1].substr(1); } // Remove space
        $scope.logs.push(line);
      }
    });
    $scope.loaded = true;
  };
  // Load logs on load if directory exists
  if(jet.exists($scope.dir)==='dir') { $scope.loadLogs(); }
  $scope.searchLogs = function(field) {
    if(field.length<3) { return false; }
    $scope.log = [];

    $scope.logs.forEach(function(log) {
      for(var i in log) {
        if(log[i].indexOf(field)>-1) {
          $scope.log.push(log);
          break;
        }
      }
    });
  };
});
