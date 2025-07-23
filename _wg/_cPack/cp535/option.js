jQuery(function () {
  var $owl = jQuery('#cp535 .ul');
  var len = jQuery('#cp535 .ul > .xans-record-').length;
  if (len >= 5) {
    $owl.owlTimer({
      //반응형
      responsive: {
        0: {
          items: 3,
        },
        960: {
          items: 5,
        },
      },
      //\items:5,					//화면에 보이는 개수
      margin: 15, //슬라이드 간격
      stagePadding: 10, //좌우측 보이는 정도
      smartSpeed: 500, //슬라이드 속도
      nav: true, //좌우화살표
      loop: true, //루프
      autoplay: true, //자동롤링
      autoplayTimeout: 4000, //자동롤링 시간간격 (1000=1초)
      autoplayHoverPause: true, //마우스오버시 정지
      video: true, //비디오재생
      lazyLoad: false, //레이지로드
      center: true, //중앙정렬
      autowidth: true, //자동 넓이 설정
      autoHeight: true, //자동 높이 설정
      animateIn: '', //fadeIn 가능
      lazyLoad: true,
    });
  } else {
    jQuery('#cp535 .ul').add('no-slider');
    // #cp535 .ul.no-slider 클래스를 기준으로 css로 대체할 수 있다.
    // jQuery('#cp535 .ul > .xans-record-').css({'display':'inline-block','margin':'0 5px'});
  }
  //window.owl = $owl;
});
