'use strict';

/* Directives */
angular.module('components', []).directive('myDirective', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngModel, function (v) {
                console.log('value changed, new value is: ' + v);
            });
        }
    };
});