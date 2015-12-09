<template id="dialog">
<div class="dialog-wrap">
    <div class="dialog public-dialog">
        <div class="dialog-hd" v-if="title">
            {{title}}
            <a class="fa fa-times close" @click="closeDialog"></a>
        </div>
        <div class="dialog-bd">
            <div>
                <div class="msg-wrap">
                    <slot></slot>
                    <i class="fa fa-exclamation-triangle icon icon-warn" v-if="type == 'warn'"></i> 
                    <i class="fa fa-exclamation-triangle icon icon-confirm" v-if="type == 'confirm'"></i>
                    <span v-if="type != 'dialog'">{{msg}}</span>
                </div>
                <div class="btn-wrap" v-if="type != 'dialog'">
                    <a href="javascript:void(0)" class="btn btn-primary dialog-confirm" @click="confirmOk">确定</a>
                    <a href="javascript:void(0)" class="btn btn-default dialog-cancel" @click="confirmCancel" v-if="type == 'confirm'">取消</a>
                </div>
            </div>
        </div>
    </div>
    <div class="dialog-mask" data-count="0"></div>
</div>
</template>


<script>
    import Vue from 'vue'
    export default {
        props: {
            type: {
                default : 'confirm'
            },
            title: "",
            msg: "",
            showMask: {
                default : true
            }
        },
        template: "#dialog",
        methods: {
            setup () {
               var me = this;

               this.$element = $(".dialog");
               this.element = this.$element[0];
               this.$mask = $(".dialog-mask");

               this._centerDialog();
               //this._bindEvents();

            },
            _centerDialog () {
               var header = this.$element.find('.dialog-hd');
               header.css('width', 0);
               var w = this.$element.width();
               var h = this.$element.height();
               this.$element.css({
                       'margin-left': '-' + w / 2 + 'px',
                       'margin-top': '-' + h / 2 + 'px'
                       });
               header.css('width', w); // hack: fix ie7 bug
            },
            _closeDialog () {
                $(".dialog-wrap").parent().hide();
            },
            _removeDialog () {
                $(".dialog-wrap").parent().remove();
            },
            confirmOk () {
                this.$dispatch("okEvent");
                this._removeDialog();
            },
            confirmCancel () {
                this.$dispatch("cancelEvent");
                this._removeDialog();
            },
            closeDialog () {

                    this._removeDialog();
            }
        },
        ready () {
            this.setup();
        }
    }
</script>

































