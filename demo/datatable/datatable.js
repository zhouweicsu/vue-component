import Vue from 'vue'
import './datatable.scss'
import DataTable from '../../src/data-table.vue'

Vue.component('data-table', DataTable);

var tempData = [{
    userId: '2015-12-08',
    title: 'data-table'
},{
    userId: '2015-12-09',
    title: 'pagination'
}];

var demo = new Vue({
    el: "#demo",
    data () {
        return {
            list: tempData,
            api: 'http://jsonplaceholder.typicode.com/posts'
        }
    },
    methods : {
        datafilter (data) {
            return {
                total: 1000,
                list: data
            }
        }
    }
});
