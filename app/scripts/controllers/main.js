'use strict';

angular.module('angularRealTimeChartsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.gaugeValue = 0;

    var sock = new SockJS('/sockjs');
    sock.onopen = function() {
      //console.log('open');
    };

    var maxItems = 30;
    var items = [];

    sock.onmessage = function(e) {
      var item = JSON.parse(e.data);

      items.push(item);

      if (items.length > maxItems) {
        items.shift();
      }

      $scope.chart = {
        data: items,
        max: maxItems
      };
      $scope.gaugeValue = item.value;
      $scope.$apply();
    };
  });
