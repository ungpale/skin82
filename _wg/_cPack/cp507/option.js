// jquery.DB_topFloating.min.js
!(function ($) {
  $.fn.DB_topFloating = function (f) {
    var g = { layer: 'off', openType: 'slide', openDelayTime: 500, closeType: 'slide', autoCloseTime: 1000000000, slideSpeed: 800, day: 1, bugHeight: 0, cookieName: 'topFloating' };
    $.extend(g, f);
    return this.each(function () {
      var a = $(this);
      var b = a.find('.close');
      var c = a.find('.checkbox');
      var d = g.day;
      var e = g.cookieName;
      init();
      function init() {
        setCss();
        if ($.cookie(e) == 'hide') {
          a.hide();
        } else {
          setDelayOpen();
          setAutoClose();
          setMouseEvent();
        }
      }
      function setCss() {
        if (g.layer == 'on') {
          a.css({ position: 'absolute' });
        } else {
          a.css({ position: 'relative' });
        }
        if (g.openType == 'none') {
          a.show();
        }
      }
      function setDelayOpen() {
        if (g.openType == 'slide') {
          a.hide();
          setTimeout(openSlide, g.openDelayTime);
        }
      }
      function setAutoClose() {
        setTimeout(closeSlide, g.autoCloseTime + g.openDelayTime);
      }
      function openSlide() {
        a.slideDown(g.slideSpeed);
      }
      function closeSlide() {
        if (g.bugHeight == 0) {
          a.slideUp(g.slideSpeed);
        } else {
          a.animate({ 'margin-top': -g.bugHeight }, g.slideSpeed);
        }
      }
      function setMouseEvent() {
        b.bind('click', function () {
          c.find('input:checkbox').attr('checked', 'checked');
          if (g.closeType == 'slide') {
            closeSlide();
          } else {
            a.hide();
          }
          if (c.find('input:checkbox').is(':checked') == true) {
            $.cookie(e, 'hide', { path: '/', expires: d });
          }
        });
      }
    });
  };
})(jQuery);

//cp507 (최상단 슬라이드배너)
$('.cp507').DB_topFloating({
  layer: 'off', //본문과겹침(on:겹침, off:겹치지 않음)
  openType: 'none', //오픈형태(slide:밀림 , none: 없음)
  openDelayTime: 0, //페이지오픈후 딜레이되어 열림(slide인 경우)
  closeType: 'slide', //닫기형태(slide:밀림 , none:없음)
  autoCloseTime: 9999999, //자동닫기시간(밀리초)
  slideSpeed: 500, //모션속도(밀리초)
  day: 1, //보이지않기 기간(일)
  bugHeight: 0, //ie에서 버그가 발생할경우 배너높이값을 지정하세요(ex: bugHeight:100)
  cookieName: 'JS_topBnr',
});

jQuery(function () {
  var $owl = jQuery('.cp507_slide .ul');
  $owl.owlOneItemExt({
    items: 1, //화면에 보이는 개수
    margin: 0, //슬라이드 간격
    stagePadding: 0, //좌우측 보이는 정도
    smartSpeed: 500, //슬라이드 속도
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: true, //좌우화살표
    loop: true, //루프
    autoplay: true, //자동롤링
    autoplayTimeout: 6000, //자동롤링 시간간격 (1000=1초)
    autoplayHoverPause: true, //마우스오버시 정지
    rewind: false, //끝에서 되돌림
    center: true, //중앙정렬
    autowidth: true, //자동 넓이 설정
    autoHeight: true, //자동 높이 설정
    lazyLoad: true,
    slideTransition : 'cubic-bezier(0.87, 0, 0.13, 1)' //슬라이드 효과
  });
  window.owl = $owl;
});
