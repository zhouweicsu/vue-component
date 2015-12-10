import Vue from 'vue'
import TimePicker from '../../src/timepicker/timepicker.vue'

Vue.component('timepicker', TimePicker);

var demo = new Vue({
    el: "#demo",
    data (){
        return {
            forbidden:"000010010001000000100000,000001000010010010000000,000000100000001000000000,000000100000010000100000,000000010000100010001000,000010000011100000000000,000000000000000000000000"
        }
    }
});
