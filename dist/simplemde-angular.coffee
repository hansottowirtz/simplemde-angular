angular.module('simplemde', [])
.directive('simplemde', ['$parse', '$timeout', ($parse, $timeout) ->
  mde = null
  {
    restrict: 'A'
    require: 'ngModel'
    controller: ['$scope', ($scope) ->
      {
        get: ->
          $scope.simplemde.instance
        rerenderPreview: (val) ->
          $scope.simplemde.rerenderPreview(val)
      }
    ]
    link: (scope, element, attrs, ngModel) ->
      # Setup
      options = $parse(attrs.simplemde)(scope) || {}
      options.element = element[0]
      mde = new SimpleMDE(options)

      # ng-model
      mde.codemirror.on 'change', ->
        scope.$applyAsync ->
          ngModel.$setViewValue mde.value()
          return
        return

      ngModel.$render = ->
        val = ngModel.$modelValue || options.default
        mde.value(val)
        rerenderPreview(val) if mde.isPreviewActive()
        return

      # Controller exposing
      rerenderPreview = (val) ->
        # if mde.isPreviewActive()
        #   val ||= mde.value()
        #   preview = mde.codemirror.getWrapperElement().querySelector('.editor-preview')
        #   preview.innerHTML = mde.options.previewRender(val, preview)
        #   true
        # else
        #   false

      scope.simplemde = {
        instance: mde,
        rerenderPreview: rerenderPreview
      }

      return
  }
])
# .controller('simpleMde', [->
#   {def: 'ghi'}
# ])
