angular.module('simplemde', []).directive('simplemde', [
  '$parse', '$timeout', function($parse, $timeout) {
    var mde;
    mde = null;
    return {
      restrict: 'A',
      require: 'ngModel',
      controller: [
        '$scope', function($scope) {
          return {
            get: function() {
              return $scope.simplemde.instance;
            },
            rerenderPreview: function(val) {
              return $scope.simplemde.rerenderPreview(val);
            }
          };
        }
      ],
      link: function(scope, element, attrs, ngModel) {
        var options, rerenderPreview;
        options = $parse(attrs.simplemde)(scope) || {};
        options.element = element[0];
        mde = new SimpleMDE(options);
        mde.codemirror.on('change', function() {
          scope.$applyAsync(function() {
            ngModel.$setViewValue(mde.value());
          });
        });
        ngModel.$render = function() {
          var val;
          val = ngModel.$modelValue;
          mde.value(val);
          if (mde.isPreviewActive()) {
            rerenderPreview(val);
          }
        };
        rerenderPreview = function(val) {
          var preview;
          if (mde.isPreviewActive()) {
            val || (val = mde.value());
            preview = mde.codemirror.getWrapperElement().querySelector('.editor-preview');
            preview.innerHTML = mde.options.previewRender(val, preview);
            return true;
          } else {
            return false;
          }
        };
        scope.simplemde = {
          instance: mde,
          rerenderPreview: rerenderPreview
        };
      }
    };
  }
]);
