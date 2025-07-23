jQuery(function () {
  var $owl = jQuery('.cp590 .ul');
  $owl.owlOneItemExt({
    items: 1, //화면에 보이는 개수
    margin: 2, //슬라이드 간격
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
    autowidth: false, //자동 넓이 설정
    autoHeight: true, //자동 높이 설정
    init_youtube_api: true, //youtube api 기초작업 여부
    lazyLoad: true,
    lazyLoadEager: 0,
  });
  window.owl = $owl;
});

// 체크박스 지우고 "오늘 하루 열지 않음" 을 클릭시 닫히게
window.addEventListener('DOMContentLoaded', (event) => {
    var $bottom_bar = $('.cp590').next();
    var $input = $bottom_bar.find('input').hide();
    var $span = $input.parent().css({'cursor':'pointer'});
    $span.click(function(e) {
        $input.prop('checked', true);
        $('#popup_close_btn').trigger('click');
    });
});