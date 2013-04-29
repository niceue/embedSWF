## embedSWF
Simple, modern Flash dynamic embedding scheme.


## Usage

1. Put `embedSWF.js` & `expressInstall.swf` in the same folder.


2. Include `embedSWF.js`:
``` html
    <script type="text/javascript" src="path/to/embedSWF.js"></script>
```


3. Embed a flash:
``` js
    embedSWF('someId', {
        src: 'path/to/flash.swf',
        width: 640,
        height: 320
    });
```


4. Remove a flash you have embeded:
``` js
    embedSWF.remove('someId');
```

## Browser Support

  * IE6+
  * Chrome
  * Safari 4+
  * Firefox 3.5+
  * Opera

## Bugs / Contributions
- [Report a bug](https://github.com/niceue/embedSWF/issues)
- To contribute or send an idea, github message me or fork the project

## Build
embedSWF use [UglifyJS2](https://github.com/mishoo/UglifyJS) 
you should have installed [nodejs](nodejs.org) and run `npm install uglify-js -g`.

On Windows, you can run `build.bat` from root directory and it will package `embedSWF.debug.js` into `embedSWF.js`.

  
## License

embedSWF is available under the terms of the [MIT License](https://github.com/niceue/embedSWF/blob/master/LICENSE.txt).
