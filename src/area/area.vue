<template id="area">
<div>
    <a class="btn btn-primary" @click="showDialog" href="javascript:;">选择城市</a>
    <dialog :visible.sync="dialogVisible" title="选择城市">
        <div class="area-picker-wrap">
            <div class="area-picker-ctn">
                <div class="area" v-for="area in areacode">
                    <div class="fl">
                        <label>
                            <input @change="syncArea(area, $event)" v-model="checkedAreas" type="checkbox" value={{area.id}}>
                            {{area.name}}
                        </label>
                    </div>
                    <dl>
                        <dd v-for="pro in area.province">
                            <label>
                                <input @change="syncProvince(pro, $event)" v-model="checkedProvinces" type="checkbox" value={{pro.id}}>
                                {{pro.name}}(<span>{{pro.citys | checkedLenFilter}}</span>/<span>{{pro.citys.length}}</span>)
                            </label>
                            <div class="citys">
                                <h4>{{pro.name}}</h4>
                                <ul>
                                    <li v-for="city in pro.citys">
                                        <label>
                                            <input @change="syncCity(city, $event)" v-model="checkedCitys" type="checkbox" value="{{city.id}}">
                                            {{city.name}}
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div class="area last">
                    <label>
                        <input @change="init('0', $event)" type="checkbox" checked="{{checkedAll}}">
                        全部
                    </label>
                </div>
            </div>
        </div>
        <div class="time-picker-submit-wrap">
            <a class="btn btn-primary" href="javascript:;" @click.prevent="confirm">确定</a>
            <a class="btn btn-default" href="javascript:;" @click.prevent="cancel">取消</a>
        </div>
    </dialog>
</div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import Dialog from '../dialog/dialog.js'
import areacode from './areacode.js'

Vue.filter('checkedLenFilter', arr=>arr.filter(city=>city.checked).length);

export default {
        props: {
            initcities: {
                default: '0'        //0: select all citys, '1,3,34' array: select this citys
            }
        },
        computed: {
            checkedAll() {
                return this.checkedAreas.length == this.areacode.length;
            }
        },
        data () {
            return {
                dialogVisible : false,          //组件Dialog默认不弹出
                areacode: JSON.parse(JSON.stringify(areacode)),
                checkedAreas: [],         //checked areas list
                checkedProvinces: [],         //checked provinces list
                checkedCitys: [],        //checked citys list
                backupCitys: ''             //back up checked citys
            }
        },
        components: {
            dialog: Dialog              //依赖组件Dialog
        },
        created(){
            this.init(this.initcities);           //初始化默认选中的城市
        },
        methods: {
            init (cityList, event){ //初始化选中城市，以及处理“全部”按钮的点击事件
                let me = this;
                let bool = event ? event.target.checked : true;
                let initAll = (cityList == '0' && bool) ? true : false;
                cityList = cityList.split(',');
                me.areacode.map(function(area){
                    let selectPros = 0;
                    area.province.map(function(province){
                        let selectCitys = 0;
                        province.citys.map(function(city){
                            if( initAll || cityList.indexOf(city.id) > -1){
                                me.syncCheckedList(me.checkedCitys, city, initAll ? bool : true);
                                selectCitys += 1;
                            }else {
                                me.syncCheckedList(me.checkedCitys, city, false);
                            }
                        });
                        if(selectCitys == province.citys.length){
                            me.syncCheckedList(me.checkedProvinces, province, true);
                            selectPros += 1;
                        }else {
                            me.syncCheckedList(me.checkedProvinces, province, false);
                        }
                    });
                    me.syncCheckedList(me.checkedAreas, area, (selectPros == area.province.length));
                });
                !event && (this.areacode = JSON.parse(JSON.stringify(this.areacode)));  //初始化之后，刷新数组
            },
            syncArea (carea, event) {
                let me = this;
                let bool = event ? event.target.checked : true;
                me.areacode.forEach(function(area){
                    if( area.id == carea.id ){
                        area.province.map(function(province){
                            me.syncCheckedList(me.checkedProvinces, province, bool);
                            province.citys.map(function(city){
                                me.syncCheckedList(me.checkedCitys, city, bool);
                            });
                        });
                    }
                });
                this.areacode = JSON.parse(JSON.stringify(this.areacode))
            },
            syncProvince (cpro, event, proSelected) {
                let me = this;
                let bool = event ? event.target.checked : proSelected;
                me.syncCheckedList(me.checkedProvinces, cpro, (typeof proSelected != 'undefined') ? proSelected : bool);
                me.areacode.forEach(function(area){
                    let selectedPros = 0;
                    area.province.forEach(function(province){
                        if( province.id == cpro.id ){
                            if(typeof proSelected == 'undefined'){
                                province.citys.map(function(city){
                                    me.syncCheckedList(me.checkedCitys, city, bool);
                                });
                            }
                            province.checked = bool;
                        }
                        selectedPros += (+province.checked);
                    });
                    me.syncCheckedList(me.checkedAreas, area, selectedPros == area.province.length);
                });
            },
            syncCity (ccity, event) {
                let me = this;
                let bool = event ? event.target.checked : true;
                me.areacode.forEach(function(area){                //判断该城市所属省份的其他城市是否都已选，若都已选则选中该省份的checkbox
                    area.province.forEach(function(province){
                        let selectedCitys = 0;
                        province.citys.forEach(function(city){
                            if(city.id == ccity.id){
                                me.syncCheckedList(me.checkedCitys, city, bool);
                            }
                            selectedCitys += (+city.checked);
                        });
                        me.syncProvince(province, null, selectedCitys == province.citys.length);
                    });
                });
            },
            syncCheckedList (array, item, bool) {
                item.checked = bool;
                let index = array.indexOf(item.id);
                (bool && index < 0) ? array.push(item.id) : '';
                (!bool && index >= 0) ? array.splice(index,1) : '';
            },
            showDialog(){
                this.dialogVisible = true;
                this.init(this.checkedCitys.join(','));
                this.backupCitys = JSON.parse(JSON.stringify(this.checkedCitys));
            },
            confirm() {
                this.dialogVisible = false;
                this.$dispatch('confirm', this.checkedCitys);
            },
            cancel() {
                this.dialogVisible = false;
                this.checkedCitys = JSON.parse(JSON.stringify(this.backupCitys));
            }
        }
}
</script>

<style lang="sass" src="./area.scss"></style>
