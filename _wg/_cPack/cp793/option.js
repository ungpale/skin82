!(function ($) {
  $(function () {
      /* 페이지 접속시 자동으로 열리고 닫기후 1일간 열리지 않음.
        if($.cookie('ck_cp793') != 'hide' && $('.cp793.btn').css('display') != 'none') { //버튼이 보이지 않을 때 자동 팝업 띄우지 않는다.
             setTimeout(function() {  $('.cp793.btn').trigger('click');  }, 1000); //1000 = 1초후 열기
        }
        jQuery('.cp793.popup').on('click', '.p-close', function(e) {  
            $.cookie('ck_cp793',"hide", { path:"/", expires: 1}); 
        }); //오늘하루 열지않음
        */
      
$(document).on('click', '.cp793.btn', function (e) {
      var $btn = $(this);
      $btn.blur();
      $('.cp793.popup').bPopup(
        {
          preLoadSelector: '.loadhtml',
          preLoadUrl:'/_wg/_cPack/cp793/popup.html', // 페이지주소
          positionStyle: 'fixed', // 고정방법
          zIndex: 500, // z-index
          speed: 300, // 속도 (css transition과 동일하게 설정)
          autoClose: 30000, // 1000 = 1초후 닫힘
          modal: true, // 배경
          transition: 'custom',
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on');
          }, // 버튼 클래스에 on 삭제
            
        },
        function () {
          $btn.addClass('on'); // 버튼 클래스에 on 추가
          if (!$(this).hasClass('script-on')) {
            //슬라이드배너
            jQuery(function () {
              var $owl = jQuery('.cp793_slide .ul');
              $owl.owlOneItemExt({
                items: 1, //화면에 보이는 개수
                margin: 2, //슬라이드 간격
                stagePadding: 0, //좌우측 보이는 정도
                smartSpeed: 600, //슬라이드 속도
                nav: true, //좌우화살표
                loop: true, //루프
                autoplay: true, //자동롤링
                autoplayTimeout: 4000, //자동롤링 시간간격 (1000=1초)
                autoplayHoverPause: true, //마우스오버시 정지
                rewind: true, //끝에서 되돌림
                center: true, //중앙정렬
                autowidth: true, //자동 넓이 설정
                autoHeight: true, //자동 높이 설정
                lazyLoad: true,
    			slideTransition : 'cubic-bezier(0.87, 0, 0.13, 1)' //슬라이드 효과
              });
              window.owl = $owl;
            });
              
              
            $(this).addClass('script-on');
            $btn.addClass('on');
          }
        }
      );
    });
  });
})(jQuery);