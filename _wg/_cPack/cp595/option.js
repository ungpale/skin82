/*********************************************************************************
플러그인 : jquery.DB_accordion.js
제작자 : 디자인블랙 , http://designblack.com 
업데이트 : 2014-02-04
라이센스 : 엄우식
기타 : 문서정보(주석)는 수정 및 삭제 할 수 없습니다.
*********************************************************************************/
!(function(k){k.fn.DB_accordion=function(l){var c={mouseEvent:"over",motionType:"x",showImgSize:28,hideImgSize:278,moveSpeed:300,autoRollingTime:5E3};k.extend(c,l);return this.each(function(){function n(){for(var a=0;a<f;a++){var b=g.eq(a),d=h[e][a];switch(c.motionType){case "x":b.stop().animate({left:d},c.moveSpeed);break;case "y":b.stop().animate({top:d},c.moveSpeed)}e==a?b.addClass("DB_select"):b.removeClass("DB_select")}}function p(){e=++e%f;n()}var d=k(this),g=d.find(">li"),e=0,f=g.length,h=[],
m,l="over"==c.mouseEvent?"mouseenter":"click";(function(){for(var a=0;a<f;a++){h[a]=[];for(var b=0;b<f;b++)h[a][b]=b>a?c.showImgSize*b+c.hideImgSize-c.showImgSize:c.showImgSize*b}})();(function(){g.css({position:"absolute"});switch(c.motionType){case "x":d.css({position:"relative"});for(var a=0;a<f;a++){var b=g.eq(a);b.css({left:h[e][a]})}break;default:for(d.css({position:"relative"}),a=0;a<f;a++)b=g.eq(a),b.css({top:h[e][a]})}})();(function(){d.bind("mouseenter",function(){clearInterval(m)});d.bind("mouseleave",
function(){m=setInterval(p,c.autoRollingTime)});g.bind(l+" keyup",function(){e=k(this).index();n()})})();m=setInterval(p,c.autoRollingTime)})}})(jQuery);
		$('.cp595').DB_accordion({
			mouseEvent:'over',       //마우스이벤트('over','click')
			motionType:'x',           //모션타입('x','y')
			showImgSize:35,           //탭(보이는사이즈)
			hideImgSize:95,           //탭포함 전체사이즈	
			moveSpeed:200,            //이동스피드
			autoRollingTime:999999999      //자동롤링시간(밀리초)
		})