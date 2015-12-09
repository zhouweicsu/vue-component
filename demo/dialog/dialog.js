import Dialog from '../../src/dialog.js'
import './dialog.scss'


$("#confirm").bind("click",function(){
    Dialog.confirm('1111111');
});

$("#alert").bind("click",function(){
    Dialog.alert('1111111');
});

$("#dialog").bind("click",function(){
    Dialog.dialog('1111111');
});

