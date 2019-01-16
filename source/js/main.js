/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}


$(document).ready(function() {

  if ($('.aniview').length>0){
    var options = {
      animateThreshold: 100,
    };
    $(".aniview").AniView(options);
  }
  

 //当前URL对当前栏目高亮突出显示
  /**
     $("#nav .site-nav  li a").each(function(){
         $this = $(this);
         if($this[0].href==String(window.location)){
             $this.addClass("selected");
         }    
     });
 */

  $('.search-input').focus();
  /**
   * t.js
   */
  if ($('#about').length>0){

  /*<![CDATA[*/

    $(function(){
      $('#about').t({
          blink:400,
          delay:0.03,
          speed_vary:true,          // 'human like' speed variation [default:false]
          blink_perm:true,
          mistype:30,
          speed:70,
          beep:false,
          caret:'&nbsp;',
          pause_on_click:false,
          pause_on_tab_switch:false,
          typing:function(elem,chars_total,chars_left,_char){
                if(_char=='*')foo();
              },
          fin:function(elm){$('#about').find('.t-caret').css({opacity:0});}
        });
    });

  /*]]>*/

}
  /**
   * Shows the responsive navigation menu on mobile.
   */
  $('.site-nav-toggle').on('click', function () {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'responsive';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';
    $siteNav.stop()[animateAction]('fast', function () {
      $siteNav[animateCallback](ON_CLASS_NAME);
      $siteNav.removeAttr("style");
    });
  });

  /**
   * 锚点平滑滚动.
   */
  function smooth_scroll() {
      var $root = $('html, body');
      $("#toc a[href^=\'#\']").click(function () {
          $('html, body').animate({
              scrollTop: $($.attr(this, 'href')).offset().top
          }, 400);
          return false;
      });
  };

  /**
  *滚动时active文章目录
  */
 if ($('#toc a[href^=\'#\']').length>0){
  scrollFloor({
          floorClass: 'article.post :header[id]',
          navClass: '#toc a[href^=\'#\']',
          activeClass: 'active',
          activeTop: 5,
          scrollTop: 0,
          delayTime: 200
  });}

  if ($('#index-top-icon-tablet').length) {
    $(window).on("scroll", function() {
      var headerDistance = $(window).scrollTop();
      if (headerDistance < 300 ) {
        $("#index-top-icon-tablet").hide();
      } else if (headerDistance > 300) {
        $("#index-top-icon-tablet").show();
      }
    });
  }

  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");
    //var wechat = $('#share a.icon.social-share-icon.icon-wechat');
    //var wechatQrcode = $('#share a.icon.social-share-icon.icon-wechat .wechat-qrcode');
    //var wechatFooter = $('#share-footer a.icon.social-share-icon.icon-wechat');
    //var wechatFooterQrcode = $('#share-footer a.icon.social-share-icon.icon-wechat .wechat-qrcode');

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
  }
  //menu.addClass("show");
  //menuIcon.addClass("active");

  /**
   * Display the menu if the menu icon is clicked.
   */
  
  menuIcon.click(function() {
    if (menu.css("visibility") === "hidden") {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    } else {
      menu.css("visibility", "hidden");
      menuIcon.removeClass("active");
    }
    return false;
  });

  /**
   * Add a scroll listener to the menu to hide/show the navigation links.
   */
  if (menu.length) {
    $(window).on("scroll", function() {
      var topDistance = menu.offset().top;
      // hide only the navigation links on desktop
      if (!nav.is(":visible") && topDistance < 50) {
        nav.show();
      } else if (nav.is(":visible") && topDistance > 50) {
        nav.hide();
      }
      // on tablet, hide the navigation icon as well and show a "scroll to top
      // icon" instead
      if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
        $("#menu-icon-tablet").show();
        $("#top-icon-tablet").hide();
      } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
        $("#menu-icon-tablet").hide();
        $("#top-icon-tablet").show();
      }
    });
  }


    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          if (topDistance < lastScrollTop-10) {
            $("#footer-post").show();
          } else {
            //$("#footer-post").hide();
          }
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }

  $('#lightgallery img:not(".not-gallery-item")').each(function () {
    // wrap images with link and add caption if possible
    if ($(this).parent('a').length === 0) {
        $(this).wrap('<a class="gallery-item" href="' + $(this).attr('src') + '"></a>');
        if (this.alt) {
            $(this).after('<div class="has-text-centered is-size-6 has-text-grey caption img-describe">' + this.alt + '</div>');
        }
    }
  });
  $("#lightgallery").lightGallery({ selector: '.gallery-item'});


});
