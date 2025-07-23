!(function($) {
    $(function(){
		var $detail_youtube = null;
        $('.cp582.btn').click(function (e) {
            var $btn = $(this);
            if ($btn.hasClass('on') && cp582) {
                cp582.close();
                return;
            }
            $box = $('.cp582.popup');
            cp582 = $box.bPopup({
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
                    yt_player[0].pauseVideo(); 
                }
            }, function () {
                $btn.addClass('on');
                setTimeout(function() {yt_player[0].playVideo();}, 1000); //화면 나타나기까지 오래 걸리면 시간을 키운다.	
                //yt_player[0].playVideo(); 화면에 나타나기 전에 호출하면 error
            });
        });
   
	});
})(jQuery);

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var $iframe=$('.cp582 iframe');
var yt_player=[];	
function onYouTubeIframeAPIReady() {	
    for(var i=0;i<$iframe.length;i++){
    	var playlist = $iframe.eq(i).attr('src').split('/');
    	var yt_id = playlist[playlist.length-1];
    	//var src = $iframe.eq(i).attr('src')+'?playlist='+yt_id+';rel=0&showinfo=0&autoplay=0&loop=1&vq=hd1080&color=white&enablejsapi=1';
    	//$iframe.eq(i).attr('src', src).attr('allow','autoplay;encrypted-media');
    	$iframe.eq(i).attr('allow','autoplay;encrypted-media');
        
        var player= new YT.Player($iframe[i],{
            events: {'onReady':onPlayerReady} 
        });
    }
}
// 한번만 실행
var on_player = 1;
function onPlayerReady(event){
    if(on_player == 1) {
        yt_player.push(event.target);
        //event.target.setVolume(20); //유튜브 기본소리(볼륨) 0~100까지
        if(yt_player.length == $iframe.length){
            yt_player.sort(function(a,b){return a.g-b.g});				
        }  
        on_player++;
    }
    event.target.setVolume(20); //유튜브 기본소리(볼륨) 0~100까지
}