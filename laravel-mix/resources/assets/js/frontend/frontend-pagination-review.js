import config from './config';
import lightbox from './libs/light-box/lightbox';
import fileUploader from './uploadfile';
import './libs/lazy-load/lazyload.js';
import { renderSortType, renderMasonryList ,countInteractiveReviews, doLazyLoad } from './comment';

$(document).on("click", ".alireview-pagination li", function(e) {
  e.preventDefault();
  $(".alireview-pagination li").removeClass("alireview-active");
  $(this).addClass("alireview-active");

  var product_id = $("#shopify-ali-review").attr("product-id");
  var shop_id = $("#shopify-ali-review .shop_info").attr("shop-id");
  var products_not_in = $("#shopify-ali-review").attr("products-not-in");
  var shop_url = window.location.host;
  var target = $(e.currentTarget);
  var currentPage = target.text();
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
    },
    dataType: "json",
    success: function (result) {
      if (result.status) {
        $("#shopify-ali-review .reviews")
          .empty()
          .html(result.view)
          .promise()
          .done(function() {
            renderMasonryList();

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
            }, "slow" );

            // Add value summary-star
            $('input[name="summary-star"]').val(result.star);
          });
      } else {
        $("#shopify-ali-review .reviews").html("");
      }
      doLazyLoad();
    }, // success
    error: function() {
      $("#shopify-ali-review .reviews").html("");
    } // error
  }); // end ajax
});
