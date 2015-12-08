<template>
    <div class="area-picker-wrap">
        <div class="area-picker-ctn">
            <div class="area" v-for="area in areacode">
                <div class="fl">
                    <label for="id{{area.id}}_{{area.level}}">
                        <input class="area-sel" :change="selectArea" type="checkbox" id="id{{area.id}}_{{area.level}}" data-child={{area.province.length}} data-childsel=0 value="area.id">
                        {{area.name}}
                    </label>
                </div>
                <dl>
                    <dd v-for="pro in area.province">
                        <label for="id{{pro.id}}_{{pro.level}}">
                            <input class="province-sel" type="checkbox" id="id{{pro.id}}_{{pro.level}}" data-child={{pro.citys.length}} data-childsel=0 value={{pro.id}}>
                            {{pro.name}}(<span class="sel-num">0</span>/<span class="all-num">{{pro.citys.length}}</span>)
                        </label>
                        <div class="citys">
                            <h4>{{pro.name}}</h4>
                            <ul>
                                <li v-for="city in pro.citys">
                                    <label  for="id{{city.id}}_{{city.level}}">
                                        <input class="city-sel" type="checkbox" id="{{city.id}}_{{city.level}}" value="{{city.id}}">
                                        {{city.name}}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="area last">
                <label for="all_sel">
                    <input id="all_sel" class="all-sel" type="checkbox" data-child={{areacode.length}} data-childsel=0>
                    全部
                </label>
            </div>
            <div class="submit-wrap">
                <a class="picker-save btn btn-primary btn-round" href="javascript:;">确定</a>
                <a class="picker-ignore btn btn-primary btn-round" href="javascript:;">取消</a>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import areacode from './areacode.js'

export default {
        props: {
            initArea: '0',
        },
        data () {
            return {
                areacode: areacode
            }
        },
        methods: {
             selectArea () {
             
             }
        }
}
</script>

