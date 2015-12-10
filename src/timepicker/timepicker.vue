<template>
    <div class="time-picker-wrap">
        <div class="time-picker-hd">
            <div class="time-picker-hint">
                <span class="active"><i></i>投放时间段</span>
                <span><i></i>暂停时间段</span>
                <span class="forbidden"><i></i>不可选时间段</span>
            </div>
            <div class="time-picker-shortcuts">
                <a class="time-picker-all btn btn-default" href="javascript:;">全部时间</a>
                <a class="time-picker-work btn btn-default" href="javascript:;">工作日</a>
                <a class="time-picker-weekend btn btn-default" href="javascript:;">周末</a>
            </div>
        </div>
        <table class="time-picker-bd">
            <thead>
                <tr>
                    <th class="time-picker-day"></th>
                    <th v-for="hour in 24" class="time-picker-hour" @click="selectHour(hour)" hour="{{hour}}">
                        <i class="fa fa-arrow-down"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="day in 7">
                    <td class="time-picker-day">
                        <span>
                            <input type="checkbox" value="{{day}}" @change="selectDay(day, $event)" >
                            {{weekDay[day]}}
                        </span>
                    </td>
                    <td v-for="hour in 24" class="time-picker-btns" :class="{'forbidden':+fbdArr[day][hour],'active': (!(+fbdArr[day][hour]) && +times[day][hour])}" @click="selectTime(day,hour)" day="{{day}}" hour="{{hour}}">
                        <span>{{hour+1}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="time-picker-ft">
            <p><strong>示例一：</strong>&nbsp;&nbsp;当你选择了星期一的【12】点，则推广时间段为星期一的12:00-12:59</p>
            <p><strong>示例二：</strong>&nbsp;&nbsp;当你选择了星期一的【8、9、10、11】点，则推广时间段为星期一的8:00-11:59</p>
        </div>
        <div class="time-picker-submit-wrap">
            <a class="btn btn-primary" href="javascript:;">确定</a>
            <a class="btn btn-default" href="javascript:;">取消</a>
        </div>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'

String.prototype.repeat = String.prototype.repeat || function(n) { return Array(n+1).join(this) };

export default {
    props : {
        timeString: {
            default: ('1'.repeat(24)+',').repeat(7).slice(0,-1)           // "all"代表全部
        },
        forbidden: {
           default: ('0'.repeat(24)+',').repeat(7).slice(0,-1)              //禁止选择的时间段
        }
    },
    data () {
        return {
            times: [],
            weekDay : ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            isWeekAllChecked: [0,0,0,0,0,0,0],
            isHourAllChecked: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
    },
    computed : {
        fbdArr () {
            return this.forbidden.split(',').map(s => s.split(''));
        },
        isWeekAllChecked () {
            
        }
    },
    created () {
        let me = this;
        me.times = me.timeString.split(',').map((day,dIndex) => {
            return day.split('').map((hour, hIndex) => +me.fbdArr[dIndex][hIndex] ? 0 : hour);
        });
    },
    methods: {
        selectTime (day, hour) {
            if(+this.fbdArr[day][hour]){
                return;
            }
            this.times[day].$set(hour, this.times[day][hour] ? 0 : 1);
        },
        selectDay (day, event){
            let me = this;
            let isChecked = event.target.checked ? 1 : 0;
            me.times[day].map(function(hour, index){
                me.times[day].$set(index, +me.fbdArr[day][index] ? 0 : isChecked);
            });
        },
        selectHour (hour){

        }
    }
}
</script>

<style lang="sass" src="./timepicker.scss"></style>
