'use strict';

describe('Service: webSocket', function () {

  var webSocketObject;
  var webSocket;

  beforeEach(module('app.service', function(webSocketProvider) {
    webSocketObject = {
      send: function () {}
    };

    webSocketProvider.setWebSocketObject(webSocketObject);
  }));

  beforeEach(inject(function (_webSocket_) {
    webSocket = _webSocket_;
  }));

  it('should notify subscribers', function () {
    expect(webSocketObject.onmessage).toBeDefined();

    var listener1 = jasmine.createSpy();
    var listener2 = jasmine.createSpy();

    webSocket.subscribe(listener1);
    webSocket.subscribe(listener2);

    webSocketObject.onmessage({ data: '{ "value": 100 }' });

    expect(listener1).toHaveBeenCalledWith({ value: 100 });
    expect(listener2).toHaveBeenCalledWith({ value: 100 });

    webSocketObject.onmessage({ data: '{ "value": 50 }' });

    expect(listener1).toHaveBeenCalledWith({ value: 50 });
    expect(listener2).toHaveBeenCalledWith({ value: 50 });
  });

  it('should send message when WebSocket connection is opened', inject(function ($rootScope) {
    expect(webSocketObject.onopen).toBeDefined();

    spyOn(webSocketObject, 'send');

    webSocket.send({ value: 100 });

    expect(webSocketObject.send).not.toHaveBeenCalled(); // no connection yet

    webSocketObject.onopen();
    $rootScope.$apply(); // required for AngularJS promise resolution

    expect(webSocketObject.send).toHaveBeenCalled();
  }));

});
