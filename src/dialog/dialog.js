import Vue from 'vue'
import Dialog from './_dialog.vue'

Vue.component('dialog', Dialog);

var template = `
    <dialog type="confirm" visible="true">
        <div class="msg-wrap">
            <i class="fa fa-exclamation-triangle icon icon-warn" v-if="type == 'warn'"></i>
            <i class="fa fa-exclamation-triangle icon icon-confirm" v-if="type == 'confirm'"></i>
            <span>{{msg}}</span>
        </div>
        <div class="btn-wrap">
            <a href="javascript:void(0)" class="btn btn-primary dialog-confirm" @click="onclicked(true)">确定</a>
            <a href="javascript:void(0)" class="btn btn-default dialog-cancel" @click="onclicked(false)" v-if="type == 'confirm'">取消</a>
        </div>
    </dialog>
`;

var openDialog = function(type, msg, callback) {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var vm = new Vue({
        el: container,
        replace: false,
        template: template,
        data: {
            msg: msg,
            type: type
        },
        methods: {
            onclicked(result) {
                callback && callback(result);
                document.body.removeChild(container);
                vm.$destroy();
            }
        }
    });
}

Dialog.confirm = function(msg, callback) {
    openDialog('confirm', msg, callback);
}

Dialog.warn = function(msg, callback) {
    openDialog('warn', msg, callback);
}

Dialog.alert = function(msg, callback) {
    openDialog('alert', msg, callback);
}

export default Dialog;
