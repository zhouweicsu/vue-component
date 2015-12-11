<template id="dialog">
<div class="dialog-box" :style="{display: visible ? 'block' : 'none'}">
    <div class="dialog public-dialog">
        <div class="dialog-hd" v-if="title">
            {{title}}
            <a class="fa fa-times close" @click="hide"></a>
        </div>
        <div class="dialog-bd">
            <slot></slot>
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
                default : 'dialog'
            },
            title: "",
            msg: "",
            visible: false
        },
        template: "#dialog",
        methods: {
            _centerDialog () {
                var elem = this.$el.querySelector('.dialog');
                var w = elem.offsetWidth;
                var h = elem.offsetHeight;
                elem.style.marginLeft = '-' + w / 2 + 'px';
                elem.style.marginTop = '-' + h / 2 + 'px';
            },
            _removeDialog () {
                this.$el.parentNode.removeChild(this.$el);
                //TODO: remove event handlers
            },
            show () {
                this.visible = true;
                Vue.nextTick(this._centerDialog);
            },
            hide () {
                this.visible = false;
            }
        },
        created () {
            this.$watch('visible', function(){
                this.visible && Vue.nextTick(this._centerDialog);
            });
        },
        ready() {
            this._centerDialog();
        },
        destroy() {
            this._removeDialog();
        }
    }
</script>

<style lang="sass" src="./dialog.scss"></style>
