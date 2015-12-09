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

Dialog.confirm = function(msg) {
    var wrap = Dialog._domWrap();
    $(wrap).html('<dialog type="confirm" msg="' + msg + '" ></dialog>');
    var d = new Vue({
        el: wrap
    });
}

Dialog.alert = function(msg) {
    var wrap = Dialog._domWrap();
    $(wrap).html('<dialog type="alert" msg="' + msg + '" ></dialog>');
    var d = new Vue({
        el: wrap
    });
}

Dialog.dialog = function(msg) {
    var wrap = Dialog._domWrap();
    $(wrap).html('<dialog type="dialog" msg="' + msg + '" ></dialog>');
    var d = new Vue({
        el: wrap
    });
    /*
    d.on('close', function() {
        d.destroy();
    });
    d.show();
    */
}

export default Dialog;
