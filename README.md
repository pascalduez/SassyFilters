# SassyFilters

Cross-Browser configurable CSS-SVG filters.

##

`blur($radius: 0px)`  
`brightness($value: 1)`  
`contrast($value: 1)`  
`drop-shadow($offset-x: 0px, $offset-y: $offset-x, $blur-radius: 0px, $spread-radius: 0px, $color: #000)`  
`grayscale($value: 0)`  
`hue-rotate($angle: 0deg)`  
`invert($value: 0)`  
`opacity($value: 1)`  
`saturate($value: 1)`  
`sepia($value: 1)`  


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
bower install sassyfilters --save
```

#### npm

```
npm install SassyFilters --save
``` 

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
