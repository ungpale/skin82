
//cp550 (패널 우측)
$('.panel_cp710').d_quickFloating({
    dir:"bottom",
    openState:0,            //오픈상태(1열림/0닫힘)
    closeGap:0,		        //닫힐때 우측여백
    motionSpeed:700,        //닫힘속도(0~)
    cookieDay:2,            //쿠키유지(일)
    autoCloseTime:5000      //자동닫힘시간(1초=1000)
});
$('.panel_cp710_open').bind('click',function(){
    $('.panel_cp710 .d_toggle').click();
});


function contact_ok()
{
    // 주문자명
    if(!$('#customizing_form #writer').val())
    {
        alert("주문자명 이름을 입력해주세요");
        $('#customizing_form #writer').focus();
        return false;
    }
    
    // 휴대폰 중간번호
    if(!$('#customizing_form #make_phone2').val())
    {
        alert("휴대폰 번호를 입력해주세요");
        $('#customizing_form #make_phone2').focus();
        return false;
    }

    // 휴대폰 끝번호
    if(!$('#customizing_form #make_phone3').val())
    {
        alert("휴대폰 번호를 입력해주세요");
        $('#customizing_form #make_phone3').focus();
        return false;
    }

    var content = '<table class=form_view><tr><th>주문자명</th><td>' + $('#customizing_form #writer').val() + '</td></tr><tr><th>휴대폰번호</th><td>' + $('#customizing_form #make_phone1 option:selected').val()+ '-' + $('#customizing_form #make_phone2').val()+ '-' + $('#customizing_form #make_phone3').val() + '</td></tr><tr><th>카테고리</th><td>' + $('#customizing_form #make_category option:selected').val()+ '</td></tr></table>';
    // 셋팅유무 사용시(라디오버튼)   + $(":input:radio[name=make_set]:checked").val(); +
    
    //console.log(content);
    $('#customizing_form input[name="content"]').val(content);

    var cur_url = '/';
    $('#move_write_after').val(cur_url);

    alert('상담신청이 등록되었습니다. 연락드리겠습니다. 감사합니다.');
    $('#customizing_form').submit();
}




// 체크박스
document.addEventListener("DOMContentLoaded", function(event) {
    var $cb = $('#confirm_contact');
    var $alert = $('.confirm-wrapper .alert');
    $('.ec-base-button .contact_ok').click(function(e) {
        if($cb.attr('checked')) {
            contact_ok();
        } else {
            $alert.addClass('show');
            setTimeout(function() { $alert.addClass('on');},10);
        }
    });
    $cb.click(function(e) {
        if($cb.attr('checked')) {
            $alert.removeClass('on');
            setTimeout(function() { $alert.addClass('show');},500);
        } else {
            /*
                $alert.addClass('show');
                setTimeout(function() { $alert.addClass('on');},10);
            */
        }
    });
});


