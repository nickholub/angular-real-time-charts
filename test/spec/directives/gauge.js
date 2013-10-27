'use strict';

describe('Directive: gauge', function () {

  // load the directive's module
  beforeEach(module('angularRealTimeChartsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    //element = angular.element('<gauge></gauge>');
    //element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the gauge directive');
  }));
});
