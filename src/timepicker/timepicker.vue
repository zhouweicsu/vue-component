<template>
<div>
    <a class="btn btn-primary" href="javascript:;" @click="showDialog">选择时段</a>
    <dialog :visible.sync="dialogVisible" title="选择时段">
    <div class="time-picker-wrap">
        <div class="time-picker-hd">
            <div class="time-picker-hint">
                <span class="active"><i></i>投放时间段</span>
                <span><i></i>暂停时间段</span>
                <span class="forbidden"><i></i>不可选时间段</span>
            </div>
            <div class="time-picker-shortcuts">
                <a class="time-picker-all btn btn-default" href="javascript:;" @click.prevent="selectSpecificDay('all')">全部时间</a>
                <a class="time-picker-work btn btn-default" href="javascript:;" @click.prevent="selectSpecificDay('weekday')">工作日</a>
                <a class="time-picker-weekend btn btn-default" href="javascript:;" @click.prevent="selectSpecificDay('weekend')">周末</a>
            </div>
        </div>
        <table class="time-picker-bd">
            <thead>
                <tr>
                    <th class="time-picker-day"></th>
                    <th v-for="hour in 24" class="time-picker-hour" :class="{active: isHourAllChecked[hour]==7}" @click="selectHour(hour)">
                        <i class="fa fa-arrow-down"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="day in 7">
                    <td class="time-picker-day">
                        <label>
                            <input type="checkbox" @change="selectDay(day, $event.target.checked)" v-model="isDayAllChecked[day]" :disabled="disabledWeekday[day]">
                            {{weekDay[day]}}
                        </label>
                    </td>
                    <td v-for="hour in 24" class="time-picker-btns" :class="{'forbidden':+fbdArr[day][hour],'active': (!(+fbdArr[day][hour]) && +times[day][hour])}" @click="selectTime(day,hour)">
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
            <a class="btn btn-primary" href="javascript:;" @click.prevent="confirm">确定</a>
            <a class="btn btn-default" href="javascript:;" @click.prevent="cancel">取消</a>
        </div>
    </div>
    </dialog>
</div>
</template>

<script>
import Vue from 'vue'
import Dialog from '../dialog/dialog.js'

String.prototype.repeat = String.prototype.repeat || function(n) { return Array(n+1).join(this) };

export default {
    props : {
        timeString: {                                                     //默认选中的时间点，7*24的二维数组字符串，1表示选中，0表示未选中
            default: ('1'.repeat(24)+',').repeat(7).slice(0,-1)           //默认值为全部选中，即7*24个1
        },
        forbidden: {                                                      //禁止选择的时间点，7*24的二维数组字符串，1表示不可选，0表示可选
           default: ('0'.repeat(24)+',').repeat(7).slice(0,-1)            //默认值为全部可选，即7*24个0
        }
    },
    data () {
        return {
            times: [],      //timeString初始化之后的数组
            weekDay : ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],       //星期
            dialogVisible : false,          //组件Dialog默认不弹出
            backupTimes: ''                 //弹出Dialog时备份之前的选择，在cancel的时候恢复
        }
    },
    components: {
        dialog: Dialog              //依赖组件Dialog
    },
    computed : {
        fbdArr(){                 //将用户给定的禁止选择时间点的字符串转换为int数组
            return this.forbidden.split(',').map(s => (s.split('').map(f => +f)));
        },
        disabledWeekday(){        //若当天所以时间点都被禁止选择，则disabled该checkbox
            var temp = [];
            this.fbdArr.map(day => temp.push(day.reduce((pre, next) => (pre + next)) == 24));
            return temp;
        },
        isDayAllChecked(){          //长度为7的一维bool数组，true表示该天所有时间点均被选中，false反之
            var me =this, temp = [];
            me.times.map(day => temp.push(day.reduce((pre, next) => (pre + next))));            //将选中的时间点叠加
            me.fbdArr.map((day,di) => temp[di] ? temp[di] += day.reduce((pre, next) => (pre + next)):'');  //若有选中的时间点，则再叠加被禁止选择的时间点
            temp.map((checked,i) => temp.$set(i, checked == 24));       //若选中的时间点与禁止选择的时间点加起来为24，则表明该天被全部选中
            return temp;
        },
        isHourAllChecked(){             //长度为24的一维int数组，7表示该时间点每天都被选中，小于7则表示未被全部选中
            var temp = [], fbdSum = [];
            this.times.map((day, di) => {
                day.map((hour, hi) => {
                    fbdSum[hi] ? fbdSum[hi] += this.fbdArr[di][hi] : fbdSum.push(this.fbdArr[di][hi]);      //fbdSum存储该时间点被禁止选中的天数
                    temp[hi] ? temp[hi] += (hour + this.fbdArr[di][hi]) : temp.push(hour + this.fbdArr[di][hi]); //temp存储该时间点被选中的天数（包括被禁止的）
                });
            });
            return temp.map((item, i) => fbdSum[i] == 7 ? 0 : item);   //若被禁止的天数为7，则不选中改
        }
    },
    created(){
        this.times = this.timeString.split(',').map((day,dIndex) => {   //将用户选择的时间点字符串转换为int数组
            return day.split('').map((hour, hIndex) => this.fbdArr[dIndex][hIndex] ? 0 : +hour);
        });
    },
    methods: {
        selectTime(day, hour){          //时间点选择事件，若未被禁止则
            !this.fbdArr[day][hour] && this.times[day].$set(hour, +!this.times[day][hour]);
        },
        selectDay(day, bool){           //选择整天24小时
            this.times[day].map((hour, hi) => this.times[day].$set(hi, this.fbdArr[day][hi] ? 0 : +bool));
        },
        selectHour(hour){               //选择整个时间点
            let isChecked = this.isHourAllChecked[hour] == 7 ? 0 : 1;
            this.times.map((day,di) => day.$set(hour, this.fbdArr[di][hour] ? 0 : isChecked));
        },
        selectSpecificDay(type){        //选择指定的天数，全部、工作日、周末
            let selectDay = type == 'all' ? [1,1,1,1,1,1,1]: type == 'weekday' ? [0,1,1,1,1,1,0] : [1,0,0,0,0,0,1];
            selectDay.map((s,i) => this.selectDay(i,s));
        },
        showDialog(){
            this.dialogVisible = true;
            this.backupTimes = JSON.parse(JSON.stringify(this.times));
        },
        confirm(){
            this.dialogVisible = false;
            this.$dispatch('confirm', this.times);
        },
        cancel(){
            this.times = JSON.parse(JSON.stringify(this.backupTimes));
            this.dialogVisible = false;
        }
    }
}
</script>

<style lang="sass" src="./timepicker.scss"></style>
