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