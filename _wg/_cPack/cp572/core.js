!(function(){
    var $this=$('.JS_brand');
    var $btn=$this.find('.btn_area');
    var $btn_li=$btn.find('li');
    var $list=$this.find('.list_area');
    var $list_kor=$list.find('.kor_area');
    var $list_eng=$list.find('.eng_area');

    //기본값 튜닝
    var $copy=$('.JS_brand_copy');
    var $copy_li=$('.JS_brand_copy li');
    var arr_kor_name=[];
    var arr_eng_name=[];

    $copy_li.each(function(){
        var arr=$(this).find('.subject').text().split(';')
        var $img=$(this).find('.thumb img').detach();
        if(arr[2]){
            $(this).append('<div class="kor"><a href="'+arr[2]+'">'+arr[0]+'</a></div>');
            $(this).append('<div class="eng"><a href="'+arr[2]+'">'+arr[1]+'</a></div>');
            $(this).find('.thumb').append('<a href="'+arr[2]+'"></a>');
            $(this).find('.thumb a').append($img);
        }else{
            $(this).append('<div class="kor">'+arr[0]+'</div>');
            $(this).append('<div class="eng">'+arr[1]+'</div>');
            $(this).find('.thumb').append($img);
        }

        $(this).attr('data-kor',check_choung(arr[0]));

        if(/^[a-zA-z]/g.test(arr[1])){				
            //영문
            $(this).attr('data-eng',arr[1].slice(0,1).toUpperCase());
        }else if(/^[0-9]/g.test(arr[1])){
            //숫자
            $(this).attr('data-eng','0~9');
        }else{
            //특수문자
            $(this).attr('data-eng','ETC');
        }
        var reg=/^[0-9]/g;
        //console.log(arr[1],reg.test(arr[1]))

        arr_kor_name.push(arr[0]);
        arr_eng_name.push(arr[1]);

    });

    //가나다순으로 정렬
    arr_kor_name.sort();
    arr_eng_name.sort();

    //초성뽑기
    function check_choung(str){
        var stringtest = str;
        var CompleteCode = stringtest.charCodeAt(0);
        var UniValue = CompleteCode - 0xAC00;

        var Jong = UniValue % 28;
        var Jung = ( ( UniValue - Jong ) / 28 ) % 21;
        var Cho = parseInt (( ( UniValue - Jong ) / 28 ) / 21);
        //console.log(Cho)

        //var arr=Array('ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ');
        var arr=Array('ㄱ','ㄱ','ㄴ','ㄷ','ㄷ','ㄹ','ㅁ','ㅂ','ㅂ','ㅅ','ㅅ','ㅇ','ㅈ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ');
        return arr[Cho];
    }

    //정렬 리스트만들기
    var kor_arr=['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    var eng_arr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0~9','ETC'];
    for(var i=0;i<kor_arr.length;i++){
        $list_kor.append('<div class="list" data-cho="'+kor_arr[i]+'"><div class="tit">'+kor_arr[i]+'</div><ul></ul></div>');
    }
    for(var i=0;i<eng_arr.length;i++){
        $list_eng.append('<div class="list" data-cho="'+eng_arr[i]+'"><div class="tit">'+eng_arr[i]+'</div><ul></ul></div>');
    }

    //$list kor append;
    for(var i=0;i<$copy_li.length;i++){
        for(var k=0;k<$copy_li.length;k++){
            if(arr_kor_name[i]==$copy_li.eq(k).find('.kor').text()){
                var _copy=$copy_li.eq(k).clone();
                var _name=_copy.attr('data-kor');
                var $item=$list_kor.find('> div[data-cho="'+_name+'"]');
                $item.addClass('on');
                $item.find('ul').append(_copy);	
                break;
            }
        }			
    }

    //$list eng append;
    for(var i=0;i<$copy_li.length;i++){
        for(var k=0;k<$copy_li.length;k++){
            if(arr_eng_name[i]==$copy_li.eq(k).find('.eng').text()){
                var _copy=$copy_li.eq(k).clone();
                var _name=_copy.attr('data-eng');			
                var $item=$list_eng.find('> div[data-cho="'+_name+'"]');
                $item.addClass('on');
                $item.find('ul').append(_copy);
                break;
            }
        }
    }

    //버튼 on
    for(var i=0;i<$copy_li.length;i++){
        var _name=$copy_li.eq(i).attr('data-kor');
        var $item=$btn.find('.kor li[data-cho="'+_name+'"]');
        $item.addClass('on');

        var _name=$copy_li.eq(i).attr('data-eng');
        var $item=$btn.find('.eng li[data-cho="'+_name+'"]');
        $item.addClass('on');
    }

    //버튼클릭
    $btn.find('.all').bind('click',function(){
        $list.find('.list.on').show();
        $btn_li.removeClass('current');
        $(this).addClass('current')
    });
    $btn.find('li.on').bind('click',function(){
        var $this=$(this);
        var _name=$this.attr('data-cho');
        $list.find('.list').hide();
        $list.find('.list[data-cho="'+_name+'"]').show();
        $btn_li.removeClass('current');
        $(this).addClass('current')
    });

})();