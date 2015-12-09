<template id="dialog">
    <div class="dialog">
        <div class="dialog-hd" v-if="title">
            {{title}}
            <a class="fa fa-times close"></a>
        </div>
        <div class="dialog-bd">
            <slot></slot>
            <div>
                <div class="msg-wrap">
                    <i class="fa fa-exclamation-triangle icon icon-warn"></i> 
                    <i class="fa fa-exclamation-triangle icon icon-confirm"></i>
                    <span>{{msg}}</span>
                </div>
                <div class="btn-wrap">
                    <a href="javascript:void(0)" class="btn btn-primary dialog-confirm" @click="_confirmOk">确定</a>
                    <a href="javascript:void(0)" class="btn btn-default dialog-cancel" @click="_confirmCancel" v-if="type == 'confirm'">取消</a>
                </div>
            </div>
        </div>
    </div>
    <div class="dialog-mask" data-count="0"></div>
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
            showDialog () {
                console.log(this);
            },
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
                $(".dialog").parent().hide();
            },
            _removeDialog () {
                $(".dialog").parent().remove();
            },
            _confirmOk () {
                this._removeDialog();
            },
            _confirmCancel () {
                this._removeDialog();
            }
        },
        ready () {
            this.setup();
        }
    }
</script>

































