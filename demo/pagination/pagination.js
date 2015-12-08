import Vue from 'vue'
import Pagination from '../../src/pagination.vue'
import './pagination.scss'

Vue.component('pagination', Pagination);

var demo = new Vue({
    el: "#demo"
});
