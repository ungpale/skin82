///////////////////////////////////////////////////////////////
// 메인분류메뉴
///////////////////////////////////////////////////////////////
$(function () {
  /*
    - 원하는 섹션에 class="move-page" 를 넣어주면 좌메뉴가 생성됩니다.
    - move-page 내 class="move-tit" 은 좌메뉴의 메뉴명으로 생성됩니다.
*/
  (function ($) {
    var $window = $(window);
    var $body = $(document);
    var $page = $('.move-page');
    var length = $page.length;
    if (length == 0) {
      return;
    }
    var $btn = $('.move-btn');
    $page.each(function () {
      var _name = $(this).find('.move-tit').html();
      if (_name == '') {
        _name = '메뉴명없음';
      }
      $btn.find('ul').append('<li>' + '<div>' + _name + '</div>' + '</li>');
    });
    var $btn_li = $btn.find('li');
    var speed = 700; //모션속도
    var delay = 200; //딜레이
    var dir = 'up';
    var current = null;
    var reClick = 1;
    var marginTop = 150; //상단 띄움(header 가 fixed되는경우)
    var responseHeight = 3; //좌메뉴와 섹션 연동위치(1~)

    $btn_li.bind('click', function () {
      $btn_li.removeClass('on');
      $(this).addClass('on');
      current = $btn_li.index($(this));
      movePage();
      reClick = 0;
    });

    function movePage() {
      var _top = $page.eq(current).offset().top - marginTop;
      if (_top - marginTop > $body.height() - $window.height()) {
        //console.log(_top,marginTop,$body.height(),$window.height(),$body.outerHeight(),$(document).height())
        _top = $body.height() - $window.height() - marginTop;
      }
      $('html,body')
        .stop()
        .animate({ scrollTop: _top }, speed, 'easeInOutExpo', function () {
          reClick = 1;
        });
    }

    $window.scroll(function () {
      windowScroll();
    });
    function windowScroll() {
      //스크롤드래그시 버튼선택조정
      if (reClick) {
        $('.move-page').each(function (index) {
          if ($(this).offset().top <= $window.scrollTop() + $window.height() / responseHeight) {
            $btn_li.eq(index).addClass('on').siblings().removeClass('on');
            current = index;
          }
        });
      }
      if ($page.eq(0).offset().top < $window.scrollTop() + $window.height() / responseHeight) {
        if ($page.eq(length - 1).offset().top + $page.eq(length - 1).height() / responseHeight < $window.scrollTop()) {
          $btn.removeClass('on');
        } else {
          $btn.addClass('on');
        }
      } else {
        $btn.removeClass('on');
      }
    }
    windowScroll();
  })(jQuery);
});
