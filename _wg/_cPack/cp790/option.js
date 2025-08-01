!(function($) {
    $(function(){
        $('.cp790.btn').click(function (e) {
            var $btn = $(this);
            $btn.blur();
            $('.cp790.popup').bPopup({
                preLoadSelector:'.loadhtml',
                preLoadUrl:'/_wg/_cPack/cp790/popup.html',	// 페이지주소
                zIndex:999,									// z-index
                positionStyle:'fixed',						// 고정방법
                speed:300, 									// 속도 (css transition과 동일하게 설정)
				autoClose:20000, 							// 1000 = 1초후 닫힘
                modal:true,									// 배경
                transition:'custom',
                follow: [false, false],
                openClass:'on',
                onClose: function () { $btn.removeClass('on'); } // 버튼 클래스에 on 삭제
            }, function () {
                $btn.addClass('on'); // 버튼 클래스에 on 추가
            });
        });
	});
})(jQuery);