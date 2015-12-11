import Vue from 'vue'
import TimePicker from '../../src/timepicker/timepicker.vue'

Vue.component('timepicker', TimePicker);

var demo = new Vue({
    el: "#demo",
    data (){
        return {
            forbidden:"111111111111111111111111,000001000010010010000001,000000100000001000000001,000000100000010000100001,000000010000100010001001,000010000011100000000001,000000000000000000000001"
        }
    }
});
