import Vue from 'vue'
import Dialog from '../src/_dialog.vue'

Vue.component('dialog', Dialog);

Dialog._domWrap = function() {
    var id = "dialog" + (new Date()).getTime();
    var div = document.createElement('div');
    div.id = id;
    document.body.appendChild(div);
    return div;
}

Dialog.confirm = function(msg,okFn,cancelFn) {
    var wrap = Dialog._domWrap();
    var d = new Vue({
        el: wrap,
        replace: false,
        template: `
            <dialog type="confirm" msg="${msg}" ></dialog>
        `,
        events: {
            okEvent: function(){
                if(okFn){
                    okFn();
                }
            },
            cancelEvent: function(){
                if(cancelFn){
                    cancelFn();
                }
            }
        }
    });
}

Dialog.warn = function(msg,okFn) {
    var wrap = Dialog._domWrap();
    var d = new Vue({
        el: wrap,
        replace: false,
        template: `
            <dialog type="warn" msg="${msg}" ></dialog>
        `,
        events: {
            okEvent: function(){
                if(okFn){
                    okFn();
                }
            }
        }
    });
}

Dialog.alert = function(msg) {
    var wrap = Dialog._domWrap();
    var d = new Vue({
        el: wrap,
        replace: false,
        template: `
            <dialog type="alert" msg="${msg}" ></dialog>
        `,
        events: {
            okEvent: function(){},
            cancelEvent: function(){}
        }
    });
}


/*
* configObj - 配置参数
* {
*   title: dialogTile,
*   bodyEl: dialogContent Element
* }
*
* */
Dialog.dialog = function(configObj) {
    var config = configObj || {title: '', bodyEl: ''};

    var $bodyEl = document.querySelector(config.bodyEl);
    var slot;
    if(!$bodyEl){
        slot = '<span>请输入dialog content element</span>';
    } else {
        var $temporary = document.createElement('div');
        $bodyEl.style.display = "block";
        $temporary.appendChild($bodyEl);
        slot = $temporary.innerHTML;
    }
    var wrap = Dialog._domWrap();
    var d = new Vue({
        el: wrap,
        replace: false,
        template: `
            <dialog type="dialog" title="${config.title}">${slot}</dialog>
        `,
        events: {
            okEvent: function(){},
            cancelEvent: function(){}
        }
    });
}

export default Dialog;
