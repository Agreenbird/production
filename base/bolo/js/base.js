// var $ = function(){
//     return new Base;
// }

// function Base(){
//     this.elements = [];
//     this.getId = function(id){
//         this.elements.push(document.getElementById(id));
//         return this;
//     };
//     this.getTagName = function(tag){
//         var tags = document.getElementsByTagName(tag);
//         for(var i=0; i<tags.length; i++){
//             this.elements.push(tags[i]);
//         }
//         return this;
//     }

// }

// Base.prototype.css = function(attr,value){
//     for(var i=0; i<this.elements.length; i++){
//         this.elements[i].style[attr] = value;

//     }
//     return this;
// }
// Base.prototype.html = function(str){
//     for(var i=0; i<this.elements.length; i++){
//         this.elements[i].innerHTML = str;
//     }
//     return this;
// }

// Base.prototype.click = function(fn){
//     for(var i=0; i<this.elements.length; i++){
//         this.elements[i].onclick = fn;
//     }
//     return this;
// }

// 前台调用
var $ = function(){
    return new Base;
}
// 类库
function Base(){
    this.elements = [];
    this.getId = function(id){
        this.elements.push(document.getElementById(id));
        return this;
    };
    this.getTagName = function(tag){
        var tags = document.getElementsByTagName(tag);
        for(var i=0; i<tags.length; i++){
            this.elements.push(tags[i]);
        }
        return this;
    }
    this.getClass = function(className,idName){
        var node = null;
        if(arguments.length == 2){
            node = document.getElementById(idName);
        }else{
            node = document;
        }
        var all = node.getElementById(idName).getElementsByTagName('*');

        for(var i=0; i<all.length ; i++){
            if(all[i].className == className){
                this.elements.push(all[i]);
            }
        }
        return this;
    }

}
// 设置css方法
Base.prototype.css = function(attr,value){
    for(var i=0; i<this.elements.length; i++){
        if(arguments.length == 1){
            if(typeof window.getComputedStyle !='undefined'){
                return window.getComputedStyle(this.elements[i],null)[attr];
            }else if(typeof this.elements[i].currentStyle != 'undefined'){
                return this.elements[i].currentStyle[attr];
            }
           
        }else{
            this.elements[i].style[attr] = value;
        }
    }
    return this;
}
Base.prototype.html = function(str){
    for(var i=0; i<this.elements.length; i++){
        if(arguments.length == 0){
            return this.elements[i].innerHTML;
        }else{
            this.elements[i].innerHTML = str;
        }
        
    }
    return this;
}

Base.prototype.click = function(fn){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].onclick = fn;
    }
    return this;
}

Base.prototype.getElement = function(num){
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
    
}
//hover 方法
Base.prototype.hover = function(over,out){
    for (var i=0; i<this.elements.length; i++){
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
}
//显示
Base.prototype.show = function(){
    for (var i=0; i<this.elements.length; i++){
        this.elements[i].style.display = 'block';
       
    }
    return this;
}
//隐藏
Base.prototype.hide = function(){
    for (var i=0; i<this.elements.length; i++){
        this.elements[i].style.display = 'none';
       
    }
    return this;
}
//位置居中
Base.prototype.center = function(width,height){

    for (var i=0; i<this.elements.length; i++){
        this.elements[i].style.top = (document.documentElement.clientHeight-height)/2-20+'px';
        this.elements[i].style.left = (document.documentElement.clientWidth-width)/2-20+'px';
    }
    return this;
}
//触发浏览器窗口事件
Base.prototype.resize = function(fn){
    window.onresize = fn;
    return this;
}
//锁屏功能
Base.prototype.lock = function(){
    for (var i=0; i<this.elements.length; i++){
        this.elements[i].style.height = document.documentElement.clientHeight+'px';
        this.elements[i].style.width = document.documentElement.clientWidth+'px';
        this.elements[i].style.display = 'block';
        document.documentElement.style.overflow = 'hidden';

    }
    return this;
}
Base.prototype.unlock = function(){
    for (var i=0; i<this.elements.length; i++){
       this.elements[i].style.display = 'none';
       document.documentElement.style.overflow = 'hidden';
    }
    return this;
}
//跨浏览器获取视口大小
function getInner(){
    if(typeof window.innerWidth !='undefined'){
        return {
            width:window.innerWidth,
            height:window.innerHeight,
        }
    }else{
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight,

        }
    }
}
//判断css是否存在
function hasClass(element,className){
    return element.className.match(new RegExp('(\\s|^)' +className+ '(\\s|$)'));
}
//获取event对象
function getEvent(event){
    return event||window.event;
}
//拖拽功能
Base.prototype.drag = function(){
    for (var i=0; i<this.elements.length; i++){
        this.elements[i].onmousedown = function(e){

            var e=getEvent(e);
            var diffX = e.clientX - this.elements[i].offsetLeft;
            var diffY = e.clientY - this.elements[i].offsetTop; 
            document.onmousemove = function(e){
                var e=getEvent(e);
                this.elements[i].style.left = e.clientX - diffX + 'px';
                this.elements[i].style.top = e.clientY - diffY + 'px';
    
            }
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
    return this;
}
//阻止默认行为
function preDef(event) {
    var e = getEvent(event);
    if(typeof e.preventDefault != 'undefined'){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }

}
//跨浏览器事件绑定
// function addEvent(obj,type,fn){
//     if(typeof obj.addEventListener != 'undefined'){
//         obj.addEventListener(type,fn,false);
//     }else if(typeof obj.attachEvent != 'undefined'){
//         obj.attachEvent('on'+ type,fn);
//     }
// }
function addEvent(obj,type,fn){
    if(typeof obj.addEventListener != 'undefined'){
        obj.addEventListener(type,fn,false);
    }else {
        if(!obj.events)obj.events = {};
        if(!obj.events[type]){
            obj.events[type]=[];
            if(obj['on'+type])obj.events[type][0]=fn;
        }
        obj.events[type][addEvent.ID++] = fn;
        obj['on'+ type] = addEvent.exec;
        }
    }

addEvent.ID = 1;
//执行事件处理函数
addEvent.exec = function(){
    for (var i in this.events[type]){
        this.events[type][i]();
    }
}
//跨浏览器删除事件
function removeEvent(obj,type,fn){
    if(typeof obj.removeEventListener != 'undefined'){
        obj.removeEventListener(type,fn,false);
    }else if(typeof obj.detachEvent != 'undefined'){
        obj.detachEventListener('on'+ type,fn);
    }
}
//浏览器检测
(function(){
    window.sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s=ua.match(/msie([\d.]+)/))?sys.ie = s[1]:
    (s=ua.match(/firefox\/([\d.]+)/))?sys.firefox = s[1]:
    (s=ua.match(/chrome\/([\d.]+)/))?sys.chrome = s[1]:
    (s=ua.match(/opera.*version\/([\d.]+)/))?sys.opera = s[1]:
(s=ua.match(/version\/([\d.]+).*safari/))?sys.safari = s[1]:0;
console.log(s);

})();

//跨浏览器获取style
function getStyle(element,attr){
    var value;
    if(typeof window.getComputedStyle != 'undefined'){
        value = parseInt(window.getComputedStyle(element,null)[attr]);
    }else if(typeof element.currentStyle != 'undefined'){
        value = parseInt(element.currentStyle[attr]);
    }
    return value;

}
//动画封装
Base.prototype.animate = function(attr,step,target,t){
    for(var i=0; i<this.elements.length; i++){
        var element = this.elements[i];
        var timer = setInterval(function(){
            element.style[attr] = getStyle(element,attr) + step + 'px';
            if(getStyle(element,attr)==target)clearInterval(timer);
        },t);
    }
    return this;
}
