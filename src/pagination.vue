<template id="t-pagination">
    <slot></slot>
    <div class="ui-pagination">
        <span class="total">共<em>{{total}}</em>条</span>
        <span class="pages" @click.prevent="go" v-show="pages > 1">
            <a href="#" class="ui-page" :class="{disabled: pn == 0}" data-page="{{ pn > 0 ? pn-1 : pn}}">上一页</a>
            <a href="#" class="ui-page" :class="{current: pn == 0}" data-page="0" v-show="spanRange[0]">1</a>
            <em class="ui-page ellipsis" v-show="showStartEllipse">⋯</em>
            <a v-for="n in spanRange" href="#" class="ui-page" :class="{current: n == pn}" data-page="{{n}}">{{n+1}}</a>
            <em  class="ui-page ellipsis" v-show="showEndEllipse">⋯</em>
            <a href="#" class="ui-page" :class="{current: pn == pages-1}" data-page="{{pages - 1}}" v-show="showEndPage">{{pages}}</a>
            <a href="#" class="ui-page" :class="{disabled: pn == pages-1}" data-page="{{ pn < pages-1 ? pn+1 : pn}}">下一页</a>
        </span>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: {
            total: {
                default: 0
            },
            pn: {
                default: 0
            },
            ps: {
                default: 20
            },
            pageSpan: {
                default: 10
            }
        },
        template: "#t-pagination",
        computed :  {
            pages () {
                return Math.ceil(this.total / this.ps) || 0;
            },
            showStartEllipse () {
                return this.spanRange[0] > 1;
            },
            showEndPage () {
                return this.spanRange[this.spanRange.length-1] != (this.pages-1);
            },
            showEndEllipse () {
                return this.spanRange[this.spanRange.length-1] < (this.pages-2);
            },
            half () {
                return (this.pageSpan / 2) | 0;
            },
            spanRange () {
                let sr = [],
                    start = Math.max(Math.min(this.pn - this.half, this.pages - 1 - this.pageSpan), 0),
                    end = Math.min(Math.max(this.pn + this.half, start + this.pageSpan), this.pages - 1);
                for(let i = start; i <= end; i++){
                    sr.push(i);
                }
                return sr;
            }
        },
        methods: {
            go (event) {
                var target = event.target;
                if(/\b(disabled|current|ellipsis)\b/.test(target.className)){
                    return;
                }
                this.pn = parseInt(target.getAttribute('data-page'));
                this.$dispatch("updatepage", this.pn);
            }
        }
    }
</script>
