//최근본상품
!(function ($) {
  $(function () {
      /* 페이지 접속시 자동으로 열리고 닫기후 1일간 열리지 않음.
        if($.cookie('ck_cp798') != 'hide' && $('.cp798.btn').css('display') != 'none') { //버튼이 보이지 않을 때 자동 팝업 띄우지 않는다.
             setTimeout(function() {  $('.cp798.btn').trigger('click');  }, 1000); //1000 = 1초후 열기
        }
        jQuery('.cp798.popup').on('click', '.p-close', function(e) {  
            $.cookie('ck_cp798',"hide", { path:"/", expires: 1}); 
        }); //오늘하루 열지않음
        */
      
    $('.cp798.btn').click(function (e) {
      var $btn = $(this);
      $btn.blur();
      $('.cp798.popup').bPopup(
        {
          preLoadSelector: '.loadhtml',
          preLoadUrl:'/_wg/_cPack/cp798/popup.html', // 페이지주소
          positionStyle: 'fixed', // 고정방법
          zIndex: 500, // z-index
          speed: 300, // 속도 (css transition과 동일하게 설정)
          autoClose: 60000, // 1000 = 1초후 닫힘
          modal: true, // 배경
          transition: 'custom',
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on');
          }, // 버튼 클래스에 on 삭제
        },
      );
    });
  });
})(jQuery);