// 슬라이드배너 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery(function () {
  var $owl = jQuery('.cp301_slide .ul');
  $owl.owlOneItemExt({
    items: 1, //화면에 보이는 개수
    margin: 2, //슬라이드 간격
    stagePadding: 0, //좌우측 보이는 정도
    smartSpeed: 300, //슬라이드 속도
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: true, //좌우화살표
    loop: true, //루프
    autoplay: true, //자동롤링
    autoplayTimeout: 5000, //자동롤링 시간간격 (1000=1초)
    autoplayHoverPause: true, //마우스오버시 정지
    rewind: false, //끝에서 되돌림
    center: true, //중앙정렬
    autowidth: true, //자동 넓이 설정
    autoHeight: true, //자동 높이 설정
    lazyLoad: true,
  });
  window.owl = $owl;
});



// 공지사항 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery(function () {
  var $owl = jQuery('.cp301_notice_wrap .ul');
  $owl.owlOneItemExt({
    items: 1, //화면에 보이는 개수
    margin: 2, //슬라이드 간격
    stagePadding: 0, //좌우측 보이는 정도
    smartSpeed: 300, //슬라이드 속도
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: true, //좌우화살표
    loop: true, //루프
    autoplay: true, //자동롤링
    autoplayTimeout: 8000, //자동롤링 시간간격 (1000=1초)
    autoplayHoverPause: true, //마우스오버시 정지
    rewind: false, //끝에서 되돌림
    center: true, //중앙정렬
    autowidth: true, //자동 넓이 설정
    autoHeight: true, //자동 높이 설정
    lazyLoad: true,
  });
  window.owl = $owl;
});

//cp301 공지사항 슬라이드 (jquery.DB_slideStepBanner.min.js)
!(function(n) {
  n.fn.DB_slideStepBanner = function(e) {
    var i = {
      moveSpeed: 500,
      axis: "x",
      dir: "next",
      autoRollingTime: 5000,
      viewNum: 1,
      overStop: true
    };
    n.extend(i, e);

    return this.each(function() {
      function e() {
        t();
        x > i.viewNum ? (o(), a()) : (p.hide(), d.hide());
      }

      function t() {
        for (var n = 0; x > n; n++) {
          var e = r.eq(n);
          v[n] = e;
          m[n] = h * n;
          if ("x" == i.axis) {
            e.css({ position: "absolute", left: h * n });
          } else {
            e.css({ position: "absolute", top: h * n });
          }
        }
      }

      function o() {
        f
          .bind("mouseenter", function() {
            b && (S = 1);
          })
          .bind("mouseleave", function() {
            S = 0;
          });

        p.bind("click", function() {
          g && ((g = 0), (i.dir = "next"), s());
        });

        d.bind("click", function() {
          g && ((g = 0), (i.dir = "prev"), s());
        });
      }

      function s() {
        for (var e = 0; x > e; e++) {
          if ("x" == i.axis) {
            if ("next" == i.dir) {
              v[e]
                .css("left", m[e])
                .animate(
                  { left: m[e] - h },
                  i.moveSpeed,
                  "easeInOutExpo",
                  function() {
                    0 == n(this).index() && ((g = 1), v.push(v.shift()));
                  }
                );
            } else {
              0 == e && v.unshift(v.pop());
              v[e]
                .css("left", m[e] - h)
                .animate({ left: m[e] }, i.moveSpeed, "easeInOutExpo", function() {
                  0 == n(this).index() && (g = 1);
                });
            }
          } else {
            if ("next" == i.dir) {
              v[e]
                .css("top", m[e])
                .animate(
                  { top: m[e] - h },
                  i.moveSpeed,
                  "easeInOutExpo",
                  function() {
                    0 == n(this).index() && ((g = 1), v.push(v.shift()));
                  }
                );
            } else {
              0 == e && v.unshift(v.pop());
              v[e]
                .css("top", m[e] - h)
                .animate({ top: m[e] }, i.moveSpeed, "easeInOutExpo", function() {
                  0 == n(this).index() && (g = 1);
                });
            }
          }
        }
      }

      function a() {
        l = setInterval(u, i.autoRollingTime);
      }

      function u() {
        0 == S && s();
      }

      var f = n(this),
        c = f.find(".DB_imgSet"),
        r = c.find(">li"),
        p = f.find(".DB_nextBtn"),
        d = f.find(".DB_prevBtn"),
        x = r.length,
        h = 0;
      h =
        "x" == i.axis
          ? r.width() + 1 * String(r.css("margin-right")).replace(/[a-z]/g, "")
          : r.height() + 1 * String(r.css("margin-bottom")).replace(/[a-z]/g, "");
      var l,
        m = [],
        v = [],
        g = 1,
        S = 0,
        b = i.overStop;
      e();
    });
  };
})(jQuery);

    $('.cp301_notice_slide').DB_slideStepBanner({
        moveSpeed:500,                  //이동속도
        autoRollingTime:3000,           //자동롤링시간(밀리초)
        axis:'y',                       //이동방향
        dir:'next',                     //진행방향('next','prev')
        overStop:true,					//오버시멈춤
        viewNum:5						//보여지는갯수
    });
