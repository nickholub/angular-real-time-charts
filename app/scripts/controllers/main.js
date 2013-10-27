'use strict';

angular.module('angularRealTimeChartsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.gaugeValue = 0;

    var sock = new SockJS('/sockjs');
    sock.onopen = function() {
      console.log('open');
    };
    sock.onmessage = function(e) {
      var data = JSON.parse(e.data);
      $scope.gaugeValue = data.value;
      $scope.$apply();
    };
    sock.onclose = function() {
      console.log('close');
    };

  });
