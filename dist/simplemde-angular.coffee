angular.module('simplemde', [])
.directive 'simplemde', ['$parse', ($parse) ->
  {
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel) ->
      options = $parse(attrs.simplemde)(scope) || {}
      options.element = element[0]
      mde = new SimpleMDE(options)
      callback = -> ngModel.$setViewValue(mde.value())
      mde.codemirror.on 'change', ->
        scope.$applyAsync callback

      ngModel.$render = ->
        mde.value(ngModel.$modelValue)
  }
]
