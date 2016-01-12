/**
 * ui-radio单选插件
 * 基于jQuery
 */
; + function($) {
    "use strict";
    // 默认实例化配置
    var defaults = {
        skin: '',
        dataKey: 'ui-radio', //实例化后的data键值，方便后续通过data('ui-radio')取出；
        change: null //radio开关状态改变时的回调；
    };


    /**
     * ui-radio插件
     */
    $.fn.ui_radio = function(options) {
        var _this = $(this),
            _num = _this.length;
        $.fn.ui_radio.list = {};
        if (!_num)
            return;

        _this.each(function(index, el) {
            var _el = $(el),
                _name = _el.prop('name');
            if (!$.fn.ui_radio.list[_name]) {
                $.fn.ui_radio.list[_name] = new UI_radio($('input:radio[name="' + _name + '"]'), options);
            }
        })

    };

    /**
     * UI_radio对象
     * @param {[jQuery]} el  [jQuery选择后的对象，此处传入的为name值相同的一组radio]
     * @param {[object]} opt [设置的参数]
     */
    function UI_radio(el, opt) {
        this.el = el;
        this.name = this.el.prop('name');
        this._fisrt = this.el.eq(0);
        this._opt = $.extend({}, defaults, opt);
        return this._init();
    }

    // UI_choose 原型链扩展。
    UI_radio.prototype = {

        // init初始化;
        _init: function() {
            var _data = this._fisrt.data(this._opt.dataKey);
            // 如果已经实例化了，则直接返回
            if (_data)
                return _data;
            else
                this._fisrt.data(this._opt.dataKey, this);

            // 判断是否为IE8-
            var _ie = navigator.userAgent.toLocaleLowerCase().match(/msie ([\d.]+)/);
            if (_ie && _ie[1] <= 8.0) {
                this._lowIE = true;
            }
            // 组建dom,绑定事件
            this._setHtml();
            this._bindEvent();
        },

        // 组建并获取相关的dom元素-ul;
        _setHtml: function() {
            var _html = '<span class="ui-radio"></span>';
            var _this = this;
            this.el.each(function(index, el) {
                var _self = $(el);
                _self.after(_html);
                // ie8兼容
                _this._check(_self, _self.prop('checked'));
                _this._disable(_self, _self.prop('disabled'));
            });
            this._wrap = this.el.next('span.ui-radio');
            this._wrap.addClass(this._opt.skin);
            return this;
        },

        // 绑定事件；
        _bindEvent: function() {
            var _this = this;
            _this.el.on('change', function() {
                var _self = $(this);
                _this.val(_self.val());
                _this._triggerChange(_self.val(), _self);
            });
            return _this;
        },

        // 让指定元素选中/非选中的兼容写法
        _check: function(items, value) {
            value = value || false;
            items.prop('checked', value);
            var _wrap = items.next('span.ui-radio');
            if (this._lowIE) {
                value ? _wrap.removeClass('off').addClass('on') : _wrap.removeClass('on').addClass('off');
            }
            return this;
        },
        // 让指定元素选中/非选中的兼容写法
        _disable: function(items, disabled) {
            disabled = !!disabled || false;
            items.prop('disabled', disabled);
            var _wrap = items.next('span.ui-radio');
            if (this._lowIE) {
                disabled ? _wrap.addClass('disabled') : _wrap.removeClass('disabled');
            }
            return this;
        },
        // change 触发
        _triggerChange: function(value, item) {
            if (typeof this._opt.change == 'function')
                this._opt.change.call(this, value, item);
            this.change(value, item);
        },

        // 获取值；
        val: function(value) {
            // getValue
            if (arguments.length == 0) {
                return this.el.filter(':checked').last().val();
            }
            // setValue
            var _nValItem = null;
            var _oValue = this.val();
            this.el.each(function(index, el) {
                var _self = $(el);
                if (_self.val() == value) {
                    _nValItem = _self;
                }
            });
            if (_nValItem != null) {
                this._check(this.el.not(_nValItem), false);
                this._check(_nValItem, true);
                _oValue != value ? this._triggerChange(value, _nValItem) : null;
            }
            return this;
        },

        // radio值改变事件；
        change: function(val, item) {},

        // 禁用
        disable: function(index) {
            if (index === undefined) {
                this._disable(this.el, true);
            } else {
                this._disable(this.el.eq(index), true);
            }
            return this;
        },

        // 启用
        enable: function(index) {
            if (index === undefined) {
                this._disable(this.el, false);
            } else {
                this._disable(this.el.eq(index), false);
            }
            return this;
        }
    };
}(jQuery);
