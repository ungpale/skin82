var $el;
var yt_players = [];  // Declare yt_players as a global variable
function onYouTubeIframeAPIReady() {
    if (!$el) return;
    $el.find('li iframe').each(function (index, element) {
        var $iframe = $(this);
        var player = new YT.Player(element, {
            events: {
                onReady: function (event) {
                    yt_players.push(event.target);
                    $iframe.data('yt_player', event.target);
                    event.target.setVolume(0); // 최초 볼륨 크기
                    if ($iframe.closest('li').hasClass('active') && $iframe.data('youtube')) {
                        playYouTubeVideo($iframe);
                    }else{
                        playYouTubeVideo($iframe);
                    }
                },
            },
        });
    });
    var volume = 0;
    $el.find('.yt-mute').click(function (event) {
        event.stopPropagation();
        if (volume == 0) {
            $(this).removeClass('xi-volume-mute').addClass('xi-volume-up');
            volume = 100;
        } else {
            $(this).removeClass('xi-volume-up').addClass('xi-volume-mute');
            volume = 0;
        }
        for (var i = 0; i < yt_players.length; i++) {
            yt_players[i].setVolume(volume);
        }
    });
}
jQuery(function () {
    // Existing code remains unchanged
    // Add a new function to play the YouTube video
    function playYouTubeVideo(iframeElement) {
        if (iframeElement && iframeElement.data('yt_player')) {
            iframeElement.data('yt_player').playVideo();
            iframeElement.data('yt_player').seekTo(0);
        }
    }
    function playYouTubeVideoStart(iframeElement) {
        if (iframeElement && iframeElement.data('yt_player')) {
            iframeElement.data('yt_player').playVideo();
            iframeElement.data('yt_player').seekTo(0);
            iframeElement.data('yt_player').pauseVideo();
        }
    }
    // Rest of the code remains unchanged
    $el = jQuery('.cp500 .ul');

    var $owl = jQuery('.cp500 .ul');
    $owl.owlOneItemExt({
        items: 1, //화면에 보이는 개수
        margin: 0, //슬라이드 간격
        stagePadding: 0, //좌우측 보이는 정도
        smartSpeed: 1000, //슬라이드 속도
        animateIn: 'fadeIn', //페이드
        animateOut: 'fadeOut', //페이드
        nav: true, //방향키
        loop: true, //루프
        autoplay: true, //자동롤링
        autoplayTimeout: 8000, //자동롤링 시간간격 (1000=1초)
        autoplayHoverPause: true, //마우스오버시 정지
        rewind: true, //끝에서 되돌림
        center: true, //중앙정렬
        autowidth: true, //자동 넓이 설정
        autoHeight: true, //자동 높이 설정
        //init_youtube_api: true, //youtube api 기초작업 여부
        lazyLoad: false,
        lazyLoadEager: 1,
    });
    $owl.on('changed.owl.carousel', function(e) {
        // Get the current active slide
        var currentSlide = e.item.index;

        // Only play the YouTube video in the current slide
        for (var i = 0; i < yt_players.length; i++) {
            if (i === currentSlide) {
                yt_players[i].playVideo();
            } else {
                yt_players[i].playVideo();
                yt_players[i].seekTo(0);
                yt_players[i].pauseVideo();
            }
        }
    });
    window.owl = $owl;
});

var $iframe_301 = null;
var youtube_player_301 = null;
!(function ($) {
  $(function () {
    var $detail_youtube = null;
    $('.detail_youtube.btn').each(function (index, element) {
      $(element).attr('data-idx', index);
    });
    $('.detail_youtube.popup').each(function (index, element) {
      $(element).attr('data-idx', index);
    });

    $('.detail_youtube.btn').click(function (e) {
      var $btn = $(this);
      var idx = $btn.attr('data-idx');
      if ($btn.hasClass('on') && cp301) {
        cp301.close();
        return;
      }
      $box = $('.detail_youtube.popup[data-idx=' + idx + ']');
      cp301 = $box.bPopup(
        {
          preLoadSelector: '.loadhtml',
          preLoadUrl: '', // 페이지주소
          zIndex: 999, // z-index
          positionStyle: 'fixed', // 고정방법
          speed: 800, // 속도 (css transition과 동일하게 설정)
          modal: true, // 배경
          transition: 'custom', //onClose와 callback에서 transition 처리
          appending: true,
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on');
            youtube_player_301.pauseVideo();
            /*yt_player[idx].pauseVideo(); */
          },
        },
        function () {
          $btn.addClass('on');
          setTimeout(function () {
		
            youtube_player_301.playVideo(); /* yt_player[idx].playVideo(); */ //미리 생성된 PLAYER로 제어할 수 없다.
             
          }, 2000); //화면 나타나기까지 오래 걸리면 시간을 키운다.
          //yt_player[idx].playVideo(); //화면에 나타나기 전에 호출하면 error
        }
      );
    });
  });
  $iframe_301 = $('.detail_youtube iframe');
  if (!window.youtube_api_loaded) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
})(jQuery);

//var yt_player = [];
if (typeof window.YOUTUBE_CALLBACK_LIST == 'undefined') {
  window.YOUTUBE_CALLBACK_LIST = [];
}
if (typeof window.onYouTubeIframeAPIReady != 'function') {
  window.onYouTubeIframeAPIReady = function () {
    for (var i = 0; i < YOUTUBE_CALLBACK_LIST.length; i++) {
      YOUTUBE_CALLBACK_LIST[i]();
    }
  };
}

window.onYouTubeIframeAPIReady = function () {
  // For slide autoplay
  for (var i = 0; i < $iframe_301.length; i++) {
    var $parent = $iframe_301.eq(i).parent();
    var playlist = $iframe_301.eq(i).attr('src').split('/');
    var yt_id = playlist[playlist.length - 1];
    var src = $iframe_301.eq(i).attr('src') + '?playlist=' + yt_id + ';rel=0&showinfo=0&autoplay=0&loop=1&vq=hd1080&color=white&enablejsapi=1';
    $iframe_301.eq(i).attr('src', src).attr('allow', 'autoplay;encrypted-media');
    new YT.Player($iframe_301[i], {
      events: { onReady: onPlayerReady_301 },
    });
  }
  // For popup click play
  for (var i = 0; i < $el.find('li iframe').length; i++) {
    var $iframe = $($el.find('li iframe')[i]);
    var player = new YT.Player($iframe.get(0), {
      events: {
        onReady: function (event) {
          yt_players.push(event.target);
          $iframe.data('yt_player', event.target);
          event.target.setVolume(0); // 최초 볼륨 크기
          if ($iframe.closest('li').hasClass('active') && $iframe.data('youtube')) {
            playYouTubeVideo($iframe);
          }
        }
      },
    });
  }
  // For .yt-mute functionality
  var volume = 0;
  $el.find('.yt-mute').click(function (event) {
    event.stopPropagation();
    if (volume == 0) {
        $(this).removeClass('xi-volume-mute').addClass('xi-volume-up');
        volume = 100;
    } else {
        $(this).removeClass('xi-volume-up').addClass('xi-volume-mute');
        volume = 0;
    }
    for (var i = 0; i < yt_players.length; i++) {
        yt_players[i].setVolume(volume);
    }
  });    
};
function onYouTubeIframeAPIReady_301() {
  for (var i = 0; i < $iframe_301.length; i++) {
    var $parent = $iframe_301.eq(i).parent();
    var playlist = $iframe_301.eq(i).attr('src').split('/');
    var yt_id = playlist[playlist.length - 1];
    var src = $iframe_301.eq(i).attr('src') + '?playlist=' + yt_id + ';rel=0&showinfo=0&autoplay=0&loop=1&vq=hd1080&color=white&enablejsapi=1';
    $iframe_301.eq(i).attr('src', src).attr('allow', 'autoplay;encrypted-media');
    new YT.Player($iframe_301[i], {
      events: { 
          onReady: onPlayerReady_301
      },
    });
  }
}
YOUTUBE_CALLBACK_LIST.push(onYouTubeIframeAPIReady_301);
// 한번만 실행
function onPlayerReady_301(event) {
  // console.log('onPlayerReady');
  youtube_player_301 = event.target;
  // yt_player.push(event.target); // 팝업시 DOM이 복사되어 소용없음
  event.target.setVolume(20); //유튜브 기본소리(볼륨) 0~100까지
}