import Vue from 'vue'
import Dialog from './_dialog.vue'

Vue.component('dialog', Dialog);

var template = `
    <dialog type="confirm" visible="true">
        <div class="msg-wrap">
            <i class="fa fa-exclamation-triangle icon icon-warn" v-if="type == 'warn'"></i>
            <i class="fa fa-exclamation-triangle icon icon-confirm" v-if="type == 'confirm'"></i>
            <span v-if="options.safe">{{{msg}}}</span>
            <span v-else>{{msg}}</span>
        </div>
        <div class="btn-wrap">
            <a href="javascript:void(0)" class="btn btn-primary dialog-confirm" @click="onclicked(true)" id="dialogBtnDefault">确定</a>
            <a href="javascript:void(0)" class="btn btn-default dialog-cancel" @click="onclicked(false)" v-if="type == 'confirm'">取消</a>
        </div>
    </dialog>
`;

var openDialog = function(type, msg, callback, options) {
    options = options || {};
    var container = document.createElement('div');
    document.body.appendChild(container);
    var vm = new Vue({
        el: container,
        replace: false,
        template: template,
        data: {
            msg: msg,
            type: type,
            options: {
                safe:  options.safe || false
            }
        },
        methods: {
            onclicked(result) {
                callback && callback(result);
                document.body.removeChild(container);
                vm.$destroy();
            }
        },
        ready(){
            var btn = this.$el.querySelector('#dialogBtnDefault');
            btn.focus();
        }
    });
}

Dialog.confirm = function(msg, callback, options) {
    openDialog('confirm', msg, callback, options);
}

Dialog.warn = function(msg, callback, options) {
    openDialog('warn', msg, callback, options);
}

Dialog.alert = function(msg, callback, options) {
    openDialog('alert', msg, callback, options);
}

export default Dialog;
