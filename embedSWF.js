/*! embedSWF 1.0.0
* (c) 2013 Jony Zhang <zj86@live.cn>, MIT Licensed
* https://github.com/niceue/embedSWF/
*/
(function(e,t){"function"==typeof define&&define.amd||e.seajs?define(t):t()})(this,function(){function e(a,i){var g,b,m,y,w="",v={type:h,width:"100%",height:"100%"},j={wmode:"transparent",menu:!1,allowScriptAccess:"always"};if(!i&&a&&(i=a,a=null),"[object Object]"===Object.prototype.toString.call(i)&&i.src){if(a&&(b=r.getElementById(a)),function(e){for(var t,n=e.length,a={};n--;)a[e[n]]=1;for(t in i)a[t]?v[t]=i[t]:j[t]=i[t]}(l.split(" ")),u){if(w=n(v,j),parseFloat(i.version||p)>u){if(f)return;y=2,d=w,v.id=c,m=i.base||e.base||"",m&&"/"!==m.slice(-1)&&(m+="/"),j.src=m+o,!/%$/.test(v.width)&&310>parseInt(v.width,10)&&(v.width="310"),!/%$/.test(v.height)&&137>parseInt(v.height,10)&&(v.height="137"),g="MMredirectURL="+location.href+"&MMplayerType="+(s?"ActiveX":"PlugIn")+"&MMdoctitle="+encodeURIComponent(r.title.slice(0,47)+" - Flash Player Installation"),j.flashvars=j.flashvars?j.flashvars+"&"+g:g,w=n(v,j),f=!0}}else b&&b.firstChild||(w=t(v)),y=1;return b&&w&&(b.innerHTML=w),y&&"function"==typeof i.fallback&&i.fallback(y),w}}function t(e){var t=e.width,n=e.height,a="number"==typeof t?t+"px":t,i="number"==typeof n?n+"px":n;return'<a target="_blank" href="//www.adobe.com/go/getflash"><span style="display:block;cursor:pointer;background:#EFEFEF url(//www.adobe.com/images/shared/download_buttons/get_flash_player.gif) center center no-repeat;width:'+a+";height:"+i+';" title="Get Adobe Flash player">'+"</span></a>"}function n(e,t){var n,i="";if(s){e.data=t.src,i+="<object"+a(e)+">";for(n in t)i+='<param name="'+n+'" value="'+t[n]+'">';i+="</object>"}else i+="<embed"+a(t)+a(e)+">";return i}function a(e){var t,n="";for(t in e)n+=" "+t+'="'+e[t]+'"';return n}function i(e){"string"==typeof e&&(e=r.getElementById(e).firstChild),e&&e.tagName&&(s&&"OBJECT"===e.tagName?(e.style.display="none",function(){if(4==e.readyState){for(var t in e)"function"==typeof e[t]&&(e[t]=null);e.parentNode.removeChild(e)}else setTimeout(arguments.callee,15)}()):e.parentNode.removeChild(e),f=!1)}var r=document,s=!!window.ActiveXObject,l="width height name id class style title type align tabindex usemap",o="expressInstall.swf?"+ +new Date,c="ExpressInstall",f=!1,d="",p="9,0,28,0",h="application/x-shockwave-flash",u=function(){var e,t,n="ShockwaveFlash";if(s)try{e=new ActiveXObject(n+"."+n).GetVariable("$version"),e&&(e=e.split(" ")[1].split(",").join("."))}catch(a){}else t=navigator.plugins["Shockwave Flash"],"object"==typeof t&&(e=t.description.split(" ")[2]);return parseFloat(e)}();return e.destroy=i,e.flashVersion=u,e.base=function(){for(var e,t=r.getElementsByTagName("script"),n=t.length,a=/embedSWF(?:\.debug)?\.js/i;n--;)if(e=t[n].src,a.test(e))return e.split("/").slice(0,-1).join("/")||"";return""}(),e.callback=function(){if(f){var e=r.getElementById(c),t=e.parentNode;i(e),t.innerHTML=d,d="",f=!1}},window.embedSWF=e});