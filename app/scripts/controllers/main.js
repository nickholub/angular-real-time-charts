'use strict';

angular.module('angularRealTimeChartsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.gaugeValue = 0;

    var sock = new SockJS('/sockjs');
    sock.onopen = function() {
      //console.log('open');
    };

    var items = [];

    sock.onmessage = function(e) {
      var item = JSON.parse(e.data);

      items.push(item);

      if (items.length > 100) {
        items.shift();
      }

      $scope.chart = {
        data: items
      };
      $scope.gaugeValue = item.value;
      $scope.$apply();
    };
  });
