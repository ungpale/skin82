var aCategory = [];
!(function ($) {
  $.fn.DB_cate = function (options) {
    var opt = {
      fadeSpeed: 200,
      mouseEvent: 'over', //click, over
      motionType: 'fade', //none, fade
    };
    $.extend(opt, options);
    return this.each(function () {
      var $this = $(this);
      var $li = $this.find('li');
      var $ul = $this.find('ul');
      var $d2 = $this.find('.d2');
      var fadeSpeed = opt.fadeSpeed;
      var motionType = opt.motionType;
      var mouseEvent = opt.mouseEvent;
      var $body = $('body');

      $li.each(function () {
        //화살표
        if ($(this).find('>ul').length > 0) {
          $(this).addClass('arrow');
          $(this).append('<span></span>');
        }
      });

      if (mouseEvent == 'over') {
        $li
          .bind('mouseenter', function () {
            $(this).addClass('on');
            if (motionType == 'none') {
              $(this).find('>ul').show();
            } else {
              $(this).find('>ul').fadeIn(fadeSpeed);
            }
          })
          .bind('mouseleave', function () {
            $(this).removeClass('on');
            $(this).find('>ul').hide();
          });
        $li.bind('click', function (e) {
          e.stopPropagation();
        });
      } else {
        $li
          .bind('click', function (e) {
            e.stopPropagation();
            if ($(this).hasClass('fix')) {
              $(this).removeClass('fix');
              if (motionType == 'none') {
                $(this).find('>ul').hide();
              } else {
                $(this).find('>ul').fadeOut(fadeSpeed);
              }
            } else {
              //-----07-11
              $('#aside #slideCateList > ul > li').removeClass('selected');
              if ($(this).parent().hasClass('categorySub')) $('#aside #slideCateList > ul > li.fix').removeClass('fix').find('>ul').hide();
              //-----
              $(this).nextAll().removeClass('fix').find('ul').hide();
              $(this).prevAll().removeClass('fix').find('ul').hide();

              $(this).addClass('fix');
              if (motionType == 'none') {
                $(this).find('>ul').show();
              } else {
                $(this).find('>ul').fadeIn(fadeSpeed);
              }
            }
            //링크추가
            if ($(this).find('ul').length == 0) {
              location.href = $(this).find('>a').attr('href');
            }
          })
          .bind('mouseenter', function () {
            $(this).addClass('on');
          })
          .bind('mouseleave', function () {
            $(this).removeClass('on');
          });
      }

      $body.bind('click', function (e) {
        if (motionType == 'none') {
          $ul.hide();
        } else {
          $ul.fadeOut(fadeSpeed);
        }
        $li.removeClass('fix');
      });
    });
  };

  $(function () {
    //if (tl_isMobileSize()) {
    $('#wrap').append('<div class="d_panel left"></div>');
    //}
    var methods = {
      aCategory: [],
      aSubCategory: {},
      get: function () {
        if (tl_menu_data == null || tl_menu_data == 'undefined') {
          methods.checkSub();
          return;
        }
        for (var i = 0; i < tl_menu_data.length; i++) {
          var sParentCateNo = tl_menu_data[i].parent_cate_no;
          var sCateNo = tl_menu_data[i].cate_no;
          if (!methods.aSubCategory[sParentCateNo]) {
            methods.aSubCategory[sParentCateNo] = [];
          }
          if (!aCategory[sCateNo]) {
            aCategory[sCateNo] = [];
          }
          methods.aSubCategory[sParentCateNo].push(tl_menu_data[i]);
          aCategory[sCateNo] = tl_menu_data[i];
        }
        methods.checkSub();
        methods.getMyCateList();
      },
      getParam: function (sUrl, sKey) {
        var aUrl = sUrl.split('?');
        var sQueryString = aUrl[1];
        var aParam = {};
        if (sQueryString) {
          var aFields = sQueryString.split('&');
          var aField = [];
          for (var i = 0; i < aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
          }
        }
        return sKey ? aParam[sKey] : aParam;
      },
      show: function (overNode, iCateNo) {
        var oParentNode = overNode;
        var aHtml = [];
        var sMyCateList = localStorage.getItem('myCateList');
        if (methods.aSubCategory[iCateNo] != undefined) {
          aHtml.push('<ul class="slideSubMenu">');
          $(methods.aSubCategory[iCateNo]).each(function () {
            var sNextParentNo = this.cate_no;
            var sCateSelected = checkInArray(sMyCateList, this.cate_no) == true ? ' selected' : '';
            if (methods.aSubCategory[sNextParentNo] == undefined) {
              aHtml.push('<li class="noChild" id="cate' + this.cate_no + '">');
              var sHref = '/product/list.html' + this.param;
            } else {
              aHtml.push('<li id="cate' + this.cate_no + '">');
              var sHref = '#none';
            }
            aHtml.push('<a href="' + sHref + '" class="cate" cate="' + this.param + '" onclick="subMenuEvent(this);">' + this.name + '</a>');
            if (methods.aSubCategory[sNextParentNo] != undefined) aHtml.push('<a href="/product/list.html' + this.param + '" class="view">상품보기</a>');
            aHtml.push('<button type="button" class="icoBookmark' + sCateSelected + '" id="icoBookmark">즐겨찾기 추가</button>');
            if (methods.aSubCategory[sNextParentNo] != undefined) {
              aHtml.push('<ul>');
              $(methods.aSubCategory[sNextParentNo]).each(function () {
                var sNextParentNo2 = this.cate_no;
                var sCateSelected = checkInArray(sMyCateList, this.cate_no) == true ? ' selected' : '';
                if (methods.aSubCategory[sNextParentNo2] == undefined) {
                  aHtml.push('<li class="noChild" id="cate' + this.cate_no + '">');
                  var sHref = '/product/list.html' + this.param;
                } else {
                  aHtml.push('<li id="cate' + this.cate_no + '">');
                  var sHref = '#none';
                }
                aHtml.push('<a href="' + sHref + '" class="cate" cate="' + this.param + '" onclick="subMenuEvent(this);">' + this.name + '</a>');
                if (methods.aSubCategory[sNextParentNo] != undefined) aHtml.push('<a href="/product/list.html' + this.param + '" class="view">상품보기</a>');
                aHtml.push('<button type="button" class="icoBookmark' + sCateSelected + '" id="icoBookmark">즐겨찾기 추가</button>');
                if (methods.aSubCategory[sNextParentNo2] != undefined) {
                  aHtml.push('<ul>');

                  $(methods.aSubCategory[sNextParentNo2]).each(function () {
                    aHtml.push('<li class="noChild" id="cate' + this.cate_no + '">');
                    var sCateSelected = checkInArray(sMyCateList, this.cate_no) == true ? ' selected' : '';
                    aHtml.push('<a href="/product/list.html' + this.param + '" class="cate" cate="' + this.param + '" onclick="subMenuEvent(this);">' + this.name + '</a>');
                    aHtml.push('<button type="button" class="icoBookmark' + sCateSelected + '" id="icoBookmark">즐겨찾기 추가</button>');
                    aHtml.push('</li>');
                  });
                  aHtml.push('</ul>');
                }
                aHtml.push('</li>');
              });
              aHtml.push('</ul>');
            }
            aHtml.push('</li>');
          });
          aHtml.push('</ul>');
        }
        $(oParentNode).append(aHtml.join(''));
      },
      close: function () {
        $('.slideSubMenu').remove();
      },
      checkSub: function () {
        $('#aside .cate').each(function () {
          var $this = $(this);
          var cp = $this.attr('cate');
          if (!cp) return;
          var iCateNo = Number(methods.getParam(cp, 'cate_no'));

          var result = methods.aSubCategory[iCateNo];
          if (result == undefined) {
            if ($(this).closest('.aside_toggle.project').length) {
              var sHref = '/product/project.html' + cp;
            } else {
              var sHref = '/product/list.html' + cp;
            }

            $(this).attr('href', sHref);
            $(this).parent().attr('class', 'noChild');
          }
        });
      },
      getMyCateList: function () {
        var sMyCateList = localStorage.getItem('myCateList');
        if (sMyCateList != null && sMyCateList != '') {
          var aTempList = sMyCateList.split('|');
          var aHtml = [];
          for (var i = 0; i < aTempList.length; i++) {
            if (aTempList[i] != '') {
              var iCateNo = aTempList[i];
              var sCateName = aCategory[iCateNo].name;
              var sCateParam = aCategory[iCateNo].param;
              aHtml.push('<li id="bookmark' + iCateNo + '"><a href="/product/list.html' + sCateParam + '" book_mark="' + iCateNo + '">' + sCateName + '</a><button type="button" class="icoBookmark selected" onclick="setMyCateList(' + iCateNo + ');">즐겨찾기 삭제</button></li>');
              $('#cate' + iCateNo + ' #icoBookmark').addClass('selected');
            }
          }
          $('#bookmartCateArea').append('<ul>' + aHtml.join('') + '</ul>');
        }
        chkMyCateList();
      },
    };

    //if (tl_isMobileSize()) {
    $('.cp792.btn').click(function (e) {
      var $btn = $(this);
      var $left = $('.d_panel.left'); // 메뉴박스
      if (!window['tl_menu_data']) {
        $.ajax({
          url: '/exec/front/Product/SubCategory',
          dataType: 'json',
          async: false,
          success: function (aData) {
            window.tl_menu_data = aData;
          },
        });
      }
      if (!$left.hasClass('dom-loaded')) {
        $.ajax({
          url: '/_wg/_cPack/cp792/popup_left.html',
          dataType: 'html',
          async: false,
          success: function (data) {
            var html = $("<div class='remove'></div>").html(data).find('.loadhtml').html();
            $left.html(html);
            $left.addClass('dom-loaded');
          },
        });
        methods.get();

        /* 추가메뉴 */

        $('#aside .categorySub').DB_cate({
          mouseEvent: 'click',
          motionType: 'none',
        });

        // 이벤트
        $('#slideCateList li > a.cate').click(function (e) {
          var iCateNo = Number(methods.getParam($(this).attr('cate'), 'cate_no'));
          if ($(this).parent().attr('class') == 'xans-record- selected') {
            methods.close();
          } else {
            if (!iCateNo) return;
            $('#aside #slideCateList li').removeClass('selected');
            methods.close();
            methods.show(this.parentNode, iCateNo);
          }
        });

        $('#aside ul a.cate').click(function (e) {
          $(this).parent().find('li').removeClass('selected');
          $(this).parent().toggleClass('selected');
          if (!$(this).parent('li').hasClass('noChild')) {
            e.preventDefault();
          }
        });
      }

      // 모바일 일때
      $left.bPopup(
        {
          zIndex: 999, // z-index
          positionStyle: 'fixed', // 고정방법
          speed: 300, // 속도 (css transition과 동일하게 설정)
          autoClose: 600000, // 1000 = 1초후 닫힘
          modal: true, // 배경
          transition: 'custom',
          follow: [false, false],
          openClass: 'on',
          onClose: function () {
            $btn.removeClass('on'); // 버튼 클래스에 on 삭제
          },
        },
        function () {
          $left.find('.d_toggle').addClass('d_on');
        }
      );
    });
    // } else {
    //   // pc 일때
    //   $(".cp792.btn").click(function (e) {
    //     var $btn = $(this);
    //     $btn.blur();
    //     $(".cp792.popup.idx1").bPopup(
    //       {
    //         preLoadSelector: ".loadhtml",
    //         preLoadUrl: "/_wg/_cPack/cp792/popup.html", // 페이지주소
    //         zIndex: 999, // z-index
    //         positionStyle: "fixed", // 고정방법
    //         speed: 300, // 속도 (css transition과 동일하게 설정)
    //         autoClose: 60000, // 1000 = 1초후 닫힘
    //         modal: true, // 배경
    //         transition: "custom",
    //         follow: [false, false],
    //         openClass: "on",
    //         onClose: function () {
    //           $btn.removeClass("on"); // 버튼 클래스에 on 삭제
    //         },
    //       },
    //       function () {
    //         var $this = $(this);
    //         if (!$this.hasClass("script-on")) {
    //           //한번만 실행하기 위해 class 추가
    //           //--------------------------------------------------------------------------------------------------

    //           $("#category-full .categorySub")
    //             .find("ul>li")
    //             .each(function (index, element) {
    //               $(this).has("ul").addClass("arrow");
    //             });

    //           $("#category-full .categorySub ul>li.arrow")
    //             .mouseenter(function (e) {
    //               $(this).css("z-index", 1);
    //               $(this).find("ul").stop(true, true).fadeIn(speed);
    //               $(this).addClass("on");
    //             })
    //             .mouseleave(function (e) {
    //               $(this).find("ul").stop(true, true).fadeOut(speed);
    //               $(this).removeClass("on");
    //             });

    //           // /_wg/js/wg.js에서 ajax로 불러온걸 전역에  tl_menu_data로 저장
    //           // console.log(window.tl_menu_data);
    //           var $d1_wrap = $("#category-full .d1-wrap");
    //           var aData = window.tl_menu_data;
    //           $.each(aData, function (index, key) {
    //             var $d1 = $d1_wrap.find('.d1[data-param$="=' + key.parent_cate_no + '"]');
    //             if ($d1.length > 0) {
    //               if ($d1.hasClass("be") === false) {
    //                 $d1.addClass("be");
    //                 $d1.append('<div class="d2-wrap"><dl></dl></div>');
    //               }
    //               $d1.find(".d2-wrap dl").append('<dd data-param="' + key.param + '" class="d2"><a href="/product/list.html' + key.param + '">' + key.name + "</a></dd>");
    //               return;
    //             }

    //             var $d2 = $d1_wrap.find('.d2[data-param$="=' + key.parent_cate_no + '"]');
    //             if ($d2.length > 0) {
    //               if ($d2.hasClass("be") === false) {
    //                 $d2.addClass("be");
    //                 $d2.append('<dl class="d3-wrap"></dl>');
    //               }
    //               $d2.find(".d3-wrap").append('<dd data-param="' + key.param + '" class="d3"><a href="/product/list.html' + key.param + '">' + key.name + "</a></dd>");
    //               return;
    //             }

    //             var $d3 = $d1_wrap.find('.d3[data-param$="=' + key.parent_cate_no + '"]');
    //             if ($d3.length > 0) {
    //               if ($d3.hasClass("be") === false) {
    //                 $d3.addClass("be");
    //                 $d3.append('<dl class="d4-wrap"></dl>');
    //               }
    //               $d3.find(".d4-wrap").append('<dd data-param="' + key.param + '" class="d4"><a href="/product/list.html' + key.param + '">' + key.name + "</a></dd>");
    //               return;
    //             }
    //           });

    //           var $full = $("#category-full");
    //           var $d1 = $full.find(".d1");
    //           var $d2 = $full.find(".d2");
    //           var $d3 = $full.find(".d3");
    //           var speed = 250;

    //           $d2
    //             .bind("mouseenter", function () {
    //               $d2.css("z-index", 0);
    //               $(this).css("z-index", 1);
    //               $(this).find(".d3-wrap").stop(true, true).fadeIn(speed);
    //               $(this).addClass("on");
    //             })
    //             .bind("mouseleave", function () {
    //               $(this).find(".d3-wrap").stop(true, true).fadeOut(speed);
    //               $(this).removeClass("on");
    //             });
    //           $d3
    //             .bind("mouseenter", function () {
    //               $d3.css("z-index", 0);
    //               $(this).css("z-index", 1);
    //               $(this).find(".d4-wrap").stop(true, true).fadeIn(speed);
    //               $(this).addClass("on");
    //             })
    //             .bind("mouseleave", function () {
    //               $(this).find(".d4-wrap").stop(true, true).fadeOut(speed);
    //               $(this).removeClass("on");
    //             });
    //           //--------------------------------------------------------------------------------------------------

    //           //동적으로 불러오는 부분이 스크롤바가 있을 때
    //           if (tl_isMobile()) {
    //           } else {
    //             jQuery(this)
    //               .find(".scrollbar_box")
    //               .mCustomScrollbar({
    //                 theme: "dark",
    //                 mouseWheel: { scrollAmount: 300 },
    //               });
    //           }
    //         }
    //         $this.addClass("script-on");
    //         $btn.addClass("on");
    //       }
    //     );
    //   });
    // }
  });
})(jQuery);

function subMenuEvent(obj) {
  $(obj).parent().find('li').removeClass('selected');
  $(obj).parent().toggleClass('selected');
}
function setMyCateList(iCateNo, oObj) {
  $(oObj).toggleClass('selected');
  var sMyCateList = localStorage.getItem('myCateList');
  var aCateList = [];
  if (checkInArray(sMyCateList, iCateNo) == true) {
    var aTemp = sMyCateList.split('|');
    for (var i = 0; i < aTemp.length; i++) {
      if (aTemp[i] != iCateNo) {
        aCateList.push(aTemp[i]);
      }
    }
    var sCateList = aCateList.join('|');
    localStorage.setItem('myCateList', sCateList);
    $('#bookmartCateArea #bookmark' + iCateNo).remove();
    if (aCateList.length == 0) {
      $('#bookmarkCategory #bookmartCateArea').find('ul').remove();
    }
    $('#cate' + iCateNo + ' > #icoBookmark').removeClass('selected');
  } else {
    var sCateName = aCategory[iCateNo].name;
    var sCateParam = aCategory[iCateNo].param;
    var sHtml = '';
    if (sMyCateList == null || sMyCateList == '') {
      sHtml = '<ul><li id="bookmark' + iCateNo + '"><a href="/product/list.html' + sCateParam + '" book_mark="' + iCateNo + '">' + sCateName + '</a><button type="button" class="icoBookmark selected" onclick="setMyCateList(' + iCateNo + ');">즐겨찾기 삭제</button></li></ul>';
      $('#bookmarkCategory #bookmartCateArea').append(sHtml);
    } else {
      sHtml = '<li id="bookmark' + iCateNo + '"><a href="/product/list.html' + sCateParam + '" book_mark="' + iCateNo + '">' + sCateName + '</a><button type="button" class="icoBookmark selected" onclick="setMyCateList(' + iCateNo + ');">즐겨찾기 삭제</button></li>';
      $('#bookmarkCategory #bookmartCateArea ul').append(sHtml);
    }
    $(this).addClass('selected');
    if (sMyCateList == null || sMyCateList == '') {
      localStorage.setItem('myCateList', iCateNo);
    } else {
      localStorage.setItem('myCateList', sMyCateList + '|' + iCateNo);
    }
  }
  chkMyCateList();
}
function checkInArray(sBookmarkList, iCateNo) {
  if (sBookmarkList == null) return false;
  var aBookmarkList = sBookmarkList.split('|');
  for (var i = 0; i < aBookmarkList.length; i++) {
    if (aBookmarkList[i] == iCateNo) {
      return true;
    }
  }
  return false;
}
function chkMyCateList() {
  var sMyCateList = localStorage.getItem('myCateList');
  if (sMyCateList == null || sMyCateList == '') {
    $('#bookmarkEmpty').show();
  } else {
    $('#bookmarkEmpty').hide();
  }
}
