import Vue from 'vue'
import Area from '../../src/area/area.vue'

Vue.component('area', Area);

var demo = new Vue({
    el: "#demo",
    data (){
        return {
            selectedCitys: '0'
        }
    },
    events: {
        syncSelectedCitys (citys) {
            this.selectedCitys = citys.join(',');
        }
    }
});
