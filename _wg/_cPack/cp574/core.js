/*
제작 : designblack.com
업데이트 : 2018-05-08
*/
!(function($){
		//console.log('서버시간 구하기');
		//서버시간을 호출한다
		
		var xmlHttp; 
		var time_url = window.location.protocol + '//' + window.location.host + '/_wg/_cPack/cp574/dom_main2.html';
		//분기하지 않으면 IE에서만 작동된다. 			
		if (window.XMLHttpRequest) { // IE 7.0 이상, 크롬, 파이어폭스일 경우 분기 
			xmlHttp = new XMLHttpRequest(); 
			//xmlHttp.open('HEAD',window.location.href.toString(),false);
			xmlHttp.open('HEAD',time_url.toString(),false);
			
			xmlHttp.setRequestHeader("Content-Type", "text/html"); 
			xmlHttp.send(''); 

		}else if (window.ActiveXObject) { 
			xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			//xmlHttp.open('HEAD',window.location.href.toString(),false);
			xmlHttp.open('HEAD',time_url,false);

			xmlHttp.setRequestHeader("Content-Type", "text/html"); 
			xmlHttp.send(''); 
		} ;
		
		var st = xmlHttp.getResponseHeader("Date");
		//console.log(st);


	$.fn.d_DDay=function(options){
		var opt={
			ready:'2000-01-01 00:00:00',
			dday:'2100-01-01 00:00:00',
			state:['준비중','이벤트중','진행완료'],
			time_out_txt:'<span class="timeover state">이벤트가 종료되었습니다.</span>'
		};

		$.extend(opt,options);
		return this.each(function(){
			var $this=$(this);
			var $timer=$this.find('.timer');				

			var ready_arr=opt.ready.split(' ');
			var ready1=ready_arr[0].split('-');
			var ready2=ready_arr[1].split(':');

			var dday_arr=opt.dday.split(' ');
			var dday1=dday_arr[0].split('-');
			var dday2=dday_arr[1].split(':');
			
			var state_ment='';

			var id;	
			var ready_then= new Date(ready1[0],ready1[1]-1,ready1[2],ready2[0],ready2[1],ready2[2]); 
			var then = new Date(dday1[0],dday1[1]-1,dday1[2],dday2[0],dday2[1],dday2[2]); 

			//console.log(ready_then)
			//console.log(then)

			var situation
			var curDate = new Date(st);
			//
			var ready_sec = Math.floor((ready_then.getTime()-curDate.getTime()) / 1000);
			var total_sec = Math.floor((then.getTime() - curDate.getTime()) / 1000);
			//console.log('시작전:'+ready_sec)
			//console.log('남은시간:'+total_sec)

			var sec;	
			function day_counter() {    
				
				if(ready_sec>0){
					sec=ready_sec;
				}else{
					sec=total_sec;
				}
				remain_days = Math.floor(sec / 86400);
				remain_tot_sec = sec - 86400 * remain_days;
				remain_hour = Math.floor(remain_tot_sec / 3600);
				tmp = remain_tot_sec - remain_hour * 3600;
				remain_minute = Math.floor(tmp / 60);
				remain_sec = Math.floor(tmp % 60);

				//일
				if(remain_days <= 0){
					remain_days = '00';
				}else if(remain_days<10){
					remain_days = '0'+remain_days;
				}else{
					if(remain_days>99){
						remain_days='99';
					}else{
						remain_days = remain_days;
					}
				};
				
				//시간
				if(remain_hour <= 0){
					remain_hour = '00';
				}else if(remain_hour < 10){
					remain_hour ='0'+ remain_hour;
				}else{
					remain_hour = remain_hour;
				};
				
				//분
				if(remain_minute < 10){
					remain_minute = '0' + remain_minute;
				};

				//초
				if(remain_sec < 10){
					remain_sec = '0' + remain_sec;
				};

			   if(total_sec<0){
					set_time_out();
			   };
			   if(ready_sec<0){
				   if($this.hasClass('ing')==false){
					$this.removeClass('ready');
					$this.addClass('ing');					
					state_ment=opt.state[1];
					if(remain_days=='99'){
						$this.addClass('99');	
					}
				   }
			   }else{
					if($this.hasClass('ready')==false){
					$this.addClass('ready');
					state_ment=opt.state[0];
				   }
			   }

			   $timer.html('<span class="state">' + state_ment + '</span><span class="day">' + remain_days + '</span>일 <span class="hour">' + remain_hour + '</span>:<span class="minute">' + remain_minute + '</span>:<span class="second">' + remain_sec + '</span>');
			   total_sec--;
			   ready_sec--;
			};

			if (total_sec > 0) {
				day_counter();
				id=setInterval(day_counter, 1000);
			}else{	
				clearInterval(id);
				set_time_out();
			};

			function set_time_out(){
				$timer.html(opt.time_out_txt);			
				$this.removeClass('ing');
				$this.addClass('on');
				$this.find('a').attr('href','#none').css('cursor','default');
				state_ment=opt.state[3];
			};
		});			
	};			
})(jQuery);