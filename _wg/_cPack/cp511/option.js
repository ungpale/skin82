jQuery(function () {
  var $owl2 = jQuery('#cp511 .ul');
  $owl2.owlTimer({
    items: 1, //화면에 보이는 개수
    margin: 0, //슬라이드 간격
    stagePadding: 0, //좌우측 보이는 정도
    smartSpeed: 500, //슬라이드 속도
    nav: true, //좌우화살표
    loop: true, //루프
    autoplay: true, //자동롤링
    autoplayTimeout: 6000, //자동롤링 시간간격 (1000=1초)
    autoplayHoverPause: true, //마우스오버시 정지
    video: true, //비디오재생
    lazyLoad: false, //레이지로드
    center: true, //중앙정렬
    autowidth: true, //자동 넓이 설정
    autoHeight: true, //자동 높이 설정
    animateIn: '', //fadeIn 가능
  });
  //window.owl = $owl;
});
