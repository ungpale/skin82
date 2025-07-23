jQuery(function () {
  var $owl = jQuery('.cp532 .ul');
  $owl.owlTimer({
    //반응형
    responsive: {
      0: { items: 1.15 },
      960: { items: 4 },
      1200: { items: 5 },
    },
    //items:5,					//화면에 보이는 개수
    margin: 20, //슬라이드 간격
    stagePadding: 15, //좌우측 보이는 정도
    smartSpeed: 500, //슬라이드 속도
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
});