import Vue from 'vue'
import DataTable from '../../src/data-table/data-table.vue'

Vue.component('data-table', DataTable);

var tempData = [{
    appname: '2015-12-08',
    aid: 'data-table'
},{
    appname: '2015-12-09',
    aid: 'pagination'
}];

var demo = new Vue({
    el: "#demo",
    data () {
        return {
            list: tempData,
            api: '/ssp/test'
        }
    }
});
