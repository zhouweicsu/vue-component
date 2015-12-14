import Vue from 'vue'
import Area from '../../src/area/area.vue'

Vue.component('area', Area);

var demo = new Vue({
    el: "#demo",
    data (){
        return {
            selectedCities: '0'
        }
    },
    methods: {
        confirm (cities) {
            this.selectedCities = cities.join(',');
        }
    }
});
