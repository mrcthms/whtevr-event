# whtevr-evt

> The lazy loading library that just doesn't care.

This is a fork of @callumacrae's whtevr library (which lazy loads images on
scroll), where images can be lazyloaded by a simple event, such as `click`,
`mouseover`, `play`, etc. on an element with a chosen CSS selector.

It relies on jQuery.

## Installation

```
$ npm install --save whtevr-evt
```

## Usage

Put everything in a noscript tag with the class "js-whtevr-evt":

```html
<noscript class="js-whtevr-evt" data-evt="click" data-selector="[data-js='load-js-content']">
	<img src="..." srcset="...">
</noscript>
```

Whenever an event matching the `data-evt` attribute on each `.js-whtevr-evt`
element is triggered on an element with a selector matching the `data-selector`
attribute, the content will load.

If you fail to specify a `data-evt` attribute, it will assume a `click` event
and listen for that.

If you fail to specify a `data-selector` attribute, then the code will not run
as this module is designed to work with events on particular elements.

An event will be fired when it is loaded:

```js
$('.js-whtevr-evt').on('whtevr-loaded', function (e, $el) {
	picturefill({
		elements: $el.toArray()
	});
});
```

## License

Released under the MIT license.
