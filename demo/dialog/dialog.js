import Dialog from '../../src/dialog/dialog.js'

document.querySelector("#confirm").addEventListener("click",function(){
    Dialog.confirm('确定删除这个应用嘛？',function(){
        alert('您点击了确定按钮');
    },function(){
        alert('您点击了quxiao按钮');
    });
},false);

document.querySelector("#warn").addEventListener("click",function(){
    Dialog.warn('警告 - warn',function(){
        alert('warning');
    });
},false);

document.querySelector("#alert").addEventListener("click",function(){
    Dialog.alert('alert');
},false);

document.querySelector("#dialog").addEventListener("click",function(){
    Dialog.dialog({
        title: 'Dialog', 
        bodyEl: '#dialogContent'
    });
},false);

