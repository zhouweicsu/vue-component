import Dialog from '../../src/dialog'
import Vue from 'vue'

document.querySelector("#confirm").addEventListener("click",function(){
    Dialog.confirm('确定删除这个应用嘛？<p style="color:#999;">警告：一旦删除，不可恢复</p>',function(result){
        alert(`您点击了${result}按钮`);
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
},false);

new Vue({
    el: 'body',
    methods: {
        openDialog: function() {
            this.$refs.d1.show();
        }
    }
});

