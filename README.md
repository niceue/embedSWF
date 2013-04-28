##embedSWF
简单，现代化的Flash动态嵌入方案.

### 引入

	<script type="text/javascript" src="embedSWF.js></script>

### 嵌入

``` js
embedSWF('someId', {
    src: 'path/to/flash.swf',
    width: 640,
    height: 320
});
```

### 移除

``` js
embedSWF.remove('someId');
```

##Browser Support

  * IE6+
  * Chrome
  * Safari 4+
  * Firefox 3.5+
  * Opera

  
##License

embedSWF is available under the terms of the [MIT License](https://github.com/niceue/embedSWF/blob/master/LICENSE.txt).