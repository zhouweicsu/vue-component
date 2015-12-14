<template lang="jade">
    .ui-pagination
        span.total
            | 共
            em {{total}}
            | 条
        span.pages(@click.prevent='go', v-show='pageCount > 1')
            a.ui-page(href='#', :class='{disabled: pn == 0}', data-page='{{pn-1}}') 上一页
            a.ui-page(href='#', :class='{current: pn == 0}', data-page='0') 1
            em.ui-page.ellipsis(v-show='spanRange[0] > 1') ⋯
            a.ui-page(v-for='n in spanRange', href='#', :class='{current: n == pn}', data-page='{{n}}') {{n+1}}
            em.ui-page.ellipsis(v-show='showEndEllipse') ⋯
            a.ui-page(href='#', :class='{current: pn == pageCount-1}', data-page='{{pageCount - 1}}') {{pageCount}}
            a.ui-page(href='#', :class='{disabled: pn == pageCount-1}', data-page='{{pn+1}}') 下一页
</template>

<script>
    export default {
        props: {
            total: {
                default: 0                  //总条数
            },
            pn: {
                default: 0                  //当前页
            },
            ps: {
                default: 20                 //每页显示条数
            },
            pageSpan: {
                default: 10                 //页码的显示个数
            }
        },
        computed: {
            pageCount () {              //计算总页码
                return Math.ceil(this.total / this.ps) || 0;
            },
            showEndEllipse () {
                return this.spanRange[this.spanRange.length-1] < (this.pageCount-2);
            },
            /**
             * 计算要显示的页码，不包括第一页和最后一页
             * e.g. [4,5,6,7,8,9,10]
             */
            spanRange () {
                let sr = [],
                    half = Math.floor(this.pageSpan / 2),  //显示页码个数的一半
                    start = Math.max(Math.min(this.pn - half, this.pageCount - 1 - this.pageSpan), 1),   //显示页码范围的起始页
                    end = Math.min(Math.max(this.pn + half, start + this.pageSpan), this.pageCount - 2); //显示页码范围的终止页
                for(let i = start; i <= end; i++){
                    sr.push(i);
                }
                return sr;
            }
        },
        methods: {
            /**
             * 切换页码
             * event 点击事件，用以获取target
             */
            go (event) {
                var target = event.target;
                //若点击的元素带有 disabled、current、ellipsis的class，则返回
                if(/\b(disabled|current|ellipsis)\b/.test(target.className)){
                    return;
                }
                this.pn = parseInt(target.getAttribute('data-page'));
                this.$dispatch("updatepage", this.pn);
            }
        }
    }
</script>

<style lang="sass" src="./pagination.scss"></style>
