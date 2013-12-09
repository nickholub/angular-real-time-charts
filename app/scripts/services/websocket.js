'use strict';

angular.module('app.service', ['ng']);

angular.module('app.service')
  .provider('webSocket', function () {

    var webSocketURL;
    var webSocketObject; // for testing only

    return {
      $get: function($q) {
        if (!webSocketURL && !webSocketObject) {
          throw 'WebSocket URL is not defined';
        }

        var socket = !webSocketObject ? new WebSocket(webSocketURL) : webSocketObject;

        var deferred = $q.defer();

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

      setWebSocketURL: function(wsURL) {
        webSocketURL = wsURL;
      },

      setWebSocketObject: function(wsObject) {
        webSocketObject = wsObject;
      }
    };
  });
