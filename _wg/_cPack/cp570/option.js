jQuery(function () {
  var $owl = jQuery('#cp570 .ul');
  $owl.owlOneItemExt({
    items: 1, //화면에 보이는 개수
    margin: 0, //슬라이드 간격
    stagePadding: 0, //좌우측 보이는 정도
    smartSpeed: 500, //슬라이드 속도
    animateIn: 'fadeIn', //페이드
    animateOut: 'fadeOut', //페이드
    nav: true, //방향키
    loop: true, //루프
    autoplay: true, //자동롤링
    autoplayTimeout: 10000, //자동롤링 시간간격 (1000=1초)
    autoplayHoverPause: false, //마우스오버시 정지
    rewind: false, //끝에서 되돌림
    center: true, //중앙정렬
    autowidth: false, //자동 넓이 설정
    autoHeight: true, //자동 높이 설정
    init_youtube_api: true, //youtube api 기초작업 여부
    lazyLoad: true,
  });
  window.owl = $owl;
});
