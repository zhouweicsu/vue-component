<template lang="jade">
div
  a.btn.btn-primary(href='javascript:;', @click='showDialog') 选择时段
  dialog(:visible='dialogVisible', title='选择时段')
    .time-picker-wrap
      .time-picker-hd
        .time-picker-hint
          span.active
            i
            | 投放时间段
          span
            i
            | 暂停时间段
          span.forbidden
            i
            | 不可选时间段
        .time-picker-shortcuts
          a.time-picker-all.btn.btn-default(href='javascript:;', @click.prevent="selectSpecificDay('all')") 全部时间
          a.time-picker-work.btn.btn-default(href='javascript:;', @click.prevent="selectSpecificDay('weekday')") 工作日
          a.time-picker-weekend.btn.btn-default(href='javascript:;', @click.prevent="selectSpecificDay('weekend')") 周末
      table.time-picker-bd
        thead
          tr
            th.time-picker-day
            th.time-picker-hour(v-for='hour in 24', :class='{active: isHourAllChecked[hour]}', @click='selectHour(hour)')
              i.fa.fa-arrow-down
        tbody
          tr(v-for='day in 7')
            td.time-picker-day
              label
                input(type='checkbox', @change='selectDay(day, $event.target.checked)', v-model='isDayAllChecked[day]', :disabled='disabledWeekday[day]')
                | {{weekDay[day]}}
            td.time-picker-btns(v-for='hour in 24', :class="{'forbidden': !!fbdArr[day][hour],'active': (!fbdArr[day][hour] && !!times[day][hour])}", @click='selectTime(day,hour)')
              span {{hour+1}}
      .time-picker-ft
        p
          strong 示例一：当你选择了星期一的【12】点，则推广时间段为星期一的12:00-12:59
        p
          strong 示例二：当你选择了星期一的【8、9、10、11】点，则推广时间段为星期一的8:00-11:59
      .time-picker-submit-wrap
        a.btn.btn-primary(href='javascript:;', @click.prevent='confirm') 确定
        a.btn.btn-default(href='javascript:;', @click.prevent='cancel') 取消
</template>

<script>
import Vue from 'vue'
import Dialog from '../dialog'

String.prototype.repeat = String.prototype.repeat || function(n) { return Array(n+1).join(this) };
Array.prototype.fill = Array.prototype.fill || function(val) { for (var i = 0; i < this.length; i++) this[i] = val };

export default {
    props : {
        //默认选中的时间点，7*24的二维数组字符串，1表示选中，0表示未选中
        timeString: {
            //默认值为全部选中，即7*24个1
            default: ('1'.repeat(24)+',').repeat(7).slice(0,-1)
        },
        //禁止选择的时间点，7*24的二维数组字符串，1表示不可选，0表示可选
        forbidden: {
           //默认值为全部可选，即7*24个0
           default: ('0'.repeat(24)+',').repeat(7).slice(0,-1)
        }
    },
    data () {
        return {
            times: [],      //timeString初始化之后的数组
            weekDay : ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],       //星期
            dialogVisible : false,          //组件Dialog默认不弹出
            backupTimes: []                 //弹出Dialog时备份之前的选择，在cancel的时候恢复
        }
    },
    components: {
        dialog: Dialog              //依赖组件Dialog
    },
    computed : {
        /**
         * 将用户给定的禁止选择时间点的字符串转换为int数组
         */
        fbdArr(){
            return this.forbidden.split(',').map(s => (s.split('').map(f => +f)));
        },
        /**
         * 若当天所以时间点都被禁止选择，则disabled该checkbox
         */
        disabledWeekday(){
            return this.fbdArr.map(day => (day.reduce((pre, next) => (pre + next)) == 24));
        },
        /**
         * 长度为7的一维bool数组，true表示该天所有时间点均被选中，false反之
         */
        isDayAllChecked(){
            return this.times.map(dayTimes =>
                //将选中的时间点叠加，得到每天选中的时间总数
                dayTimes.reduce((count, next) => count + next)
            ).map((checkedCount, day) => {
                //计算每天被禁止的时间数
                let fbdCount = this.fbdArr[day].reduce((count, next) => count + next);
                //如果有选中的时间数，则将其与禁止的时间数相加
                return checkedCount && checkedCount + fbdCount;
            }).map(total =>
                //是否能选的都选中了
                total == 24
            );
        },
        /**
         * 长度为24的一维int数组，7表示该时间点每天都被选中，小于7则表示未被全部选中
         */
        isHourAllChecked(){
            var temp   = new Array(24).fill(0),    //temp存储该时间点被选中的天数（包括被禁止的）
                fbdSum = new Array(24).fill(0);  //fbdSum存储该时间点被禁止选中的天数
            this.times.map((day, di) => {
                day.map((hour, hi) => {
                    fbdSum[hi] += this.fbdArr[di][hi];
                    temp[hi]  += hour + this.fbdArr[di][hi];
                });
            });
            return temp.map((item, i) => item == 7 && fbdSum[i] != 7);   //若被禁止的天数为7，则不选中改
        }
    },
    created(){
        /**
         * 将用户选择的时间点字符串转换为int数组
         */
        this.times = this.timeString.split(',').map((day,dIndex) => {
            return day.split('').map((hour, hIndex) => this.fbdArr[dIndex][hIndex] ? 0 : +hour);
        });
        /**
         * 监控forbidden，若有修改则更新times数组
         */
        this.$watch('forbidden',function(){
            this.times = this.fbdArr.map((day,dIndex) => {
                return day.map((hour, hIndex) => this.fbdArr[dIndex][hIndex] ? 0 : this.times[dIndex][hIndex]);
            });
        });
    },
    methods: {
        /**
         * 时间点选择事件，若未被禁止则
         */
        selectTime(day, hour){
            !this.fbdArr[day][hour] && this.times[day].$set(hour, +!this.times[day][hour]);
        },
        /**
         * 选择整天24小时
         */
        selectDay(day, bool){
            this.times[day].map((hour, hi) => this.times[day].$set(hi, this.fbdArr[day][hi] ? 0 : +bool));
        },
        /**
         * 选择整个时间点，7天全部选择
         */
        selectHour(hour){
            let checked = this.isHourAllChecked[hour] ? 0 : 1;
            this.times.map((day,di) => day.$set(hour, this.fbdArr[di][hour] ? 0 : checked));
        },
        /**
         * 选择指定的天数，全部、工作日、周末
         */
        selectSpecificDay(type){
            let selectDayMap = {
                all:     [1,1,1,1,1,1,1],
                weekday: [0,1,1,1,1,1,0],
                weekend: [1,0,0,0,0,0,1]
            };
            selectDayMap[type].forEach((s,i) => this.selectDay(i,s));
        },
        /**
         * 显示组件的Dialog，并备份当前所选时间点
         */
        showDialog(){
            this.dialogVisible = true;
            this.backupTimes = JSON.parse(JSON.stringify(this.times));
        },
        /**
         * 确定所选的时间点，触发父级注册的confirm事件
         */
        confirm(){
            this.dialogVisible = false;
            this.$dispatch('confirm', this.times);
        },
        /**
         * 取消所勾选的时间，恢复之前备份的times
         */
        cancel(){
            this.times = JSON.parse(JSON.stringify(this.backupTimes));
            this.dialogVisible = false;
        }
    }
}
</script>

<style lang="sass" src="./timepicker.scss"></style>
