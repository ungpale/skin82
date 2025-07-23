//화면모드
!(function ($) {
    $(function () {
    if ($.cookie('ck_switchButton') != 'hide' && $('.switchButton.btn').css('display') != 'none') {
      //버튼이 보이지 않을 때 자동 팝업 띄우지 않는다.
      setTimeout(function () {
		var $btn = $('.switchButton.btn');
        $('.switchButton.popup').bPopup(
        {
          preLoadSelector: '.loadhtml',
          //preLoadUrl:'/_wg/_cPack/cp550/popup.html', // 페이지주소
          positionStyle: 'fixed', // 고정방법
          zIndex: 490, // z-index
          speed: 300, // 속도 (css transition과 동일하게 설정)
          autoClose: 30000, // 1000 = 1초후 닫힘
          modal: false, // 배경
          transition: 'custom',
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on');
          }, // 버튼 클래스에 on 삭제
        });
      }, 3000); //1000 = 1초후 열기
    }
    jQuery('.switchButton.popup').on('click', '.p-close', function (e) {
      $.cookie('ck_switchButton', 'hide', { path: '/', expires: 1 });
    }); //오늘하루 열지않음
  });
})(jQuery);