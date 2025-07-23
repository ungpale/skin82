if ($('.content-image img').is(':visible')) {
  $('.prdImg').hide();
} /*else{
        $("body#main #contents").css({"opacity":"1","background":"transparent"});; 
    }*/

//.read-pop 을 제외한 부분 클릭시 팝업창 닫히게
$('.read-pop').click(function (e) {
  e.stopPropagation();
});
$('body').click(function (e) {
  parent.jQuery('.fancybox-close').trigger('click');
});
