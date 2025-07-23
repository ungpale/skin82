// 카카오톡 상품공유
// https://webgood.co.kr/board/free/read.html?no=79941&board_no=3 내용을 보시고 자바스크립트 코드를 생성해주세요.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

Kakao.init("26ae1def755224e1d814a7f83d6b2771"); // 좌측 따옴표 안에 고객님의 자바스크립트 코드를 넣어주세요.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 이하 수정금지
// 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
Kakao.Link.createDefaultButton({
	container: "#kakao-link-btn",
	objectType: "feed",
	content: {
		title: document.title,
		description: jQuery("meta[name=description]").attr("content") || jQuery("meta[name=keywords]").attr("content"),
		imageUrl: jQuery('meta[property="og:image"]').attr("content"),
		link: {
			webUrl: document.location.href,
			mobileWebUrl: document.location.href,
		},
	},
	social: {
		likeCount: 286,
		commentCount: 45,
		sharedCount: 845,
	},
	buttons: [
		{
			title: "열기",
			link: {
				mobileWebUrl: document.location.href,
				webUrl: document.location.href,
			},
		},
	],
});

// 구매토글
$(function () {
	var $body = $("body");
	var $buy_wrapper = $(".buy-wrapper");

	if (!tl_isMobile()) {
        $('#totalProducts').addClass('is-pc');
    }

	$(".btn-down-wrapper, .bg-buy-wrapper").click(function () {
		if (tl_isMobile()) {
		} else {
			// jQuery('.buy-scroll-box').mCustomScrollbar('destroy');
		}
		jQuery(".buy-scroll-box").removeClass("scrollbar_box");
		$buy_wrapper.addClass("down");
		setTimeout(function () {
			$body.removeClass("bottom-on");
			$buy_wrapper.removeClass("down");
		}, 400); //시간은 .buy-wrapper.down transition 시간에 맞춘다
		setTimeout(function () {
			$(".detailArea").attr("style", null);
		}, 1000);
	});

	var btop = $buy_wrapper.offset().top + $buy_wrapper.height(); //스크롤 되면서 fixed로 전환되는 값이 있어면 추감한다.
	$(window).resize(function () {
		if (!$body.hasClass("bottom-on")) {
			btop = $buy_wrapper.offset().top + $buy_wrapper.height();
		}
	});

	$(window).scroll(function () {
		if (!$body.hasClass("bottom-on")) {
			btop = $buy_wrapper.offset().top + $buy_wrapper.height();
		}

		if (btop < $(window).scrollTop()) {
			$body.addClass("bbo-on");
		} else {
			$body.removeClass("bbo-on");
		}

		if ($body.hasClass("bottom-on")) {
			if (btop + 100 > $(window).scrollTop()) {
				$(".btn-down-wrapper").trigger("click");
			}
		}
	});

	$(".additional .toggle").click(function () {
		if (!$("body").hasClass("bottom-on")) {
			setTimeout(function () {
				btop = $buy_wrapper.offset().top + $buy_wrapper.height();
			}, 50);
		}
	});

	$(".btn-buy-open").click(function () {
		//scroll
		//jQuery('.buy-scroll-box').addClass('scrollbar_box').scrollbar({'disableBodyScroll':true});

		if (tl_isMobile()) {
			jQuery(".buy-scroll-box").addClass("scrollbar_box").css({ "overflow-y": "auto" });
		} else {
			jQuery(".buy-scroll-box").addClass("scrollbar_box");
		}

		$(".detailArea").css({ "min-height": $(".detailArea").height() + "px" });
		$("body").addClass("bottom-on");
		var bh = $(".btn-down-wrapper").height();
		$(".btn-down-wrapper").css("top", "-" + bh + "px");
	});
});

// 상품이미지 슬라이드
jQuery(function () {
	if (jQuery(".listImg ul>li")[0] && jQuery(".listImg ul>li").length >= 1) {
		var $box = jQuery("#big_img_box");
		var one_big_img = $box.data("one_big_img");
		var big_img_html = "";
		var $imgs = jQuery(".listImg ul>li>img");
		$imgs.each(function (idx, el) {
			var $img = jQuery(this);
			var thumb = $img.attr("src");
			var src = thumb.replace("/small/", "/big/");
			if ($imgs.length == 1 || idx == 0) src = one_big_img;
			big_img_html += '<div data-thumb="' + thumb + '" data-src="' + src + '"><img src="' + src + '" class="BigImage" alt="" ></div>';
			$box.html(big_img_html);
		});
		jQuery(".listImg").hide();

		// 상품이미지 하나일 때 슬라이드 필요없음
		if (jQuery(".listImg ul>li").length > 1) {
			$box.lightSlider({
				gallery: true,
				item: 1,
				loop: true,
				thumbItem: 5,
				slideMargin: 0,
				enableDrag: true,
				currentPagerPosition: "left",
			});
		}
	}
});

$(function () {
	// 모바일에서 품절 상품 닫히지 않는 부부 수정
	$('select[option_select_element="ec-option-select-finder"]').change(function (e) {
		setTimeout(function () {
			$(".option_products .option_product .center a").addClass("delete");
		}, 500);
	});
});

// 상세페이지 유튜브추가시 가로 100프로 맞추기
$("#prdDetailContent iframe").wrap('<div class="youtube_wrap"></div>');

$(function () {
	var buy_wrapper = $(".buy-wrapper");
	var gap = $(window).outerWidth() <= 1023 ? 500 : 500;
	var height = buy_wrapper.outerHeight();
	var top = buy_wrapper.offset().top + height + gap;
	var $document = $(document);

	function scrollPageTo($target, getId) {
		var scrollHeight = document.body.scrollHeight;
		var headerHeight = $(".p0202").outerHeight();
		var scrollSpd = 300;
		var scrollVal = $(window).outerWidth() > 1023 ? headerHeight - 20 : headerHeight - 30;
		$("html, body")
			.stop(true, true)
			.animate(
				{
					scrollTop: $("#" + getId).offset().top - scrollVal + "px",
				},
				scrollSpd,
				function () {
					if (scrollHeight !== document.body.scrollHeight) scrollPageTo($target, getId);
				}
			);
	}

	// Tab control
	function handleTabControl() {
		var getId = $(this).data("link");

		if ($(window).outerWidth() > 1024) {
			$(".detail-tab-item").removeClass("selected");
			$(this).addClass("selected");
		}
		scrollPageTo($(this), getId);
	}

	var scrollIdx = -1;

	// scroll tab
	function scrollTab() {
		var getIdx = -1;
		var $this = $(window).scrollTop();
		var $headerBottom = $(window).outerWidth() > 1023 ? $(".p0202").outerHeight() : 0;
		var $detailTab = $(".detail_tab");
		var $detailTop = $detailTab.offset().top;

		$(".tab-content").each(function (index) {
			var $tabContent = $(this);
			if ($this >= $tabContent.offset().top - $detailTab.outerHeight()) {
				scrollIdx = index;
			}
		});

		if (scrollIdx >= 0) {
			$(".detail-tab-item").removeClass("on");
			$(".detail-tab-item").eq(scrollIdx).addClass("on");
		}

		if ($this > $detailTop - $headerBottom) {
			$("#header").addClass("up");
			$(".header_wrap").addClass("up");
			$detailTab.find(".detail_tab_nav").addClass("fixed");
		}
		if ($this <= $detailTop - $headerBottom) {
			$("#header").removeClass("up");
			$(".header_wrap").removeClass("up");
			$detailTab.find(".detail_tab_nav").removeClass("fixed");
		}
	}

	scrollTab();
	$(window).on("scroll", function () {
		scrollTab();
	});
	$(".detail-tab-item").on("click", handleTabControl);

	// 상품주소 sns공유
	if ($(".share_content").length > 0) {
		$(document).on("click", ".share_btn", function () {
			$(".share_content").addClass("on");
		});
		$(document).on("click", ".share_bg, .share_close", function () {
			$(".share_content").removeClass("on");
		});
	}
	if ($('.installment_layer').length > 0) {
        $(document).on('click', '.installment_btn', function() {
            $('.installment_layer').addClass('on');
        });
        $(document).on('click', '.itm_bg, .itm_close', function() {
            $('.installment_layer').removeClass('on');
        });
    }
	var sendUrl = window.location.href;
	var sendDesc = jQuery("meta[name=description]").attr("content") || jQuery("meta[name=keywords]").attr("content");
	function shareKakao() {
		Kakao.Link.sendDefault({
			objectType: "feed",
			content: {
				title: document.title,
				description: jQuery("meta[name=description]").attr("content") || jQuery("meta[name=keywords]").attr("content"),
				imageUrl: jQuery('meta[property="og:image"]').attr("content"),
				link: {
					mobileWebUrl: sendUrl,
					webUrl: sendUrl,
				},
			},
			buttons: [
				{
					title: "웹으로 보기",
					link: {
						mobileWebUrl: sendUrl,
						webUrl: sendUrl,
					},
				},
			],
			installTalk: true,
		});
	}
	function shareFB() {
		window.open("https://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
	}
	function shareTwitter() {
		window.open("http://twitter.com/intent/tweet?text=" + document.title + "&url=" + sendUrl);
	}
	function shareNaver() {
		window.open("http://share.naver.com/web/shareView.nhn?url=" + sendUrl + "&title=" + document.title);
	}
	function shareBand() {
		window.open("http://band.us/plugin/share?body=" + document.title + "\n" + sendDesc + "\n" + sendUrl);
	}
	function shareLine() {
		window.open("https://line.me/R/msg/text/?" + encodeURIComponent(document.title + "\n" + sendDesc + "\n" + sendUrl));
	}
	var shareRepeat = setInterval(function () {
		if (document.querySelectorAll(".share_item").length >= 1) {
			clearInterval(shareRepeat);
			setTimeout(function () {
				if (document.querySelector(".share_item_kakao")) {
					document.querySelector(".share_item_kakao").addEventListener("click", shareKakao);
				}
				if (document.querySelector(".share_item_facebook")) {
					document.querySelector(".share_item_facebook").addEventListener("click", shareFB);
				}
				if (document.querySelector(".share_item_twitter")) {
					document.querySelector(".share_item_twitter").addEventListener("click", shareTwitter);
				}
				if (document.querySelector(".share_item_naver")) {
					document.querySelector(".share_item_naver").addEventListener("click", shareNaver);
				}
				if (document.querySelector(".share_item_band")) {
					document.querySelector(".share_item_band").addEventListener("click", shareBand);
				}
				if (document.querySelector(".share_item_line")) {
					document.querySelector(".share_item_line").addEventListener("click", shareLine);
				}
				if (document.querySelector(".cul_input")) {
					document.querySelector(".cul_input").value = sendUrl;
				}
				document.querySelector(".cul_result").addEventListener("click", function () {
					document.querySelector(".cul_input").classList.add("on");
				});
				document.querySelector(".cul_btn").addEventListener("click", function () {
					document.querySelector(".cul_input").classList.remove("on");
				});
				document.querySelector(".share_close").addEventListener("click", function () {
					document.querySelector(".cul_input").classList.remove("on");
				});
				document.querySelector(".cul_btn").addEventListener("click", function () {
					navigator.clipboard.writeText(sendUrl).then(() => {
						document.querySelector(".cul_result").classList.add("success");
						setTimeout(function () {
							document.querySelector(".cul_result").classList.remove("success");
						}, 1500);
					});
				});
			}, 1000);
		}
		if (document.querySelectorAll(".share-item").length < 1) {
			clearInterval(shareRepeat);
		}
	});

	
});

$(document).ready(function () {
	// 평균 평점
	var productNumber = "",
		reviewContent = "";
	var productID = $("#prdReview").data("prd-no");
	var actions = {
		getAllreviews: function () {
			var reviews = [],
				totalScore = 0,
				totalReviews = 0,
				ttrs = 0,
				reviewRegex = /(<im[^>]+)(src)(\s*=\s*['"][^'"]+['"][^>]*>)/,
				reviewData = $("#prd-review").data("count");

			$.ajax({
				url: "/_wg/import/review_data.html?link_product_no=" + productID,
				dataType: "html",
				success: function (response) {
					var li_items = $(response).find("li.jsRvItem");
					var li_items_length = li_items.length;

					var ttrs = $(".jsReviewCount").data("count");

					li_items.each(function () {
						var datacount = $(this).data("point-count");
						if (datacount) {
							totalReviews += datacount;
						}
					});

					if (li_items_length > 0) {
						var average = (totalReviews / li_items_length).toFixed(1);

						if (average && !isNaN(average)) {
							$(".rv_stats_rate, .jsReviewRate").text(average);
						}
					} else {
						console.log("리뷰 항목이 없습니다.");
					}
				},
				error: function (xhr, status, error) {
					console.error("리뷰를 가져오는 중 오류 발생:", status, error);
				},
			});
		},
	};
	actions.getAllreviews();

	// 상품명 위 리뷰갯수 클릭 시 리뷰게시판으로 이동
	$(".jsGoReview").on("click", function () {
		$('.detail-tab-item[data-link="prd-review"]').trigger("click");
	});

	// 추가상품 타이틀 클릭시 on클래스 토글
	$('.xans-product-detail .productSet > .title').on('click', function() {
        $('.xans-product-detail .productSet').toggleClass('on');
    });

	/**
     * 사용자 액션 (추가구성상품 열기/닫기) 이벤트리스너 재정의
     */
	$(document).off('click', '.xans-product-addproduct .toggle');

	// span 요소에서 가격 텍스트를 가져오기
    var priceText = $('.product_price_css td').html();
    // div.list_prd_price 요소에 가격 텍스트 넣기
    $('div.list_prd_price').html(priceText);

	
});

$(function () {
	// 상품요약설명 없을때 display:none
	var $prdSummary = $("div.prd_summary");
	if ($prdSummary.length && $.trim($prdSummary.text()) === "") {
		$prdSummary.hide();
	}

	// 관심상품 레이어 bg클릭시 닫기
	var $wishlayerBg = $(".xans-myshop-layerwish .layer_bg");
	$("body").on("click", ".xans-myshop-layerwish .layer_bg", function () {
		$(".xans-myshop-layerwish").hide();
	});

	// 반품/교환정보 토글링
	$('.guide_title').on('click', function() {
        if (!$(this).hasClass('on')) {
            $('.guide_title').removeClass('on');
            $(this).addClass('on');
            $('.guide_content').slideUp();
            $(this).next('.guide_content').slideDown();
        } else {
            $('.guide_title').removeClass('on');
            $('.guide_content').slideUp();
        }
    });
});
