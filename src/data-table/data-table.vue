<template>
    <slot></slot>
    <pagination v-if="needpagination" :total="total" :pn="pn" :ps="ps" @updatepage="getPageData"></pagination>
</template>

<script>
    import Vue from 'vue'
    import Pagination from '../pagination/pagination.vue'
    import Resource from 'vue-resource'

    Vue.use(Resource);

    export default {
        props: {
            //请求数据的Ajax URL
            url: {
                required: true
            },
            //处理返回数据
            datafilter : {
                type: Function
            },
            //配置是否需要分页
            needpagination: {
                default: true
            },
            //Table表格数据列表
            list: {
                default: []
            }
        },
        data () {
            return {
                total: 0,
                ps: 20,
                pn: 0
            }
        },
        ready () {
            this.$watch('url', () => this.getPageData(0));
            this.getPageData(0);
        },
        components: {
            'pagination': Pagination
        },
        methods: {
            /**
             * Ajax获取Table数据
             * pn: 页码，根据页码获取该页数据
             * ajax 请求返回的数据格式若如下，则可不传datafilter处理函数：
             * {
             *      errno:0,
             *      errmsg:'',
             *      total:100,
             *      list:[]
             * }
             */
            getPageData (pn) {
                var me = this;
                me.pn = pn; //设置组件Pagination的当前页码
                var params = me.needpagination ? `${/\?/.test(me.url) ? '&' : '?'}pn=${pn}&ps=${me.ps}` : '';
                var resource = me.$resource(me.url + params);
                resource.get(function (data, status, request) {
                    if (typeof me.datafilter === 'function') {  //若传入数据处理函数，则处理该数据
                        data = me.datafilter(data);  //数据处理函数返回的数据需满足上面的格式
                    }
                    if(data.errno){
                        alert(data.errmsg);
                        me.list = [];
                        me.total = 0;
                        return false;
                    }
                    //规避错误：若在最后一页只有一条数据且将其删除，再次请求当前页就会出现错误，此时需要pn-1，请求上一页直到0
                    if(me.pn > 0 && data.total <= me.ps * me.pn){
                        me.pn = me.pn -1;
                        me.refresh();
                    }
                    me.list = data.list || [];
                    me.total = data.total || 0;
                }).error(function (data, status, request) {
                    me.list = [];
                    me.total = 0;
                })
            },
            /**
             * 刷新当前页
             */
            refresh () {
                this.getPageData(this.pn);
            }
        },
        events: {
            needupdate () {
                this.refresh();
            }
        }
    }
</script>

<style lang="sass" src="./data-table.scss"></style>
