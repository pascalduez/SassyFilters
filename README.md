# SassyFilters

Cross-Browser configurable CSS-SVG filters.

## Filters

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

Work in progress...

#### Git

```
git clone git@github.com:pascalduez/SassyFilters.git && cd SassyFilters
```

#### Bower

```
bower install SassyFilters --save
```

#### npm

```
npm install sassyfilters --save
```
## Roadmap

* Multi filters mixin
* Custom SVG filters mixin
* More IE support trough behaviors

## Development

### You need

* [NodeJS](http://nodejs.org)
* [Ruby](https://www.ruby-lang.org)
* [Bundler](http://bundler.io) via `gem install bundler`
* `grunt-cli` via `npm install -g grunt-cli`

### How to

  1. Fork this repository
  2. Run `npm install`
  4. Make your changes + write tests
  3. `grunt test`
  3. `grunt dist`
  5. Commit + Pull request
