$(function () {
	if (
		location.href.indexOf("noMemberOrder") != -1 
	) {
		$(".login_form.member").hide();
		$(".member_tab .member").removeClass("on");
        $(".member_tab .no-member").addClass("on");
	}
});