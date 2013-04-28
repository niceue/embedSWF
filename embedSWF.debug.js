/*! embedSWF 1.0.0
* (c) 2013 Jony Zhang <zj86@live.cn>, MIT Licensed
* https://github.com/niceue/embedSWF/
*/
var embedSWF = (function () {

    var doc = document,
        isIE = !!window.ActiveXObject,
        ATTRIBUTES = "width height name id class style title type align tabindex usemap",
        EXPRESS_INSTALL = "expressInstall.swf?_=" + (+new Date()),
        EXPRESS_INSTALL_ID = 'ExpressInstall',
        isExpressInstallActive = false,
        cacheHTML = '',
        MIN_VERSION = "9,0,28,0",
        Flash_TYPE = "application/x-shockwave-flash",
        FLASH_VERSION = (function(){
            var ver, SF = 'ShockwaveFlash', plug;
            if (isIE) {
                try {
                    ver = new ActiveXObject(SF + '.' + SF).GetVariable('$version');
                    if (ver) ver = ver.split(' ')[1].split(',').join('.');
                } catch(ex) {}
            } else {
                plug = navigator.plugins['Shockwave Flash'];
                if (typeof plug === 'object') ver = plug.description.split(' ')[2];
            }
            return parseFloat(ver);
        })();

    /** 生成Flash的HTML(只有src是必传的参数)
     @method: embedSWF
     @param:  {String} id   flash容器的id
     @param:  {Object} opt  参数, 包含src width height id class style align flashvars wmode allowScriptAccess ...
     @return: {String} HTML
     @usage:
        //嵌入
        embedSWF('someId', {
            src: 'path/to/flash.swf',
            width: 640,
            height: 320
        });
        //移除
        embedSWF.remove('someId');
    **/
    function embedSWF(id, opt){
        var html = '',
            fv,
            dom,
            base,
            attrs = {
                type: Flash_TYPE,
                width: '100%',
                height: '100%'
            },
            params = {
                wmode: 'transparent',
                menu: false,
                allowScriptAccess: 'always'
            };
            
        if (!opt && id) {
            opt = id;
            id = null;
        }
        if (Object.prototype.toString.call(opt) !== '[object Object]' || !opt.src) return;
        if (id) dom = doc.getElementById(id);

        (function(arr){
            var i=arr.length, key, obj = {};
            while (i--) {
                obj[ arr[i] ] = 1;
            }
            for (key in opt) {
                if (obj[key]) {
                    attrs[key] = opt[key];
                } else {
                    params[key] = opt[key];
                }
            }
        })(ATTRIBUTES.split(' '));
        
        //If the flash have not yet been installed.
        if (!FLASH_VERSION) {
            if (!dom || !dom.firstChild) html = placeholder(attrs);
        } else {
            html = createSWF(attrs, params);
            
            /* Show express Install
             * From SWFObject (https://github.com/swfobject/swfobject/blob/master/swfobject/src/swfobject.js)
             */
            if (parseFloat(opt.version || MIN_VERSION) > FLASH_VERSION) {
                if (isExpressInstallActive) return;
                cacheHTML = html;
                attrs.id = EXPRESS_INSTALL_ID;
                
                base = opt.base || embedSWF.base || '';
                if (base && base.slice(-1) !== '/') base += '/';
                params.src = base + EXPRESS_INSTALL;
                
                if (!/%$/.test(attrs.width) && parseInt(attrs.width, 10) < 310) {
                    attrs.width = "310";
                }
                if (!/%$/.test(attrs.height) && parseInt(attrs.height, 10) < 137) {
                    attrs.height = "137";
                }
                fv = "MMredirectURL=" + location.href +
                     "&MMplayerType=" + (isIE ? "ActiveX" : "PlugIn") +
                     "&MMdoctitle=" + encodeURIComponent(doc.title.slice(0, 47) + " - Flash Player Installation");
                params.flashvars = params.flashvars ? params.flashvars + '&' + fv : fv;
                
                html = createSWF(attrs, params);
                isExpressInstallActive = true;
            }
        }

        if (dom && html) dom.innerHTML = html;
        return html;
    }
    
    function placeholder(attrs){
        var aw = attrs.width,
            ah = attrs.height,
            w = typeof aw === 'number' ? aw + 'px' : aw,
            h = typeof ah === 'number' ? ah + 'px' : ah;
        return '<a target="_blank" href="//www.adobe.com/go/getflash">'+
        '<span style="display:block;cursor:pointer;background:#EFEFEF url(//www.adobe.com/images/shared/download_buttons/get_flash_player.gif) center center no-repeat;width:'+ w +';height:'+ h +';" title="Get Adobe Flash player">' +
        '</span></a>';
    }
    
    function createSWF(attrs, params){
        var html = '', key;
        if (isIE) {
            //对于IE，加上codebase参数才可以在没有安装flash的情况下自动提示安装ActiveX控件
            //attrs.codebase = "//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=" + MIN_VERSION;
            //IE6-8必须同时设置data属性和src参数(或者movie参数)
            attrs.data = params.src;
            html += '<object' + obj2attr(attrs) + '>';
            for (key in params) {
                html+='<param name="'+ key +'" value="'+ params[key] +'">';
            }
            html += '</object>';
            
        //现代浏览器用embed方式更好(Safari用object装载flash存在很多问题)
        } else {
            //Chrome自带flash10.0+，Firefox、Opera、Safari会自动提示用户安装，所以对于现代浏览器pluginpage参数不用设置
            html += '<embed' + obj2attr(params) + obj2attr(attrs) + '>';
        }
        return html;
    }
    
    function obj2attr(obj){
        var key, str = '';
        for (key in obj ) {
            str += ' ' + key + '="' + obj[key] + '"';
        }
        return str;
    }
    
    //安全移除flash
    function removeSWF(obj){
        if (typeof obj === 'string') {
            obj = doc.getElementById(obj).firstChild;
        }
        if (!obj || !obj.tagName) return;
        if ( !isIE || obj.tagName !== 'OBJECT' ) {
            obj.parentNode.removeChild(obj);
        } else {
            obj.style.display = "none";
            (function(){
                if (obj.readyState == 4) {
                    //移除相关引用，防止内存泄露
                    for(var i in obj) if (typeof obj[i] === "function") obj[i] = null;
                        
                    obj.parentNode.removeChild(obj);
                } else {
                    //正在加载中的flash不能直接移除，延时下重新执行
                    setTimeout(arguments.callee, 15);
                }
            })();
        }
        isExpressInstallActive = false;
    }
    
    embedSWF.remove = removeSWF;
    embedSWF.ua = {
        ie: isIE,
        pv: FLASH_VERSION
    };
    embedSWF.base = (function(){
        var scripts = doc.getElementsByTagName('script'),
            i = scripts.length,
            src,
            base,
            regex = /embedSWF(?:\.debug)?\.js/;
        while (i--) {
            src = scripts[i].src;
            if ( regex.test(src) ) {
                base = src.split('/').slice(0, -1).join('/');
                return base ? base+'/' : '';
            }
        }
        return '';
    })();
    embedSWF.callback = function(){
        if (isExpressInstallActive) {
            var dom = doc.getElementById(EXPRESS_INSTALL_ID),
                prt = dom.parentNode;
            removeSWF(dom);
            prt.innerHTML = cacheHTML;
            cacheHTML = '';
            isExpressInstallActive = false;
        }
    };
    //Public API
    return embedSWF;
})();