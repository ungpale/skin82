///////////////////////////////////////////////////////////////
// 브랜드 롤링
///////////////////////////////////////////////////////////////
!(function($){
	$.fn.DB_slideStepBanner2=function(options){
		var opt={
			moveSpeed:500,
			autoRollingTime:5000,
			playNum:0,
			moveNum:1,
			axis:'x',
			target:null,
			easing:'easeInOutExpo'
		};
		$.extend(opt,options);
		return this.each(function(){
			var $this=$(this);
			var $imgSet=$this.find('.img');	
			var $li;
			if(opt.target==null){
				$li=$imgSet.find('>li');
			}else{
				$li=opt.target;
			}
			var $nextBtn=$this.find('.next');
			var $prevBtn=$this.find('.prev');
			var $more=$this.find('.more');
			var objNum=$li.length;
			var axis=opt.axis;
			var moveDistance;
			var cssDir;				
			var imgPos=[];
			var imgArr=[];  
			var reClick=1;
			var timerId;
			var mOver=0;
			var moveSpeed=opt.moveSpeed;
			var dir="next";			
			var easing=opt.easing;
			if(axis=='x'){
				moveDistance=$li.eq(1).position().left-$li.eq(0).position().left;
			}else{
				moveDistance=$li.height()+String($li.css('margin-bottom')).slice(0,-2)*1;
			};
			init();

			function init(){
				setInit();
				setMouseEvent();
				setTimerId();
                if(objNum<=opt.playNum){
                    $nextBtn.hide();
                    $prevBtn.hide();
                 }
			};
			
			function setInit(){
				for(var i=0;i<objNum;i++){
					var li=$li.eq(i);
					imgArr[i]=li;
					imgPos[i]=moveDistance*i;
					if(axis=='x'){
						li.css({'position':'absolute','left':moveDistance*i});	
					}else{
						li.css({'position':'absolute','top':moveDistance*i});
					}
				};
			};
			
			function setMouseEvent(){
				$this.bind('mouseenter',function(){
					mOver=1;
				}).bind('mouseleave',function(){
					mOver=0;
				});
				$nextBtn.bind('click',function(){
					if(reClick){
						reClick=0;
						dir='next';
						setAnimation();							
					};
					if(objNum<=opt.playNum){
						alert('마지막입니다.');
					}
				});
				$prevBtn.bind('click',function(){
					if(reClick){
						reClick=0;
						dir='prev';
						setAnimation();	
					};
					if(objNum<=opt.playNum){
						alert('처음입니다.');
					}
				});		
			};
			
			function setAnimation(){	
				console.log(mOver)
				if(objNum>opt.playNum){
					for(var i=0;i<objNum;i++){	
						if(axis=='x'){
							if(dir=="next"){
								imgArr[i].css('left',imgPos[i]).stop().animate({'left':imgPos[i]-moveDistance*opt.moveNum},moveSpeed,easing,function(){		
									if($li.index($(this))==0){
										reClick=1;
										for(var k=0;k<opt.moveNum;k++){
											imgArr.push(imgArr.shift());
										};
									};
								});
							}else{
								if(i==0){
									for(var k=0;k<opt.moveNum;k++){
										imgArr.unshift(imgArr.pop());
									};
								};
								imgArr[i].css('left',imgPos[i]-moveDistance*opt.moveNum).stop().animate({'left':imgPos[i]},moveSpeed,easing,function(){							
									if($li.index($(this))==0){
										reClick=1;
									};
								});
							};
						}else{
							if(dir=="next"){
								imgArr[i].css('top',imgPos[i]).stop().animate({'top':imgPos[i]-moveDistance*opt.moveNum},moveSpeed,easing,function(){		
									if($li.index($(this))==0){
										reClick=1;
										for(var k=0;k<opt.moveNum;k++){
											imgArr.push(imgArr.shift());
										};
									};
								});
							}else{
								if(i==0){
									for(var k=0;k<opt.moveNum;k++){
										imgArr.unshift(imgArr.pop());
									};
								};
								imgArr[i].css('top',imgPos[i]-moveDistance*opt.moveNum).stop().animate({'top':imgPos[i]},moveSpeed,easing,function(){							
									if($li.index($(this))==0){
										reClick=1;
									};
								});
							};
						}
					};
				};
			};		

			function setTimerId(){
				timerId=setInterval(setEnterFrame,opt.autoRollingTime);
			};

			function setEnterFrame(){
				if(mOver==0&&!$this.hasClass('undo')){
					setAnimation();
				};
			};

			$more.bind('click',function(){
				$this.toggleClass('undo');
			});
		});		
	};			
})(jQuery);

$('.cp505').DB_slideStepBanner2({
    moveSpeed:800,                   //이동속도
    autoRollingTime:2500,            //자동롤링시간(밀리초)
    playNum:8,
    moveNum:1,
    axis:'x',
    easing:'easeInOutExpo'
});
