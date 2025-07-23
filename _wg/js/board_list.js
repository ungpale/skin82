$(function(){

});

$(document).ready(function() {
    $('.check').each(function() {
        if ($(this).find('input').length === 0) {
            $(this).css('display', 'none');
        }
    });

    // faq 리스트 on/off
    $('.faq').on('click', '.faq_sub', function(event) {
        if ($(event.target).closest('.cnt').length) {
            return;
        }

        const $this = $(this);
        const $content = $this.find('.cnt');

        if ($this.hasClass('on')) {
            $this.removeClass('on');
            $content.slideUp();
        } else {
            $('.faq .faq_sub').removeClass('on');
            $('.faq .faq_sub .cnt').slideUp();

            $this.addClass('on');
            $content.slideDown();
        }
    });
});

