angular.module('simplemde', [])
.directive 'simplemde', ['$parse', '$rootScope', ($parse, $rootScope) ->
  {
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel) ->
      settings = $parse(attrs.simplemde)(scope) || {}
      settings.element = element[0]
      mde = new SimpleMDE(settings)
      callback = -> ngModel.$setViewValue(mde.value())
      mde.codemirror.on 'change', ->
        scope.$applyAsync callback

      ngModel.$render = ->
        mde.value(ngModel.$modelValue)
  }
]
