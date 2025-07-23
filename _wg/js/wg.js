//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//   제작 : 디자인웹굿, 디자인블랙, 심스킨
//   라이센스 : 무한인라이센스, 엄우식(디자인웹굿)
//   해당 주석은 저작권상 절대 삭제 불가입니다.
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// body 태그에 모바일일때 .mobile 추가
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
jQuery(function () {
	if (tl_isMobile()) jQuery("body").addClass("mobile");
	else jQuery("body").addClass("pc");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// body 태그에 브라우저 크기에 따른 클래스 추가
function updateBodyClass() {
	if (window.innerWidth > 1023) {
		document.body.classList.add("pc_type");
		document.body.classList.remove("m_type");
	} else {
		document.body.classList.add("m_type");
		document.body.classList.remove("pc_type");
	}
}
// 초기 클래스를 설정
updateBodyClass();
// 창 크기가 변경될 때마다 클래스를 업데이트
window.addEventListener("resize", updateBodyClass);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 레이지로딩
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var lazyLoadInstance = null;
$(function () {
	lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
	});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 상품분류연동(카테고리 전체보기)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	$(".p0202").append('<div class="tmp_x" style="position:absolute;z-index:50;width:100%;height:100%;top:0;left:0;" /></div><div class="tmp_x" style="position:absolute;z-index:50;width:50px;height:50px;top:-60px;left:10px;" /></div>');
	var $d1_wrap = $(".d1-wrap");
	var menu_loaded = false;
	//setCategory(false);
	$(".tmp_x").ready(function (e) {
		//상품분류가 많은 경우 ready를 mouseenter 로 변경한다.
		if (menu_loaded) return;
		menu_loaded = true;
		// {{{메뉴 항목 불러오기
		$.ajax({
			url: "/exec/front/Product/SubCategory",
			dataType: "json",
			success: function (aData) {
				window.tl_menu_data = aData;
				if (aData == null || aData == "undefined") {
					return;
				}
				var gCategory = {};
				var _iCateNo = 0;
				var _aTmp = [];
				$(aData).each(function () {
					if (!gCategory[this.parent_cate_no]) {
						gCategory[this.parent_cate_no] = [];
					}
					gCategory[this.parent_cate_no].push(this);
				});
				$.each($d1_wrap.find(".d1"), function () {
					_aTmp = $(this).data("param").split("?cate_no=");
					_iCateNo = _aTmp[1];
					var $d1 = $(this);
					if (!gCategory[_iCateNo]) {
						return;
					}
					$d1.addClass("be");
					$d1.append('<div class="d2-wrap"><dl></dl></div>');
					$.each(gCategory[_iCateNo], function () {
						$d1.find(".d2-wrap dl").append('<dd data-param="' + this.param + '" class="d2">' + "<a href=/" + this.design_page_url + this.param + ">" + this.name + "</a></dd>");
					});

					$(this)
						.find(".d2-wrap > dl > dd")
						.each(function () {
							_aTmp = $(this).data("param").split("?cate_no=");
							_iCateNo = _aTmp[1];
							if (!gCategory[_iCateNo]) {
								return;
							}
							var $d2 = $(this);
							$d2.addClass("be");
							$d2.append('<div class="d3-wrap"><dl></dl></div>');
							$.each(gCategory[_iCateNo], function () {
								$d2.find(".d3-wrap dl").append('<dd data-param="' + this.param + '" class="d3">' + "<a href=/" + this.design_page_url + this.param + ">" + this.name + "</a></dd>");
							});

							$(this)
								.find(".d3-wrap > dl > dd")
								.each(function () {
									_aTmp = $(this).data("param").split("?cate_no=");
									_iCateNo = _aTmp[1];
									if (!gCategory[_iCateNo]) {
										return;
									}
									var $d3 = $(this);
									$d3.addClass("be");
									$d3.append('<div class="d4-wrap"><dl></dl></div>');
									for (var i = 0; i < gCategory[_iCateNo].length; i++) {
										$d3.find(".d4-wrap dl").append('<dd data-param="' + gCategory[_iCateNo][i].param + '" class="d4"><a href="/product/list.html' + gCategory[_iCateNo][i].param + '">' + gCategory[_iCateNo][i].name + "</a></dd>");
									}
								});
						});
				});
				setCategory(true);
				if (lazyLoadInstance) {
					lazyLoadInstance.update();
				}
				$(".p0202 .tmp_x").remove(); // 없어지면서 mouseenter
			},
		});
		// }}} 메뉴항목 불러오기
	});
	//$('.tmp_x').trigger('mouseenter');
});

function setCategory(img_flag) {
	//lnb
	(function () {
		var $this = $("#category-lnb");
		var $d1 = $this.find(".d1");
		var $d2 = $this.find(".d2");
		var $d3 = $this.find(".d3");
		var maxHeight = $this.find(".d1-wrap").attr("data-maxHeight") * 1;
		var maxHeight2 = $this.find(".d1-wrap").attr("data-maxHeight2") * 1;
		var speed = 200;

		$d1.bind("mouseenter", function () {
			var _this = $(this);
			var _d2wrap = _this.find(".d2-wrap");
			_this.addClass("on");
			_d2wrap.stop(true, true).fadeIn(speed);
			if (_this.hasClass("repos") == false) {
				_this.addClass("repos");
				var count = 2;
				var _width = 0;
				var _height = 0;
				var $d2 = _this.find(".d2");
				for (var i = 0; i < $d2.length; i++) {
					if (i == 0) {
						_d2wrap.find(">dl").addClass("s1");
					}
					var __this = $d2.eq(i);
					var __next = __this.next();
					if (__next.length == 0) {
						break;
					}
					if (__next.position().top > maxHeight) {
						var _cut = __this.nextAll().detach();
						//console.log(_cut)
						_height = _d2wrap.outerHeight();
						_d2wrap.append('<dl class="s' + count + '"></dl>');
						_d2wrap
							.find(".s" + count)
							.height(_height)
							.append(_cut);
						count++;
					}
				}
				var _img = _d2wrap.find(".img");
				_d2wrap.append(_img);
				_d2wrap.find(".s1").height(_d2wrap.height());
			}
		}).bind("mouseleave", function () {
			$(this).removeClass("on");
			$(this)
				.find(".d2-wrap")
				.stop(true, true)
				.fadeOut(speed - 200);
		});

		$d2.bind("mouseenter", function () {
			$d2.css("z-index", 2);
			var _this = $(this);
			var _d3wrap = _this.find(".d3-wrap");
			_this.addClass("on");
			_d3wrap.stop(true, true).fadeIn(speed);

			if (_this.hasClass("repos") == false) {
				_this.addClass("repos");
				var count = 2;
				var _width = 0;
				var _height = 0;
				var $d3 = _this.find(".d3");
				for (var i = 0; i < $d3.length; i++) {
					if (i == 0) {
						_d3wrap.find(">dl").addClass("s1");
					}
					var __this = $d3.eq(i);
					var __next = __this.next();
					if (__next.length == 0) {
						break;
					}
					if (__next.position().top > maxHeight2) {
						var _cut = __this.nextAll().detach();
						_height = _d3wrap.outerHeight();
						_d3wrap.append('<dl class="s' + count + '"></dl>');
						_d3wrap
							.find(".s" + count)
							.height(_height)
							.append(_cut);
						count++;
					}
				}
				_d3wrap.find(".s1").height(_d3wrap.height());
			}

			_this.css("z-index", 3);
			_d3wrap.stop(true, true).fadeIn(speed);
			_this.addClass("on");
		}).bind("mouseleave", function () {
			$(this).find(".d3-wrap").stop(true, true).fadeOut(speed);
			$(this).removeClass("on");
		});

		$d3.bind("mouseenter", function () {
			$d3.css("z-index", 2);
			$(this).css("z-index", 3);
			$(this).find(".d4-wrap").stop(true, true).fadeIn(speed);
			$(this).addClass("on");
		}).bind("mouseleave", function () {
			$(this).find(".d4-wrap").stop(true, true).fadeOut(speed);
			$(this).removeClass("on");
		});

		//이미지넣기
		if (img_flag) {
			var $d1_img = $(".category_img li");
			$d1.each(function (index) {
				if ($d1_img.eq(index).children().length > 0) {
					if ($(this).find(".d2-wrap").length > 0) {
						$(this)
							.find(".d2-wrap")
							.append('<div class="img">' + $d1_img.eq(index).html() + "</div>");
					} else {
						$(this).append('<div class="d2-wrap only"></div>');
						$(this)
							.find(".d2-wrap")
							.append('<div class="img">' + $d1_img.eq(index).html() + "</div>");
					}
				}
			});
		}
	})();

	//full
	(function () {
		var $this = $("#category-full");
		var $d1 = $this.find(".d1");
		var $d2 = $this.find(".d2");
		var $d3 = $this.find(".d3");
		var $close = $this.find(".close");
		var $full_btn = $("#d_full_btn");
		var speed = 150;
		$d1.bind("mouseenter", function () {
			$d1.css("z-index", 0);
			$(this).css("z-index", 1);
			$(this).addClass("on");
		}).bind("mouseleave", function () {
			$(this).removeClass("on");
		});
		$d2.bind("mouseenter", function () {
			$d2.css("z-index", 0);
			$(this).css("z-index", 1);
			$(this).find(".d3-wrap").stop(true, true).fadeIn(speed);
			$(this).addClass("on");
		}).bind("mouseleave", function () {
			$(this).find(".d3-wrap").stop(true, true).fadeOut(speed);
			$(this).removeClass("on");
		});
		$d3.bind("mouseenter", function () {
			$d3.css("z-index", 0);
			$(this).css("z-index", 1);
			$(this).find(".d4-wrap").stop(true, true).fadeIn(speed);
			$(this).addClass("on");
		}).bind("mouseleave", function () {
			$(this).find(".d4-wrap").stop(true, true).fadeOut(speed);
			$(this).removeClass("on");
		});

		$this.bind("click", function (e) {
			e.stopPropagation();
		});

		//마우스오버
		// $full_btn.bind("mouseenter", function () {
		//     $(this).addClass("on");
		//     $this.fadeIn(speed);
		// })
		//   .bind("mouseleave", function () {
		//     $(this).removeClass("on");
		//     $this.fadeOut(speed - 200);
		// });

		//마우스클릭
		$full_btn.bind("click", function (e) {
			e.stopPropagation();
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
				$this.fadeOut(speed);
			} else {
				$(this).addClass("on");
				$this.fadeIn(speed);
			}
		});

		$close.bind("click", function (e) {
			e.stopPropagation();
			$full_btn.removeClass("on");
			$this.fadeOut(speed);
		});

		$("body").bind("click", function (event) {
			if ($full_btn.hasClass("on")) {
				$full_btn.removeClass("on");
				$this.fadeOut(speed);
			}
		});
	})();

	//중분류 카테고리
	(function () {
		var $this = $(".menuCategory");
		if ($this.length > 0) {
			var $dm2 = $this.find(".dm2");
			var $dm3 = $this.find(".dm3");
			var speed = 200;
			$dm2.each(function () {
				if ($(this).find(".dm3-wrap").length > 0) {
					$(this).addClass("be");
				}
			});
			$dm3.each(function () {
				if ($(this).find(".dm4-wrap").length > 0) {
					$(this).addClass("be");
				}
			});
			$dm2.bind("mouseenter", function () {
				$(this).addClass("on");
				$(this).find(".dm3-wrap").stop(true, true).fadeIn(speed);
			}).bind("mouseleave", function () {
				$(this).removeClass("on");
				$(this).find(".dm3-wrap").stop(true, true).fadeOut(speed);
			});
			$dm3.bind("mouseenter", function () {
				$(this).addClass("on");
				$(this).find(".dm4-wrap").stop(true, true).fadeIn(speed);
			}).bind("mouseleave", function () {
				$(this).removeClass("on");
				$(this).find(".dm4-wrap").stop(true, true).fadeOut(speed);
			});
		}
	})();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 분류메뉴
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
!(function ($) {
	$.fn.DB_cate = function (options) {
		var opt = {
			fadeSpeed: 200,
			mouseEvent: "over", //click, over
			motionType: "fade", //none, fade
		};
		$.extend(opt, options);
		return this.each(function () {
			var $this = $(this);
			var $li = $this.find("li");
			var $ul = $this.find("ul");
			var $d2 = $this.find(".d2");
			var fadeSpeed = opt.fadeSpeed;
			var motionType = opt.motionType;
			var mouseEvent = opt.mouseEvent;
			var $body = $("body");

			$li.each(function () {
				//화살표
				if ($(this).find(">ul").length > 0) {
					$(this).addClass("arrow");
				}
			});

			$d2.each(function () {
				//화살표
				if ($(this).find(">ul").length > 0) {
					$(this).addClass("arrow");
				}
			});

			if (mouseEvent == "over") {
				$li.bind("mouseenter", function () {
					$(this).addClass("on");
					if (motionType == "none") {
						$(this).find(">ul").show();
					} else {
						$(this).find(">ul").fadeIn(fadeSpeed);
					}
				}).bind("mouseleave", function () {
					$(this).removeClass("on");
					$(this).find(">ul").hide();
				});
				$li.bind("click", function (e) {
					e.stopPropagation();
				});
			} else {
				$li.bind("click", function (e) {
					console.log("clicked");
					e.stopPropagation();
					if ($(this).hasClass("fix")) {
						$(this).removeClass("fix");
						if (motionType == "none") {
							$(this).find(">ul").hide();
						} else {
							$(this).find(">ul").fadeOut(fadeSpeed);
						}
					} else {
						$(this).nextAll().removeClass("fix").find("ul").hide();
						$(this).prevAll().removeClass("fix").find("ul").hide();

						$(this).addClass("fix");
						if (motionType == "none") {
							$(this).find(">ul").show();
						} else {
							$(this).find(">ul").fadeIn(fadeSpeed);
						}
					}
				})
					.bind("mouseenter", function () {
						$(this).addClass("on");
					})
					.bind("mouseleave", function () {
						$(this).removeClass("on");
					});
			}

			$body.bind("click", function (e) {
				if (motionType == "none") {
					$ul.hide();
				} else {
					$ul.fadeOut(fadeSpeed);
				}
				$li.removeClass("fix");
			});
		});
	};
})(jQuery);

// 상단메뉴
$(".menuOver").DB_cate({
	mouseEvent: "over",
	motionType: "fade",
});

// 추가메뉴전체
$(".menuClick").DB_cate({
	mouseEvent: "click",
	motionType: "fade",
});

// FAQ , 커뮤니티 공통
$(".JS_faq").DB_cate({
	mouseEvent: "over",
	motionType: "fade",
});

// 커뮤니티 공통
$(".JS_community").DB_cate({
	mouseEvent: "over",
	motionType: "fade",
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 분류명 마우스 오버시 한글
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	$(".p0202 .d1 > a, .p0202 .d1").each(function (i, e) {
		if ($(e).children("h").length) {
			$(e).addClass("ko");
		}
	});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 스크롤바
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function (event) {
	var ww = $(window).width();
	var $clnb = jQuery("#category_scroll");
	var scroll_on = false;
	var menu_swiper;
	var menu_swiper_state = false;
	var delay = (function () {
		var timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();
	$(window).resize(function (e) {
		ww = $(window).width();
		delay(toggle_vscroll, 100);
	});
	function toggle_vscroll() {
		if (tl_isMobile()) {
			// $clnb.css({ 'overflow-x': 'auto', 'overflow-y': 'hidden' });
			if (!menu_swiper_state) {
				menu_swiper = new Swiper(".menu-swiper-container", {
					scrollbar: ".swiper-scrollbar",
					draggable: true,
					scrollbarHide: false,
					freeMode: {
						enabled: true,
						momentum: false,
						momentumBounce: false,
					},
					slidesPerView: "auto",
					grabCursor: true,
				});
				menu_swiper_state = true;
			}
		} else if (ww > 300 && ww < 1200 && scroll_on == false) {
			$clnb.addClass("scrollbar_box");
			//스크롤바를 마우스로 가능하게
			if (!menu_swiper_state) {
				menu_swiper = new Swiper(".menu-swiper-container", {
					scrollbar: ".swiper-scrollbar",
					draggable: true,
					scrollbarHide: false,
					freeMode: {
						enabled: true,
						momentum: false,
						momentumBounce: false,
					},
					slidesPerView: "auto",
					grabCursor: true,
				});
				menu_swiper_state = true;
			}
		} else if (ww >= 1200 || ww <= 300) {
			$clnb.removeClass("scrollbar_box");
			if (menu_swiper_state) {
				menu_swiper.destroy();
				menu_swiper_state = false;
			}
		}
	}
	toggle_vscroll();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 메뉴 모아보기
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 스크롤 메뉴 오픈
function onResize() {
	let categoryScroll = $("#category_scroll");
	let scrollbar = categoryScroll.find(".swiper-scrollbar");
	let category_scroll_open = $("#category_scroll_open");
	setTimeout(function () {
		if (scrollbar.css("display") == "none") {
			$("#category_scroll_btn").css("display", "none");
			category_scroll_open.removeClass("on");
			scroll_open();
		} else {
			$("#category_scroll_btn").css("display", "flex");
		}
	}, 500);
}
function scroll_open() {
	let category_scroll_open = $("#category_scroll_open");
	let category_scroll = $("#category_scroll");
	if (category_scroll_open.hasClass("on")) {
		category_scroll.addClass("on");
		$("#category_scroll_btn > i").addClass("xi-angle-up");
		$("#category_scroll_btn > i").removeClass("xi-angle-down");
	} else {
		category_scroll.removeClass("on");
		$("#category_scroll_btn > i").addClass("xi-angle-down");
		$("#category_scroll_btn > i").removeClass("xi-angle-up");
	}
}
// 스크롤 메뉴 오픈 끝
$(function () {
	// 스크롤 메뉴 오픈
	var li_m01 = $("#category_scroll .categorySub.m01 > li");
	var li_m02 = $("#category_scroll .categorySub.m02 > li");
	var li_m03 = $("#category-lnb ul > li.d1.li.xans-record-").clone();
	var li_m04 = $("#category_scroll .categorySub.m04 > li");
	li_m04.find("ul").remove();
	// weare 메뉴 삽입안함 2024-05-24
	// $("#category_scroll_open ul").append(li_m01.clone());
	li_m03.each(function () {
		var aTag = $(this).find("a");
		var aHrefValue = aTag.attr("href");
		var aText = aTag.text();
		var newAnchorTag = $("<a>").attr("href", aHrefValue).text("링크");
		$(this).text(aTag.text());
		var clonedLi = $(this);
		aTag.remove();
		clonedLi.prepend(newAnchorTag);
		$("#category_scroll_open ul").append(clonedLi);
	});
	$("#category_scroll_open ul").append(li_m04.clone());
	// 추가메뉴 etc
	$("#category_scroll_open ul").append(li_m02.clone());
	onResize();
	$(window).resize(onResize);
	$("#category_scroll_btn").click(function () {
		let category_scroll_open = $("#category_scroll_open");
		let category_scroll = $("#category_scroll");
		category_scroll_open.toggleClass("on");
		scroll_open();
	});
	// 스크롤 메뉴 오픈 끝
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 할인율  DB_prd_rate.js
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	//상품페이지
	$(".DB_rate").each(function () {
		var $this = $(this);
		var data_arr = $this.attr("data-price").split("^");
		var custom_price = data_arr[0].replace(/,/gi, "");
		//var selling_price = data_arr[1].replace(/,/gi, "");
		var selling_price = data_arr[1].split("$")[0].replace(/[^0-9]/g, "");
		//console.log(selling_price)
		var discounted_price = $this.find(".dc_rate .sale").text().split("(")[0].replace(/,/gi, "").replace("원", "");
		//상세페이지인경우
		if ($("#span_product_price_sale").length > 0) {
			discounted_price = $this.find("#span_product_price_sale").text().split("(")[0].replace(/,/gi, "").replace("원", "");
			//console.log('xxx');
		}
		setRate($this, custom_price, selling_price, discounted_price);
	});
	setTimeout(function () {
		$(".DB_rate").each(function () {
			var $this = $(this);
			var data_arr = $this.attr("data-price").split("^");
			var custom_price = data_arr[0].replace(/,/gi, "");
			//var selling_price = data_arr[1].replace(/,/gi, "");
			var selling_price = data_arr[1].split("$")[0].replace(/[^0-9]/g, "");
			var discounted_price = $this.find(".dc_rate .sale").text().split("(")[0].replace(/,/gi, "").replace("원", "");
			//상세페이지인경우
			if ($("#span_product_price_sale").length > 0) {
				discounted_price = $this.find("#span_product_price_sale").text().split("(")[0].replace(/,/gi, "").replace("원", "");
				//console.log('xxx');
			}
			setRate($this, custom_price, selling_price, discounted_price);
		});
	}, 500);
	$(".ec-base-paginate.typeMoreview .btnMore").click(function () {
		setTimeout(function () {
			$(".DB_rate").each(function () {
				var $this = $(this);
				var data_arr = $this.attr("data-price").split("^");
				var custom_price = data_arr[0].replace(/,/gi, "");
				// var selling_price = data_arr[1].replace(/,/gi, "");
				var selling_price = data_arr[1].split("$")[0].replace(/[^0-9]/g, "");

				var discounted_price = $this.find(".dc_rate .sale").text().split("(")[0].replace(/,/gi, "").replace("원", "");
				//상세페이지인경우
				if ($("#span_product_price_sale").length > 0) {
					discounted_price = $this.find("#span_product_price_sale").text().split("(")[0].replace(/,/gi, "").replace("원", "");
					//console.log('xxx');
				}
				setRate($this, custom_price, selling_price, discounted_price);
			});
		}, 500);
	});
	function setRate(_this, _custom_price, _selling_price, _discounted_price) {
		//console.log(_custom_price,_selling_price,_discounted_price)
		var $this = _this;
		var custom_price = _custom_price;
		if (custom_price == "" || custom_price == 0) {
			custom_price = _selling_price; //소비자가를 출력하지 않는경우 소비자가에 판매가를 넣어줌
		}
		//소비자가가 있어도 판매가-할인가로 계산
		if (_discounted_price != "") {
			custom_price = _selling_price;
		}
		var selling_price = _selling_price;
		var discounted_price = _discounted_price;
		if (selling_price) {
			var rate = 100 - Math.round((selling_price / custom_price) * 100);
		}
		if (discounted_price) {
			var rate = 100 - Math.round((discounted_price / custom_price) * 100);
		}
		if (rate > 0) {
			$this
				.find(".dc_rate")
				.addClass("on")
				.find(".per")
				.html(rate + "<i>%</i>");
		}
		//$this.find('.dc_rate').addClass('on').html(custom_price+','+selling_price+','+discounted_price);
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 게시판 탭메뉴 생성  DB_board_cate.js
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	var $select = $("#board_category");
	var $option = $select.find("option");
	if ($option.length == 0) return;
	var $board_cate = $(".DB_board_cate");
	var $form = $("#boardSearchForm");
	var url = $form.attr("action");
	var board_no = $form.find("#board_no").attr("value");

	for (var i = 0; i < $option.length; i++) {
		//$board_cate.append('<li class="'+$option.eq(i).attr('selected')+'"><a href="/board/product/list.html?board_no=6&category_no='+$option.eq(i).attr('value')+'">'+$option.eq(i).text()+'</a></li>');  //상품qna전용
		//$board_cate.append('<li class="' + $option.eq(i).attr('selected') + '"><a href="' + url + '?board_no=' + board_no + '&category_no=' + $option.eq(i).attr('value') + '">' + $option.eq(i).text() + '</a></li>'); //게시판공통
		$board_cate.append('<li class="' + $option.eq(i).prop("selected") + '"><a href="' + url + "?board_no=" + board_no + "&category_no=" + $option.eq(i).attr("value") + '">' + $option.eq(i).text() + "</a></li>"); //게시판공통
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 스위치버튼
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	var on_off = $.cookie("onoffcookie");
	if (on_off == "on") {
		$(".-switch").addClass("st2");
		$(".switch-button,.-switchWrap").addClass("on");
	} else {
		$(".-switch").addClass("st1");
		$(".-switchWrap,.-switchWrap").addClass("on");
	}
	$(".switch-button").click(function () {
		$(this).toggleClass("on");
		if ($(this).hasClass("on")) {
			$.cookie("onoffcookie", "on", { expires: 7, path: "/" }); //7일간 적용
			$(".-switch").addClass("st2");
		} else {
			$.cookie("onoffcookie", "off", { expires: 7, path: "/" }); //7일간 적용
			$(".-switch").removeClass("st2").addClass("st1");
		}
		//슬라이더 리사이징
		$(".owl-carousel").css({ opacity: "1" });
		setTimeout(function () {
			var resizeEvent = new Event("resize");
			window.dispatchEvent(resizeEvent);
			setTimeout(function () {
				$(".owl-carousel").animate({ opacity: 1 }, 100);
			}, 0);
		}, 0); ///슬라이더 리사이징
	});
	setTimeout(function () {
		$("body").addClass("load");
	}, 500);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 좌측디자인 추가 (게시판 ID=6, 고객센터, 마이페이지)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	if (
		location.href.indexOf("/board/") != -1 ||
		location.href.indexOf("/formMail") != -1 ||
		location.href.indexOf("/article") != -1 ||
		location.href.indexOf("/order") != -1 ||
		location.href.indexOf("/member") != -1 ||
		location.href.indexOf("/search") != -1 ||
		location.href.indexOf("/agreement") != -1 ||
		location.href.indexOf("/shopinfo") != -1 ||
		location.href.indexOf("/attend") != -1 ||
		location.href.indexOf("/recent") != -1 ||
		location.href.indexOf("/myshop") != -1
	) {
		$("#left").show();
		$("#container").addClass("left");
		$("#container #contents").addClass("left");
		$("#wrap").addClass("left");
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 상품비교 체크박스를 분류페이지에서만 보이게
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	if (location.href.indexOf("list.html") != -1) {
		$(".chk").show();
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 비회원주문조회 클릭시 비회원 주문조회 버튼 삭제
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	if (location.href.indexOf("noMemberOrder") != -1) {
		$(".btn_unuser_order").hide();
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 상품목록 추가이미지
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jquery.DB_prd_thumb.js
(function ($) {
	$.fn.DB_prd_thumb = function (options) {
		var settings = { motionSpeed: 300 };
		$.extend(settings, options);

		return this.each(function () {
			var $this = $(this);
			var $images = $this.find(".img");
			var $items = $images.find("> li");

			for (var i = 0; i < $items.length; i++) {
				var $item = $items.eq(i);
				if ($item.find("img").attr("data-src") == "") {
					$item.remove();
				}
			}

			$items = $images.find("> li");
			var $arrow = $this.find(".arrow");
			var $next = $this.find(".next");
			var $prev = $this.find(".prev");
			var itemCount = $items.length;

			if (itemCount === 1) {
				$this.remove();
				return;
			}

			var $btn = $this.find(".btn");

			if ($btn.find("li").length === 0) {
				for (var i = 0; i < itemCount; i++) {
					$btn.append('<li class="n' + (i + 1) + '">' + (i + 1) + "</li>");
				}
			}

			var $btnItems = $btn.find("> li");
			var currentIdx = 0;
			var prevIdx = 0;
			var direction = "next";

			init();

			function init() {
				setCss();
				setMouseEvent();
			}

			function setCss() {
				for (var i = 0; i < itemCount; i++) {
					var $item = $items.eq(i);
					$item.css({ top: "inherit", left: "inherit" });
					if (i === currentIdx) {
						$item.show();
					} else {
						$item.show();
					}
				}
				$btnItems.eq(prevIdx).removeClass("on");
				$btnItems.eq(currentIdx).addClass("on");
				prevIdx = currentIdx;
			}

			function setMouseEvent() {
				$this.on("mouseenter", function () {
					$(this).addClass("on");
				});

				$this.on("mouseleave", function () {
					$(this).removeClass("on");
					if (currentIdx !== 0) {
						currentIdx = 0;
						setAnimation();
					}
				});

				$btnItems.on("mouseenter", function () {
					var index = $(this).index();
					if (index > currentIdx) {
						direction = "next";
					} else {
						direction = "prev";
					}
					if (currentIdx !== index) {
						currentIdx = index;
						setAnimation();
					}
				});

				$next.on("click", function (e) {
					e.preventDefault();
					direction = "next";
					changeCurrent();
				});

				$prev.on("click", function (e) {
					e.preventDefault();
					direction = "prev";
					changeCurrent();
				});
			}

			function changeCurrent() {
				if (direction === "next") {
					currentIdx = ++currentIdx % itemCount;
				} else if (direction === "prev") {
					currentIdx = currentIdx === 0 ? itemCount - 1 : --currentIdx % itemCount;
				}
				setAnimation();
			}

			function setAnimation() {
				var $prevItem = $items.eq(prevIdx);
				var $currentItem = $items.eq(currentIdx);

				$prevItem.stop(true, true).fadeOut(settings.motionSpeed);
				$currentItem.stop(true, true).fadeIn(settings.motionSpeed);
				$btnItems.eq(prevIdx).removeClass("on");
				$btnItems.eq(currentIdx).addClass("on");
				prevIdx = currentIdx;
			}
		});
	};
})(jQuery);
$(".prdList .d_thumb").DB_prd_thumb();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 상품목록 추가이미지 터치로 넘어가도록, 더보기 기능 추가
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
	setTimeout(function () {
		$(".prdList .d_thumb").DB_prd_thumb();
		$(".d_thumb img").each(function () {
			var $this = $(this);
			$this.attr("src", $this.data("src"));
		});
		$(".d_thumb").each(function (index, element) {
			var $this = $(this);
			var Img = $this.children("img");

			Img.each(function () {
				Img.attr("src", Img.data("src"));
			});
			$this
				.children("ul.img")
				.addClass("owl-carousel")
				.addClass("thsilde-" + index);
			jQuery(function () {
				var $owl = jQuery(".thsilde-" + index);
				$owl.owlOneItemExt({
					items: 1, //화면에 보이는 개수
					margin: 2, //슬라이드 간격
					stagePadding: 0, //좌우측 보이는 정도
					smartSpeed: 500, //슬라이드 속도
					animateIn: "fadeIn",
					animateOut: "fadeOut",
					nav: false, //좌우화살표
					loop: true, //루프
					autoplay: false, //자동롤링
					autoplayTimeout: 99999999, //자동롤링 시간간격 (1000=1초)
					autoplayHoverPause: true, //마우스오버시 정지
					rewind: false, //끝에서 되돌림
					center: true, //중앙정렬
					autowidth: true, //자동 넓이 설정
					autoHeight: true, //자동 높이 설정
					lazyLoad: true,
				});
				//$('.d_thumb .owl-prev').hover(function() {
				//    $owl.trigger('prev.owl.carousel', [300]);
				//});
				//$('.d_thumb .owl-next').hover(function() {
				//    $owl.trigger('next.owl.carousel', [300]);
				//});
				$(".d_thumb .owl-dot").hover(function () {
					$(this).trigger("click");
				});
			});
		});
	}, 500);
	$(".ec-base-paginate.typeMoreview .btnMore").click(function () {
		setTimeout(function () {
			$(".prdList .d_thumb").DB_prd_thumb();
			$(".d_thumb img").each(function () {
				var $this = $(this);
				$this.attr("src", $this.data("src"));
			});
			$(".d_thumb").each(function (index, element) {
				var $this = $(this);
				var Img = $this.children("img");
				Img.each(function () {
					Img.attr("src", Img.data("src"));
				});
				$this
					.children("ul.img")
					.addClass("owl-carousel")
					.addClass("thsilde-" + index);
				jQuery(function () {
					var $owl = jQuery(".thsilde-" + index);
					$owl.owlOneItemExt({
						items: 1, //화면에 보이는 개수
						margin: 2, //슬라이드 간격
						stagePadding: 0, //좌우측 보이는 정도
						smartSpeed: 500, //슬라이드 속도
						animateIn: "fadeIn",
						animateOut: "fadeOut",
						nav: false, //좌우화살표
						loop: true, //루프
						autoplay: false, //자동롤링
						autoplayTimeout: 99999999, //자동롤링 시간간격 (1000=1초)
						autoplayHoverPause: true, //마우스오버시 정지
						rewind: false, //끝에서 되돌림
						center: true, //중앙정렬
						autowidth: true, //자동 넓이 설정
						autoHeight: true, //자동 높이 설정
						lazyLoad: true,
					});
					//$('.d_thumb .owl-prev').hover(function() {
					//    $owl.trigger('prev.owl.carousel', [300]);
					//});
					//$('.d_thumb .owl-next').hover(function() {
					//    $owl.trigger('next.owl.carousel', [300]);
					//});
					$(".d_thumb .owl-dot").hover(function () {
						$(this).trigger("click");
					});
				});
			});
		}, 500);
	});
});

// Scroll header fixed
function scrollHeaderFixed() {
	var getScroll = $(window).scrollTop();
	var loss = $(".p0202").position().top + 25;
	var mCutLine = $(".cp507").length > 0 ? $(".cp507").outerHeight() : 0;
	if (getScroll >= loss) {
		$(".header_wrap").addClass("fixed");
		// $('.all-c').addClass('up');
	}
	if (getScroll > mCutLine) {
		$(".header_wrap").addClass("m-fixed");
	}
	if (getScroll < loss) {
		$(".header_wrap").removeClass("fixed");
		// $('.all-c').removeClass('up');
	}
	if (getScroll <= mCutLine) {
		$(".header_wrap").removeClass("m-fixed");
	}
}

$(window).on(" scroll", scrollHeaderFixed);

// 우진포장 스크립트 모듈화
$(function () {
	const UIManager = {
		options: {
			enableIsotope: true, // ❌ false로 설정하면 Isotope 실행 안 됨
			enableSwiper: true, // ❌ false로 설정하면 Swiper 실행 안 됨
		},

		init: function () {
			$(document).ready(() => {
				if (this.options.enableIsotope && $(".portfolio").length) {
					this.initIsotope();
				}
				if (this.options.enableSwiper && $(".swiper-container").length) {
					this.initSwiper();
				}
			});
		},

		// 🧩 Isotope 초기화
		initIsotope: function () {
			if (typeof Isotope === "undefined") return;

			let $grid = $(".portfolio");
			let isotopeInstance = new Isotope($grid[0], {
				itemSelector: ".init-isotope",
				layoutMode: "fitRows",
				percentPosition: true,
				masonry: { columnWidth: ".init-isotope" },
			});

			this.setupFilters(isotopeInstance);
			console.log("✅ Isotope Initialized:", isotopeInstance);
		},

		// 🎛️ 필터 버튼 클릭 이벤트 추가
		setupFilters: function (isotopeInstance) {
			$(".filter-button").on("click", function () {
				let filterValue = $(this).data("filter");
				isotopeInstance.arrange({ filter: filterValue });

				$(".filter-button").removeClass("active");
				$(this).addClass("active");
			});
		},

		// 🏎 Swiper 초기화
		initSwiper: function () {
			if (typeof Swiper === "undefined") return;

			new Swiper(".swiper-container", {
				slidesPerView: 1,
				loop: true,
				autoplay: { delay: 3000 },
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});

			console.log("✅ Swiper Initialized");
		},
	};

	// ✅ 실행 (HTML에 해당 요소가 있을 때만 실행)
	UIManager.init();		
});
