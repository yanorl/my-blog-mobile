import Vue from "vue";

// 定义全局点击函数
Vue.prototype.iosBlur = function (callback) {
         var top = document.body.scrollTop + document.documentElement.scrollTop;
          window.scrollTo(0, top);
    }


//
Vue.filter('substr', function(value, first, end) {
    if (value.length < end ) {
        return value;
    }else{
        var value = value.substr(first, end) + '...';
        return value;
    }
})


/* 部分隐藏处理
 ** str 需要处理的字符串
 ** frontLen  保留的前几位
 ** endLen  保留的后几位
 ** cha  替换的字符串
 */
Vue.filter('plusXing', function(value) {
    var len = value.length - 3 - 2;
    var xing = '';
    for (var i = 0; i < len; i++) {
        xing += '*';
    }
    return value.substring(0, 3) + xing + value.substring(value.length - 2);
})


