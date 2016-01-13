#ui-radio 单选插件
可统一radio在不同浏览器下的显示效果
##[demo](http://wangxing218.github.io/ui-radio/test/demo.html)

##基于jquery,使用非常方便！
```javascript
// 实例化所有的radio
$('.ui-radio').ui_radio();

// 取得已实例的radio对象
// 默认将data值存在radio同组（name相同）的第一个元素
var ur = $('#ur_01').data('ui-radio');
// 值改变事件
ur.change = function(val, item) {
    $('#info').text(val);
}

// API

// ur.val()         //获取值
// us.val(3)         //设置值
// us.disable(2)      //禁用指定元素（不给参数时禁用所有radio）
// us.enable(2)     //启用指定元素（不给参数时启用所有radio）
//
```
##兼容性
IE8+, Chrome, Firefox, Edge, 360, Sougou 等主流浏览器;

##作者
###网站： <a href="http://www.boyxing.com/" target="_blank">www.boyxing.com 星仔博客</a>
### QQ ： <a href="http://wpa.qq.com/msgrd?v=3&uin=1263996779&site=qq&menu=yes" target="_blank">1263996779</a>



