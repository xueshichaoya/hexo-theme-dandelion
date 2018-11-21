(function (window) {
    var defaults = {
        floorClass: '.content[itemprop=articleBody] :header[id]',
        navClass: '#toc a[href^=\'#\']',
        navFooterClass: '#toc-footer a[href^=\'#\']',
        activeClass: 'active',
        activeTop: 0,
        scrollTop: 0,
        delayTime: 200
    };

    var $body = $('body');
    var data = [];
    var article_index = $("#toc");
    //var highlight_title = $(".highlight-title");


    function getItem(_list, newOptions) {
        _list.each(function () {
            var item = {};
            item.$obj = $body.find(this);
            item.$activeTop = $body.find(this).offset().top - newOptions.activeTop;
            item.$scrollTop = $body.find(this).offset().top + newOptions.scrollTop;
            data.push(item);
        });
    }

    function scrollActive(_list, newOptions) {
        var nowScrollTop = $(window).scrollTop();
        //highlight_title = $(".highlight-title");
        var active_now = $("a.active");
        var a_i = _list.index(active_now);

        var ii = 0;
        // $.each(data,function(i,item)) 用来循环数组
        $.each(data, function (i, item) {
            if (nowScrollTop >= item.$activeTop) {
                _list.removeClass(newOptions.activeClass).eq(i).addClass(newOptions.activeClass);
                ii = i;
            }
        });
        

        /**
        function set_highlight_title_css() {
            if (ii !== a_i) {
                highlight_title.css({
                    "top": _list.eq(ii).position().top,
                    "height": _list.eq(ii).css('height'),
                    "display": "block"
                });
            }
        }*/

        //set_highlight_title_css();
    }

    var scroll_floor = window.scrollFloor = function (options) {
        var newOptions = $.extend({}, defaults, options);
        var floorList = $body.find(newOptions.floorClass), navList = $body.find(newOptions.navClass), navFooterList = $body.find(newOptions.navFooterClass);


        getItem(floorList, newOptions);
        scrollActive(navList, newOptions);
        scrollActive(navFooterList, newOptions);

        $(window).bind('scroll', function () {
            scrollActive(navList, newOptions);
            scrollActive(navFooterList, newOptions);
        });

        //smooth_scroll();
        navList.bind('click', function (e) {
            var _index = navList.index(this);
            $('html,body').animate({'scrollTop': data[_index].$scrollTop}, newOptions.delayTime);
            //return false;
            //e.preventDefault();
        });

        navFooterList.bind('click', function (e) {
            var _index = navFooterList.index(this);
            $('html,body').animate({'scrollTop': data[_index].$scrollTop}, newOptions.delayTime);
            //return false;
            //e.preventDefault();
        });

    }
})(window);
