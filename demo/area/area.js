import Vue from 'vue'
import Area from '../../src/area.vue'
import './area.scss'

Vue.component('area', Area);

var demo = new Vue({
    el: "#demo",
    data (){
        return {
            initarea: '1,3,5,35,36,37'
        }
    }
});
