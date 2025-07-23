EC$(function($) {
    var oToggleAddProduct = $('.xans-product-addproduct .toggle, .xans-product-addproduct .title');

    if (oToggleAddProduct.length > 0) {
        oToggleAddProduct.click();
    }

    removeAddProductOptionText();

    $('select[product_type="addproduct_option"]').change(function() {
        removeAddProductOptionText();
    });

    $('.xans-product-addproduct .xans-product-option p.value').each(function() {
        $(this).html(($(this).html().replace(/\[필수\] |\[선택\] /, '')));
    });

    function removeAddProductOptionText() {
        $('select[name^="addproduct_option_name"] > option[value="*"]').each(function() {
           $(this).text($(this).text().replace(/\[필수\] |\[선택\] /, ''));
        });
    }
});