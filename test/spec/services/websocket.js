'use strict';

describe('Service: webSocket', function () {

  var webSocketObject = {};
  var webSocket;
  var listener1;
  var listener2;

  beforeEach(module('app.service', function($provide) {
    $provide.value('webSocketObject', webSocketObject);
  }));

  beforeEach(inject(function (_webSocket_) {
    webSocket = _webSocket_;
    listener1 = jasmine.createSpy();
    listener2 = jasmine.createSpy();
  }));

  it('should notify subscribers', function () {
    expect(webSocketObject.onmessage).toBeDefined();

    webSocket.subscribe(listener1);
    webSocket.subscribe(listener2);

    webSocketObject.onmessage({ data: '{ "value": 100 }' });

    expect(listener1).toHaveBeenCalledWith({ value: 100 });
    expect(listener2).toHaveBeenCalledWith({ value: 100 });

    webSocketObject.onmessage({ data: '{ "value": 50 }' });

    expect(listener1).toHaveBeenCalledWith({ value: 50 });
    expect(listener2).toHaveBeenCalledWith({ value: 50 });
  });

});
