!(function($) {
    $(function(){
        $('.cp580.popup .p-close').click(function(e) {  $.cookie('ck_cp580',"hide", { path:"/", expires: 1}); }); //오늘하루 열지않음
        $('.cp580.btn').click(function (e) {
            var $btn = $(this);
            $btn.blur();
            $('.cp580.popup').bPopup({
                preLoadSelector:'.loadhtml',
                preLoadUrl:'/_wg/_cPack/cp580/popup.html',	// 페이지주소
                zIndex:99,									// z-index
                positionStyle:'fixed',						// 고정방법
                speed:300, 									// 속도 (css transition과 동일하게 설정)
				autoClose:30000, 							// 1000 = 1초후 닫힘
                modal:true,									// 배경
                transition:'custom',
                follow: [false, false],
                openClass:'on',
                onClose: function () { $btn.removeClass('on'); } // 버튼 클래스에 on 삭제
            }, function () {
                $btn.addClass('on'); // 버튼 클래스에 on 추가
                if (!$(this).hasClass('script-on')) {
                    // 스마트팝업 롤링
                    $('.cp580.popup .slide').DB_tabArrowSlideMove({
                        motionType:'fade',       //모션타입('none','x','y','fade')
                        motionSpeed:600,         //모션속도
                        autoRollingTime:6000,    //자동롤링속도(밀리초)
                        arrowVisible:true,       //메뉴보이기(true,false)
                        overRolling:false        //마우스오버시작동(true,false)
                    });
                	/*
                    // lazy 로딩을 이용할지 주석해제 (반드시 롤링 스크립트 실행후 실행 - 순서가 중요함)
                    if (lazyLoadInstance) {
                        lazyLoadInstance.update();
                    }
                    */
                    $(this).addClass('script-on');
                 } 
                
            });
        });
	});
})(jQuery);