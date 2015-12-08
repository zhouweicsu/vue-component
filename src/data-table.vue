<template>
    <slot></slot>
    <pagination :total="total" :pn="pn" :ps="ps" @updatepage="getPageData"></pagination>
</template>

<script type="text/javascript">
    import Vue from 'vue'
    import Pagination from './pagination.vue'
    import Resource from 'vue-resource'

    Vue.use(Resource);

    export default {
        props: {
            url: {
                required: true
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
            getPageData (pn) {
                this.pn = pn;
                var resource = this.$resource(this.url + (/\?/.test(this.url) ? '&' : '?') + 'pn=' + pn + '&ps=' + this.ps);
                // GET request
                resource.get({}, function (data, status, request) {
                    if(data.errno){
                        alert(data.errmsg);
                        this.$parent.$set('list', []);
                        this.total = 0;
                        return false;
                    }
                    this.$parent.$set('list', data.list);
                    this.total = data.total;
                }).error(function (data, status, request) {
                    // handle error
                    this.$parent.$set('list', []);
                    this.total = 0;
                })
            },
            refresh () {
                this.getPageData(this.pn);
            }
        },
        events: {
            needupdate () {
                //如果在最后一页删除最后一个，再次请求pn=本页就会出现错误，需要pn-1，请求上一页直到0
                if(this.pn > 0 && this.total <= this.ps * (this.pn + 1)){
                    this.pn = this.pn - 1;
                }
                this.refresh();
            }
        }
    }

</script>

