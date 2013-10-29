'use strict';

angular.module('angularRealTimeChartsApp')
  .directive('lineChart', function ($timeout) {
    return {
      template: '<div></div>',
      scope: {
        chart: '='
      },
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        var chart = new google.visualization.LineChart(element[0]);

        function draw(data) {
          var table = new google.visualization.DataTable();
          table.addColumn('datetime');
          table.addColumn('number');
          table.addRows(data.length);

          var view = new google.visualization.DataView(table);

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            table.setCell(i, 0, new Date(item.timestamp));
            var value = parseFloat(item.value);
            table.setCell(i, 1, value);
          }

          var last = data[data.length - 1];
          var max = new Date(last.timestamp);
          var min = new Date(last.timestamp - 30 * 1000);

          var chartOptions = {
            legend: 'none',
            vAxis: { minValue: 0, maxValue: 100 },
            hAxis: { viewWindow: { min: min, max: max }}
          };

          chart.draw(view, chartOptions);
        }

        scope.$watch('chart', function (chart) {
          if (chart && chart.data) {
            draw(chart.data);
          }
        });
      }
    };
  });
