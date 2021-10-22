import config from './config';
// import '../../libs/owl-carousel/js/owl.carousel.min.js';
import '../../libs/rating/bootstrap-rating.min.js';
import lightbox from './libs/light-box/lightbox';
import './libs/lazy-load/lazyload.js';
import popupComment from './popup-comment';
import fileUploader from './uploadfile.js';
import './add-review-frontend';
import { handlePagination } from './frontend-pagination-review';
import addRatingCollection from './collections-rating'; //countInteractiveReviews  ,
import  { getCookies , checkCartToken ,setCookie ,visitor_tracking , isReviewBox} from  './statistics_visitor';

import { PopupWriteReview } from './popup-write-review';
const Masonry = require('../../libs/masonry/masonry.min.js'); 
const Imagesloaded = require('../../libs/imagesloaded/imagesloaded.min.js');

let isAdminLogin = false;
let num_rand = 0;

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
/**
 * add css to head
 */
if(typeof ar_css_core !== "undefined"){
    $('<link rel="stylesheet" href="'+ar_css_core+'">').insertBefore($('head #scr_ar_css_core'));
}

$.aliReviewsAddRatingCollection = function(){addRatingCollection()};
document.addEventListener("DOMContentLoaded", function() {
  // Insert rating to Collection page
  $('.arv-collection').length && addRatingCollection();

  // Collections add rating when load Ajax
  $( document ).ajaxComplete(function( event, xhr, settings ) {
    const regex = new RegExp( '/collections', 'gi' );
    const regex_str_http = new RegExp( '^http', 'gi' );
    const location_url = window.location.hostname + window.location.pathname;
    // trường hợp setting url chỉ có param query
    const url_collections = settings.url.match(regex_str_http) ? settings.url : (location_url + settings.url);
    if(url_collections.match(regex)) {
      $('.arv-collection').length && addRatingCollection();
    }
  });

  // Collections add rating when fetch API calls
  (function(ns, fetch){
    if(typeof fetch !== 'function') return;
    ns.fetch = function() {
      let fetch_out = fetch.apply(this, arguments);
      fetch_out.then((res) => {
        if(!res){
          return;
        }
        const regex = new RegExp( '/collections', 'gi' );
        const regex_str_http = new RegExp( '^http', 'gi' );
        const location_url = window.location.hostname + window.location.pathname;
        // trường hợp setting url chỉ có param query
        const url_collections = res.url.match(regex_str_http) ? res.url : (location_url + res.url);
        if( url_collections.match(regex) ) {
          setTimeout(() => {
            $('.arv-collection').length && addRatingCollection();
          }, 100)
        }
      })
      return fetch_out;
    }
  }(window, window.fetch))

  // Collections add rating when dom subtree modified
  // loadAddRatingCollectionDOMSubtreeModified();



    var elShopifyAliReview = $("#shopify-ali-review");
  if (elShopifyAliReview.length && !elShopifyAliReview.attr("data-shop-id")) {
    elShopifyAliReview.find(".shop_info").css("display", "block");
    elShopifyAliReview.find(".shop_info").removeClass("hidden");
    var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
    var productId = elShopifyAliReview.attr("product-id");

      var productUrl = location.href;
      var productUrlFm = new URL(productUrl);
      var messageId = productUrlFm.searchParams.get("ar-messageId");
      var messageContent = productUrlFm.searchParams.get("ar-content");
      var messageStar = productUrlFm.searchParams.get("ar-stars");
      var messageCustomerName = productUrlFm.searchParams.get("ar-customerName");
      var messageCustomerEmail = productUrlFm.searchParams.get("ar-customerEmail");

    // Variable html loading
    window.htmlAlireviewLoading = `<div class="alireview-loadding-wrap"><div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>`;

    // Animation loading reviews [optional]
    $('.alireview-result').html('').before(htmlAlireviewLoading);
    var myCookies = getCookies();

    // Get style css
    window.STYLE_LAYOUT_REVIEW = checkStyleLayoutReview();

    $.ajax({
      type: "GET",
      url: config.shop_url + "/comment/get-review",
      data: {
        'product_id': productId,
        'shop_id': shopId,
        'num_rand': num_rand,
        'isAdminLogin': isAdminLogin,
        'star': 'all',
        'sort_type': '',
        'visitor_id':myCookies.visitor_id,
        'time_limit_track':myCookies.time_limit_track,
        'style': window.STYLE_LAYOUT_REVIEW
      },
      dataType: "json",
      success: function (result) {
        if (result.status) {
          elShopifyAliReview.find(".reviews").html(result.view);
          let theme_apply = $('input[name="theme-apply"]').val() || 'light';
          if(theme_apply === 'dark'){
              elShopifyAliReview.addClass('ali-review-theme-dark');
              $('.write-review-modal').addClass('ali-review-theme-dark');
          }
          if(window.STYLE_LAYOUT_REVIEW === 'grid'){
              // Init MasonryJS
              renderMasonryList();

              // Use .alireview-refresh-grid to refresh MasonryJS
              const refreshMasonryLayout = setInterval(function() {
                  if(parseInt($('.list-alireview').outerHeight()) <= 60) {
                      renderMasonryList();
                  } else {
                      clearInterval(refreshMasonryLayout);
                  }
              }, 1000);
          }else if(window.STYLE_LAYOUT_REVIEW === 'carousel'){
              renderCarouselList();
          }

          renderSortType(result.sort_type);

          var eleRating = '<div id="alireview-review-widget-badge"><input type="hidden" class="alr-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" data-fractions="3" data-readonly value="' + result.avg + '"/><span style="margin-left: 10px;">' + (parseInt(result.avg) === 0 ? "" : result.text_reviews) + '</span></div>';
          
          if ($('.alr-display-review-badge').length) {
            $(".alr-display-review-badge").append($(eleRating));
          } else {
            $(eleRating).insertAfter('h1[itemprop="name"], h2[itemprop="name"], h3[itemprop="name"], h1[class="product-single__title"], h1[id="ProductHeading"]');
          }

          // Init lightbox
          // lightbox.load();

          // Init func upload file front-end
          window.filesToUpload = [];
          window.uploadPhoto = new fileUploader('.alireview_list_image', '#alireview_file_upload', filesToUpload);
          uploadPhoto.Init();

          // Badge go to review box
          $("#alireview-review-widget-badge").on("click", function() {
            if( $("#shopify-ali-review").hasClass('un-scroll') ) return;
            
            $("html,body").animate(
              { scrollTop: $("#shopify-ali-review").offset().top },
              "slow"
            );
          });

          // Star go to review box
          $('#shopify-ali-review').on("click", ".alr-count-reviews li", function() {
            if( $("#shopify-ali-review").hasClass('un-scroll') ) return;
            
            $("html,body").animate(
              { scrollTop: $("#shopify-ali-review").offset().top },
              "slow"
            );
          });

          // Add param sort-type
          $('#shopify-ali-review').on('click', '.alireview-sort__type li', function() {
            const type = $(this).attr('option');
            const star = $('input[name="summary-star"]').val() || 'all';

            if (type !== $('input[name="sort-type"]').val()) {
              getReview(star, type);
            }
          });

          // Toggle Advance sort
          $('#shopify-ali-review').on('click', '.alireview-sort__wrap', function() {
            $(this).hasClass('open') ? $(this).removeClass('open') : $(this).addClass('open');
          });

          // Turn off content sort 
          window.onclick = function(event) {
            if (!event.target.matches('.alireview-sort__label, img, .icon-filter')) {
              $('.alireview-sort__type').parent().removeClass('open');
            }
          }

          // Add param star
          $('#shopify-ali-review').on('click', '.alr-count-reviews li', function() {
            let star = $(this).attr('star');

            if (star !== $('input[name="summary-star"]').val()) {
              getReview(star);
            }else{
                getReview('all');
            }
          });

          var is_visitor = myCookies.is_visitor ;

          // Validate input your name and content
          $('#your_name').on('input', function(){
            if ($(this).val().length >= 50) {
              $(this).val($(this).val().substr(0,49));
            }
          });
          $('#content').on('input', function(){
            if ($(this).val().length >= 2000) {
              $(this).val($(this).val().substr(0,1999));
            }
          });


          // *** Popup Comment ****
          popupComment.createPopup();

          $(document).on('click', '.alireview-row img.lightbox-thmb, .alireview-row .ali-show-full-review', function (event) {
            $('body').addClass('modal-open');
            $('#lightbox-modal').addClass('visible-modal');

            popupComment.addGalleryImage(event);

            // countInteractiveReviews(shopId);
          });

          $(document).on('click', '.alireview-row .count-img', function (event) {
            var self = $(this);
            var img_lightbox = self.closest('.alireview-row-wrap').find('img.lightbox-thmb');
            img_lightbox.click();
          });

          popupComment.hiddenPopup();
            if(theme_apply === 'dark'){
                $('.lightbox-modal').addClass('ali-review-theme-dark');
            }
          // *** End Popup Comment ****


          // *** ONBOARDING, Auto scroll box review ****
          let onboardingProductUrl = location.href;
          let onboardingPUrlFm = new URL(onboardingProductUrl);
          let messageOnboarding = onboardingPUrlFm.searchParams.get("ar-onboarding");
          if(messageOnboarding){
            $('html, body').animate({
              scrollTop: $("#shopify-ali-review").offset().top - 50
            }, 500);
          }

          // *** END ONBOARDING, Auto scroll box review ****

          // if(typeof is_visitor === 'undefined'){
          //   $(function() {
          //
          //       visitor_tracking().then(function(value) {
          //         setCookie('is_visitor',sessionStorage.getItem('visitor_id'));
          //       });
          //  });
          // }

          //ajax đếm số lượt xem reviews
          if(sessionStorage.getItem('is_reviews') == null){
              if(typeof isAdminLogin != 'undefined' && !isAdminLogin){
                  console.log("isAdminLogin", isAdminLogin);
                  isReviewBox();
              }

          }
          if(typeof is_visitor === 'undefined'){
            $(function() {
                if(typeof isAdminLogin != 'undefined' && !isAdminLogin){
                    visitor_tracking().then(function(value) {
                        setCookie('is_visitor',sessionStorage.getItem('visitor_id'));
                    });
                }
           });
          }


          //add thông tin review thừ email qua
            if(messageId){
                if($("#writeReviewModal").length > 0) {
                  PopupWriteReview();
                  $('.btn-add-alireview.popup').click();
                }
                $('.reviewFormHead').css('display','block');
                $('input[name="alireview_email_id"]').val(messageId);
                $('input[name="alireview_star"]').val(messageStar);
                $('input[name="alireview_author"]').val(messageCustomerName);
                $('input[name="alireview_email"]').val(messageCustomerEmail);
                // Init rating
                var startSt = 0;
                switch (messageStar){
                    case 5 :
                        startSt = 0;
                        break;
                    case 4 :
                        startSt = 1;
                        break;
                    case 3 :
                        startSt = 2;
                        break;
                    case 2 :
                        startSt = 3;
                        break;
                    case 1 :
                        startSt = 4;
                        break;
                }
                $('.reviewFormHead .alr-rating').length && $('.reviewFormHead .alr-rating').rating({start: startSt});
                $('textarea[name="alireview_content"]').val(messageContent);
                setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: $("#shopify-ali-review").offset().top - 50
                    }, 500);
                }, 500);
            }

            // Init rating
            $('.alr-rating').length && $('.alr-rating').rating();
            doLazyLoad();
            // Fixed rating box in Layout List
            // handleFixedRatingBox();
            scrollToWriteReview();
            PopupWriteReview();
            handleFinishThankYou();
            replacePositionFlagCountry();
            var navigation_type = $("#alireview_navigation_type").val();
            handlePagination(navigation_type);
        }
      }, // success
      error: function() {
        elShopifyAliReview.hide();
      } // error
    });
  }
});
function getReview(star, sort_type = 'all') {
  var elShopifyAliReview = $("#shopify-ali-review");
  var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
  var productId = elShopifyAliReview.attr("product-id");

  // Animation loading reviews [optional]
  $('.alireview-result').html('').before(htmlAlireviewLoading);

  var myCookies = getCookies();
  console.log("myCookies._shopify_s",myCookies);
  $.ajax({
    type: "GET",
    url: config.shop_url + "/comment/get-review",
    data: {
      'product_id': productId,
      'shop_id': shopId,
      'num_rand': num_rand,
      'isAdminLogin': isAdminLogin,
      'star': star,
      'sort_type': sort_type, 
      'visitor_id':myCookies.visitor_id,
      'time_limit_track':myCookies.time_limit_track,
        'style': window.STYLE_LAYOUT_REVIEW
    },
    dataType: "json",
    success: function (result) {
      if (result.status) {
        elShopifyAliReview.find(".reviews").html(result.view);
        if (result.data.current_page == result.data.last_page) {
          $('#alireview_load_more').remove();
        }
          if(window.STYLE_LAYOUT_REVIEW === 'grid'){
              // Init MasonryJS
              renderMasonryList();

              // Use .alireview-refresh-grid to refresh MasonryJS
              const refreshMasonryLayout = setInterval(function() {
                  if(parseInt($('.list-alireview').outerHeight()) <= 60) {
                      renderMasonryList();
                  } else {
                      clearInterval(refreshMasonryLayout);
                  }
              }, 1000);
          }else if(window.STYLE_LAYOUT_REVIEW === 'carousel'){
              renderCarouselList();
          }

        // Init rating
        $('.alr-rating').length && $('.alr-rating').rating();

        // Init lightbox
        lightbox.load();

        // Init func upload file front-end
        window.filesToUpload = [];
        window.uploadPhoto = new fileUploader('.alireview_list_image', '#alireview_file_upload', filesToUpload);
        uploadPhoto.Init();
        
        // Add value summary-star
        $('input[name="summary-star"]').val(result.star);
          // Actvie rating select
          activeRatingSelect();

        // Render sort type
        renderSortType(result.sort_type);
        replacePositionFlagCountry();
      }
      doLazyLoad();
      
    }, // success
    error: function() {
      elShopifyAliReview.hide();
    } // error
  });
}

function renderSortType(sort_type) {
  let li = '';
  let icon_sort = '<span class="icon-filter">\n' +
      '                <i class="fas alireview-fa-sort"></i>\n' +
      '            </span>';
  $.each( sort_type.list_sort, function( key, value ) {
        if(key !=='all'){
            li += `<li option="${ key }" ${ key === sort_type.type ? 'selected' : '' }>${value}</li>`;
        }
        if(key === sort_type.type){
            $('.alireview-sort__label').html(value + icon_sort);
            $('input[name="sort-type"]').val(key)
        }
  });

  $('.alireview-sort__type').append(li);
}

function loadScriptFontAwesome(){
    let eventsListenerScript = document.createElement('script');
    eventsListenerScript.async = true;
    eventsListenerScript.src = "//kit.fontawesome.com/b7c0800100.js";
    document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);
}

function renderMasonryList() {
  if($('.list-alireview').length > 0) {
    const tagsLINK = document.querySelectorAll('link');

    for(var i = 0; i < tagsLINK.length; i++) {
      const regex = /css\/frontend\/45\/grid.css/m;
      const rawResult = regex.exec(tagsLINK[i].outerHTML);
      if(rawResult !== null) {

        new Masonry('.list-alireview', {
          itemSelector: '.alireview-row',
          horizontalOrder: true
        });

        new Imagesloaded('.alireview-result', function() {
          $('.alireview-result .alireview-product-img.alr-grid').fadeIn('fast');

          new Masonry('.list-alireview', {
            itemSelector: '.alireview-row',
            horizontalOrder: true
          });
        });
        break;
      }
    }
  }
}

function renderCarouselList(){
    let product_id = $("#shopify-ali-review").attr("product-id");
    let shop_id = $("#shopify-ali-review .shop_info").attr("shop-id");
    let products_not_in = $("#shopify-ali-review").attr("products-not-in");
    let owl_carousel_alirevie;
    let size_number = 3;
    let currentPageCarousel = 2;
    let mobile_column = parseInt($('input[name="mobile-column"]').val()) || 1;
    if($('.list-alireview').length > 0) {
        const tagsLINK = document.querySelectorAll('link');

        for(let i = 0; i < tagsLINK.length; i++) {
            const regex = /css\/frontend\/45\/carousel.css/m;
            const rawResult = regex.exec(tagsLINK[i].outerHTML);
            if(rawResult !== null) {
                owl_carousel_alirevie = $('.alireview-owl-carousel');
                owl_carousel_alirevie.alireviewOwlCarousel({
                    items: 4,
                    margin: 5,
                    nav: true,
                    dots: false,
                    loop: false,
                    autoplay: false,
                    lazyLoad:true,
                    autoWidth:false,
                    autoHeight:true,
                    autoplayHoverPause:true,
                    stageOuterClass: 'alireview-owl-stage-outer',
                    navContainerClass: 'alireview-owl-nav',
                    dotClass: 'alireview-owl-dot',
                    dotsClass: 'alireview-owl-dots',
                    refreshClass: 'alireview-owl-refresh',
                    loadingClass: 'alireview-owl-loading',
                    loadedClass: 'alireview-owl-loaded',
                    rtlClass: 'alireview-owl-rtl',
                    dragClass: 'alireview-owl-drag',
                    grabClass: 'alireview-owl-grab',
                    stageClass: 'alireview-owl-stage',
                    autoHeightClass: 'alireview-owl-height',
                    itemClass: 'alireview-owl-item',
                    navClass: ['alireview-owl-prev','alireview-owl-next'],
                    navText: ['<i class="far alireview-fa-chevron-left"></i>', '<i class="far alireview-fa-chevron-right"></i>'],
                    onChanged: callbackChange,
                    onResized: callbackResize,
                    responsiveClass: true,
                    responsive:{
                        0: {
                            items: 2,
                            margin: 0,
                            nav: false,
                            autoWidth: true,
                        },
                        376: {
                            items:2,
                            nav: false,
                            autoWidth:true,
                        },
                        768: {
                            items:3,
                            nav: false,
                            autoWidth:true,
                        },
                        991: {
                            items: 3,
                        },
                        1119: {
                            items: 4,
                        },
                    }
                });
                break;
            }
        }
    }

    // pagination carousel
    function callbackChange(event){
        let item = event.item.index;     // Position of the current item

        if(item < size_number){
            return;
        }

        $.ajax({
            type: "GET",
            url: config.shop_url + "/comment/get-review",
            data: {
                'product_id': product_id,
                'shop_id': shop_id,
                'num_rand': num_rand,
                'isAdminLogin': isAdminLogin,
                'products_not_in': products_not_in,
                'currentPage': parseInt(currentPageCarousel),
                'star': $('input[name="summary-star"]').val() || 'all',
                'sort_type': $('input[name="sort-type"]').val() || 'all',
                'style': window.STYLE_LAYOUT_REVIEW
            },
            dataType: "json",
            beforeSend: function () {
                // $('#shopify-ali-review .list-alireview').prepend(htmlAlireviewLoading);
            },
            success: function (result) {
                size_number += 10;
                if (result.status) {
                    // $('.alireview-loadding-wrap').remove();
                    if (result.data.current_page > result.data.last_page) {
                        return false;
                    }
                    currentPageCarousel++;
                    let view = $(result.view);
                    let list_review = view.find('.list-alireview .alireview-row');
                    list_review.each(function(index, el) {
                        let ele_wrap = $(el).wrap('<div class="alireview-row-wrap-parent"></div>');
                        owl_carousel_alirevie.alireviewOwlCarousel().trigger('add.owl.carousel',[ele_wrap.parent().html()]);
                    });
                    owl_carousel_alirevie.alireviewOwlCarousel().trigger('refresh.owl.carousel');
                    $('.alr-rating').length && $('.alr-rating').rating();
                    $('input[name="summary-star"]').val(result.star);
                    replacePositionFlagCountry();
                    truncateTextOver();
                }
            } // success
        });
        return false;
    }

    function callbackResize(event) {
        $('.alireview-row').removeClass('over-text-done');
        truncateTextOver();

    }
    setTimeout(() => {
        truncateTextOver();
    }, 500)
}

function truncateTextOver() {
    $('.alireview-row:not(.over-text-done)').each(function(item){
        let text = $(this).find('.alireview-post-hidden').val();
        let el = $(this).find('.alireview-post');
        let el_text = $(this).find('.alireview-post p');
        el_text.text(text);
        if(!text){
            return;
        }
        let wordArray = text.split(' ');
        while(el_text.outerHeight() > el.outerHeight()) {
            wordArray.pop();
            el_text.html(wordArray.join(' ') + '<span class="ali-show-full-review"><i class="far alireview-fa-ellipsis-h"></i></span>');
        }
        $(this).addClass('over-text-done');
    })
}

function setHeightCarousel(){
    let maxHeight = 0;
    let elem = '.owl-item';
    $('.owl-item .alireview-product-img').css({height: ''});
    $(elem).css({height: ''});
    fixHeight('.owl-item .alireview-product-img');
    $(elem).each(function(){
        if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });
    $(elem).height(maxHeight);
    $('.owl-carousel').css('height', maxHeight + 30);
    $('.owl-stage-outer').css('height', maxHeight + 30);

    function fixHeight(elem){
        let maxHeight = 0;
        $(elem).each(function(){
            if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
        });
        $(elem).height(maxHeight);
    }
}

function checkStyleLayoutReview(){
    let style_layout_review = '';
    const tagsLINK = document.querySelectorAll('link');
    const arr_regex = [/css\/frontend\/45\/list.css/m, /css\/frontend\/45\/grid.css/m, /css\/frontend\/45\/carousel.css/m];
    let is_exist = false;
    for (let i = 0; i < tagsLINK.length; i++) {
        for(let j = 0; j < arr_regex.length; j++){
            const regex = arr_regex[j];
            const rawResult = regex.exec(tagsLINK[i].outerHTML);
            if (rawResult !== null) {
                if(j === 1){
                    style_layout_review = 'grid';
                }else if(j === 2){
                    style_layout_review = 'carousel';
                }else{
                    style_layout_review = 'list';
                }
                is_exist = true;
                break;
            }
        }
        if(is_exist){
            break;
        }
    }
    return style_layout_review;
}

function replacePositionFlagCountry(){
    var ali_country_flag_shape = $('.ali_country_flag_shape').val();
    setTimeout(() => {
        $('.ali-flag-slc').not('.ali-flag-replaced').each(function(){
            let a = $(this).css('backgroundPositionY');
            let b = Number(a.replace(/[^0-9-]/g, ''));
            $(this).addClass('ali-flag-replaced');
            if(ali_country_flag_shape == 'rectangle'){
              $(this).css({'background-position-y': `${b - 6}px`});
            }else if(ali_country_flag_shape == 'circle'){
              $(this).css({'background-position-y': `${b - 4}px`});
            }
        })
    }, 300)
}

function doLazyLoad() {
	$('.arv-lozad').lazy({
    bind: "event",
    effect: "fadeIn",
    effectTime: 200,
    threshold: 0,
    afterLoad: function(element) {
        if(window.STYLE_LAYOUT_REVIEW === 'grid'){
            renderMasonryList();
        }
        $(window).resize();
    },
  });
}

function handleFixedRatingBox(){
  if( $('div').hasClass('alireview-layout-list') ){
    if( $('div').hasClass('alireview-row') ){
      var target = $(".alireview-row:first").offset().top;
    }
    var timeout = null,
    heightRating = $(".alireview-header-summary").height();

    if($( window ).width() >= 992) {
      $(window).scroll(function () {
          var lastReview = 0;
          if( $('div').hasClass('alireview-row') ){
            lastReview = $(".alireview-row:last").offset().top;
          }
          
          if (!timeout) {
              timeout = setTimeout(function () {
                  clearTimeout(timeout);
                  timeout = null;
                  if ($(window).scrollTop() >= target + heightRating) {
                      $('.alireview-layout-list').addClass('fixed_rating_review');
                      setLeftFixedBox();
                      $(window).resize(function(){
                          setLeftFixedBox();
                      });
                  }else{
                      $('.alireview-layout-list').removeClass('fixed_rating_review');
                  }

                  if ($(window).scrollTop() >= (lastReview - heightRating)) {
                      $('.alireview-layout-list').removeClass('fixed_rating_review');
                  }
              }, 250);
          }
      });
    }
  }                                                                  
}

function setLeftFixedBox(){
  var widthBrower = $( window ).width();
  var padding = 32;
  if (widthBrower >= 1200) {
      var left = ((widthBrower - 1180)/2 + padding);
      $('.fixed_rating_review .alireview-layout-list__left').css('left', left);
  }else{
      $('.fixed_rating_review .alireview-layout-list__left').css('left', 'unset');
  }
}

function scrollToWriteReview(){
  $(".alireview-layout-list .btn-add-alireview").click(function() {
    $('html, body').animate({
        scrollTop: $(".reviewFormHead").offset().top
    }, "slow");
  });
}

function handleFinishThankYou(){
  if ($("#writeReviewModal").length > 0) {
    //Hide popup thankyou
    $(document).on('click', '.alireview-thankyou__button, #thankYouModal .button-close', function (event) {
      $('body').removeClass('thank-you-open');
      $('#thankYouModal').remove();
    });
  }
}

function activeRatingSelect(){
    let ele = $("#shopify-ali-review .alr-count-reviews")
    let star = $('input[name="summary-star"]').val();
    if(star !== 'all'){
        ele.addClass('active');
        ele.find(`li[star="${star}"]`).addClass('active');
    }
}

function loadAddRatingCollectionDOMSubtreeModified(){
  let timer_load_rating_collection = null;
  let is_modified_only_once = true;
  let $el_collection = '';
  const regex = new RegExp( '/collections', 'gi' );
  const location_href = window.location.href;
  console.log('loadAddRatingCollectionDOMSubtreeModified')
  if( location_href && location_href.match(regex) ) {
    if($('.collection').length){
      $el_collection = '.collection';
    }else{
      $el_collection = 'body';
    }
  
    $($el_collection).bind('DOMSubtreeModified', function () {
      clearTimeout(timer_load_rating_collection);
      timer_load_rating_collection = setTimeout(() => {
        if(is_modified_only_once){
          is_modified_only_once = false;
          $('.arv-collection').length && addRatingCollection();
          setTimeout(() => {
            is_modified_only_once = true;
          }, 1000)
        }
      }, 500)
    });
  }
}

export { renderSortType, renderMasonryList, doLazyLoad, checkCartToken, replacePositionFlagCountry } //countInteractiveReviews  checkCartToken
