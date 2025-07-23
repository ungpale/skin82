!(function ($) {
  $(function () {
    $('.cp791.btn').click(function (e) {
      var $btn = $(this);
      $btn.blur();
      $('.cp791.popup').bPopup(
        {
          preLoadSelector: '.loadhtml',
          preLoadUrl: '/_wg/_cPack/cp791/popup.html', // 페이지주소
          zIndex: 999, // z-index
          positionStyle: 'fixed', // 고정방법
          speed: 300, // 속도 (css transition과 동일하게 설정)
          autoClose: 600000, // 1000 = 1초후 닫힘
          modal: true, // 배경
          transition: 'custom',
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on');
          }, // 버튼 클래스에 on 삭제
        },
        function () {
          var $this = $(this);
          if (!$this.hasClass('script-on')) {
            //한번만 실행하기 위해 class 추가
            //동적으로 불러오는 부분이 스크롤바가 있을 때
            if (tl_isMobile()) {
              jQuery(this).find('.scrollbar_box').css({ 'overflow-y': 'auto' });
            } else {
              jQuery(this)
                .find('.scrollbar_box')
                .mCustomScrollbar({
                  theme: 'dark',
                  mouseWheel: { scrollAmount: 300 },
                });
            }
          }
          $this.addClass('script-on');
          $btn.addClass('on');
        }
      );
    });
  });
})(jQuery);
