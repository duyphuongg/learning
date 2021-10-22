import config from './config';
import '../../libs/rating/bootstrap-rating.min.js';
import lightbox from './libs/light-box/lightbox';
import './libs/lazy-load/lazyload.js';
import popupComment from './popup-comment';
import fileUploader from './uploadfile.js';
import './add-review-frontend';
import './frontend-pagination-review';
import addRatingCollection from './collections-rating'; //countInteractiveReviews  ,
import  { getCookies , checkCartToken ,setCookie ,visitor_tracking , isReviewBox} from  './statistics_visitor';
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

document.addEventListener("DOMContentLoaded", function() {
  // Insert rating to Collection page
  $('.arv-collection').length && addRatingCollection();

  // Collections add rating when load Ajax
  $( document ).ajaxComplete(function( event, xhr, settings ) {
    const regex = new RegExp( '/collections', 'gi' );
    
    if( settings.url.match(regex) ) {
      $('.arv-collection').length && addRatingCollection();
    }
  });
  
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

    $.ajax({
      type: "GET",
      url: config.shop_url + "/comment/get-review",
      data: {
        'product_id': productId,
        'shop_id': shopId,
        'num_rand': num_rand,
        'isAdminLogin': isAdminLogin,
        'star': 'all',
        'sort_type': 'all',
        'visitor_id':myCookies.visitor_id,
        'time_limit_track':myCookies.time_limit_track
      },
      dataType: "json",
      success: function (result) {
        if (result.status) {
          elShopifyAliReview.find(".reviews").html(result.view);

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

          renderSortType(result.sort_type);

          var eleRating = '<div id="alireview-review-widget-badge"><input type="hidden" class="alr-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" data-fractions="3" data-readonly value="' + result.avg + '"/><span style="margin-left: 10px;">' + (parseInt(result.avg) === 0 ? "" : result.text_reviews) + '</span></div>';
          
          if ($('.alr-display-review-badge').length) {
            $(".alr-display-review-badge").append($(eleRating));
          } else {
            $(eleRating).insertAfter('h1[itemprop="name"], h2[itemprop="name"], h3[itemprop="name"]');
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

          $(document).on('click', '.alireview-row img.lightbox-thmb', function (event) {
            $('body').addClass('modal-open');
            $('#lightbox-modal').addClass('visible-modal');

            popupComment.addGalleryImage(event);

            // countInteractiveReviews(shopId);
          });

          popupComment.hiddenPopup();
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
            isReviewBox();
          }
          if(typeof is_visitor === 'undefined'){
            $(function() {
                visitor_tracking().then(function(value) {
                  setCookie('is_visitor',sessionStorage.getItem('visitor_id'));
                });
           });
          }


          //add thông tin review thừ email qua
            if(messageId){
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
      'time_limit_track':myCookies.time_limit_track
    },
    dataType: "json",
    success: function (result) {
      if (result.status) {
        elShopifyAliReview.find(".reviews").html(result.view);

        renderMasonryList();
        
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

        // Render sort type
        renderSortType(result.sort_type);

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
  delete sort_type.all;

  for(const type in sort_type) {
    li += `<li option="${ type }" ${ sort_type[type] === true ? 'selected' : '' }>By ${ type }</li>`;

    if(sort_type[type] === true) {
      $('input[name="sort-type"]').val(type)
    }
  } 

  $('.alireview-sort__type').append(li);
}

function renderMasonryList() {
  if($('.list-alireview').length > 0) {
    const tagsLINK = document.querySelectorAll('link');
    
    for(var i = 0; i < tagsLINK.length; i++) {
      const regex = /css\/frontend\/grid.css/m;
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

function doLazyLoad() {
	$('.arv-lozad').lazy({
    bind: "event",
    effect: "fadeIn",
    effectTime: 200,
    threshold: 0,
    afterLoad: function(element) {
			renderMasonryList();
		},
  });
}
export { renderSortType, renderMasonryList, doLazyLoad ,checkCartToken} //countInteractiveReviews  checkCartToken

