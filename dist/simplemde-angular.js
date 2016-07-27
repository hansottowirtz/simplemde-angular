angular.module('simplemde', []).directive('simplemde', [
  '$parse', '$rootScope', function($parse, $rootScope) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        var callback, mde, settings;
        settings = $parse(attrs.simplemde)(scope) || {};
        settings.element = element[0];
        mde = new SimpleMDE(settings);
        callback = function() {
          return ngModel.$setViewValue(mde.value());
        };
        mde.codemirror.on('change', function() {
          return scope.$applyAsync(callback);
        });
        return ngModel.$render = function() {
          return mde.value(ngModel.$modelValue);
        };
      }
    };
  }
]);
