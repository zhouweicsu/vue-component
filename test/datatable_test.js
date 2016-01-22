import Vue from 'vue';
import DataTable from '../src/data-table/data-table.vue';
import assert from 'assert';
import util from './util';

/**
 * 测试 data-table 组件
 */
describe('data-table 组件', function() {

    //mock ajax
    var ajax = sinon.useFakeXMLHttpRequest();
    var requests = [];
    ajax.onCreate = function (xhr) {
        requests.push(xhr);
    }

    /**
     * 基本测试
     */
    describe('the data table', function() {
        var template, vm, el;
        it('set up test', function(){
            template = `
                <data-table :url="url" :list.sync="list">
                    <table class="data-table">
                        <tbody v-if="list && list.length > 0" >
                            <tr v-for="item in list">
                                <td>{{item.title}}</td>
                            </tr>
                        </tbody>
                    </table>
                </data-table>
            `;
            vm = util.createApp(template, {
                data: {
                    url: '/get/list',
                    list: []
                },
                components: {
                    'data-table': DataTable
                }
            });
            el = vm.$el;
        });

        it('should create the dom structure', function(done) {
            assert.equal(requests.length, 1);
            requests[0].respond(200, {'Content-Type': 'application/json'}, JSON.stringify({
                errno: 0,
                list: new Array(10).fill(1).map((a, i) => `item ${i}`)
            }));
            setTimeout(function(){
                assert.equal(el.querySelectorAll('tr').length, 10);
                done();
            }, 10);
        });

        it('should update data after url change', function(done) {
            vm.url = '/updated/url';
            setTimeout(function(){
                assert.equal(requests[1].url, '/updated/url?pn=0&ps=20');
                requests[1].respond(200, {'Content-Type': 'application/json'}, JSON.stringify({
                    errno: 0,
                    list: new Array(4).fill(1).map((a, i) => `item ${i}`)
                }));
                setTimeout(function(){
                    assert.equal(el.querySelectorAll('tr').length, 4);
                    done();
                }, 10);
            }, 10);
        });




        after(function(){
            util.destroyApp(vm);
        });
    });


});

