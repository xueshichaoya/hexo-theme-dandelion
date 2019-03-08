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


$(document).ready(function () {

  $("[rel='shortcut icon']").attr("href", "/images/favicon-dark-yellow-32x32.png");

  if ($('.aniview').length > 0) {
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
  if ($('#about').length > 0) {

    /*<![CDATA[*/

    $(function () {
      $('#about').t({
        blink: 400,
        delay: 0.03,
        speed_vary: true, // 'human like' speed variation [default:false]
        blink_perm: true,
        mistype: 30,
        speed: 70,
        beep: false,
        caret: '&nbsp;',
        pause_on_click: false,
        pause_on_tab_switch: false,
        typing: function (elem, chars_total, chars_left, _char) {
          if (_char == '*') foo();
        },
        fin: function (elm) {
          $('#about').find('.t-caret').css({
            opacity: 0
          });
        }
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
  if ($('#toc a[href^=\'#\']').length > 0) {
    scrollFloor({
      floorClass: 'article.post :header[id]',
      navClass: '#toc a[href^=\'#\']',
      activeClass: 'active',
      activeTop: 5,
      scrollTop: 0,
      delayTime: 200
    });
  }

  if ($('#index-top-icon-tablet').length) {
    $(window).on("scroll", function () {
      var headerDistance = $(window).scrollTop();
      if (headerDistance < 300) {
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

    menuIcon.click(function () {
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
      $(window).on("scroll", function () {
        var topDistance = menu.offset().top;
        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 50) {
          nav.hide();
        }
        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if (!$("#menu-icon").is(":visible") && topDistance < 50) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }


    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($("#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop) {
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          if (topDistance < lastScrollTop - 10) {
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
  $("#lightgallery").lightGallery({
    selector: '.gallery-item'
  });



  $.fn.getThemeColor = function() {

    var rgb = $(this).css('background-color');
    if (rgb >= 0) return rgb; //如果是一个hex值则直接返回
    else {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    return rgb;
  };

  var themeColor = $('#top-bg-bar').getThemeColor();
  //var mapColorIcon=new Map([['#00ffe5','trans-cyan1'],['#f22e6a','trans-red'],['#fcfc4c','trans-yellow'],['#fc3c6c','trans-red1'],['#f8bd1f','trans-orange'],['#00ffff','trans-cyan2'],['#2edba5','trans-green'],['#13f3b6','trans-green1'],['#ffff00','trans-yellow1']]);
  //var icon="/images/favicon-"+mapColorIcon.get(themeColor)+"-48x48.png";
  var mapColorIcon=new Map([['#00ffe5','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAAE/klEQVRoge2aO47jRhCGPwoLB040iRM6kHyClROnwwMYWO0JTAPOV3OC5ZzAmhMslRtYTeDEEecElk5gKhDhUIz8ABbtoIujZrObD1HAwMD+wGAh9qOqup5dvYFSiv8zJi/NwFh8FuCl8aprQkBxA8RAJH9Ta8oByICtItxelbseCHxOLIyvgR8G7HcA1opw3UlY77+wPp8U4W4APbcAAcUSSGmedl/sgdhmJqCYAyu0Jl+3rH9EazTtItQQIKCIgQ9DuPWgRAuxFcYThmkTtEaTNkFqAvRgfo+295P8nqNPc9ay5gHtQ5dqE+AJWCrCkz3wLEBAsQB+92ywQZ9EbthurghzWRuhT/h2BJNd2AORLYQpwI6mXZbAEtihbTfmfNolMDc3DChWwM89mCmBrexr+kkk9Hz+0RAiUEr5TKeUDRFitpmUspntqK69TNyjI1XDHIw9InQEdAnyqAiXtgCu079D23vG2X6f0NEpxzAhBwMuIQ5oO+4dJgOKFLfjvz3nHHWco47K+suVUqCOmfFtpZSi7x/qmBprd6jjzZD1nn1q/CmlmHA2ExOJqLFyyvs+ycmEIozRGtvgcL4BWKG1Z2ImuYoJOhTayNAOC9rWBzFfQRFGijAewTyyNnEMPQsQORblnAXbjWHgGpBEZmshAncxV8q/K3T0WY1lQHLHkrq2dwOLv4y6Q89AC2Cf7hRAosWcERDGE+CdZ/wArHoKkjvWRxPqiaQamA9h1MPcDfrUnMwLZsDHgCLx7BEFFD8FFN8Dn1xzXuGQDK3uixzXQEZ7xWnifUCxu6TwC1DHOfCH9f2gCOc9iTs29WbjA2eNR9QLvBLNeELPwk8RBlUmzmgWYndDY3+FgCKnXnqU6GJwbc1LGV5iV/hLEX5ZCbAEPjomfTv4huSuat/6HDWg2AJvHEMbtHm3FXffmNVoRlMLJbDw1TwehmLq5rNXhPbV0Zx/I4ya9VZs0pRD+Q34ylq+MbsSK845oMIU2AqRvphbv1tDpCTJyrQeJHvn1pwd8B3wt7U8mliTXEnrNboC7Qs7r+SuSRbWaDPzJk0R6lfr82xiTUrRV0AbbwKKvg5t+4zXfAy6p57J7Bf7Q6OxJafw6Fj8Tuy7i5mMuikuPVMvwZ/2B19nLkZf32x8EIfqgnmaMynNrwGbdukUQBwrounUAFkPIVLrd9KDuVZIILF9ZOvtjbYIMQXStsgkZvRkfLq9ghbWNO/laWtztyMydTldYhPrmO+F+J6dsR8UYdbZnZbIdO8YupVSwLcuo66Fma/qbIO0auy6ao8ckLe569goxV23/Ohr/UllaRaKgzK7h2atnTPkfWCFPzJFrgXCqKm9KT1MKaC4kdKmlXkYIIDh1PbdFHS54YxMijChLvhtmynJYeQ067KqK1dvpA195BNGM9wPHQtnA9ZdoTYqXRHsvYOssy8KFzwxCdHYMTRDC1aD8VDyjzX0HIoDioV0B13MbxSh82DgAg0YjPkauRtpalUnn3Ku5/8FvjDnos3FxXiJvvCnrXyMeSduiUx36KJuy2XvAnt0HzXv5GHsQ7enMdyGAghbxu/F8XvhGs+sEe7w6sJGEX5NPcFV2KMdOxlCfLQA4lwx7sLPxF3lG+gS25x/L4466P6tGbig5e1pgy9Qx5OjFX5CHWPH/KW03Rdj6I72ARPGo3h1icmAdEhTYDDNz/9b5YXxH46C/Ug3SB7KAAAAAElFTkSuQmCC'],['#f22e6a','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAAFCElEQVRoge2aPW7jRhTHfzaMBAhA2HVSSHuB0NsE6cwDBFjtCZYBUoXFyicwdYLIBeul+wCrLVKHPkE0J4jcBAHSiGGRIECgFPNoj4Yz/JIAY4H8gcUuxfn4v3mf87gnu92Ojxmnz03gUPwvwHPjrGtAFSYXQAxE8ufcGvIAFMAqUNnqqOx64MTnxEJ8CbwZsN4DsAxUtuwaKOtfWj9vA5WtB+znFqAKkxmQ0zztvlBAbJOpwmQKzNGaDFvmf0BrNO/aqCFAFSYx8G4IWw9KtBArIZ4yTJugNZq2CbInQA/yCm3vW3meok9z0jLnFu1DY7UJcA/MApVt7RePAlRhcgn84lngDn0SG8N2N4HKNjI3Qp/w1QEku6CAyBbCFGBN0y5LYAas0bYb83TaJTA1F6zCZA780INMCaxkXdNPItnP5x8NIc5k49hDPpJ/r3GbydQkEKhsWYXJlnYzXKAjVcMc0OaZikaXDk4hOrjM6h9Odrud7/SvZcGCJ/u9lwU2GCZkw+NLD2g77h0mqzDJcTv+6zrnnPz55fdT4Fd7s0Bl0ypMCp7s+rpPfPds7rTfEevs8QNdSkSOebUaa/KLIeQBApXFaI3dMZK8YI7WnomJ5CrO0HZso0BHFdC+MIh8jUBl0Zh51hrbKkxSmiY5A1ZODYhtT+VxfcDpHQWSyGwtROAu5kr5e44OdfNDCUjumLGv7fXA4q9g3xcmoAWwT/ccQKLFlAMgxFPgref9AzDvKcjGMT86ZT+R1C+mQ4h6yF2gT81JXjAB3ouNu9aIqjD5rgqTb4B/XWPOcEiGVvcoxzVQ0F5xmripwmQ9pvBrzQM9N2+gpSh84EnjEfsFXokmntKz8AtUdlJn4oJmITYocZmowmTDfulRoovBpTUuZ3iJXeOvQGWf1QLMgPeOQS+H3pA8Ve1rn6NWYbICXjle3aHNu624e3EKIIvfOwYUIxzaviaqjigT8xS6ER4vApXFgcrSQGWXwEvgD8fc1OxKzK2FQNviSiJKX0yt59YQKUmyNq3bQGWRXSSKFXwF/G1Nj06tQa6kVZewfWHnlY1rkIUl2sy8SVOE+sn6eXJqDcrRV0Abr6ow6evQts/YJuUit+2ZzH60f2g0tuQUPjgmv5Xw2EWmYN8UZ56hY/C7/YOvMxeja3gb7yTKdME8zYmU5seAvXfpFEAcK6Lp1KAjU5cQufWc9iDXCgkkto+svL3RFiHOgbwtMokZmWH56ghaWNK8l+etzd2OyNTldKm9Wcd4L8T37Ix9G6is6OxOS2RaOF5dSSngm1ewr4WJr+psg7Rq7LpKIQfUq70eqCxFp3Ybbzoik/1uPiSzywHZfaa6ZbmFYd8H5vgjU+SaIMnH1N45PUypCpMLKTBtsynRDYLHXNNbAMOp7bsp6HLDGZlEe6bgV22mJIexoVkd162ZvUQ56AuNCDFjeM0UW883LoFFsJ9p3gec5KHlA0cbWspvJdWjOfYCHbG+Bj51kNqKMDnusvlOekxOjBJAiPkauY8bOoj9A3xijkWby41jnRJ94c/beIwWQAjmuG9U1+iibsW47wIK3UfddA08SADwtuXb8Bvwecv7hTh+LxzjM2uEO7y6cBeo7Avctz+FvsKmQzY/WACJTDHuws/EteGMdiRbBCq7HHr/hiN96JaNI9xClMC3ZkfCEHrUqZs42AdMGB/F60tMAeR9nHEsjirAc+Cj/78S/wEVMkZstr9lLAAAAABJRU5ErkJggg=='],['#fcfc4c','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAAE80lEQVRoge2aPW7jRhiGH3sWCZDGbtIkhZQTrNME6cwDLLHaE4QB0q98AtMniHyCpfoAK4NIkyb0CSKdIHQTpDSrDYIdKMV8tIbDGf5IAowF8gKLhcj5ed+Z72+GPtlut3zKOH1uAofifwHPjRd9DbSOz4EEiOTfmdPkASiAlVL56qjsBuAk5MRCfAH8MGK8B2ChVL7oayjjXziPH5XK1yPm8wvQOp4BGe3VHooNkLhktI6nwByzky87+t9hdjTrm6glQOs4Ad6NYRtAhRGxEuIp43YTzI6mXUIaAgaQ32Ds/VF+TzGrOenoc4vxoX13E+AemCmVP7ovngRoHV8AfwQGWGJWorRst1QqL6VvhFnhywNI9mEDRK4IW8Catl1WwAxYY2w3YbfaFTC1B9Q6ngM/DyBTASsZ1/aTSOYL+UdLxMl2uw2ZTiUDIpO5ZlLJYK6j+saycYOJVC1zsMaIMBHQJ+ROqXzmCvCt/hXG3gt29nuPiU4llgl5CPhEPGDseHCY1DrO8Dv+mzrnnHz8+GoK/OlOplQ+1Tou2Nn11ZD4Hpjca797jNPgB6aUiDz9UtnGmvzNGPIASuUJZseW7EleMMfsno2J5CpOMaHQRYFxWDC2Pop8DaXySKk8OYA80jf1vHoSEHk6leyErQ8hcAxIInN3IQJ/MVfJ/3NM9JkfSkByx4zmbq9HFn8FTV+YgBHgru4ZgESLKQdAiKfA28D7B2A+UEjp6R+d0kwk9YvpGKIBcueYVfOSF0yA91rHaWCMSOv4J63jV4D2tXmBRxlmu/dyXAsF3RWnjWut4/U+hV9nHhg4eQsd2fiB3Y5HNAu8CkM8ZWDhp1R+UmfignYhNipx2dA6LmmWHhWmGFw47TLGl9g1PiiVf1ELmAHvPY2+HXtCClS1b0KOqnW8Al57Xi0x5t1V3H1jV6MF7V2ogItQzRMglNA0n41SuXt0tNufC1G73krsOWVRfgO+dLov7VuJObscUOMMWMkkQzF1fneGSEmStWndSvYunTZr4DvgH6d7dOo08iWtl5gKdCjcvFL6GjlYYMwsmDRF1K/O48mp0yjDHAFdvNY6HurQrs8Ezcea93FgMvvFfdC62JJVuPN0fiv23UemoGmKs0DTffC3+yB0M5dgangX78Sh+mCv5kRK82PAnbvyChDHimg7NUAxQETm/E4HkOuEBBLXR1bBu9EOEWdA1hWZxIzurUeXR9iFBe1zedZ5udsTmfqcLnUn62kfhPiem7FvlcqL3ttpiUw3nleXUgqE+hU0d2ESqjq7IFc1bl21QRYoeLnrGSjDX7f8GLr6k8rSLhRHZfbAnI3rnDHfB+aEI1Pk6yBE7d07Y4ApaR2fS2nTSR5GCLCc2j2bgik3vJFJqTylKfyyy5RkMUradVl9NdNIlKO+0IiIGeNrpsT5fe0TLMJ+p30e8JKHET7gTBQqv1uVp4haAd8Dn3tIPYqYDH/ZvJQ7Ji/2EiDEQhe5TxN6iP0LfGa3xZjLtWecCnPgz7p47C1ACGb4I9MVpqhbsd93gQ3mHrXsa3iQAAhey3fhL+Crjvc34viDcIzPrBH+8OrDUqn8a5oJrsYGc4RNx0x+sACJTAn+ws/GleWMbiS7USq/GHv+hiN96JaJI/wiKky2Xljta9F7rbqNg33AhvVRvD7EFEA25lJgLI4q4Dnwyf+txH82n03nLtYnVgAAAABJRU5ErkJggg=='],['#fc3c6c','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAAFC0lEQVRoge2aTW7bRhTHfzaNFsjGXrcLKSeIsym6KGEeoECUE4QFuiwR+QSmTlAZPEDofYEoi65LgweodILKmyJAN+KqRRFCXcyjNRrO8EsCjAD9A0FCcT7+b97nPOZku93yOeP0qQkciv8FeGqctQ0o/egCCIFA/pwbQx6ADFh4ebI4KrsOOHE5sRCfA296rPcAzL08mbcNlPUvjZ83Xp4se+xnF6D0owmQUj/trlgBoUmm9KMxMEVp8kXD/A8ojaZtG9UEKP0oBN71YetAgRJiIcRj+mkTlEbjJkH2BOhAfoWy9408j1GnOWqYc4vyoaHaBLgHJl6ebMwXjwKUfnQJ/O5Y4A51EmvNdtdenqxlboA64asDSLZhBQSmELoAS+p2WQATYImy3ZDdaRfAWF+w9KMp8HMHMgWwkHV1PwlkP5d/1IQ4k41DB/lA/r3EbiZjnYCXJ/PSjzY0m+EMFalq5oAyz1g0OrdweoEKLpPqh5Ptdus6/WtZMGNnv/eywBrNhEw4fOkBZcedw2TpRyl2x39d5ZyTT9/9NAb+MDfz8mRc+lHGzq6vu8R3x+ZW+x2wzh4/UKVEYJlXqbEiP+tDHsDLkxClsTsGkhdMUdrTMZJcxRnKjk1kqKgCyhd6ka/g5UkwZJ6xxqb0o5i6SU6AhVUDYttjeVwecHpHgSQyUwsB2Iu5Qv6eokLd9FACkjsm7Gt72bP4y9j3hREoAczTPQeQaDHmAAjxGHjreP8ATDsKsrbMD07ZTyTVi3Efog5yF6hTs5IXjID3YuO2NYLSj34s/eh7oLSNOcMiGUrdgxxXQ0ZzxanjpvSj5ZDCrzEPdNy8hoai8IGdxgP2C7wCRTymY+Hn5clJlYkz6oVYr8Slo/SjNfulR4EqBufGuJT+JXaFv708eVYJMAHeWwa97HtDclS1r12OWvrRAnhleXWHMu+m4u75KYAsfm8ZkA1waPOauGqJMiG70I3weO7lSejlSezlySXwEvjLMjfWuxJTYyFQtriQiNIVY+O5MURKkqxM69bLk8AsEsUKvgH+MaYHp8YgW9KqStiuMPPK2jbIwBxlZs6kKUL9avw8OjUGpagroIlXpR91dWjTZ0yTspHbdExmv5g/1BpbcgofLJPfSnhsI5Oxb4oTx9Ah+Gj+4OrMhaga3sQ7iTJt0E9zJKX5MWDuXVgFEMcKqDs1qMjUJkRqPMcdyDVCAonpIwtnb7RBiHMgbYpMYkZ6WL46ghbm1O/laWNztyUytTldbG7WMt4J8T0zY996eZK1dqclMs0sr66kFHDNy9jXwshVdTZBWjVmXbVCDqhTe93LkxiV2k28aYlM5rtpn8wuB2T2maqW5Qb6fR+Y4o5MgW2CJB9de+d0MKXSjy6kwDTNpkA1CB5zTWcBNKc276agyg1rZBLt6YJfNZmSHMaaenVctWb2EmWvLzQixIT+NVNoPN/YBBbBfqN+H7CSh4YPHE1oKL9XUj3qYy9QEetb4EsLqY0Ik2Ivm++kx2TFIAGEmKuR+7ihhdi/wBf6WJS53FjWKVAX/rSJx2ABhGCK/UZ1jSrqFgz7LrBC9VHXbQMPEgCcbfkm/Al81fB+Jo7fCcf4zBpgD6823Hl58jX2298KdYWN+2x+sAASmULshZ+Oa80ZzUg28/Lksu/9G470oVs2DrALUQA/6B0JTehBp67jYB/QoX0Ury4xGZB2ccahOKoAT4HP/v9K/Ac4gEU0+lRuuwAAAABJRU5ErkJggg=='],['#f8bd1f','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAAE+klEQVRoge2aTW7bRhiGHxtGCXRjr9uFJieIsym6M8F1gSgnqAp0H/kEpk5Q+QSh9wUiL7osS5+g0gk63hQFuhFXCQsU6mI+xcPhDP8kwAjQFwgCivPzvjPf3wx9stvt+Jxx+twEDsX/Ap4bZ10NqlxdADMgln/nTpNHoABWUaJXR2XXAychJxbiS+D7AeM9Asso0cuuhjL+pfPzNkr0esB8fgFVrqZARnO1+2IDzFwyVa4UMMfs5MuW/veYHc26JmoIqHI1A94NYRtAiRGxEuIpw3YTzI6mbUJqAnqQ32DsfSvPCrOak5Y+txgfGrubAA/ANEr01n3xSUCVq0vg98AAd5iV0Jbt6ijRWvrGmBW+OoBkFzZA7IqwBaxp2mUJTIE1xnZnPK12CSh7wCpXc+CnHmRKYCXj2n4Sy3wh/2iIONntdiHTKWVAZDLXTEoZzHVU31g2FphI1TAHa4wYEwF9Qu6jRE9dAb7Vv8bYe8GT/T5gopPGMiEPAZ+IR4wd9w6TVa4y/I7/Zp9zTj7+OlHAH+5kUaJVlauCJ7u+7hPfA5N77XfEODV+YEqJ2NMvlW3ck18MIQ8QJXqG2bE7RpIXzDG7Z2MiuYozTCh0UWCiChhbH0R+jyjR8Zh+zhjbKlcpTZOcAivvDohtK3lcH7B6R4EkMncXYvAXc6X8P8dEn/mhBCR3TKnv9npg8VdQ94UJGAHu6p4DSLRQHAAhngJvA+8fgXlPIdrTPz6lnkj2L9QQogFyF5hV85IXTID3YuO+MeIqVz9WufoO+NfX5gyPMsx2j3JcCwXtFaeNmypX6zGFX2se6Dl5Ay3Z+JGnHY+pF3glhnhKz8IvSvTJPhMXNAuxQYnLRpUrTb30KDHF4NJplzG8xN7jQ5ToL/cCpsB7T6NXQ09Igar2TchRq1ytgNeeV3cY824r7l6cAsjgD54GxQiHdo+Jm44oM+MpdCM8XkSJnkWJTqNEXwKvgL89fVP7VmLuDATGFlcSUfpCOc+tIVKS5N60bqNEx26RKFbwDfDR6R6fOo18SeslpgLtCzevaF8jB0uMmQWTpoj6xfl5cuo0yjBHQBevq1z1dWjXZ1yT8pHb9kxmP7s/NC62ZBXuPZ3fSnjsIlNQN8VpoOkY/OX+ELqZm2FqeBfvJMp0wV7NiZTmx4A7d+kVII4V03RqMJGpS0TmPKc9yLVCAonrI6vg3WiLiHMga4tMYkZ2WL46wi4saZ7Ls9bL3Y7I1OV0qTtZR/sgxPfcjH0bJbrovJ2WyLTwvLqSUiDUr6C+C5NQ1dkGuapx66oNskDBy13PQBn+uuWH0NWfZHG7UCyBy9BtRs85a9c5Q74PzAlHptjXQYjau3dOD1OqcnUhBWYreRggwHJq92wKptzwRqYo0Sl14VdtpiSLoWlWx/urmVqiHPSFRkRMGV4zzZznG59gEfYbzfOAlzwM8AFnolD5vZHq0W57gYlY3wKRh9RWxGT4y+Y7uWPyYpQAIRa6yP00oYfYP8AXdluMudx4xikxB/6sjcdoAUIwwx+ZrjFF3Ypx3wU2mHtU3dXwIAEQvJZvw5/AVy3vF+L4vXCMz6wx/vDqw12U6K/xn/42mCNsOmTygwVIZJrhL/xsXFvO6EayRZToy6HnbzjSh26ZOMYvosRk66XVfi961KrbONgHbFgfxfeHmALI+pYOY3BUAc+Bz/5vJf4DUC9L37qOvHcAAAAASUVORK5CYII='],['#00ffff','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAADv0lEQVRoge2aPZLjNhCFP05tbt5gdAQdgQdwoNDZKnC+OgKPIJ9geQBXWUfg3kC+ATfYxBE32Z/A1Q7YmgHBbpAgtTO1Ve4qjEpCo9Gv0XhoglOICD+zPLy2A1vlfwCvLbMACigLOBVwKaAvQKLWFdAUcHgJhyf+eZu4gBI4A28z7H0EzjKMS0882N9HP/cC14z5QEQmDZEDIr3ZuaxdEdkbdneInLU/Nf6CyHHJVNYPxw2Oh61H5BA43qyw0c0BGaVQAUfgfWLB/gZaoNfvO6ACHhNj/mCw+0tWaozlA3CQ53mfJYj8PhGJBpGd6pWIVLfv+luFSHunlUulZemmkJOXvTpXIlLrkoZ9ZWTslJFejepXQasdP1wQtz9W3ve6KvvI8VH/ij1UW5GMbFQJIBcLgKV8UudDNmrVwVEKLQTRWYBngHgb//Ckw8AQk8nUQJjXpw2Tm/m7AUQXArCidYvy07KvnLxVB1Y5rzZK7BQ+3ADURmfI25PN+tLNCXIjIjwoj4+pFTrleICryb8vKAINQ5kSSgXwxtD/rJ8n4KKfm0TrngPPQYEhMJcMMy3jukwPz6HuGC3PHZe+ZKh9PKWOgFFmbFmpXj1gVH/FOFKrRKPeAu8Sao/AXwXUjo2qgN8L+BX41zZhb5AsynQiNldx2qySV/hVyXPgzqxxS5mLtrhc7xkOz8VlvM41ObA2rwJT3u4texmRttqXEMDBUco6+tWWVdW6GxWDRLQ1zBd3u9CQtQo9iZpnYfpcZ/RLpvXWLtLZI/KPA3KkZOVfVh3DlO7qjDHnhM4Oka9RRxcreZvvMudEYCN+JjguGFOy4DxA5M8lDngHjxudaHy1ZtxC278tVfQ21mw0dXyYit0dAcTBEe9i68jwAB/L+2J6l2NJWOM8FkbBuFLiuT/P5aW1qc1HyZlItXeIvvVckD5H2MBMTGm52gjAcnaSUtZAj5mSUTWMdxuct3w4a98iA1YpK+hTUcYq1Cuct65qnjJg6xIKCWZiWihmnezOnKM9mAOgxK9LqozVaxfO5ZU2+0g3azm9G4IkMxnA64RuhU8c1kVadk56zNThMBN2hWo54+01l/WyAeggr/yeVJ5BOnzznFKAXno2M77kA9CB3kVuE+jEjn2PdRNR71lWCK4DoIM9ZrrdOq99y3NlIVttAqAGch/eP83015nzbwaQolczvbAp0mSZHw5AjXjMNEqrCHSonxX1uwOYAWFuRgYmWxX1sLnvideI3sYdeX7p3QKNXhb/ELkrgNeQn/5/Jf4DFMrEIssElSwAAAAASUVORK5CYII='],['#2edba5','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAAFBklEQVRoge2aPWvkRhjHf15MAmnsOil2D1RHviaksz5A4PZaNadA+lt/AsufIOtPcHIRVYFbF6kjf4Ls1BFk3YRAmlWVEAibYh7Zs6MZve3CcZA/GFuat/8z87zNI5/sdjs+Zkw+NIFD8b8AHxqnXR3CMj8HEiCSnzOryyNQACsVxKujsuuBE58RC/El8GbAfI/AUgXxsqujzH9hvd6qIF4PWM8tQFjmcyCjudt9oYDEJhOW+QxYoE8ybBl/jz7RrGuhhgBhmSfAuyFsPajQQqyEeMqw0wR9ommbIHsC9CCv0Pq+lecZejenLWNu0TY09jQBHoC5CuKt3fAkQFjmF8Avngnu0DuxMXR3o4J4I2Mj9A5fHkCyCwqIbCFMAdY09bIC5sAarbsJz7tdATNzwrDMF8D3PchUwErmNe0kkvV89tEQ4lQWTjzkI/l7jVtNZiYBFcTLsMy3tKvhDdpTNdQBrZ6pnOjSwSlEO5d5/eJkt9v5dv9KJix41t8HmWCDoUI2PLb0iNbj3m4yLPMMt+G/rmPOyZe//jADfrMXU0E8C8u84Fmvr/r4d8/iTv0dMc8eP9CpROQYVx9jTf5mCHkAFcQJ+sTuGElesECfnompxCpO0Xpso0B7FdC2MIh8DRXE0Zhx1hzbsMxTmio5B1bOExDdnsnj+oDdOwokkNmnEIE7mavk9wLt6haHEpDYMWf/tNcDk7+CfVuYghbA3t0zAPEWMw6AEE+Bt572R2DRU5CNY3w0YT+Q1A2zIUQ95M7Ru+YkL5gC70XHXXNEYZl/F5b5N8C/rj6nOCRDH/cowzVQ0J5xmrgOy3w9JvGbyEI2DtJ7T2QHbYj38lNZbZmkImt6kldBXNSRuKCZiA0KXCbCMt+wn3pU6GRwafXL+pJ14C8VxJ/VAsyB945OL4fekDxZ7WufoYZlvgJeOZru0Ordlty9mADI5A+ODsUIg7aviarDyyTsq9MD8EIFcaKCOFVBfAG8BP50jE3NqsSCpl6eASvxKH0xs55bXaQEyVq1blUQR3aSKFrwFfC3NTyaWJ1cxlunsH1hx5WNq5OFJVrNvM5DhPrJej2dWJ0y9BXQxquwzPsatG0ztkq5yG17BrMf7ReNwpbswr1j8Ftxj11kCvZVce7pOgZ/2C98lbkEncPbeCdepgvmbk4lNT8G7LUrpwBiWBFNowbtmbqEyKzntAe5VogjsW1k5a2Ntghxho6aXs8kamS65csjnMKS5r08ay3udnimLqNL7cU6+nshtmdH7FsVxEVndVo8042j6VJSAd+4gv1TmPqyzjZIfmTfxhSyQb3K6yqIU3Rot/GmwzPZbYshkV02yK4z1SXLLQz7PrDA75ki1wAJPubpndFDlcIyP5cE01abCl0geIo1vQUwjNq+m4JON5yeSU7PFPyyTZVkMzY0s+O6NLMXKAd9oREh5gzPmRLr+dolsAj2M81CsJM8tHzgaENL+q0kezT7nqM91tfApw5SWxEmw50230mNyYlRAggxXyH3aUEHsX+AT8y+aHW5dsxToS/8WRuP0QIIwQz3jeoKndStGPddQKHrqJuujgcJAN6yfBt+Bz5vab8Rw++FY3xmjXC7VxfuVBB/gfv2p9BX2HTI4gcLIJ4pwZ34mbgyjNH2ZDcqiC+G3r/hSB+6ZeEItxAV8K1ZkTCEHrXrJg62ARPGR/H6ElMAWR9jHIujCvAh8NH/r8R/T2REY9CIC+cAAAAASUVORK5CYII='],['#13f3b6','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAAFBElEQVRoge2aTYrjRhiGn26aBIKgG6JVsrDnBNOzCdm1toLAeE4QB7If9wlafYK4TzDyPjDuRaJl1CeIfYK4NyEwWlhEkGEgOIv6NC6VqvRnQzOQF4ZBVv28b9X3V6U+2e12fMo4fWoCh+J/AU+Ns7YGfpFcAFMgkH/nRpNHIAWWmRcuj8quA05cTizE58D3PcZ7BOaZF87bGsr4l8bP28wLVz3mswvwi2QCxNRXuyvWwNQk4xfJGJihdvJ5Q/971I7GbRPVBPhFMgXe9GHrQI4SsRTiEf12E9SORk1CKgI6kF+j7H0rz2PUao4a+tyhfGjobgI8AJPMC7fmi48C/CK5BH53DLBArcRGs91N5oUb6RugVvjqAJJtWAOBKUIXsKJulzkwAVYo252yX+0cGOsD+kUyA37qQCYHljKu7ieBzOfyj5qIk91u5zKdXAZEJjPNJJfBTEe1jaXjFhWpauagjRGgIqBNyH3mhRNTgG31r1H2nrK33wdUdNqgmZCFgE3EI8qOO4dJv0hi7I7/qsw5J1/+/esY+MOcLPPCsV8kKXu7vu4S3x2TW+13wDgVfqBKicDSL5JtLMnf9iEPkHnhFLVjCwaSF8xQu6djJLmKM1QoNJGiogooW+9FvkTmhcGQfsYYW79IIuomOQGW1h0Q2x7L4+qA1TsKJJGZuxCAvZjL5f8ZKvrMDiUguWNCdbdXPYu/lKovjEAJMFf3HECixZgDIMQj4LXj/SMw6yhkY+kfnFJNJOWLcR+iDnIXqFWzkheMgLdi47YxAr9IfvSL5DvgX1ubMyzKUNs9yHE1pDRXnDpu/CJZDSn8GvNAx8lraMjGj+x3PKBa4OUo4hEdC7/MC0/KTJxSL8R6JS4dfpFsqJYeOaoYnBvtYvqX2CX+ybzwi1LABHhrafSi7wnJUdW+cjmqXyRL4KXl1QJl3k3F3bNTABn8wdIgHeDQ5jFx3RJlpuxDN8LjWeaF08wLo8wLL4EXwDtL30i/lZgZA4GyxaVElK4YG8+NIVKSZGlad5kXBmaRKFbwDfDe6B6cGo1sSes5qgLtCjOvbGyNDMxRZuZMmiLqF+Pn0anRKEYdAU289Iukq0ObPmOalI3ctmMy+9n8oXaxJatwb+n8WsJjG5mUqilOHE2H4C/zB9fN3BRVw5t4I1GmDfpqjqQ0PwbMuXOrAHGsgLpTg4pMbSJi4znqQK4REkhMH1k670YbRJwDcVNkEjPSw/LVEXZhTv1cHjde7rZEpjani8zJWto7Ib5nZuy7zAvT1ttpiUy3lldXUgq4+qVUd2HkqjqbIFc1Zl21RhbIeblrGSjGXrf84Lr6kyyuF4o5cOm6zeg4Z+U6p8/3gRnuyBTYOghRfffO6WBKfpFcSIHZSB56CNCc2jybgio3rJEp88KIqvCrJlOSxdhQr47Lq5lKouz1hUZETOhfM02N5xubYBH2G/XzgJU89PABYyJX+b2W6lFve4GKWN8Cn1tIbUVMjL1sXsgdkxWDBAgx10XuxwktxD4An+ltUeZyYxknRx344yYegwUIwRh7ZLpGFXVLhn0XWKPuUTdtDQ8SAM5r+Sb8CXzV8P5WHL8TjvGZNcAeXm1YZF74NfbT3xp1hI36TH6wAIlMU+yFn45rzRnNSHabeeFl3/M3HOlDt0wcYBeRo7L1XGtfih606joO9gEd2kfx8hCTAnHX0mEIjirgKfDJ/63Efx9cTS9d1GIuAAAAAElFTkSuQmCC'],['#ffff00','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAHFAAABxQG6eNsrAAADuElEQVRoge1au43cMBB9PDi3OjiVsCWoAAcKnVmBc28JKmFdwakAA1YJcgfrDuTAiSNd4k9gPAek9rjkkCIl3R0O8ACDxYrD4byZ4WjIXUUSL5luntuArfQfwHNTAgBVAOoIqB5QE6Do8AioDlD1YxsrWhfexKoAcALwLkPfNz2Hp4SlCwAH5+EE8JyxHkBSYNQkJnEojc8kDoLeksTJjMfm9ySalIUk45sNhts8aUdcDO9W6BiXgDgppBoAd5GAfQUw6FADAEoAFYDbyJyPABoAr7NS45q+AKgBTt6I5flDBGinvUiQKEhUD98J833YKXKxtCwiKSTm5WSMK0i0JqT2mKMQx4z06ox8ZXEbsCMIIpb3k4nKwTHcGc/eQ63kSUdHFQHSSwAk4aMx3q5GgzHQSaEkEKMMOAqkCwzVFgCU8mIEr/P6uGFxMX83gBhtAJK3Zi9bYV+1+GAMWGk8oeeKKVzPAFphsLSQC5v1qVl0ckcSN6aOu8V1NDUeAM5i/X1SYgfdpthUAcArQfrefB4B9OZzI6kCQI0HpwDaMX2GkgHXfZl+eVL3HU54dgt9Qd37hERGWhVlQZeU6tWN9oTnsdJ/lkuqMF77EBG6BfAZUG1ARwWo94B6A+CvKBLYIJklU/TYUscpVhXmNX7VPEEI7e5VY06Z3rDbrk/acTlt/MObeNg3Cl7dnmR9q1rsmX/aAOqAUOarn6Dc1UY2qlREQAOuZTwVS1uRFIWJ0Z4nKX3OC/IF/X7LWRMHEj8kkK6QlH+ZfYxX7tqMOaeITEnil/N4XPLezP2yERcd7pmgSZhTMOl9gE/uI0ko9OKJeOdqfrVuXpLutwkACIY3VoI3CV6n4rgjANc5DF1sNdAHeJfuAOXe5Uhk9zi3+o26C7lr3y/lpbSpA0fJqKeGHbwvnQu6pUkbKpNXlquNADrhcZUysQkMLXjVi8K4wXjJhhMp3syJCtrAUJcZhXaF8dJVzSUDtoaQjFYmr1HMfLOLa17twRwABcN9SZURvSFxLTd6nvGZAC6KxxTFzjwXeBuRrRguHN4amQAIhivTyGBlEjtU6VbPjZZtvKh7BQCC4fZb6Dwv6fA7bBQOQpRm7mK2rARAMHyRay3oGfbHlw16fWJC67IBAMFwZZpvnTOOh150yhTBjQCISOhD/H1hvM1RtgeAWHl1uTNzhoDXs4+wOwAgGK5MNluHeq9RzPL6IwCIgghsRtRrvW5z5HfiNaQK6LPE/KP3AKAzl8WPQjsDeHp68f+V+Ac8xsQivmvR2AAAAABJRU5ErkJggg==']]);
  var icon=mapColorIcon.get(themeColor);
  $("#shortcut-icon]").attr('href',icon);

});