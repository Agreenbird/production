// window.onload = function(){
//     $().getId('member').hover(function(){
//        $(this).css('background','url(./images/up.png) no-repeat  60px center')
//         $().getTagName('ul').show();
//     },function(){
//         $(this).css('background','url(./images/down.png) no-repeat  60px center')
//         $().getTagName('ul').hide();
//     })

//     var login = $().getId('loginBox');
//     login.center(250,250);
       
//     $().resize(function(){
//         login.center(250,250);
//         if(login.css('display')=='block'){
//             screen.lock();
//         }
       
//     })
//     $().getId('login').click(function(){
//         login.css('display','block');
//         $().getId('screen').lock();
//     })
//     $().getId('close').click(function(){
//         login.css('display','none');
//         $().getId('screen').unlock();
//     })

//     var oDiv = document.getElementById('loginBox');
//     oDiv.onmousedown = function(e){

//         var e=getEvent(e);
//         var diffX = e.clientX - oDiv.offsetLeft;
//         var diffY = e.clientY - oDiv.offsetTop; 
//         document.onmousemove = function(e){
//             var e=getEvent(e);
//             oDiv.style.left = e.clientX - diffX + 'px';
//             oDiv.style.top = e.clientY - diffY + 'px';

//         }
//         document.onmouseup = function(){
//             document.onmousemove = null;
//             document.onmouseup = null;
//         }
//     }
 
// }

