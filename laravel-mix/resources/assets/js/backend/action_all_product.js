const selectAllReviews_label = $('.slc-all-reviews-prod-text');
const advanceSelectAllReviews = $('#ckc-all-product');
const table = $('.table-prod-review, #table-select-all');
const table_checkbox = $('[name="listProductCheck[]"]');
const selectAllReviews = $('#product-approve-select-all');
const totalReviewsProduct = $('[name="total-all-reviews-prod"]').val();
let totalReviewsProductCurrent = $('[name="total-all-reviews-prod"]').val();
const productUncheckCurrentPageInput = $('#product-uncheck-current-page');
let productUncheckCurrentPage = [];
const singularEnglish = 1;

/*
    Action select all reviews a page
*/
$("#product-approve-select-all").on("change", function(ev) {

    if( $(this).is(':checked') ) {
        $('input[name="isAllProducts"]').val('');
        // checked
        updateTextTotal($(table_checkbox).length, totalReviewsProduct);
        $(".status-action-wrap").show();
        $('#slc_all_product_wrap') && $('#slc_all_product_wrap').show();
        $(table_checkbox).prop("checked", true);
        $(table_checkbox).closest("tr").addClass("row-selected");

        if( totalReviewsProduct > 10 ) {
            $(selectAllReviews_label).show();
        }
    } else {
        // uncheck
        turnOffSelectAll();
    }


    // gắn lại import trong action sau khi đã remove ở bước Select all products
    // const selectobject=document.getElementById("actionProduct");
    // let selectHasImport = 0;
    // for (var i=0; i<selectobject.length; i++){
    //     if (selectobject.options[i].value === 'import' ){
    //         selectHasImport = 1;
    //     }
    // }
    // if(selectHasImport === 0){
    //     const optionImport = document.createElement("option");
    //     optionImport.text = "Import";
    //     optionImport.value = "import";
    //     selectobject.add(optionImport);
    // }
});



$('input[name="listProductCheck[]"]:checkbox').on("click",function(){
    var isAllProducts = $('input[name="isAllProducts"]').val();
    //advanceSelectAllReviews
    if(isAllProducts){
        var checkBox = $(this).is(':checked');

        var  productUncheckAllString = $('input#product-uncheck-select-all').val();


        if(!checkBox){

            if(!$('input#product-uncheck-select-all').val()){

                productUncheckAllString = $(this).val();

            } else {
                productUncheckAllString += ','+$(this).val();
            }

            $('input#product-uncheck-select-all').val(productUncheckAllString)


        } else {

            var productUncheckAllArray = productUncheckAllString.replace("[","").replace("]","").split(',');

            productUncheckAllArray.splice($.inArray($(this).val(), productUncheckAllArray), 1);

            $('input#product-uncheck-select-all').val(productUncheckAllArray.toString());

        }
    }

});



/*
    Action select all reviews all pages
*/
$('#ckc-all-product').on('change', function() {

    if( $(advanceSelectAllReviews).is(':checked') ) {

        // remove action import khi select all
        const selectobject=document.getElementById("actionProduct");
        for (var i=0; i<selectobject.length; i++){
            if (selectobject.options[i].value == 'import' )
                selectobject.remove(i);
        }

        // checked
        $('input[name="isAllProducts"]').val(true);
        updateTextTotal(totalReviewsProduct, totalReviewsProduct);
        $(selectAllReviews_label).hide();
        $(selectAllReviews).prop('checked', true);
        $(table).find(table_checkbox).each(function(index) {
            $(this).prop('checked', true);
            $(this).closest('tr').addClass('row-selected');
        })
    }
});

/*
    Change check each review of product
*/
$(table_checkbox).on('change', function() {
    //
    if( $(this).is(':checked') ) {
        $(this).prop('checked', true);
        $(this).closest('tr').addClass('row-selected');

        $(".status-action-wrap").show();

        $(advanceSelectAllReviews).is(':checked') ? totalReviewsProductCurrent++ : totalReviewsProduct;

        // Checked: Remove a data-product-id in variable productUncheckCurrentPage
        productUncheckCurrentPage.splice(productUncheckCurrentPage.indexOf($(this).val()), 1);
    } else {
        $(this).prop('checked', false);
        $(this).closest('tr').removeClass('row-selected');

        $(advanceSelectAllReviews).is(':checked') ? totalReviewsProductCurrent-- : totalReviewsProduct;

        // Uncheck: Add a data-product-id in variable productUncheckCurrentPage
        productUncheckCurrentPage.push($(this).val());

        if( !$(table_checkbox).is(':checked') && !$(advanceSelectAllReviews).is(':checked') ) {
            $(".status-action-wrap").hide();
            $(selectAllReviews_label).hide();
        }

        if( !isTableCheckedALL() && !$(advanceSelectAllReviews).is(':checked')) {
            $(selectAllReviews).prop('checked', false);
        }
    }

    $(productUncheckCurrentPageInput).val(productUncheckCurrentPage.join(','));

    // Update text
    if ( $(advanceSelectAllReviews).is(':checked') ) {
        updateTextTotal(totalReviewsProductCurrent, totalReviewsProduct);
    } else {
        var countChecked = 0;
        $(table_checkbox).each(function() {
            if ( $(this).is(':checked') ) {
                countChecked++;
            }
        });

        updateTextTotal(countChecked, totalReviewsProduct);
    }
});

function turnOffSelectAll() {
    let strProduct = totalReviewsProduct == singularEnglish ? 'product' : 'products';
    $('#result-total-reviews-checked').html(`<strong id="result-total-reviews-checked"><div class="number-reviews">0</div>  of <div class="number-reviews"> ${ totalReviewsProduct } </div> ${strProduct}</strong>`);
    $(".status-action-wrap").hide();
    $(selectAllReviews_label).hide();
    $(table_checkbox).prop("checked", false);
    $(table_checkbox).closest("tr").removeClass("row-selected");
    $(advanceSelectAllReviews).prop('checked', false);
    $(selectAllReviews).prop('checked', false);

    // Reset variable
    totalReviewsProductCurrent = $('[name="total-all-reviews-prod"]').val();
    $(productUncheckCurrentPageInput).val('');
    productUncheckCurrentPage = [];
    $('input#product-uncheck-select-all').val('');
}

function isTableCheckedALL() {
    let isCheckedAll = true;
    $(table_checkbox).each(function() {
        if( !$(this).is(':checked') ) {
            isCheckedAll = false;
        }
    });

    return isCheckedAll;
}

function updateTextTotal(current, total) {
    let strProduct = totalReviewsProduct == singularEnglish ? 'product' : 'products';
    var strText = '<strong id="result-total-reviews-checked"><div class="number-reviews">' + current + '</div>  of <div class="number-reviews">' + total + '</div> ' + strProduct +'</strong>';
    $('#result-total-reviews-checked').html(strText);
}

