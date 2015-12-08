<template>
    <div class="dialog">
        <div class="dialog-hd">
            {{config.title}}
            <a class="fa fa-times close"></a>
        </div>
        <div class="dialog-bd">
            <slot></slot>
            <div class="dialog-type-{{config.type}}">
                <div class="msg-wrap">
                    <i class="fa fa-exclamation-triangle icon icon-warn"></i> 
                    <i class="fa fa-exclamation-triangle icon icon-confirm"></i>
                    <span>{{config.msg}}</span>
                </div>
                <div class="btn-wrap">
                    <a href="###" class="btn btn-primary dialog-confirm">确定</a>
                    <a href="###" class="btn btn-default dialog-cancel">取消</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            config: {
                default () {
                    return {
                        type: 'confirm',
                        title: '应用',
                        msg: 'ni que ding ma ?'
                    }
                }
            }
        }
    }
</script>

