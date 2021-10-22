import config from './config';
import lightbox from './libs/light-box/lightbox';
import fileUploader from './uploadfile';
import './libs/lazy-load/lazyload.js';
import { renderSortType, renderMasonryList ,countInteractiveReviews, doLazyLoad, replacePositionFlagCountry } from './comment';

function handlePagination(type){
  var product_id = $("#shopify-ali-review").attr("product-id");
  var shop_id = $("#shopify-ali-review .shop_info").attr("shop-id");
  var products_not_in = $("#shopify-ali-review").attr("products-not-in");
  var shop_url = window.location.host;
  var isAdminLogin = false;
  var num_rand = 0;

  // Check isAdminLogin
  const tagsSCRIPT = document.querySelectorAll('head script');

  for(var i = 0; i < tagsSCRIPT.length; i++) {
    const regex = /adminBarInjector\.init\(\)\;/m;
    const rawResult = regex.exec(tagsSCRIPT[i].outerHTML);
    if(rawResult !== null) {
      isAdminLogin = true;
      break;
    }
  }

    if(window.STYLE_LAYOUT_REVIEW !== 'carousel') {
        //pagination nomarl
        if (type == 'pagination') {
            $(document).on("click", ".alireview-pagination li", function (e) {
                e.preventDefault();
                $(".alireview-pagination li").removeClass("alireview-active");
                $(this).addClass("alireview-active");

                var target = $(e.currentTarget);
                var currentPage = target.text();

                // Animation loading reviews [optional]
                $('.alireview-result').html('').before(htmlAlireviewLoading);

                $.ajax({
                    type: "GET",
                    url: config.shop_url + "/comment/get-review",
                    data: {
                        'product_id': product_id,
                        'shop_id': shop_id,
                        'num_rand': num_rand,
                        'isAdminLogin': isAdminLogin,
                        'products_not_in': products_not_in,
                        'currentPage': parseInt(currentPage),
                        'star': $('input[name="summary-star"]').val() || 'all',
                        'sort_type': $('input[name="sort-type"]').val() || 'all',
                        'style': window.STYLE_LAYOUT_REVIEW
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result.status) {
                            $("#shopify-ali-review .reviews")
                                .empty()
                                .html(result.view)
                                .promise()
                                .done(function () {
                                    if (window.STYLE_LAYOUT_REVIEW === 'grid') {
                                        renderMasonryList();
                                    }

                                    // Init rating
                                    $('.alr-rating').length && $('.alr-rating').rating();

                                    // Render html sort type
                                    renderSortType(result.sort_type);

                                    // Init lightbox
                                    lightbox.load();
                                    // Interactive Reviews
                                    $("img.jslghtbx-thmb").on('click', function () {
                                        //countInteractiveReviews(shop_id);
                                    });
                                    // Init func upload file front-end
                                    window.filesToUpload = [];
                                    window.uploadPhoto = new fileUploader('.alireview_list_image', '#alireview_file_upload', filesToUpload);
                                    uploadPhoto.Init();

                                    $("html,body").animate({
                                        scrollTop: $("#shopify-ali-review .reviews").offset().top
                                    }, "slow");

                                    // Add value summary-star
                                    $('input[name="summary-star"]').val(result.star);
                                    replacePositionFlagCountry();
                                });
                        } else {
                            $("#shopify-ali-review .reviews").html("");
                        }
                        doLazyLoad();
                    }, // success
                    error: function () {
                        $("#shopify-ali-review .reviews").html("");
                    } // error
                }); // end ajax
            });
            //end pagination nomarl

        } else if (type == 'load_more') {
            //Load more
            $(document).on("click", "#alireview_load_more", function (e) {
                var currentPageLoadMore = $('#alireview_navigation_current_page').val()  || 1;
                currentPageLoadMore++;
                console.log('currentPageLoadMore', currentPageLoadMore);
                $.ajax({
                    type: "GET",
                    url: config.shop_url + "/comment/get-review",
                    data: {
                        'product_id': product_id,
                        'shop_id': shop_id,
                        'num_rand': num_rand,
                        'isAdminLogin': isAdminLogin,
                        'products_not_in': products_not_in,
                        'currentPage': parseInt(currentPageLoadMore),
                        'star': $('input[name="summary-star"]').val() || 'all',
                        'sort_type': $('input[name="sort-type"]').val() || 'all',
                        'style': window.STYLE_LAYOUT_REVIEW
                    },
                    dataType: "json",
                    beforeSend: function () {
                        $('#shopify-ali-review .alireview-pagination').before(htmlAlireviewLoading);
                        $('#alireview_load_more').css({display: 'none'});
                        console.log('star', $('input[name="summary-star"]').val() || 'all');
                    },
                    success: function (result) {
                        if (result.status) {
                            $('#alireview_navigation_current_page').val(result.data.current_page);
                            $('#alireview_load_more').css({display: 'inline-block'});
                            if (result.data.current_page == result.data.last_page) {
                                $('#alireview_load_more').remove();
                            }
                            $('.alireview-loadding-wrap').remove();
                            var view = $(result.view);
                            var list_review = view.find('.list-alireview .alireview-row');
                            $("#shopify-ali-review .list-alireview")
                                .append(list_review)
                                .promise()
                                .done(function () {
                                    if (window.STYLE_LAYOUT_REVIEW === 'grid') {
                                        renderMasonryList();
                                    }

                                    // Init rating
                                    $('.alr-rating').length && $('.alr-rating').rating();

                                    // Init lightbox
                                    lightbox.load();

                                    // Add value summary-star
                                    $('input[name="summary-star"]').val(result.star);
                                    replacePositionFlagCountry();
                                });
                        }
                        doLazyLoad();
                    } // success
                }); // end ajax
            });
            //End load more

        } else if (type == 'scroll') {
            //Scroll Pagination
            var is_busy = false;
            $(window).scroll(function () {
                var $element = $('.list-alireview');
                if (($(window).scrollTop() + $(window).height() >= $element.height()) && $element.height() != undefined) {
                    var currentPageScroll = parseInt($('#alireview_navigation_current_page').val()) || 1;
                    var lastPageScroll = parseInt($('#alireview_navigation_last_page').val());
                    if(lastPageScroll != undefined && lastPageScroll > 0){
                        if(currentPageScroll >= lastPageScroll){
                            return false;
                            $('.alireview-loadding-wrap').remove();
                        }
                    }
                    if (is_busy == true) {
                        return false;
                    }

                    is_busy = true;
                    currentPageScroll++;
                    
                    console.log('currentPageScroll', currentPageScroll);
                    $.ajax({ 
                        type: "GET",
                        url: config.shop_url + "/comment/get-review",
                        data: {
                            'product_id': product_id,
                            'shop_id': shop_id,
                            'num_rand': num_rand,
                            'isAdminLogin': isAdminLogin,
                            'products_not_in': products_not_in,
                            'currentPage': parseInt(currentPageScroll),
                            'star': $('input[name="summary-star"]').val() || 'all',
                            'sort_type': $('input[name="sort-type"]').val() || 'all',
                            'style': window.STYLE_LAYOUT_REVIEW
                        },
                        dataType: "json",
                        beforeSend: function () {
                            $('#shopify-ali-review .alireview-pagination').before(htmlAlireviewLoading);
                            console.log('star', $('input[name="summary-star"]').val() || 'all');
                        },
                        success: function (result) {
                            if (result.status) {
                                $('#alireview_navigation_current_page').val(result.data.current_page);
                                $('#alireview_navigation_last_page').val(result.data.last_page);
                                if (result.data.current_page >= result.data.last_page) {
                                    $('.alireview-loadding-wrap').remove();
                                    // return false;
                                }
                                $('.alireview-loadding-wrap').remove();
                                var view = $(result.view);
                                var list_review = view.find('.list-alireview .alireview-row');
                                $("#shopify-ali-review .list-alireview")
                                    .append(list_review)
                                    .promise()
                                    .done(function () {
                                        if (window.STYLE_LAYOUT_REVIEW === 'grid') {
                                            renderMasonryList();
                                        }

                                        // Init rating
                                        $('.alr-rating').length && $('.alr-rating').rating();

                                        // Init lightbox
                                        lightbox.load();

                                        // Add value summary-star
                                        $('input[name="summary-star"]').val(result.star);
                                        replacePositionFlagCountry();
                                    });
                            }
                            doLazyLoad();
                        } // success
                    })
                        .always(function () {
                            is_busy = false;
                        });
                    return false;
                }
            });
        } //End scroll
    }
}

export { handlePagination }






