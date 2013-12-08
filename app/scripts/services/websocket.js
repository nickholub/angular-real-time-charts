'use strict';

angular.module('app.service', ['ng']);

angular.module('app.service')
  .provider('webSocket', function () {

    var socketURL;

    return {
      $get: function($q) {
        if (!socketURL) {
          throw "WebSocket URL is not defined";
        }

        var deferred = $q.defer();

        var socket = new WebSocket(socketURL);

        socket.onopen = function() {
          deferred.resolve();
        };

        var callbacks = jQuery.Callbacks();

        socket.onmessage = function(e) {
          var data = JSON.parse(e.data);
          callbacks.fire(data);
        };

        return {
          send: function (message) {
            var msg = JSON.stringify(message);

            deferred.promise.then(function () {
              socket.send(msg);
            });
          },

          subscribe: function(callback) {
            callbacks.add(callback);
          }
        };
      },

      setWebSocketURL: function(webSocketURL) {
        socketURL = webSocketURL;
      }
    };
  });
