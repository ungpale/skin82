jQuery(function () {
  var $owl2 = jQuery('.cp513 .ul');
  $owl2.owlTimer({
    items: 1, //화면에 보이는 개수
    margin: 2, //슬라이드 간격
    stagePadding: 0, //좌우측 보이는 정도
    smartSpeed: 600, //슬라이드 속도
    nav: true, //좌우화살표
    loop: true, //루프
    autoplay: true, //자동롤링
    autoplayTimeout: 8000, //자동롤링 시간간격 (1000=1초)
    autoplayHoverPause: true, //마우스오버시 정지
    rewind: false, //끝에서 되돌림
    center: true, //중앙정렬
    autowidth: true, //자동 넓이 설정
    autoHeight: true, //자동 높이 설정
    lazyLoad: true,
    slideTransition : 'cubic-bezier(0.87, 0, 0.13, 1)' //슬라이드 효과
  });
  //window.owl = $owl;
});
