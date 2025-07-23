!(function ($) {
  $(function () {

    //팝업디자인
    var $popup_map = {}; //라디오버튼처럼 사용하기 위해
    $('._cPack.btn').click(function (e) {
      var $btn = $(this);
      var popup_key = $btn.attr('data-popup_key');
      var popup_box = $btn.attr('data-popup_box');
      var preLoadUrl = $btn.attr('data-preLoadUrl');
      var preLoadSelector = $btn.attr('data-preLoadSelector');
      if ($btn.hasClass('on') && $popup_map[popup_key]) {
        $popup_map[popup_key].close();
        return;
      }
      for (var key in $popup_map) {
        if ($popup_map[key] && key != popup_key) $popup_map[key].close();
      }
      $popup_map[popup_key] = $(popup_box).bPopup(
        {
          //preLoadSelector: preLoadSelector,
          preLoadSelector: '.loadhtml',
          preLoadUrl: preLoadUrl, // 페이지주소는 각html에서 컨트롤
          positionStyle: 'absolute', // 고정방법
          speed: 300, // 속도 (css transition과 동일하게 설정)
          modal: false, // 배경
          transition: 'custom', //onClose와 callback에서 transition 처리
          appendTo: '',
          zIndex: 10,
          appending: true,
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on');
          },
        },
        function () {
          var $this = $(this);
          if (!$this.hasClass('script-on')) {
            //한번만 실행하기 위해 class 추가
            
            if (tl_isMobile()) {
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
