import Dialog from '../../src/dialog.js'
import './dialog.scss'


$("#confirm").bind("click",function(){
    //Dialog.confirm('确定删除这个应用嘛？');
    
    Dialog.confirm('确定删除这个应用嘛？',function(){
        alert('您点击了确定按钮');
    },function(){
        alert('您点击了quxiao按钮');
    });
});

$("#warn").bind("click",function(){
    Dialog.warn('警告 - warn',function(){
        alert('warning');
    });
});

$("#alert").bind("click",function(){
    Dialog.alert('alert');
});

$("#dialog").bind("click",function(){
    Dialog.dialog({
        title: 'Dialog', 
        bodyEl: '#dialogContent'
    });
});

