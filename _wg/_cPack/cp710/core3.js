// 패널
$('.panel_cp710').d_quickFloating({
  dir: 'bottom',
  openState: 0, //오픈상태(1열림/0닫힘)
  closeGap: 0, //닫힐때 우측여백
  motionSpeed: 700, //닫힘속도(0~)
  cookieDay: 2, //쿠키유지(일)
  autoCloseTime: 50000, //자동닫힘시간(1초=1000)
});
$('.panel_cp710_open').bind('click', function () {
  $('.panel_cp710 .d_toggle').click();
});

$(function () {
  // 입력폼
  function contact_ok() {
    // 주문자명
    if (!$('#customizing_form #writer').val()) {
      $('#customizing_form #writer').focus();
      return false;
    }

    // 휴대폰 중간번호
    if (!$('#customizing_form #make_phone2').val()) {
      $('#customizing_form #make_phone2').focus();
      return false;
    }

    // 휴대폰 끝번호
    if (!$('#customizing_form #make_phone3').val()) {
      $('#customizing_form #make_phone3').focus();
      return false;
    }

    var content =
      '<table class=form_view><tr><th>주문자명</th><td>' +
      $('#customizing_form #writer').val() +
      '</td></tr><tr><th>휴대폰번호</th><td>' +
      $('#customizing_form #make_phone1 option:selected').val() +
      '-' +
      $('#customizing_form #make_phone2').val() +
      '-' +
      $('#customizing_form #make_phone3').val() +
      '</td></tr><tr><th>카테고리</th><td>' +
      $('#customizing_form #make_category option:selected').val() +
      '</td></tr></table>';
    // 셋팅유무 사용시(라디오버튼)   + $(":input:radio[name=make_set]:checked").val(); +

    $('#customizing_form input[name="content"]').val(content);

    var cur_url = '/';
    $('#move_write_after').val(cur_url);

    alert('상담신청이 등록되었습니다. 연락드리겠습니다. 감사합니다.');
    $('#boardWriteForm').submit();
  }

  // 체크박스
  var $cb = $('#confirm_contact');
  var $alert = $('.confirm-wrapper .alert');
  $('.ec-base-button .contact_ok').click(function (e) {
    if ($cb.attr('checked')) {
      contact_ok();
    } else {
      $alert.addClass('show');
      setTimeout(function () {
        $alert.addClass('on');
      }, 10);
    }
  });
  $cb.click(function (e) {
    if ($cb.attr('checked')) {
      $alert.removeClass('on');
      setTimeout(function () {
        $alert.addClass('show');
      }, 500);
    } else {
      /*
			$alert.addClass('show');
			setTimeout(function() { $alert.addClass('on');},10);
            */
    }
  });
});

// 팝업
!(function ($) {
  $(function () {
    $('.cp710_btn').click(function (e) {
      var $btn = $(this);
      $btn.blur();
      $('.cp710_popup').bPopup(
        {
          preLoadSelector: '.loadhtml',
          preLoadUrl: '/_wg/_cPack/cp710/popup.html', // 페이지주소
          zIndex: 999, // z-index
          positionStyle: 'fixed', // 고정방법
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
