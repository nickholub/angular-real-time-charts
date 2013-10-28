'use strict';

angular.module('angularRealTimeChartsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.gaugeValue = 0;

    var sock = new SockJS('/sockjs');
    sock.onopen = function() {
      //console.log('open');
    };

    var last = { timestamp: 0 }; //TODO display last timestamp

    sock.onmessage = function(e) {
      var data = JSON.parse(e.data);
      var diff = data.timestamp - last.timestamp;
      //console.log(diff);
      last = data;
      $scope.gaugeValue = data.value;
      $scope.$apply();
    };
    sock.onclose = function() {
      //console.log('close');
    };

  });
