# SassyFilters

Cross-Browser configurable CSS-SVG filters.  

*Online [preview](http://pascalduez.github.io/SassyFilters) (test folder).*  



## API

### Filters

*Mixins signatures try to follow the [specification](https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/Overview.html#FilterProperty) closely.*

`blur($radius)`  
`brightness($value)`  
`contrast($value)`  
`drop-shadow($offset-x, $offset-y, $blur-radius, $color [, $spread-radius])`  
`grayscale($value)`  
`hue-rotate($angle)`  
`invert($value)`  
`opacity($value)`  
`saturate($value)`  
`sepia($value)`  

Example:
```css
.blurred {
  @include blur(5px);
}
```

### Combined filters

`filters($filters)`

Example:
```css
.combined {
  @include filters((
    brightness: 3,
    invert: 1,
    blur: 5px
  ));
}
```

### SVG filter helper

`svg-filter($svgStr, $fragment [, $encoding])`

Example:
```css
.custom {
  $svgStr: '<svg xmlns="http://www.w3.org/2000/svg">
    <filter id="custom">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feComponentTransfer>
        <feFuncA tableValues="0 .7" type="table"></feFuncA>
      </feComponentTransfer>
    </filter>
  </svg>';

  @include svg-filter($svgStr, "custom");
}
```


## Configuration

```scss
// Default settings.
$filters-defaults: (
  data-type: "raw",  // Encoding of the SVG filters as data URI: raw | escaped | base64
  ie-support: true   // Whether to add IE proprietary filters or not
);
```
Override default values in a new `$filters-settings` map.



## Browser support

Work in progress...

CSS Filter Effects  
Chrome 18.0+ Safari 6.0+ Opera 15.0+  

SVG effects for HTML  
Firefox 3.5+  

Microsoft Extensions to CSS  
filter IE 6, 7, 8  
-ms-filter IE 8, 9  



## Requirements

* Sass ~> 3.3.0



## Install

#### Git

```
git clone git@github.com:pascalduez/SassyFilters.git
```

#### npm

```
npm install sassyfilters --save
```


## Usage

*Provided that [path] = path to SassyFilters*

#### Example usage with vanilla [Sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass)
```css
@import 'SassyFilters';
```
```
bundle exec sass --watch --load-path [path]/dist --require [path]/lib/helpers.rb input:output
```

#### Example usage with [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)

```js
sass: {
  options: {
    bundleExec: true, // Optional usage of Bundler, but recommended.
    require: ['[path]/lib/helpers.rb'],
    loadPath: ['[path]/dist/_SassyFilters.scss']
  }
}
```



## Roadmap

* More IE support trough behaviors



## Development

### You need

* [Node.js](http://nodejs.org)
* [Ruby](https://www.ruby-lang.org)
* [Bundler](http://bundler.io) via `gem install bundler`
* `grunt-cli` via `npm install -g grunt-cli`

### How to

  1. Fork this repository
  2. Run `npm install`
  3. Make your changes + write tests
  4. `grunt test`
  5. Commit + Pull request



## Authors

[Pascal Duez](http://pascalduez.me)



## Licence

SassyFilters is available under the [MIT](http://opensource.org/licenses/MIT) license.
