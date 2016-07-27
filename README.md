# SimpleMDE for AngularJS

A simple directive to bind SimpleMDE to `ng-model`. If you want support for something, please open an issue!

### Installation
```bash
bower install simplemde-angular --save
```
```html
<script src="simplemde-angular/dist/simplemde-angular.js"></script>
```
```javascript
var app = angular.module('app', ['simplemde']);
```

### Usage
```html
<textarea simplemde='{spellChecker: false}'></textarea>
```

```html
<textarea simplemde='options'></textarea>
```

```html
<textarea simplemde ng-model='text'></textarea>
```

### Contributing

`git clone https://github.com/hansottowirtz/simplemde-angular.git`<br/>
`cd simplemde-angular`<br/>
`npm install`<br/>
`bower install`<br/>
`gulp build`

You can use `bower link` to use your package locally.
