jQuery12.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
});

jQuery12(document).ready(function(){
    jQuery12('#make_date').datepicker();
})

function search_zip(){
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = ''; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;

            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
            if(data.userSelectedType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('make_add_num').value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById('make_add01').value = fullAddr;

            // 커서를 상세주소 필드로 이동한다.
            document.getElementById('make_add02').focus();
        }
    }).open();
}

$(document).ready(function() {
    // 라디오 버튼 선택 시 board_category 업데이트
    $('input[type=radio][name=make_choice]').change(function() {
        if (this.value === '가정공간') {
            $('#board_category').val('1'); // 가정공간에 해당하는 option 선택
        } else if (this.value === '상업공간') {
            $('#board_category').val('2'); // 상업공간에 해당하는 option 선택
        }
    }); 
});

function contact_ok()
{
    var selectedChoiceValue = $("input[name='make_choice']:checked").val();
    // 공간구분
    if($('#customizing_form #make_choice option:selected').val() == '0')
    {
        alert(" 공간구분을 해주세요.");
        $('#customizing_form #make_choice').focus();
        return false;
    }
        
    // 작성자
    if(!$('#customizing_form #writer').val())
    {
        alert("작성자 이름을 입력해주세요");
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
    
    // 설치주소1
    if(!$('#customizing_form #make_add_num').val())
    {
        alert("주소를 입력해주세요");
        $('#customizing_form #make_add_num').focus();
        return false;
    }

    // 설치주소2
    if(!$('#customizing_form #make_add01').val())
    {
        alert("주소를 입력해주세요");
        $('#customizing_form #make_add01').focus();
        return false;
    }
    
    // 설치주소3
    if(!$('#customizing_form #make_add02').val())
    {
        alert("주소를 입력해주세요");
        $('#customizing_form #make_add02').focus();
        return false;
    }
    
    //비회원일 경우에만 활성화
    if ( $('#customizing_form #privacy_agreement_radio0').length > 0  ){
        if( $('#customizing_form #privacy_agreement_radio0').is(':checked') == false)
        {
            alert("개인정보 수집에 동의해주세요.");
            $('#customizing_form #privacy_agreement_radio0').focus();
            return false;
        }
    }
    
    // 주문서 패스워드
    if(!$('#customizing_form #password').val())
    {
        alert("비밀번호를 입력해주세요");
        $('#customizing_form #password').focus();
        return false;
    } else {
        var pw_value = $('#customizing_form #make_pw').val();
        $('#bUsePassword').val(pw_value); 
    }
    
   // 체크박스
    var selectedPositions = $('input[name="make_position"]:checked').map(function() {
        return $(this).next('label').text();
    }).get().join(', ');
    var selectedItems = $('input[name="make_item"]:checked').map(function() {
        return $(this).next('label').text();
    }).get().join(', ');
    var selectedSizes = $('input[name="make_size"]:checked').map(function() {
        return $(this).next('label').text();
    }).get().join(', ');
    
    var content =
      "<table class=form_view><tr><th>공간구분</th><td>" +
      $("#customizing_form #make_choice option:selected").val() +
      "</td></tr><tr><th>작성자</th><td>" +
      $("#customizing_form #writer").val() +
      "</td></tr><tr><th>휴대폰번호</th><td>" +
      $("#customizing_form #make_phone1 option:selected").val() +
      "-" +
      $("#customizing_form #make_phone2").val() +
      "-" +
      $("#customizing_form #make_phone3").val() +
      "</td></tr><tr><th>메일주소</th><td>" +
      $("#customizing_form #make_mail").val() +
      "</td></tr><tr><th>설치주소</th><td>" +
      $("#customizing_form #make_add_num").val() + ' / ' + 
      $("#customizing_form #make_add01").val() + ' ' +
      $("#customizing_form #make_add02").val() +
      "</td></tr><tr><th>원하는 날짜</th><td>" +
      $("#customizing_form #make_date").val() +
      "</td></tr><tr><th>원하는 시간</th><td>" +
      $("#customizing_form #make_time").val() +
      "</td></tr><tr><th>설치 장소</th><td>" +
      selectedPositions +
      "</td></tr><tr><th>제품</th><td>" +
      selectedItems +
      "</td></tr><tr><th>평형</th><td>" +
      selectedSizes +
      "</td></tr><tr><th>추가작업내용</th><td><pre>" +
      $("#customizing_form #make_cont").val() +
      "</pre></td></tr></table>";
    
// 셋팅유무 사용시(라디오버튼)   + $(":input:radio[name=make_set]:checked").val(); +

    //console.log(content);
    $('#customizing_form input[name="content"]').val(content);

    var cur_url = '/';
    $('#move_write_after').val(cur_url);

    alert('상담신청이 등록되었습니다. 감사합니다.');
    $('#customizing_form').submit();
}