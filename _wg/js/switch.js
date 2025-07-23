$(document).ready(function() {
    if($.cookie("switch") =="off"){
		$(".design").addClass('st1');
		$(".switchWrap,.switchWrap").addClass("on");
    }       
    if($.cookie("switch") =="on"){
        $(".design").addClass('st2');
        $(".switch-button,.switchWrap").addClass("on");
    }    
	$(".switch-button").click(function() {
       $(this).toggleClass('on');
	   if( $(this).hasClass('on') ){
			$.cookie("switch","on");   
            $(".design").addClass('st2');
	   }else{
			$.cookie("switch","off");  
            $(".design").removeClass('st2').addClass('st1');
	   }
    });
});
