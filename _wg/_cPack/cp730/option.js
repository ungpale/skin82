var $iframe = null;
var youtube_player = null;
!(function($) {
    $(function(){
		var $cp730 = null;
        $('.cp730.btn').each(function(index,element) {
        	$(element).attr('data-idx', index)
        });
        $('.cp730.popup').each(function(index,element) {
        	$(element).attr('data-idx', index)
        });
        
        $('.cp730.btn').click(function (e) {
            var $btn = $(this);
            var idx = $btn.attr('data-idx');

            if ($btn.hasClass('on') && cp730) {
                cp730.close();
                return;
            }
            $box = $('.cp730.popup[data-idx=' + idx + ']');
            cp730 = $box.bPopup({
                preLoadSelector:'.loadhtml',
                preLoadUrl:'',	// 페이지주소
                zIndex:999,							// z-index
                positionStyle:'fixed',				// 고정방법
                speed:300,							// 속도 (css transition과 동일하게 설정)
                modal: true,						// 배경
                transition:'custom', 				//onClose와 callback에서 transition 처리
                appending: true,
                follow: [false, false],
                openClass:'on',
                onClose:function () { 
                    $btn.removeClass('on'); 
                    youtube_player.pauseVideo(); 
                    /*yt_player[idx].pauseVideo(); */
                }
            }, function () {
                $btn.addClass('on');
                setTimeout(function() {
                    youtube_player.playVideo(); /* yt_player[idx].playVideo(); */ //미리 생성된 PLAYER로 제어할 수 없다.
                }, 3000); //화면 나타나기까지 오래 걸리면 시간을 키운다.	
                //yt_player[idx].playVideo(); //화면에 나타나기 전에 호출하면 error
            });
        });
	});
    
	$iframe = $('.cp730 iframe');
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

})(jQuery);

var yt_player = [];	
function onYouTubeIframeAPIReady() {
    //console.log('onYouTubeIframeAPIReady');
    for(var i=0; i<$iframe.length; i++){
        var $parent = $iframe.eq(i).parent();
    	var playlist = $iframe.eq(i).attr('src').split('/');
    	var yt_id = playlist[playlist.length-1];
    	var src = $iframe.eq(i).attr('src')+'?playlist='+yt_id+';rel=0&showinfo=0&autoplay=0&loop=1&vq=hd1080&color=white&enablejsapi=1';
    	$iframe.eq(i).attr('src', src).attr('allow','autoplay;encrypted-media');
        new YT.Player($iframe[i], {
            events: {'onReady':onPlayerReady} 
        });
    }
}
// 한번만 실행
function onPlayerReady(event){
   	// console.log('onPlayerReady');
    youtube_player = event.target;
    // yt_player.push(event.target); // 팝업시 DOM이 복사되어 소용없음
    event.target.setVolume(20); //유튜브 기본소리(볼륨) 0~100까지
}