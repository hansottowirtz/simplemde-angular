angular.module('simplemde', []).directive('simplemde', [
  '$parse', function($parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      controller: ['$scope', function($scope) {
        return {
          get: function() {
            return $scope.simplemde.instance;
          },
          rerenderPreview: function(val) {
            return $scope.simplemde.rerenderPreview(val);
          }
        };
      }],
      link: function(scope, element, attrs, ngModel) {
        var options, rerenderPreview;
        options = $parse(attrs.simplemde)(scope) || {};
        options.element = element[0];
        var mde = new SimpleMDE(options);
        mde.codemirror.on('change', function() {
          scope.$applyAsync(function() {
            ngModel.$setViewValue(mde.value());
          });
        });
        ngModel.$render = function() {
          var val = ngModel.$modelValue || options["default"];
          mde.value(val);
          if (mde.isPreviewActive()) {
            rerenderPreview(val);
          }
        };
        rerenderPreview = function(val) {};
        scope.simplemde = {
          instance: mde,
          rerenderPreview: rerenderPreview
        };
      }
    };
  }
]);
