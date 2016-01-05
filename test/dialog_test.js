import Vue from 'vue';
import Dialog from '../src/dialog/dialog';
import assert from 'assert';
import util from './util';

/**
 * 测试 dialog 组件
 */
describe('dialog 组件', function() {

    /**
     * 组件的显示、隐藏等
     */
    describe('the dialog', function() {
        var content, template, vm, el, box, hd, bd;
        it('setup test', function() {
            content = '<p>test dialog</p>';
            template = `<dialog title="标题" v-ref:d>${content}</dialog>`;
            vm = util.createApp(template);
            el = vm.$el;
            box = el.querySelector('.dialog-box');
            hd = el.querySelector('.dialog-box .dialog-hd');
            bd = el.querySelector('.dialog-box .dialog-bd');
            assert(true);
        });

        it('should create the dom structure', function() {
            assert(box);
            assert(hd);
            assert(bd);
        });

        it('should be hidden at initial state', function() {
            assert.equal(box.style.display, 'none');
        });

        it('should insert content to .dialog-bd', function() {
            assert.equal(bd.innerHTML, content);
        });

        it('should display title correctly', function() {
            assert.equal(hd.textContent, '标题');
        });

        it('should show after call show() method', function(done) {
            vm.$refs.d.show();
            setTimeout(function(){
                assert.equal(box.style.display, 'block');
                done();
            }, 10);
        });

        it('should be centered at the screen', function() {
            var dialog = box.querySelector('.dialog');
            var top  = (window.innerHeight - dialog.clientHeight) / 2;
            var left = (window.innerWidth  - dialog.clientWidth) / 2;
            var actualPosition = util.getPosition(dialog);
            assert(Math.abs(actualPosition.top - top) < 10);
            assert(Math.abs(actualPosition.left - left) < 10);
        });

        it('should hide after call hide() method', function(done) {
            vm.$refs.d.hide();
            setTimeout(function(){
                assert.equal(box.style.display, 'none');
                done();
            }, 10);
        });

        after(function(){
            util.destroyApp(vm);
        });
    });

    /**
     * 组件的初始化显示，关闭按钮
     */
    describe('the dialog', function() {
        var template, vm, el, box, hd;
        it('set up test', function(){
            template = `<dialog :title="title" :visible="visible" v-ref:d><p>test</p></dialog>`;
            vm = util.createApp(template, {
                data: {
                    title: '初始标题',
                    visible: true
                }
            });
            el = vm.$el;
            box = el.querySelector('.dialog-box');
            hd = el.querySelector('.dialog-box .dialog-hd');
        });

        it('should be displayed at initial state', function() {
            assert.equal(box.style.display, 'block');
        });

        it('should update title', function(done) {
            vm.title = 'new title';
            setTimeout(function() {
                assert.equal(hd.textContent, 'new title');
                done();
            }, 10);
        });

        it('should hide after change visible to false', function(done) {
            vm.visible = false;
            setTimeout(function(){
                assert.equal(box.style.display, 'none');
                done();
            }, 10);
        });

        after(function(){
            util.destroyApp(vm);
        });
    });

    /**
     * alert
     */
    describe('the alert', function() {

        var callbackCalled = false;
        it('should be displayed', function(done) {
            Dialog.alert('test message', function() {
                callbackCalled = true;
                done();
            });
            assert.equal(document.querySelectorAll('.dialog-box').length, 1);
            assert.equal(document.querySelector('.dialog-box').style.display, 'block');
            assert.equal(document.querySelector('.dialog-box .msg-wrap').textContent.trim(), 'test message');
            //click button
            document.querySelector('.dialog-box .btn').click();
        });

        it('should call callback function', function() {
            assert.equal(callbackCalled, true);
        });

        it('should be destroyed after button clicked', function() {
            assert.equal(document.querySelector('.dialog-box'), null);
        });

    });

    /**
     * warn
     */
    describe('the warning box', function() {

        var callbackCalled = false;
        it('should be displayed', function(done) {
            Dialog.warn('test message', function() {
                callbackCalled = true;
                done();
            });
            assert.equal(document.querySelectorAll('.dialog-box').length, 1);
            assert.equal(document.querySelector('.dialog-box').style.display, 'block');
            assert.equal(document.querySelector('.dialog-box .msg-wrap').textContent.trim(), 'test message');
            assert.equal(document.querySelectorAll('.dialog-box .icon-warn').length, 1);

            //click button
            document.querySelector('.dialog-box .btn').click();
        });

        it('should call callback function', function() {
            assert.equal(callbackCalled, true);
        });

        it('should be destroyed after button clicked', function() {
            assert.equal(document.querySelector('.dialog-box'), null);
        });

    });

    /**
     * confirm
     */
    describe('the confirm box', function() {

        var callbackCalled, callbackValue;
        it('should be displayed', function(done) {
            Dialog.confirm('test message', function(result) {
                callbackCalled = true;
                callbackValue = result;
                done();
            });
            assert.equal(document.querySelectorAll('.dialog-box').length, 1);
            assert.equal(document.querySelector('.dialog-box').style.display, 'block');
            assert.equal(document.querySelector('.dialog-box .msg-wrap').textContent.trim(), 'test message');

            //click confirm button
            document.querySelector('.dialog-box .dialog-confirm').click();
        });

        it('should call callback function', function() {
            assert.equal(callbackCalled, true);
            assert.equal(callbackValue, true);
        });

        it('should be destroyed after button clicked', function() {
            assert.equal(document.querySelector('.dialog-box'), null);
        });

        callbackCalled = undefined;
        callbackValue = undefined;
        it('should be displayed', function(done) {
            Dialog.confirm('test message', function(result) {
                callbackCalled = true;
                callbackValue = result;
                done();
            });
            //click cancel button
            document.querySelector('.dialog-box .dialog-cancel').click();
        });

        it('should call callback function', function() {
            assert.equal(callbackCalled, true);
            assert.equal(callbackValue, false);
        });

        it('should be destroyed after button clicked', function() {
            assert.equal(document.querySelector('.dialog-box'), null);
        });


    });

});

