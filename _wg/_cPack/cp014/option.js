$(window).resize(function(){
    var winWidth = $(window).width();
    var boxWidth = $('.cp014_inner').width();
    //max-width값인 1900px아래서만 작동
    if(winWidth <= 1900){
    	//1.681:1
        $('.cp014_inner').height(boxWidth*0.445);
    }
});