'use strict';

angular.module('app', ['app.service', 'app.directive', 'app.controller']);

angular.module('app').config(function ($routeProvider, webSocketProvider) {
    webSocketProvider.setWebSocketURL('ws://' + window.location.host + '/sockjs/websocket');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function (webSocket) {

    webSocket.send({ topic: 'topic1' });

    webSocket.send({ topic: 'topic2' });

    if (false)
    webSocket.subscribe(function (data) {
      console.log(data);
    });
  });

