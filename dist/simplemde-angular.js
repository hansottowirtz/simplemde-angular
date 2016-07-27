angular.module('simplemde', []).directive('simplemde', [
  '$parse', function($parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        var callback, mde, options;
        options = $parse(attrs.simplemde)(scope) || {};
        options.element = element[0];
        mde = new SimpleMDE(options);
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
