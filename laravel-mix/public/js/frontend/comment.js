/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/frontend/add-review-frontend.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/frontend/config.js");


$(document).on("click", ".btn-submit-review", function (e) {
  e.preventDefault();
  var self = $(this);

  // Validate 
  var countErrors = 0;
  var translate = JSON.parse($('input[name="translate"]').val());
  var template_error = "<label class=\"err\"></label>";
  $('[class*="alireview_error"]').remove();

  var inpAuthor = $('[name="alireview_author"]');
  if ($(inpAuthor).val() === "") {
    var errAuthor = $(template_error).addClass('alireview_error_author');
    errAuthor = $(errAuthor).text(translate.error_name_required);
    $(errAuthor).insertAfter($(inpAuthor));
    countErrors++;
  }

  var inpContent = $('[name="alireview_content"]');
  if ($(inpContent).val() === "") {
    var errContent = $(template_error).addClass('alireview_error_content');
    errContent = $(errContent).text(translate.error_rating_required);
    $(errContent).insertAfter($(inpContent));
    countErrors++;
  }

  var inpEmail = $('[name="alireview_email"]');

  if ($(inpEmail).val() !== "" && !validateEmail($(inpEmail).val())) {
    var errEmail = $(template_error).addClass('alireview_error_email');
    errEmail = $(errEmail).text(translate.error_email);
    $(errEmail).insertAfter($(inpEmail));
    countErrors++;
  }

  if (countErrors > 0) {
    return;
  }
  // END: Validate 

  // Animation loading
  $(self).find('.lds-dual-ring').remove();
  $(self).addClass("wrap-loading");
  $(self).prepend('<div class="lds-dual-ring"></div>');
  $(self).closest('form').find('input[type="text"], textarea').prop('readonly', true);
  $('.alireview_loading_upload').show();
  // END: Animation loading

  // When photo uploaded
  window.uploadPhoto.Upload().then(function (res) {
    $.ajax({
      method: "POST",
      url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/post_review",
      data: $("#add_form_review").serialize(),
      success: function success(e) {
        if (e.status == true) {

          // $("#add_form_review")
          //   .find(".err")
          //   .text("");
          // $("#add_form_review")
          //   .find("input[name=author]")
          //   .val("");
          // $("#add_form_review")
          //   .find("input[name=email]")
          //   .val("");
          // $("#add_form_review")
          //   .find("textarea")
          //   .val("");

          $(".reviewFormHead").html("<div class=\"alireview-notice-addreview-success\">" + e.message + "</div>");

          $(".alireview-btn-add-review").hide();

          // hide modal review
          if ($("#alireview-modal-add-review").length > 0) {
            var body = document.querySelector("body");
            var aliModal = document.querySelector(".alireview-modal");
            aliModal.classList.remove("alireview-modal-show");
            body.classList.remove("alireview-modal-open");
          }

          $("html,body").animate({
            scrollTop: absoluteOffset($("#shopify-ali-review").get(0)).top
          }, "slow");
        } else {
          $(self).removeClass("wrap-loading");
          $(self).find('.lds-dual-ring').remove();
          $(self).closest('form').find('input[type="text"], textarea').prop('readonly', false);
          $('.alireview_loading_upload').hide();

          // if (typeof e.err !== "undefined") {
          //   $("label.err").html("");
          //   var err = e.err;

          //   for (let k in err) {
          //     $("label.err-" + k).html(err[k]);
          //   }
          //   return false;
          // }

          // if (typeof e.error !== "undefined") {
          //   alert(e.error);
          //   return false;
          // }
        }

        var productUrlFmNew = location.protocol + '//' + location.host + location.pathname;
        window.history.pushState({}, document.title, productUrlFmNew);
      },
      error: function error() {
        $(self).removeClass("wrap-loading");
        $(self).find('.lds-dual-ring').remove();
      }
    }); // End ajax
  });
});
var getCookies = function getCookies() {

  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    cookies[(pair[0] + '').trim()] = unescape(pair[1]);
  }
  return cookies;
};

var alireview_run_like = 1;
$(document).on("click", ".alireview-comment-like", function (e) {
  e.preventDefault();
  var elShopifyAliReview = $("#shopify-ali-review");
  var target = $(this);
  var targetClass = $('.alireview-comment-like-id-' + target.attr("data-comment_id"));
  var myCookies = getCookies();
  if (alireview_run_like == 1) {
    $.ajax({
      method: "POST",
      url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/like",
      data: {
        comment_id: target.attr("data-comment_id"),
        shop_id: target.attr("data-shop_id"),
        productId: elShopifyAliReview.attr("product-id"),
        session_visitor: myCookies._shopify_s
      },
      beforeSend: function beforeSend(rs) {
        alireview_run_like = 0;
        target.attr("disabled", true);
      },
      success: function success(data) {
        alireview_run_like = 1;
        target.attr("disabled", false);
        if (data.status == "success") {
          target.addClass("active");
          var numberData = data.data > 0 ? data.data : '';
          var numberDataUnLike = data.dataUnlike && data.dataUnlike > 0 ? data.dataUnlike : '';
          $(".alireview-number-like-" + target.attr("data-comment_id")).text(numberData);

          if (data.type_like == "1") {
            targetClass.addClass("active");
          } else {
            targetClass.removeClass("active");
          }

          if (data.type_unlike == "-1") {
            $(".alireview-number-unlike-" + target.attr("data-comment_id")).text(numberDataUnLike);
            $(".alireview-number-unlike-" + target.attr("data-comment_id")).closest("a").removeClass("active");
          }
        } else {
          alert(data.message);
        }
      },
      error: function error() {
        alireview_run_like = 1;
        target.attr("disabled", false);
        alert("An error, please try again.");
      }
    });
  }
});

var alireview_run_unlike = 1;
$(document).on("click", ".alireview-comment-unlike", function (e) {
  e.preventDefault();
  var elShopifyAliReview = $("#shopify-ali-review");

  var target = $(this);
  var targetClass = $('.alireview-comment-unlike-id-' + target.attr("data-comment_id"));
  var myCookies = getCookies();
  if (alireview_run_unlike == 1) {
    $.ajax({
      method: "POST",
      url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/unlike",
      data: {
        comment_id: target.attr("data-comment_id"),
        shop_id: target.attr("data-shop_id"),
        productId: elShopifyAliReview.attr("product-id"),
        session_visitor: myCookies._shopify_s
      },
      beforeSend: function beforeSend(rs) {
        alireview_run_unlike = 0;
        target.attr("disabled", true);
      },
      success: function success(data) {
        alireview_run_unlike = 1;
        target.attr("disabled", false);
        var numberData = data.data > 0 ? data.data : '';
        var numberDataLike = data.dataLike && data.dataLike > 0 ? data.dataLike : '';
        if (data.status == "success") {
          $(".alireview-number-unlike-" + target.attr("data-comment_id")).text(numberData);

          if (data.type_unlike == "1") {
            targetClass.addClass("active");
          } else {
            targetClass.removeClass("active");
          }

          if (data.type_like == "-1") {
            $(".alireview-number-like-" + target.attr("data-comment_id")).text(numberDataLike);
            $(".alireview-number-like-" + target.attr("data-comment_id")).closest("a").removeClass("active");
          }
        } else {
          alert(data.message);
        }
      },
      error: function error() {
        alireview_run_unlike = 1;
        target.attr("disabled", false);
        alert("An error, please try again.");
      }
    });
  }
});

function absoluteOffset(element) {
  var top = 0,
      left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left
  };
};

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/***/ }),

/***/ "./resources/assets/js/frontend/collections-rating.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addRatingCollection;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/frontend/config.js");
// Add code: <div product-id="{{ product.id }}" class="arv-collection arv-collection--{{ product.id }}"></div>



function insertRating(eleDisplay, product_id, avg_rating, text_review) {
  var eleRating = '<div class="alrv-prod-rating-' + product_id + '"><input type="hidden" class="alr-rating" data-filled="alr-icon-star" data-empty="alr-icon-star" data-fractions="1" data-readonly value="' + avg_rating + '"/><span class="alrv-prod-rating__text">' + text_review + "</span></div>";

  eleDisplay.insertAdjacentHTML("afterbegin", eleRating);
}

function addRatingCollection() {
  var divProdCollections = document.getElementsByClassName("arv-collection");
  var shopUrl = window.Shopify.shop;
  var product_ids = Array.prototype.map.call(divProdCollections, function (item) {
    return item.getAttribute("product-id");
  });

  $.ajax({
    method: "POST",
    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/get-summary",
    data: {
      product_ids: product_ids,
      shop_domain: shopUrl,
      isAdminLogin: true
    },
    success: function success(result) {
      var avg_rating = result.hasOwnProperty("avg_star") ? result.avg_star : {};
      var total_review = result.hasOwnProperty("total_review") ? result.total_review : {};
      // extract key from result.avg_rating
      var avg_key = Object.keys(avg_rating);
      avg_key.length && Promise.all(avg_key.map(function (productId) {
        if (avg_rating[productId] > 0) {
          var eleDisplay = document.getElementsByClassName("arv-collection--" + productId);
          var text = total_review[productId] == 0 || total_review[productId] == 1 ? result["text_review_singular"] : result["text_review_plural"];
          var text_review = total_review[productId] + " " + text;

          for (var i = 0; i < eleDisplay.length; i++) {
            if (eleDisplay[i].childElementCount == 0) {
              insertRating(eleDisplay[i], productId, avg_rating[productId], text_review);
            }
          }
        }
      })).then(function () {
        $('.alr-rating').length && $('.alr-rating').rating();
      });
    }
  });
}

/***/ }),

/***/ "./resources/assets/js/frontend/comment.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSortType", function() { return renderSortType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderMasonryList", function() { return renderMasonryList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doLazyLoad", function() { return doLazyLoad; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/frontend/config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_rating_bootstrap_rating_min_js__ = __webpack_require__("./resources/assets/libs/rating/bootstrap-rating.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_rating_bootstrap_rating_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__libs_rating_bootstrap_rating_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_light_box_lightbox__ = __webpack_require__("./resources/assets/js/frontend/libs/light-box/lightbox.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_lazy_load_lazyload_js__ = __webpack_require__("./resources/assets/js/frontend/libs/lazy-load/lazyload.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_lazy_load_lazyload_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__libs_lazy_load_lazyload_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popup_comment__ = __webpack_require__("./resources/assets/js/frontend/popup-comment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__uploadfile_js__ = __webpack_require__("./resources/assets/js/frontend/uploadfile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__add_review_frontend__ = __webpack_require__("./resources/assets/js/frontend/add-review-frontend.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__frontend_pagination_review__ = __webpack_require__("./resources/assets/js/frontend/frontend-pagination-review.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__collections_rating__ = __webpack_require__("./resources/assets/js/frontend/collections-rating.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__statistics_visitor__ = __webpack_require__("./resources/assets/js/frontend/statistics_visitor.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "checkCartToken", function() { return __WEBPACK_IMPORTED_MODULE_9__statistics_visitor__["a"]; });








 //countInteractiveReviews  ,

var Masonry = __webpack_require__("./resources/assets/libs/masonry/masonry.min.js");
var Imagesloaded = __webpack_require__("./resources/assets/libs/imagesloaded/imagesloaded.min.js");

var isAdminLogin = false;
var num_rand = 0;

// Check isAdminLogin
var tagsSCRIPT = document.querySelectorAll('head script');

for (var i = 0; i < tagsSCRIPT.length; i++) {
  var regex = /adminBarInjector\.init\(\)\;/m;
  var rawResult = regex.exec(tagsSCRIPT[i].outerHTML);
  if (rawResult !== null) {
    isAdminLogin = true;
    break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Insert rating to Collection page
  $('.arv-collection').length && Object(__WEBPACK_IMPORTED_MODULE_8__collections_rating__["a" /* default */])();

  // Collections add rating when load Ajax
  $(document).ajaxComplete(function (event, xhr, settings) {
    var regex = new RegExp('/collections', 'gi');

    if (settings.url.match(regex)) {
      $('.arv-collection').length && Object(__WEBPACK_IMPORTED_MODULE_8__collections_rating__["a" /* default */])();
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
    window.htmlAlireviewLoading = '<div class="alireview-loadding-wrap"><div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>';

    // Animation loading reviews [optional]
    $('.alireview-result').html('').before(htmlAlireviewLoading);
    var myCookies = Object(__WEBPACK_IMPORTED_MODULE_9__statistics_visitor__["b" /* getCookies */])();

    $.ajax({
      type: "GET",
      url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/get-review",
      data: {
        'product_id': productId,
        'shop_id': shopId,
        'num_rand': num_rand,
        'isAdminLogin': isAdminLogin,
        'star': 'all',
        'sort_type': 'all',
        'visitor_id': myCookies.visitor_id,
        'time_limit_track': myCookies.time_limit_track
      },
      dataType: "json",
      success: function success(result) {
        if (result.status) {
          elShopifyAliReview.find(".reviews").html(result.view);

          // Init MasonryJS
          renderMasonryList();

          // Use .alireview-refresh-grid to refresh MasonryJS
          var refreshMasonryLayout = setInterval(function () {
            if (parseInt($('.list-alireview').outerHeight()) <= 60) {
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
          window.uploadPhoto = new __WEBPACK_IMPORTED_MODULE_5__uploadfile_js__["a" /* default */]('.alireview_list_image', '#alireview_file_upload', filesToUpload);
          uploadPhoto.Init();

          // Badge go to review box
          $("#alireview-review-widget-badge").on("click", function () {
            if ($("#shopify-ali-review").hasClass('un-scroll')) return;

            $("html,body").animate({ scrollTop: $("#shopify-ali-review").offset().top }, "slow");
          });

          // Star go to review box
          $('#shopify-ali-review').on("click", ".alr-count-reviews li", function () {
            if ($("#shopify-ali-review").hasClass('un-scroll')) return;

            $("html,body").animate({ scrollTop: $("#shopify-ali-review").offset().top }, "slow");
          });

          // Add param sort-type
          $('#shopify-ali-review').on('click', '.alireview-sort__type li', function () {
            var type = $(this).attr('option');
            var star = $('input[name="summary-star"]').val() || 'all';

            if (type !== $('input[name="sort-type"]').val()) {
              getReview(star, type);
            }
          });

          // Toggle Advance sort
          $('#shopify-ali-review').on('click', '.alireview-sort__wrap', function () {
            $(this).hasClass('open') ? $(this).removeClass('open') : $(this).addClass('open');
          });

          // Turn off content sort 
          window.onclick = function (event) {
            if (!event.target.matches('.alireview-sort__label, img, .icon-filter')) {
              $('.alireview-sort__type').parent().removeClass('open');
            }
          };

          // Add param star
          $('#shopify-ali-review').on('click', '.alr-count-reviews li', function () {
            var star = $(this).attr('star');

            if (star !== $('input[name="summary-star"]').val()) {
              getReview(star);
            }
          });
          var is_visitor = myCookies.is_visitor;

          // Validate input your name and content
          $('#your_name').on('input', function () {
            if ($(this).val().length >= 50) {
              $(this).val($(this).val().substr(0, 49));
            }
          });
          $('#content').on('input', function () {
            if ($(this).val().length >= 2000) {
              $(this).val($(this).val().substr(0, 1999));
            }
          });

          // *** Popup Comment ****
          __WEBPACK_IMPORTED_MODULE_4__popup_comment__["a" /* default */].createPopup();

          $(document).on('click', '.alireview-row img.lightbox-thmb', function (event) {
            $('body').addClass('modal-open');
            $('#lightbox-modal').addClass('visible-modal');

            __WEBPACK_IMPORTED_MODULE_4__popup_comment__["a" /* default */].addGalleryImage(event);

            // countInteractiveReviews(shopId);
          });

          __WEBPACK_IMPORTED_MODULE_4__popup_comment__["a" /* default */].hiddenPopup();
          // *** End Popup Comment ****


          // *** ONBOARDING, Auto scroll box review ****
          var onboardingProductUrl = location.href;
          var onboardingPUrlFm = new URL(onboardingProductUrl);
          var messageOnboarding = onboardingPUrlFm.searchParams.get("ar-onboarding");
          if (messageOnboarding) {
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
          if (sessionStorage.getItem('is_reviews') == null) {
            Object(__WEBPACK_IMPORTED_MODULE_9__statistics_visitor__["c" /* isReviewBox */])();
          }
          if (typeof is_visitor === 'undefined') {
            $(function () {
              Object(__WEBPACK_IMPORTED_MODULE_9__statistics_visitor__["e" /* visitor_tracking */])().then(function (value) {
                Object(__WEBPACK_IMPORTED_MODULE_9__statistics_visitor__["d" /* setCookie */])('is_visitor', sessionStorage.getItem('visitor_id'));
              });
            });
          }

          //add thông tin review thừ email qua
          if (messageId) {
            $('.reviewFormHead').css('display', 'block');
            $('input[name="alireview_email_id"]').val(messageId);
            $('input[name="alireview_star"]').val(messageStar);
            $('input[name="alireview_author"]').val(messageCustomerName);
            $('input[name="alireview_email"]').val(messageCustomerEmail);
            // Init rating
            var startSt = 0;
            switch (messageStar) {
              case 5:
                startSt = 0;
                break;
              case 4:
                startSt = 1;
                break;
              case 3:
                startSt = 2;
                break;
              case 2:
                startSt = 3;
                break;
              case 1:
                startSt = 4;
                break;
            }
            $('.reviewFormHead .alr-rating').length && $('.reviewFormHead .alr-rating').rating({ start: startSt });
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
      error: function error() {
        elShopifyAliReview.hide();
      } // error
    });
  }
});
function getReview(star) {
  var sort_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';

  var elShopifyAliReview = $("#shopify-ali-review");
  var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
  var productId = elShopifyAliReview.attr("product-id");

  // Animation loading reviews [optional]
  $('.alireview-result').html('').before(htmlAlireviewLoading);

  var myCookies = Object(__WEBPACK_IMPORTED_MODULE_9__statistics_visitor__["b" /* getCookies */])();
  console.log("myCookies._shopify_s", myCookies);
  $.ajax({
    type: "GET",
    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/get-review",
    data: {
      'product_id': productId,
      'shop_id': shopId,
      'num_rand': num_rand,
      'isAdminLogin': isAdminLogin,
      'star': star,
      'sort_type': sort_type,
      'visitor_id': myCookies.visitor_id,
      'time_limit_track': myCookies.time_limit_track
    },
    dataType: "json",
    success: function success(result) {
      if (result.status) {
        elShopifyAliReview.find(".reviews").html(result.view);

        renderMasonryList();

        // Init rating
        $('.alr-rating').length && $('.alr-rating').rating();

        // Init lightbox
        __WEBPACK_IMPORTED_MODULE_2__libs_light_box_lightbox__["a" /* default */].load();

        // Init func upload file front-end
        window.filesToUpload = [];
        window.uploadPhoto = new __WEBPACK_IMPORTED_MODULE_5__uploadfile_js__["a" /* default */]('.alireview_list_image', '#alireview_file_upload', filesToUpload);
        uploadPhoto.Init();

        // Add value summary-star
        $('input[name="summary-star"]').val(result.star);

        // Render sort type
        renderSortType(result.sort_type);
      }
      doLazyLoad();
    }, // success
    error: function error() {
      elShopifyAliReview.hide();
    } // error
  });
}

function renderSortType(sort_type) {
  var li = '';
  delete sort_type.all;

  for (var type in sort_type) {
    li += '<li option="' + type + '" ' + (sort_type[type] === true ? 'selected' : '') + '>By ' + type + '</li>';

    if (sort_type[type] === true) {
      $('input[name="sort-type"]').val(type);
    }
  }

  $('.alireview-sort__type').append(li);
}

function renderMasonryList() {
  if ($('.list-alireview').length > 0) {
    var tagsLINK = document.querySelectorAll('link');

    for (var i = 0; i < tagsLINK.length; i++) {
      var _regex = /css\/frontend\/grid.css/m;
      var _rawResult = _regex.exec(tagsLINK[i].outerHTML);
      if (_rawResult !== null) {

        new Masonry('.list-alireview', {
          itemSelector: '.alireview-row',
          horizontalOrder: true
        });

        new Imagesloaded('.alireview-result', function () {
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
    afterLoad: function afterLoad(element) {
      renderMasonryList();
    }
  });
}
 //countInteractiveReviews  checkCartToken

/***/ }),

/***/ "./resources/assets/js/frontend/config.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    shop_url: Object({"NODE_ENV":"development"}).MIX_APP_URL || "https://" + window.location.host + "/a"
});

/***/ }),

/***/ "./resources/assets/js/frontend/frontend-pagination-review.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/frontend/config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_light_box_lightbox__ = __webpack_require__("./resources/assets/js/frontend/libs/light-box/lightbox.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uploadfile__ = __webpack_require__("./resources/assets/js/frontend/uploadfile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_lazy_load_lazyload_js__ = __webpack_require__("./resources/assets/js/frontend/libs/lazy-load/lazyload.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_lazy_load_lazyload_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__libs_lazy_load_lazyload_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comment__ = __webpack_require__("./resources/assets/js/frontend/comment.js");






$(document).on("click", ".alireview-pagination li", function (e) {
  e.preventDefault();
  $(".alireview-pagination li").removeClass("alireview-active");
  $(this).addClass("alireview-active");

  var product_id = $("#shopify-ali-review").attr("product-id");
  var shop_id = $("#shopify-ali-review .shop_info").attr("shop-id");
  var products_not_in = $("#shopify-ali-review").attr("products-not-in");
  var shop_url = window.location.host;
  var target = $(e.currentTarget);
  var currentPage = target.text();
  var isAdminLogin = false;
  var num_rand = 0;

  // Check isAdminLogin
  var tagsSCRIPT = document.querySelectorAll('head script');

  for (var i = 0; i < tagsSCRIPT.length; i++) {
    var regex = /adminBarInjector\.init\(\)\;/m;
    var rawResult = regex.exec(tagsSCRIPT[i].outerHTML);
    if (rawResult !== null) {
      isAdminLogin = true;
      break;
    }
  }

  // Animation loading reviews [optional]
  $('.alireview-result').html('').before(htmlAlireviewLoading);

  $.ajax({
    type: "GET",
    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/get-review",
    data: {
      'product_id': product_id,
      'shop_id': shop_id,
      'num_rand': num_rand,
      'isAdminLogin': isAdminLogin,
      'products_not_in': products_not_in,
      'currentPage': parseInt(currentPage),
      'star': $('input[name="summary-star"]').val() || 'all',
      'sort_type': $('input[name="sort-type"]').val() || 'all'
    },
    dataType: "json",
    success: function success(result) {
      if (result.status) {
        $("#shopify-ali-review .reviews").empty().html(result.view).promise().done(function () {
          Object(__WEBPACK_IMPORTED_MODULE_4__comment__["renderMasonryList"])();

          // Init rating
          $('.alr-rating').length && $('.alr-rating').rating();

          // Render html sort type
          Object(__WEBPACK_IMPORTED_MODULE_4__comment__["renderSortType"])(result.sort_type);

          // Init lightbox
          __WEBPACK_IMPORTED_MODULE_1__libs_light_box_lightbox__["a" /* default */].load();
          // Interactive Reviews
          $("img.jslghtbx-thmb").on('click', function () {
            //countInteractiveReviews(shop_id);
          });
          // Init func upload file front-end
          window.filesToUpload = [];
          window.uploadPhoto = new __WEBPACK_IMPORTED_MODULE_2__uploadfile__["a" /* default */]('.alireview_list_image', '#alireview_file_upload', filesToUpload);
          uploadPhoto.Init();

          $("html,body").animate({
            scrollTop: $("#shopify-ali-review .reviews").offset().top
          }, "slow");

          // Add value summary-star
          $('input[name="summary-star"]').val(result.star);
        });
      } else {
        $("#shopify-ali-review .reviews").html("");
      }
      Object(__WEBPACK_IMPORTED_MODULE_4__comment__["doLazyLoad"])();
    }, // success
    error: function error() {
      $("#shopify-ali-review .reviews").html("");
    } // error
  }); // end ajax
});

/***/ }),

/***/ "./resources/assets/js/frontend/libs/lazy-load/lazyload.js":
/***/ (function(module, exports) {

/*! jQuery & Zepto Lazy v1.7.10 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
!function (t, e) {
  "use strict";
  function r(r, a, i, u, l) {
    function f() {
      L = t.devicePixelRatio > 1, i = c(i), a.delay >= 0 && setTimeout(function () {
        s(!0);
      }, a.delay), (a.delay < 0 || a.combined) && (u.e = v(a.throttle, function (t) {
        "resize" === t.type && (w = B = -1), s(t.all);
      }), u.a = function (t) {
        t = c(t), i.push.apply(i, t);
      }, u.g = function () {
        return i = n(i).filter(function () {
          return !n(this).data(a.loadedName);
        });
      }, u.f = function (t) {
        for (var e = 0; e < t.length; e++) {
          var r = i.filter(function () {
            return this === t[e];
          });r.length && s(!1, r);
        }
      }, s(), n(a.appendScroll).on("scroll." + l + " resize." + l, u.e));
    }function c(t) {
      var i = a.defaultImage,
          o = a.placeholder,
          u = a.imageBase,
          l = a.srcsetAttribute,
          f = a.loaderAttribute,
          c = a._f || {};t = n(t).filter(function () {
        var t = n(this),
            r = m(this);return !t.data(a.handledName) && (t.attr(a.attribute) || t.attr(l) || t.attr(f) || c[r] !== e);
      }).data("plugin_" + a.name, r);for (var s = 0, d = t.length; s < d; s++) {
        var A = n(t[s]),
            g = m(t[s]),
            h = A.attr(a.imageBaseAttribute) || u;g === N && h && A.attr(l) && A.attr(l, b(A.attr(l), h)), c[g] === e || A.attr(f) || A.attr(f, c[g]), g === N && i && !A.attr(E) ? A.attr(E, i) : g === N || !o || A.css(O) && "none" !== A.css(O) || A.css(O, "url('" + o + "')");
      }return t;
    }function s(t, e) {
      if (!i.length) return void (a.autoDestroy && r.destroy());for (var o = e || i, u = !1, l = a.imageBase || "", f = a.srcsetAttribute, c = a.handledName, s = 0; s < o.length; s++) {
        if (t || e || A(o[s])) {
          var g = n(o[s]),
              h = m(o[s]),
              b = g.attr(a.attribute),
              v = g.attr(a.imageBaseAttribute) || l,
              p = g.attr(a.loaderAttribute);g.data(c) || a.visibleOnly && !g.is(":visible") || !((b || g.attr(f)) && (h === N && (v + b !== g.attr(E) || g.attr(f) !== g.attr(F)) || h !== N && v + b !== g.css(O)) || p) || (u = !0, g.data(c, !0), d(g, h, v, p));
        }
      }u && (i = n(i).filter(function () {
        return !n(this).data(c);
      }));
    }function d(t, e, r, i) {
      ++z;var _o = function o() {
        y("onError", t), p(), _o = n.noop;
      };y("beforeLoad", t);var u = a.attribute,
          l = a.srcsetAttribute,
          f = a.sizesAttribute,
          c = a.retinaAttribute,
          s = a.removeAttribute,
          d = a.loadedName,
          A = t.attr(c);if (i) {
        var _g = function g() {
          s && t.removeAttr(a.loaderAttribute), t.data(d, !0), y(T, t), setTimeout(p, 1), _g = n.noop;
        };t.off(I).one(I, _o).one(D, _g), y(i, t, function (e) {
          e ? (t.off(D), _g()) : (t.off(I), _o());
        }) || t.trigger(I);
      } else {
        var h = n(new Image());h.one(I, _o).one(D, function () {
          t.hide(), e === N ? t.attr(C, h.attr(C)).attr(F, h.attr(F)).attr(E, h.attr(E)) : t.css(O, "url('" + h.attr(E) + "')"), t[a.effect](a.effectTime), s && (t.removeAttr(u + " " + l + " " + c + " " + a.imageBaseAttribute), f !== C && t.removeAttr(f)), t.data(d, !0), y(T, t), h.remove(), p();
        });var m = (L && A ? A : t.attr(u)) || "";h.attr(C, t.attr(f)).attr(F, t.attr(l)).attr(E, m ? r + m : null), h.complete && h.trigger(D);
      }
    }function A(t) {
      var e = t.getBoundingClientRect(),
          r = a.scrollDirection,
          n = a.threshold,
          i = h() + n > e.top && -n < e.bottom,
          o = g() + n > e.left && -n < e.right;return "vertical" === r ? i : "horizontal" === r ? o : i && o;
    }function g() {
      return w >= 0 ? w : w = n(t).width();
    }function h() {
      return B >= 0 ? B : B = n(t).height();
    }function m(t) {
      return t.tagName.toLowerCase();
    }function b(t, e) {
      if (e) {
        var r = t.split(",");t = "";for (var a = 0, n = r.length; a < n; a++) {
          t += e + r[a].trim() + (a !== n - 1 ? "," : "");
        }
      }return t;
    }function v(t, e) {
      var n,
          i = 0;return function (o, u) {
        function l() {
          i = +new Date(), e.call(r, o);
        }var f = +new Date() - i;n && clearTimeout(n), f > t || !a.enableThrottle || u ? l() : n = setTimeout(l, t - f);
      };
    }function p() {
      --z, i.length || z || y("onFinishedAll");
    }function y(t, e, n) {
      return !!(t = a[t]) && (t.apply(r, [].slice.call(arguments, 1)), !0);
    }var z = 0,
        w = -1,
        B = -1,
        L = !1,
        T = "afterLoad",
        D = "load",
        I = "error",
        N = "img",
        E = "src",
        F = "srcset",
        C = "sizes",
        O = "background-image";"event" === a.bind || o ? f() : n(t).on(D + "." + l, f);
  }function a(a, o) {
    var u = this,
        l = n.extend({}, u.config, o),
        f = {},
        c = l.name + "-" + ++i;return u.config = function (t, r) {
      return r === e ? l[t] : (l[t] = r, u);
    }, u.addItems = function (t) {
      return f.a && f.a("string" === n.type(t) ? n(t) : t), u;
    }, u.getItems = function () {
      return f.g ? f.g() : {};
    }, u.update = function (t) {
      return f.e && f.e({}, !t), u;
    }, u.force = function (t) {
      return f.f && f.f("string" === n.type(t) ? n(t) : t), u;
    }, u.loadAll = function () {
      return f.e && f.e({ all: !0 }, !0), u;
    }, u.destroy = function () {
      return n(l.appendScroll).off("." + c, f.e), n(t).off("." + c), f = {}, e;
    }, r(u, l, a, f, c), l.chainable ? a : u;
  }var n = t.jQuery || t.Zepto,
      i = 0,
      o = !1;n.fn.Lazy = n.fn.lazy = function (t) {
    return new a(this, t);
  }, n.Lazy = n.lazy = function (t, r, i) {
    if (n.isFunction(r) && (i = r, r = []), n.isFunction(i)) {
      t = n.isArray(t) ? t : [t], r = n.isArray(r) ? r : [r];for (var o = a.prototype.config, u = o._f || (o._f = {}), l = 0, f = t.length; l < f; l++) {
        (o[t[l]] === e || n.isFunction(o[t[l]])) && (o[t[l]] = i);
      }for (var c = 0, s = r.length; c < s; c++) {
        u[r[c]] = t[0];
      }
    }
  }, a.prototype.config = { name: "lazy", chainable: !0, autoDestroy: !0, bind: "load", threshold: 500, visibleOnly: !1, appendScroll: t, scrollDirection: "both", imageBase: null, defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", placeholder: null, delay: -1, combined: !1, attribute: "data-src", srcsetAttribute: "data-srcset", sizesAttribute: "data-sizes", retinaAttribute: "data-retina", loaderAttribute: "data-loader", imageBaseAttribute: "data-imagebase", removeAttribute: !0, handledName: "handled", loadedName: "loaded", effect: "show", effectTime: 0, enableThrottle: !0, throttle: 250, beforeLoad: e, afterLoad: e, onError: e, onFinishedAll: e }, n(t).on("load", function () {
    o = !0;
  });
}(window);

/***/ }),

/***/ "./resources/assets/js/frontend/libs/light-box/lightbox.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/**
 * jsOnlyLightbox 0.5.5
 * Copyright © 2014 Felix Hagspiel - http://jslightbox.felixhagspiel.de
 *
 * @license MIT
 * - Free for use in both personal and commercial projects
 */
/* exported Lightbox */

function Lightbox() {

  /**
   * Constants
   */
  var _const_name = 'jslghtbx';
  var _const_class_prefix = _const_name;
  var _const_id_prefix = _const_name;
  var _const_dataattr = 'data-' + _const_name;
  /**
   * Private vars
   */
  var CTX = this,
      isIE8 = false,
      isIE9 = false,
      body = document.getElementsByTagName('body')[0],
      template = '<div class="' + _const_name + '-contentwrapper" id="' + _const_name + '-contentwrapper" ></div>',
      imgRatio = false,
      // ratio of current image
  currGroup = false,
      // current group
  currThumbnail = false,
      // first clicked thumbnail
  currImage = {},
      // currently shown image
  currImages = [],
      // images belonging to current group
  isOpen = false,
      // check if box is open
  animationEl,
      // reference to animation-element
  animationInt,
      // animation-interval
  animationChildren = [],
      // childs to animate
  animationTimeout,
      // timeout until animation starts
  // controls
  nextBtn = false,
      prevBtn = false,

  // resize-vars
  maxWidth,
      maxHeight,
      newImgWidth,
      newImgHeight;

  /*
   *   Public attributes
   */
  CTX.opt = {};
  CTX.box = false;
  CTX.wrapper = false;
  CTX.thumbnails = [];

  /**
   * Private methods
   */

  /**
   * Get correct height in IE8
   * @return {number}
   */
  function getHeight() {
    return window.innerHeight || document.documentElement.offsetHeight;
  }

  /**
   * Get correct width in IE8
   * @return {number}
   */
  function getWidth() {
    return window.innerWidth || document.documentElement.offsetWidth;
  }

  /**
   * Adds eventlisteners cross browser
   * @param {Object}   el       The element which gets the listener
   * @param {String}   e        The event type
   * @param {Function} callback The action to execute on event
   * @param {Boolean}  capture      The capture mode
   */
  function addEvent(el, e, callback, capture) {
    if (el.addEventListener) {
      el.addEventListener(e, callback, capture || false);
    } else if (el.attachEvent) {
      el.attachEvent('on' + e, callback);
    }
  }

  /**
   * Checks if element has a specific class
   * @param  {Object}  el        [description]
   * @param  {String}  className [description]
   * @return {Boolean}           [description]
   */
  function hasClass(el, className) {
    if (!el || !className) {
      return;
    }
    return new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
  }

  /**
   * Removes class from element
   * @param  {Object} el
   * @param  {String} className
   * @return {Object}
   */
  function removeClass(el, className) {
    if (!el || !className) {
      return;
    }
    el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)'), '');
    return el;
  }

  /**
   * Adds class to element
   * @param  {Object} el
   * @param  {String} className
   * @return {Object}
   */
  function addClass(el, className) {
    if (!el || !className) {
      return;
    }
    if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
    return el;
  }

  /**
   * Checks if obj is set
   * @param  {Object} obj
   * @return {Boolean}
   */
  function isset(obj) {
    return typeof obj !== 'undefined';
  }

  /**
   * Get attribute value cross-browser. Returns the attribute as string if found,
   * otherwise returns false
   * @param  {Object} obj
   * @param  {String} attr
   * @return {boolean || string}
   */
  function getAttr(obj, attr) {
    if (!obj || !isset(obj)) {
      return false;
    }
    var ret;
    if (obj.getAttribute) {
      ret = obj.getAttribute(attr);
    } else if (obj.getAttributeNode) {
      ret = obj.getAttributeNode(attr).value;
    }
    if (isset(ret) && ret !== '') {
      return ret;
    }
    return false;
  }

  /**
   * Checks if element has attribute cross-browser
   * @param  {Object}  obj
   * @param  {String}  attr
   * @return {Boolean}
   */
  function hasAttr(obj, attr) {
    if (!obj || !isset(obj)) {
      return false;
    }
    var ret;
    if (obj.getAttribute) {
      ret = obj.getAttribute(attr);
    } else if (obj.getAttributeNode) {
      ret = obj.getAttributeNode(attr).value;
    }
    return typeof ret === 'string';
  }

  /**
   * Adds clickhandlers to thumbnails
   * @param  {Object} i
   */
  function clckHlpr(i) {
    addEvent(i, 'click', function (e) {
      stopPropagation(e);
      preventDefault(e);
      currGroup = getAttr(i, _const_dataattr + '-group') || false;
      currThumbnail = i;
      openBox(i, false, false, false);
    }, false);
  }

  /**
   * Stop event propagation cross browser
   * @param  {Object} e
   */
  function stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.returnValue = false;
    }
  }

  /**
   * Prevent default cross browser
   * @param  {Object} e
   */
  function preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  /**
   * Get thumbnails by group
   * @param  {String} group
   * @return {Object}       Array containing the thumbnails
   */
  function getByGroup(group) {
    var arr = [];
    for (var i = 0; i < CTX.thumbnails.length; i++) {
      if (getAttr(CTX.thumbnails[i], _const_dataattr + '-group') === group) {
        arr.push(CTX.thumbnails[i]);
      }
    }
    return arr;
  }

  /**
   * Get the position of thumbnail in group-array
   * @param  {Object} thumbnail
   * @param  {String} group
   * @return {number}
   */
  function getPos(thumbnail, group) {
    var arr = getByGroup(group);
    for (var i = 0; i < arr.length; i++) {
      // compare elements
      if (getAttr(thumbnail, 'src') === getAttr(arr[i], 'src') && getAttr(thumbnail, _const_dataattr + '-index') === getAttr(arr[i], _const_dataattr + '-index') && getAttr(thumbnail, _const_dataattr) === getAttr(arr[i], _const_dataattr)) {

        return i;
      }
    }
  }

  /**
   * Preloads next and prev images
   */
  function preload() {
    if (!currGroup) {
      return;
    }
    var prev = new Image();
    var next = new Image();
    var pos = getPos(currThumbnail, currGroup);
    if (pos === currImages.length - 1) {
      // last image in group, preload first image and the one before
      prev.src = getAttr(currImages[currImages.length - 1], _const_dataattr) || currImages[currImages.length - 1].src;
      next.src = getAttr(currImages[0].src, _const_dataattr) || currImages[0].src;
    } else if (pos === 0) {
      // first image in group, preload last image and the next one
      prev.src = getAttr(currImages[currImages.length - 1], _const_dataattr) || currImages[currImages.length - 1].src;
      next.src = getAttr(currImages[1], _const_dataattr) || currImages[1].src;
    } else {
      // in between, preload prev & next image
      prev.src = getAttr(currImages[pos - 1], _const_dataattr) || currImages[pos - 1].src;
      next.src = getAttr(currImages[pos + 1], _const_dataattr) || currImages[pos + 1].src;
    }
  }

  /**
   * Starts the loading animation
   */
  function startAnimation() {
    if (isIE8) {
      return;
    }
    // stop any already running animations
    stopAnimation();
    var fnc = function fnc() {
      addClass(CTX.box, _const_class_prefix + '-loading');
      if (!isIE9 && typeof CTX.opt.loadingAnimation === 'number') {
        var index = 0;
        animationInt = setInterval(function () {
          addClass(animationChildren[index], _const_class_prefix + '-active');
          setTimeout(function () {
            removeClass(animationChildren[index], _const_class_prefix + '-active');
          }, CTX.opt.loadingAnimation);
          index = index >= animationChildren.length ? 0 : index += 1;
        }, CTX.opt.loadingAnimation);
      }
    };
    // set timeout to not show loading animation on fast connections
    animationTimeout = setTimeout(fnc, 500);
  }

  /**
   * Stops the animation
   */
  function stopAnimation() {
    if (isIE8) {
      return;
    }
    // hide animation-element
    removeClass(CTX.box, _const_class_prefix + '-loading');
    // stop animation
    if (!isIE9 && typeof CTX.opt.loadingAnimation !== 'string' && CTX.opt.loadingAnimation) {
      clearInterval(animationInt);
      // do not use animationChildren.length here due to IE8/9 bugs
      for (var i = 0; i < animationChildren.length; i++) {
        removeClass(animationChildren[i], _const_class_prefix + '-active');
      }
    }
  }

  /**
   * Initializes the control arrows
   */
  function initControls() {
    var nextBtn = void 0;
    var prevBtn = void 0;

    if (!nextBtn) {
      // create & append next-btn
      nextBtn = document.createElement('span');
      addClass(nextBtn, _const_class_prefix + '-next');

      // add custom images
      if (CTX.opt.nextImg) {
        var nextBtnImg = document.createElement('img');
        nextBtnImg.setAttribute('src', CTX.opt.nextImg);
        nextBtn.appendChild(nextBtnImg);
      } else {
        addClass(nextBtn, _const_class_prefix + '-no-img');
      }
      addEvent(nextBtn, 'click', function (e) {
        stopPropagation(e); // prevent closing of lightbox
        CTX.next();
      }, false);
      CTX.box.appendChild(nextBtn);
      nextBtn.appendChild(document.createElement('div'));
    }
    addClass(nextBtn, _const_class_prefix + '-active');

    if (!prevBtn) {
      // create & append next-btn
      prevBtn = document.createElement('span');
      addClass(prevBtn, _const_class_prefix + '-prev');

      // add custom images
      if (CTX.opt.prevImg) {
        var prevBtnImg = document.createElement('img');
        prevBtnImg.setAttribute('src', CTX.opt.prevImg);
        prevBtn.appendChild(prevBtnImg);
      } else {
        addClass(prevBtn, _const_class_prefix + '-no-img');
      }
      addEvent(prevBtn, 'click', function (e) {
        stopPropagation(e); // prevent closing of lightbox
        CTX.prev();
      }, false);

      CTX.box.appendChild(prevBtn);
      prevBtn.appendChild(document.createElement('div'));
    }
    addClass(prevBtn, _const_class_prefix + '-active');
  }

  /**
   * Moves controls to correct position
   */
  function repositionControls() {
    if (CTX.opt.responsive && nextBtn && prevBtn) {
      var btnTop = getHeight() / 2 - nextBtn.offsetHeight / 2;
      nextBtn.style.top = btnTop + 'px';
      prevBtn.style.top = btnTop + 'px';
    }
  }

  /**
   * Sets options and defaults
   * @param {Object} opt
   */
  function setOpt(opt) {
    // set options
    if (!opt) {
      opt = {};
    }

    /**
     * Sets the passed value per default to true if not given
     * @param {Object || String || Number || Boolean || ...} val
     * @returns {Boolean}
     */
    function setTrueDef(val) {
      return typeof val === 'boolean' ? val : true;
    }

    CTX.opt = {
      // options
      boxId: opt.boxId || false,
      controls: setTrueDef(opt.controls),
      dimensions: setTrueDef(opt.dimensions),
      captions: setTrueDef(opt.captions),
      prevImg: typeof opt.prevImg === 'string' ? opt.prevImg : false,
      nextImg: typeof opt.nextImg === 'string' ? opt.nextImg : false,
      hideCloseBtn: opt.hideCloseBtn || false,
      closeOnClick: typeof opt.closeOnClick === 'boolean' ? opt.closeOnClick : true,
      nextOnClick: setTrueDef(opt.nextOnClick),
      loadingAnimation: opt.loadingAnimation === undefined ? true : opt.loadingAnimation,
      animElCount: opt.animElCount || 4,
      preload: setTrueDef(opt.preload),
      carousel: setTrueDef(opt.carousel),
      animation: typeof opt.animation === 'number' || opt.animation === false ? opt.animation : 400,
      responsive: setTrueDef(opt.responsive),
      maxImgSize: opt.maxImgSize || 0.8,
      keyControls: setTrueDef(opt.keyControls),
      hideOverflow: opt.hideOverflow || true,
      // callbacks
      onopen: opt.onopen || false,
      onclose: opt.onclose || false,
      onload: opt.onload || false,
      onresize: opt.onresize || false,
      onloaderror: opt.onloaderror || false,
      onimageclick: typeof opt.onimageclick === 'function' ? opt.onimageclick : false
    };

    // load box in custom element
    if (CTX.opt.boxId) {
      CTX.box = document.getElementById(CTX.opt.boxId);
      // set class if missing
      var classes = CTX.box.getAttribute('class');
      if (classes.search(_const_class_prefix + ' ') < 0) {
        CTX.box.setAttribute('class', classes + ' ' + _const_class_prefix);
      }
    }
    // create box element if no ID is given and element is not there
    else if (!CTX.box) {
        // check if there already exists a jslghtbx-div
        var newEl = document.getElementById(_const_id_prefix);
        if (!newEl) {
          newEl = document.createElement('div');
        }
        newEl.setAttribute('id', _const_id_prefix);
        newEl.setAttribute('class', _const_class_prefix);
        CTX.box = newEl;
        body.appendChild(CTX.box);
      }
    CTX.box.innerHTML = template;
    if (isIE8) {
      addClass(CTX.box, _const_class_prefix + '-ie8');
    }
    CTX.wrapper = document.getElementById(_const_id_prefix + '-contentwrapper');

    // init regular closebutton
    if (!CTX.opt.hideCloseBtn) {
      var closeBtn = document.createElement('span');
      closeBtn.setAttribute('id', _const_id_prefix + '-close');
      closeBtn.setAttribute('class', _const_class_prefix + '-close');
      closeBtn.innerHTML = 'X';
      CTX.box.appendChild(closeBtn);
      addEvent(closeBtn, 'click', function (e) {
        stopPropagation(e);
        CTX.close();
      }, false);
    }

    // close lightbox on background-click by default / if true
    if (!isIE8 && CTX.opt.closeOnClick) {
      addEvent(CTX.box, 'click', function (e) {
        stopPropagation(e);
        CTX.close();
      }, false);
    }

    // set loading animation
    if (typeof CTX.opt.loadingAnimation === 'string') {
      // set loading GIF
      animationEl = document.createElement('img');
      animationEl.setAttribute('src', CTX.opt.loadingAnimation);
      addClass(animationEl, _const_class_prefix + '-loading-animation');
      CTX.box.appendChild(animationEl);
    } else if (CTX.opt.loadingAnimation) {
      // set default animation time
      CTX.opt.loadingAnimation = typeof CTX.opt.loadingAnimation === 'number' ? CTX.opt.loadingAnimation : 200;
      // create animation elements
      animationEl = document.createElement('div');
      addClass(animationEl, _const_class_prefix + '-loading-animation');
      var i = 0;
      while (i < CTX.opt.animElCount) {
        animationChildren.push(animationEl.appendChild(document.createElement('span')));
        i++;
      }
      CTX.box.appendChild(animationEl);
    }

    // add resize-eventhandlers
    if (CTX.opt.responsive) {
      addEvent(window, 'resize', function () {
        CTX.resize();
      }, false);
      addClass(CTX.box, _const_class_prefix + '-nooverflow'); // hide scrollbars on prev/next
    } else {
      removeClass(CTX.box, _const_class_prefix + '-nooverflow');
    }

    // add keyboard event handlers
    if (CTX.opt.keyControls) {
      addEvent(document, 'keydown', function (e) {
        if (isOpen) {
          stopPropagation(e); // prevent closing of lightbox
          if (e.keyCode === 39) {
            // show next img on right cursor
            CTX.next();
          } else if (e.keyCode === 37) {
            // show prev img on left cursor
            CTX.prev();
          } else if (e.keyCode === 27) {
            // close lightbox on ESC
            CTX.close();
          }
        }
      }, false);
    }
  }

  /**
   * Opens the lightbox. Either @param el and @param group must be given,
   * but not both together!
   * @param  {Object || String}   el      an image element or a link to an image
   * @param  {String}   group       the name of an image group
   * @param  {Function} cb          A private callback
   * @param  {Object} event
   */
  function openBox(el, group, cb, event) {
    if (!el && !group) {
      return false;
    }
    // save images from group
    currGroup = group || currGroup || getAttr(el, _const_dataattr + '-group');
    if (currGroup) {
      currImages = getByGroup(currGroup);
      if (typeof el === 'boolean' && !el) {
        // el is set to false, load first image of group
        el = currImages[0];
      }
    }

    // create new img-element
    currImage.img = new Image();

    // set el as current thumbnail
    currThumbnail = el;

    // get correct image-source
    var src;
    if (typeof el === 'string') {
      // string with img-src given
      src = el;
    } else if (getAttr(el, _const_dataattr)) {
      // image-source given
      src = getAttr(el, _const_dataattr);
    } else {
      // no image-source given
      src = getAttr(el, 'src');
    }
    // clear old image ratio for proper resize-values
    imgRatio = false;

    // add init-class on opening, but not at prev/next
    if (!isOpen) {
      if (typeof CTX.opt.animation === 'number') {
        addClass(currImage.img, _const_class_prefix + '-animate-transition ' + _const_class_prefix + '-animate-init');
      }
      isOpen = true;

      // execute open callback
      if (CTX.opt.onopen) {
        CTX.opt.onopen(currImage);
      }
    }

    // hide overflow by default / if set
    if (!CTX.opt || !isset(CTX.opt.hideOverflow) || CTX.opt.hideOverflow) {
      body.setAttribute('style', 'overflow: hidden');
    }

    CTX.box.setAttribute('style', 'padding-top: 0');
    CTX.wrapper.innerHTML = '';
    CTX.wrapper.appendChild(currImage.img);
    // set animation class
    if (CTX.opt.animation) {
      addClass(CTX.wrapper, _const_class_prefix + '-animate');
    }
    // set caption
    var captionText = getAttr(el, _const_dataattr + '-caption');
    if (captionText && CTX.opt.captions) {
      var caption = document.createElement('p');
      caption.setAttribute('class', _const_class_prefix + '-caption');
      caption.innerHTML = captionText;
      CTX.wrapper.appendChild(caption);
    }

    addClass(CTX.box, _const_class_prefix + '-active');

    // show wrapper early to avoid bug where dimensions are not
    // correct in IE8
    if (isIE8) {
      addClass(CTX.wrapper, _const_class_prefix + '-active');
    }

    if (CTX.opt.controls && currImages.length > 1) {
      initControls();
      // repositionControls();
    }

    /**
     * Onerror-handler for the image
     */
    currImage.img.onerror = function (imageErrorEvent) {
      if (CTX.opt.onloaderror) {
        // if `event` is false, error happened on opening the box
        imageErrorEvent._happenedWhile = event ? event : false;
        CTX.opt.onloaderror(imageErrorEvent);
      }
    };
    /**
     * Onload-handler for the image
     */
    currImage.img.onload = function () {
      // store original width here
      currImage.originalWidth = this.naturalWidth || this.width;
      currImage.originalHeight = this.naturalHeight || this.height;
      // use dummyimage for correct dimension calculating in older IE
      if (isIE8 || isIE9) {
        var dummyImg = new Image();
        dummyImg.setAttribute('src', src);
        currImage.originalWidth = dummyImg.width;
        currImage.originalHeight = dummyImg.height;
      }
      // interval to check if image is ready to show
      var checkClassInt = setInterval(function () {
        if (hasClass(CTX.box, _const_class_prefix + '-active')) {
          addClass(CTX.wrapper, _const_class_prefix + '-wrapper-active');
          // set animation
          if (typeof CTX.opt.animation === 'number') {
            addClass(currImage.img, _const_class_prefix + '-animate-transition');
          }
          if (cb) {
            cb();
          }
          // stop Animation
          stopAnimation();
          // clear animation timeout
          clearTimeout(animationTimeout);
          // preload previous and next image
          if (CTX.opt.preload) {
            preload();
          }
          // set clickhandler on image to show next image
          if (CTX.opt.nextOnClick) {
            // add cursor pointer
            addClass(currImage.img, _const_class_prefix + '-next-on-click');
            addEvent(currImage.img, 'click', function (e) {
              stopPropagation(e);
              CTX.next();
            }, false);
          }
          // set custom clickhandler on image
          if (CTX.opt.onimageclick) {
            addEvent(currImage.img, 'click', function (e) {
              stopPropagation(e);
              CTX.opt.onimageclick(currImage);
            }, false);
          }
          // execute onload callback
          if (CTX.opt.onload) {
            CTX.opt.onload(event);
          }
          // stop current interval
          clearInterval(checkClassInt);
          // resize the image
          CTX.resize();
        }
      }, 10);
    };

    // set src
    currImage.img.setAttribute('src', src);

    // start loading animation
    startAnimation();
  }

  /*
   *   Public methods
   */

  /**
   * Init-function, must be called once
   * @param  {Object} opt Custom options
   */
  CTX.load = function (opt) {
    // check for IE8
    if (navigator.appVersion.indexOf('MSIE 8') > 0) {
      isIE8 = true;
    }

    // check for IE9
    if (navigator.appVersion.indexOf('MSIE 9') > 0) {
      isIE9 = true;
    }

    // set options
    setOpt(opt);

    // Find all elements with `data-jslghtbx` attribute & add clickhandlers
    var arr = document.querySelectorAll('[' + _const_dataattr + ']');
    for (var i = 0; i < arr.length; i++) {
      if (hasAttr(arr[i], _const_dataattr)) {
        // set index to get proper position in getPos()
        arr[i].setAttribute(_const_dataattr + '-index', i);
        CTX.thumbnails.push(arr[i]);
        clckHlpr(arr[i]);
      }
    }
  };

  /**
   * Public caller for openBox()
   * @param  {Object || string} el  Image element or a link
   * @param  {String} group
   */
  CTX.open = function (el, group) {
    // if image and group are given, set group to false
    // to prevent errors
    if (el && group) {
      group = false;
    }
    openBox(el, group, false, false);
  };

  /**
   * Calculates the new image size and resizes it
   */
  CTX.resize = function () {
    if (!currImage.img) {
      return;
    }
    maxWidth = getWidth();
    maxHeight = getHeight();
    var boxWidth = CTX.box.offsetWidth;
    var boxHeight = CTX.box.offsetHeight;
    if (!imgRatio && currImage.img && currImage.img.offsetWidth && currImage.img.offsetHeight) {
      imgRatio = currImage.img.offsetWidth / currImage.img.offsetHeight;
    }

    // Height of image is too big to fit in viewport
    if (Math.floor(boxWidth / imgRatio) > boxHeight) {
      newImgWidth = boxHeight * imgRatio;
      newImgHeight = boxHeight;
    }
    // Width of image is too big to fit in viewport
    else {
        newImgWidth = boxWidth;
        newImgHeight = boxWidth / imgRatio;
      }
    // decrease size with modifier
    newImgWidth = Math.floor(newImgWidth * CTX.opt.maxImgSize);
    newImgHeight = Math.floor(newImgHeight * CTX.opt.maxImgSize);

    // check if image exceeds maximum size
    if (CTX.opt.dimensions && newImgHeight > currImage.originalHeight || CTX.opt.dimensions && newImgWidth > currImage.originalWidth) {
      newImgHeight = currImage.originalHeight;
      newImgWidth = currImage.originalWidth;
    }
    currImage.img.setAttribute('width', newImgWidth);
    currImage.img.setAttribute('height', newImgHeight);
    currImage.img.setAttribute('style', 'margin-top:' + (getHeight() - newImgHeight) / 2 + 'px');

    // reposition controls after timeout
    setTimeout(repositionControls, 200);

    // execute resize callback
    if (CTX.opt.onresize) {
      CTX.opt.onresize(currImage);
    }
  };

  /**
   * Loads the next image
   */
  CTX.next = function () {
    if (!currGroup) {
      return;
    }
    // get position of next image
    var pos = getPos(currThumbnail, currGroup) + 1;
    if (currImages[pos]) {
      currThumbnail = currImages[pos];
    } else if (CTX.opt.carousel) {
      currThumbnail = currImages[0];
    } else {
      return;
    }
    if (typeof CTX.opt.animation === 'number') {
      removeClass(currImage.img, _const_class_prefix + '-animating-next');
      setTimeout(function () {
        var cb = function cb() {
          setTimeout(function () {
            addClass(currImage.img, _const_class_prefix + '-animating-next');
          }, CTX.opt.animation / 2);
        };
        openBox(currThumbnail, false, cb, 'next');
      }, CTX.opt.animation / 2);
    } else {
      openBox(currThumbnail, false, false, 'next');
    }
  };

  /**
   * Loads the prev image
   */
  CTX.prev = function () {
    if (!currGroup) {
      return;
    }
    // get position of prev image
    var pos = getPos(currThumbnail, currGroup) - 1;
    if (currImages[pos]) {
      currThumbnail = currImages[pos];
    } else if (CTX.opt.carousel) {
      currThumbnail = currImages[currImages.length - 1];
    } else {
      return;
    }
    // animation stuff
    if (typeof CTX.opt.animation === 'number') {
      removeClass(currImage.img, _const_class_prefix + '-animating-prev');
      setTimeout(function () {
        var cb = function cb() {
          setTimeout(function () {
            addClass(currImage.img, _const_class_prefix + '-animating-next');
          }, CTX.opt.animation / 2);
        };
        openBox(currThumbnail, false, cb, 'prev');
      }, CTX.opt.animation / 2);
    } else {
      openBox(currThumbnail, false, false, 'prev');
    }
  };

  /**
   * Closes the box
   */
  CTX.close = function () {
    // restore Defaults
    currGroup = false;
    currThumbnail = false;
    var _currImage = currImage;
    currImage = {};
    currImages = [];
    isOpen = false;
    removeClass(CTX.box, _const_class_prefix + '-active');
    removeClass(CTX.wrapper, _const_class_prefix + '-wrapper-active');
    removeClass(nextBtn, _const_class_prefix + '-active');
    removeClass(prevBtn, _const_class_prefix + '-active');
    CTX.box.setAttribute('style', 'padding-top: 0px');

    // stop animtation
    stopAnimation();

    // Hide Lightbox if iE8
    if (isIE8) {
      CTX.box.setAttribute('style', 'display: none');
    }

    // show overflow by default / if set
    if (!CTX.opt || !isset(CTX.opt.hideOverflow) || CTX.opt.hideOverflow) {
      body.setAttribute('style', 'overflow: auto');
    }

    // execute close callback
    if (CTX.opt.onclose) {
      CTX.opt.onclose(_currImage);
    }
  };
}

var lightbox = new Lightbox();
/* harmony default export */ __webpack_exports__["a"] = (lightbox);

/***/ }),

/***/ "./resources/assets/js/frontend/popup-comment.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

function PopupComment() {

    var CM = this;

    CM.createPopup = function () {
        var htmlPopup = "<div id='lightbox-modal' class='lightbox-modal'>" + "<div class='lightbox-dialog'>" + "<div class='lightbox-content'>" + "<div class='lc-gallery-image'>" + "<div class='lc-list-image'>" + '' + "</div>" + "<div class='lc-arrow'>" + "<div class='lc-arrow-left'>" + "" + "</div>" + "<div class='lc-arrow-right'>" + "" + "</div>" + "</div>" + "</div>" + "<div class='lc-info'>" + "<div class='lc-top'>" + "<div>" + "<div class='lc-avatar'>" + "<img class='alireview-avatar' src='' />" + "</div>" + "<div class='lc-right'>" + "<div class='lc-username'>" + "" + "</div>" + "<div class='lc-national-info'>" + "" + "</div>" + "<div class='lc-stars alireview-status'>" + "" + "</div>" + "</div>" + "</div>" + "</div>" + "<div class='lc-desc'>" + "" + "</div>" + "<div class='lc-like-wrap'>" + "" + "</div>" + "</div>" + "<div class='lc-close'>" + "<span id='lightbox-close-modal' class='lightbox-close-modal'></span>" + "</div>" + "</div>" + "</div>";
        "</div>";
        $("body").append(htmlPopup);
    };

    function htmlInfo(event) {
        var targetClosest = $(event.target).closest('.alireview-row');
        var author = targetClosest.find('.alireview-author').html();
        var srcAvatar = targetClosest.find('.alireview-avatar').attr('src');
        var nationalInfo = targetClosest.find('.alireview-national-info').html();
        var status = targetClosest.find('.alireview-status .wrapper-rating').html();
        var desc = targetClosest.find('.alireview-post').html();
        var likeWrap = targetClosest.find('.alireview-like-wrap').html();
        if (srcAvatar) {
            $('.lightbox-modal .lc-avatar img').attr('src', srcAvatar);
        } else {
            $('.lightbox-modal .lc-avatar').css({ 'margin-right': '0', 'width': '0', 'min-width': '0' });
        }

        $('.lightbox-modal .lc-username').html(author);
        $('.lightbox-modal .lc-national-info').html(nationalInfo);
        $('.lightbox-modal .lc-stars').html(status);
        $('.lightbox-modal .lc-desc').html(desc);
        $('.lightbox-modal .lc-like-wrap').html(likeWrap);
    }

    function clickArrow(event) {
        var count = $(event.target).attr('data-lightbox-key') ? parseInt($(event.target).attr('data-lightbox-key')) + 1 : 1;
        var length = $('.lc-list-image img').length;
        if (length <= 1) {
            $('.lc-arrow').css('display', 'none');
        } else {
            $('.lc-arrow').css('display', 'block');
        }

        $('.lc-arrow-left').on('click', function () {
            if (count <= 1) {
                count = length;
            } else {
                count -= 1;
            }
            $('.lc-list-image img').removeClass('visible-img');
            $('.lc-list-image img:nth-child(' + count + ')').addClass('visible-img');
        });
        $('.lc-arrow-right').on('click', function () {
            if (count >= length) {
                count = 1;
            } else {
                count += 1;
            }
            $('.lc-list-image img').removeClass('visible-img');
            $('.lc-list-image img:nth-child(' + count + ')').addClass('visible-img');
        });
    }

    CM.addGalleryImage = function (event) {
        var key = $(event.target).attr('data-lightbox-key') ? parseInt($(event.target).attr('data-lightbox-key')) + 1 : 1;
        var targetParent = $(event.target).parent();
        var listImage = targetParent.html();
        $('.lc-list-image').html(listImage);
        $('.lc-list-image').find('.lightbox-thmb').removeAttr("style");

        var countListImage = $('.lc-list-image').find('.lightbox-thmb');
        if (countListImage.length > 0) {
            countListImage.each(function () {
                var src = '';
                var data_src = $(this).attr('data-src');
                if (data_src !== undefined) {
                    src = data_src;
                    $(this).removeAttr("data-src");
                } else {
                    src = $(this).attr('src');
                }
                var customSrc = src.replace('/_thumb', '');
                $(this).attr('src', customSrc);
            });
        }
        $('.lc-list-image img:nth-child(' + key + ')').addClass('visible-img');
        clickArrow(event);
        htmlInfo(event);
        close();
    };

    function close() {
        $("#lightbox-close-modal").click(function () {
            turnOffEvent();
        });
    }

    CM.hiddenPopup = function () {
        $(document).click(function (event) {
            //if you click on anything except the modal itself or the "open modal" link, close the modal
            if (!$(event.target).closest(".lightbox-content,img.lightbox-thmb").length) {
                turnOffEvent();
            }
        });
    };

    function turnOffEvent() {
        $("body").find(".lightbox-modal").removeClass("visible-modal");
        $('body').removeClass('modal-open');
        $('.lc-arrow-left').off('click');
        $('.lc-arrow-right').off('click');
    }
}

var popupComment = new PopupComment();
/* harmony default export */ __webpack_exports__["a"] = (popupComment);

/***/ }),

/***/ "./resources/assets/js/frontend/statistics_visitor.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export configCookieVisitor */
/* harmony export (immutable) */ __webpack_exports__["a"] = checkCartToken;
/* harmony export (immutable) */ __webpack_exports__["d"] = setCookie;
/* harmony export (immutable) */ __webpack_exports__["e"] = visitor_tracking;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCookies; });
/* unused harmony export countInteractiveReviews */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isReviewBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/frontend/config.js");


// export
function getCookies() {
    var elShopifyAliReview = $("#shopify-ali-review"); //$('input[name=alireview_shop_id]').val();
    var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair[1]);
    }
    var data = sessionStorage.getItem('visitor_id');

    if ((data === null || typeof data === 'undefined') && typeof shopId !== 'undefined') {
        var visitor_id = shopId + Date.now().toString() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        cookies.visitor_id = visitor_id;
        sessionStorage.setItem('visitor_id', visitor_id);
    } else {
        cookies.visitor_id = sessionStorage.getItem('visitor_id');
    }

    return cookies;
}

function configCookieVisitor() {
    var time_limit_track_value = Date.now();
    var time_limit_track = 5 * 1000;
    setCookie('time_limit_track', time_limit_track_value, time_limit_track);
    setCookie('visitor_id', sessionStorage.getItem('visitor_id'));
}

configCookieVisitor();

function checkCartToken() {
    var shopUrl = window.Shopify.shop;
    var urlCurrent = window.location.href;
    var res = urlCurrent.match(/\/cart/g);
    var myCookies = getCookies();
    var sessionStorageIsReviews = sessionStorage.getItem('is_reviews');
    if (myCookies.cart && res !== null) {

        $.ajax({
            type: "GET",
            url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/visitor-tracking",
            data: {
                'shop_id': sessionStorage.getItem('shop_id'),
                'visitor_id': myCookies.visitor_id,
                'cart_token': myCookies.cart,
                'is_reviews': sessionStorageIsReviews == null ? false : true,
                'type': 'cart'
            },
            dataType: "json",
            success: function success(result) {
                setCookie('shop_id', result.shop_id);
                sessionStorage.setItem('is_cart_token', myCookies.cart);
            }, // success
            error: function error() {} // error
        });
    }
}

var isCartToken = sessionStorage.getItem('is_cart_token');
var conditionIsCartToken = isCartToken == null || isCartToken != getCookies().cart ? true : false;
if (conditionIsCartToken) {
    checkCartToken();
}

/**
 *
 * @param {*} cname
 * @param {*} cvalue
 */

function setCookie(cname, cvalue) {
    var time_limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var date = new Date();
    if (time_limit !== null) {
        date.setTime(date.getTime() + time_limit);

        var expires = "expires=" + date.toGMTString();

        window.document.cookie = cname + "=" + cvalue + "; " + expires;
    } else {
        window.document.cookie = cname + "=" + cvalue;
    }
}

function visitor_tracking() {
    var elShopifyAliReview = $("#shopify-ali-review");
    var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
    var myCookies = getCookies();
    return new Promise(function (resolve) {
        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/visitor-tracking",
                data: {
                    'shop_id': shopId,
                    'visitor_id': myCookies.visitor_id,
                    'type': 'visitor',
                    'is_reviews': false,
                    'cart_token': typeof myCookies.cart === 'undefined' ? '' : myCookies.cart
                },
                dataType: "json",
                success: function success(result) {
                    if (result.status) {
                        sessionStorage.setItem('is_visitor', myCookies.visitor_id);
                        sessionStorage.setItem('shop_id', shopId);
                    }
                },
                error: function error() {} // error
            });

            resolve("true");
        }, 5000);
    });
}

function isReviewBox() {

    var elShopifyAliReview = $("#shopify-ali-review");
    var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
    var productId = elShopifyAliReview.attr("product-id");
    var myCookies = getCookies();
    var isViewBox = myCookies.is_reviews;
    $(function () {
        $('div#shopify-ali-review').on("mousewheel", function () {
            if (typeof isViewBox === 'undefined') {
                isViewBox = sessionStorage.getItem('visitor_id');
                $.ajax({
                    type: "GET",
                    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/visitor-tracking",
                    data: {
                        'shop_id': shopId,
                        'visitor_id': myCookies.visitor_id,
                        'type': 'visitor',
                        'is_reviews': true,
                        'cart_token': typeof myCookies.cart === 'undefined' ? '' : myCookies.cart
                    },
                    dataType: "json",
                    success: function success(result) {
                        if (result.status) {
                            sessionStorage.setItem('shop_id', shopId);
                            sessionStorage.setItem('is_reviews', sessionStorage.getItem('visitor_id'));
                        }
                        console.log("Scroll Page");
                    }, // success
                    error: function error() {
                        isViewBox = false;
                    } // error
                });
            }
        });
    });
}

function countInteractiveReviews(shopId, isTracking) {

    var myCookies = getCookies();
    var elShopifyAliReview = $("#shopify-ali-review");
    var productId = elShopifyAliReview.attr("product-id");

    $.ajax({
        type: "GET",
        url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/visitor-tracking",
        data: {
            'shop_id': shopId,
            'product_id': productId,
            'visitor_id': myCookies.visitor_id,
            'time_limit_track': isTracking === true || isTracking === 'true' ? Date.now() : null,
            'type_visitor': 'interactive'
        },
        dataType: "json",
        success: function success(result) {
            console.log("View Image");
        }, // success
        error: function error() {} // error
    });
}



/***/ }),

/***/ "./resources/assets/js/frontend/uploadfile.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fileUploader;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./resources/assets/js/frontend/config.js");


// export default function uploadFileFrontEnd() {
//   window.URL = window.URL || window.webkitURL;

//   if(window.URL) {
//     uploadFileFrontEndPreview();
//   } else {
//     uploadFileFrontEndDefault();
//   }
// }

// function uploadFileFrontEndDefault() {
//   $("#alireview_file_upload").on("change", function(e) {
//     e.stopPropagation();
//     var obj = $(this);
//     var files_item = 0;
//     var files = e.target.files;
//     var files_length = files.length;
//     var alireview_shop_id = $('input[name="alireview_shop_id"]').val();

//     var ctn_image = $(".alireview_list_image");
//     var total_img = parseInt( $("li", ctn_image).length + files_length )

//     if (total_img > 5) {
//       return alert("You can only upload up to 5 photos.");
//     }

//     if (
//       !window.File ||
//       !window.FileReader ||
//       !window.FileList ||
//       !window.Blob
//     ) 
//     {
//       return alert("The File APIs are not fully supported in this browser.");
//     }

//     var files = e.target.files;
//     if (!files) {
//       return console.error("This browser doesn't seem to support the `files` property of file inputs.");
//     }

//     if (!files[0].name.match(/\.(jpg|jpeg|png|gif)$/i)) {
//       return alert("Sorry, this file format is not supported. Only jpg, png and gif are accepted.");
//     }

//     if (files[0].size && files[0].size > 1024 * 1024 * 10) {
//       return alert("The image must be under 10MB.");
//     }

//     $.each(files, function(key, value) {
//       var data = new FormData();
//       data.append(key, value);
//       console.log(data);

//       $.ajax({
//         url: config.shop_url + "/comment/upload_img?alireview_shop_id=" + alireview_shop_id,
//         type: "POST",
//         data: data,
//         cache: false,
//         dataType: "json",
//         processData: false, // Don't process the files
//         contentType: false, // Set content type to false as $ will tell the server its a query string request
//         beforeSend: function() {
//           obj.attr("disabled", true);
//           $(".alireview_loading_upload").fadeIn();
//         },
//         success: function(data, statusText, xhr) {
//           ++files_item;
//           obj.attr("disabled", false);
//           obj.val();

//           if(files_item >= files_length) {
//             $('.alireview_loading_upload').fadeOut();
//           }

//           if (data.status == "success") {
//             var html_image =
//               "<li>" +
//               '<a href="javascript:void(0)" class="alireview_btn_delete_image" data-image_name="' +
//               data.image_name +
//               '" title="Remove this image">x</a>' +
//               '<img src="' +
//               data.image_thumb_url +
//               '" alt="" style="max-width: 100%">' +
//               '<input type="hidden" name="alireview_img[]" value="' +
//               data.image_url +
//               '">' +
//               "</li>";

//             ctn_image.append(html_image);
//           } else {
//             alert(data.message);
//           }
//         },
//         error: function() {
//           obj.val();
//           obj.attr("disabled", false);
//           $(".alireview_loading_upload").fadeOut();
//           alert("An error, please check  and try again.");
//         }
//       });
//     });

//     obj.val("");
//   });

//   var processing_delete_img = 0;
//   $("body").delegate(".alireview_btn_delete_image", "click", function(e) {
//     var obj = $(this);
//     var alireview_shop_id = $('input[name="alireview_shop_id"]').val();
//     var image_name = obj.attr("data-image_name");
//     var self = $(this);
//     if (processing_delete_img == 0) {
//       $.ajax({
//         url: config.shop_url + "/comment/delete_img",
//         type: "POST",
//         dataType: "json",
//         data: {
//           alireview_shop_id: alireview_shop_id,
//           image_name: image_name
//         },
//         beforeSend: function() {
//           processing_delete_img = 1;
//           $(self).closest('li').css({
//             'opacity': 0.5,
//             'pointer-events': 'none'
//           });
//         },
//         success: function(data, statusText, xhr) {
//           processing_delete_img = 0;
//           if (data.status == "success") {
//             $(".alireview-file-name").html("");
//             obj.closest("li").remove();
//           } else {
//             alert(data.message);
//           }
//         },
//         error: function() {
//           processing_delete_img = 0;
//           alert("An error, please check  and try again.");
//         }
//       });
//     }
//   });
// }

function fileUploader(listImageWrap, inputFile, filesToUpload) {
  this.listImageWrap = listImageWrap; // Element dùng để appent photo vừa upload
  this.inputFile = inputFile; // Input:file
  this.fileIdCounter = 0;
  this.filesToUpload = filesToUpload; // Chứa từng new FormData
  this.sectionIdentifier = 'files1'; // Đặt tên cho hình vừa hiển thị client
  this.output = []; // Nhiều <li> chứa img + button remove
}

fileUploader.prototype.Init = function () {
  this.PreviewThumbnail();
  this.RemoveItem();
};

fileUploader.prototype.PreviewThumbnail = function () {
  window.URL = window.URL || window.webkitURL;

  var self = this;
  var listImageWrap = this.listImageWrap;
  var inputFile = this.inputFile;

  $(inputFile).on('change', function (e) {
    var files = e.target.files;
    var total_img = parseInt($("li", listImageWrap).length + files.length);

    if (total_img > 5) {
      alert("You can only upload up to 5 photos.");
      return false;
    }

    if (!files) {
      console.error("This browser doesn't seem to support the `files` property of file inputs.");
      return false;
    }

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
      alert("The File APIs are not fully supported in this browser.");
      return false;
    }

    for (var i = 0; i < files.length; i++) {
      if (!self.Validate(e, files[i])) {
        continue;
      }

      self.fileIdCounter++;
      var file = files[i];
      var fileId = self.sectionIdentifier + self.fileIdCounter + Math.random(5);

      self.filesToUpload.push({
        id: fileId,
        file: file
      });

      var li = '<li>\n                  <span class="alireview_del_img" data-fileid="' + fileId + '"> x </span>\n                  <img src="' + window.URL.createObjectURL(file) + '" data-fileid="' + fileId + '" />\n                </li>';

      self.output.push(li);
    };
    $(listImageWrap).html(self.output.join(""));

    e.target.value = null;
  });
};

fileUploader.prototype.RemoveItem = function () {
  var self = this;
  var listImageWrap = this.listImageWrap;

  $(listImageWrap).on("click", '.alireview_del_img', function (e) {
    e.preventDefault();

    var fileId = $(this).attr('data-fileid');

    for (var i = 0; i < self.filesToUpload.length; ++i) {
      if (self.filesToUpload[i].id === fileId) {
        self.filesToUpload.splice(i, 1);
        self.output.splice(self.output.indexOf(fileId), 1);
      }
    }

    $(this).closest('li').remove();
  });
};

fileUploader.prototype.Clear = function () {
  var listImageWrap = this.listImageWrap;
  for (var i = 0; i < this.filesToUpload.length; ++i) {
    if (this.filesToUpload[i].id.indexOf(this.sectionIdentifier) >= 0) this.filesToUpload.splice(i, 1);
  }

  // Reset all variable default
  this.output = [];
  this.filesToUpload = [];
  $(listImageWrap).empty();
};

fileUploader.prototype.Validate = function (e, file) {
  // const files = e.target.files;

  if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
    alert("Sorry, this file format is not supported. Only jpg, png and gif are accepted.");
    return false;
  }

  if (file.size && file.size > 1024 * 1024 * 10) {
    alert('The image [' + file.name + '] must be under 10MB.');
    return false;
  }

  return true;
};

fileUploader.prototype.UploadOneFile = function (formData, photoID) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].shop_url + "/comment/upload_img?alireview_shop_id=" + $('input[name="alireview_shop_id"]').val(),
      type: "POST",
      data: formData,
      cache: false,
      dataType: "json",
      processData: false,
      contentType: false,
      success: function success(data) {
        if (data.status == "success") {
          var input = '<input type="hidden" name="alireview_img[]" value="' + data.image_url + '" />';
          $("#alireview_file_upload").closest('form').append(input);
          return resolve();
        }

        // Dùng để test
        // let input = `<input type="hidden" name="alireview_img[]" value="" />`;
        // $( input ).insertAfter( $('img[data-fileid="' + photoID + '"]') );
        // return resolve();
      }
    });
  });
};

fileUploader.prototype.Upload = function () {
  var _this = this;

  var listImageWrap = this.listImageWrap;

  $(listImageWrap).find('.alireview_del_img').css('display', 'none');
  return Promise.all(this.filesToUpload.map(function (item) {
    var formData = new FormData();
    formData.append("files", item.file);

    return _this.UploadOneFile(formData, item.id);
  })).then(function (result) {
    _this.Clear();
  }).catch(function (error) {
    console.log(error);
  });
};

/***/ }),

/***/ "./resources/assets/libs/imagesloaded/imagesloaded.min.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_LOCAL_MODULE_0__, __WEBPACK_LOCAL_MODULE_0__factory, __WEBPACK_LOCAL_MODULE_0__module;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function (e, t) {
   true ? !(__WEBPACK_LOCAL_MODULE_0__factory = (t), (__WEBPACK_LOCAL_MODULE_0__module = { id: "ev-emitter/ev-emitter", exports: {}, loaded: false }), __WEBPACK_LOCAL_MODULE_0__ = (typeof __WEBPACK_LOCAL_MODULE_0__factory === 'function' ? (__WEBPACK_LOCAL_MODULE_0__factory.call(__WEBPACK_LOCAL_MODULE_0__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_0__module.exports, __WEBPACK_LOCAL_MODULE_0__module)) : __WEBPACK_LOCAL_MODULE_0__factory), (__WEBPACK_LOCAL_MODULE_0__module.loaded = true), __WEBPACK_LOCAL_MODULE_0__ === undefined && (__WEBPACK_LOCAL_MODULE_0__ = __WEBPACK_LOCAL_MODULE_0__module.exports)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.EvEmitter = t();
}("undefined" != typeof window ? window : this, function () {
  function e() {}var t = e.prototype;return t.on = function (e, t) {
    if (e && t) {
      var i = this._events = this._events || {},
          n = i[e] = i[e] || [];return n.indexOf(t) == -1 && n.push(t), this;
    }
  }, t.once = function (e, t) {
    if (e && t) {
      this.on(e, t);var i = this._onceEvents = this._onceEvents || {},
          n = i[e] = i[e] || {};return n[t] = !0, this;
    }
  }, t.off = function (e, t) {
    var i = this._events && this._events[e];if (i && i.length) {
      var n = i.indexOf(t);return n != -1 && i.splice(n, 1), this;
    }
  }, t.emitEvent = function (e, t) {
    var i = this._events && this._events[e];if (i && i.length) {
      i = i.slice(0), t = t || [];for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];s && (this.off(e, r), delete n[r]), r.apply(this, t);
      }return this;
    }
  }, t.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, e;
}), function (e, t) {
  "use strict";
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_0__], __WEBPACK_AMD_DEFINE_RESULT__ = (function (i) {
    return t(e, i);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter);
}("undefined" != typeof window ? window : this, function (e, t) {
  function i(e, t) {
    for (var i in t) {
      e[i] = t[i];
    }return e;
  }function n(e) {
    if (Array.isArray(e)) return e;var t = "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "number" == typeof e.length;return t ? d.call(e) : [e];
  }function o(e, t, r) {
    if (!(this instanceof o)) return new o(e, t, r);var s = e;return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred()), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e));
  }function r(e) {
    this.img = e;
  }function s(e, t) {
    this.url = e, this.element = t, this.img = new Image();
  }var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, o.prototype.addElementImages = function (e) {
    "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);var t = e.nodeType;if (t && u[t]) {
      for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var o = i[n];this.addImage(o);
      }if ("string" == typeof this.options.background) {
        var r = e.querySelectorAll(this.options.background);for (n = 0; n < r.length; n++) {
          var s = r[n];this.addElementBackgroundImages(s);
        }
      }
    }
  };var u = { 1: !0, 9: !0, 11: !0 };return o.prototype.addElementBackgroundImages = function (e) {
    var t = getComputedStyle(e);if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
      var o = n && n[2];o && this.addBackground(o, e), n = i.exec(t.backgroundImage);
    }
  }, o.prototype.addImage = function (e) {
    var t = new r(e);this.images.push(t);
  }, o.prototype.addBackground = function (e, t) {
    var i = new s(e, t);this.images.push(i);
  }, o.prototype.check = function () {
    function e(e, i, n) {
      setTimeout(function () {
        t.progress(e, i, n);
      });
    }var t = this;return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
      t.once("progress", e), t.check();
    }) : void this.complete();
  }, o.prototype.progress = function (e, t, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t);
  }, o.prototype.complete = function () {
    var e = this.hasAnyBroken ? "fail" : "done";if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var t = this.hasAnyBroken ? "reject" : "resolve";this.jqDeferred[t](this);
    }
  }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
    var e = this.getIsImageComplete();return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src));
  }, r.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, r.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]);
  }, r.prototype.handleEvent = function (e) {
    var t = "on" + e.type;this[t] && this[t](e);
  }, r.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, r.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, r.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;var e = this.getIsImageComplete();e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, s.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, s.prototype.confirm = function (e, t) {
    this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]);
  }, o.makeJQueryPlugin = function (t) {
    t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
      var i = new o(this, e, t);return i.jqDeferred.promise(h(this));
    });
  }, o.makeJQueryPlugin(), o;
});

/***/ }),

/***/ "./resources/assets/libs/masonry/masonry.min.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_1__factory, __WEBPACK_LOCAL_MODULE_1__module;var __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_2__factory, __WEBPACK_LOCAL_MODULE_2__module;var __WEBPACK_LOCAL_MODULE_3__, __WEBPACK_LOCAL_MODULE_3__factory, __WEBPACK_LOCAL_MODULE_3__module;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_4__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_LOCAL_MODULE_5__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_LOCAL_MODULE_6__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function (t, e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = (function (i) {
    return e(t, i);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function (t, e) {
  "use strict";
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
          r = "$()." + i + '("' + e + '")';return t.each(function (t, h) {
        var u = a.data(h, i);if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);var d = u[e];if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");var l = d.apply(u, n);o = void 0 === o ? l : o;
      }), void 0 !== o ? o : t;
    }function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o));
      });
    }a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
    }), a.fn[i] = function (t) {
      if ("string" == typeof t) {
        var e = o.call(arguments, 1);return h(this, t, e);
      }return u(this, t), this;
    }, n(a));
  }function n(t) {
    !t || t && t.bridget || (t.bridget = i);
  }var o = Array.prototype.slice,
      r = t.console,
      s = "undefined" == typeof r ? function () {} : function (t) {
    r.error(t);
  };return n(e || t.jQuery), i;
}), function (t, e) {
   true ? !(__WEBPACK_LOCAL_MODULE_1__factory = (e), (__WEBPACK_LOCAL_MODULE_1__module = { id: "ev-emitter/ev-emitter", exports: {}, loaded: false }), __WEBPACK_LOCAL_MODULE_1__ = (typeof __WEBPACK_LOCAL_MODULE_1__factory === 'function' ? (__WEBPACK_LOCAL_MODULE_1__factory.call(__WEBPACK_LOCAL_MODULE_1__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_1__module.exports, __WEBPACK_LOCAL_MODULE_1__module)) : __WEBPACK_LOCAL_MODULE_1__factory), (__WEBPACK_LOCAL_MODULE_1__module.loaded = true), __WEBPACK_LOCAL_MODULE_1__ === undefined && (__WEBPACK_LOCAL_MODULE_1__ = __WEBPACK_LOCAL_MODULE_1__module.exports)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}var e = t.prototype;return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
          n = i[t] = i[t] || [];return -1 == n.indexOf(e) && n.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);var i = this._onceEvents = this._onceEvents || {},
          n = i[t] = i[t] || {};return n[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];if (i && i.length) {
      var n = i.indexOf(e);return -1 != n && i.splice(n, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];if (i && i.length) {
      i = i.slice(0), e = e || [];for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
        var r = i[o],
            s = n && n[r];s && (this.off(t, r), delete n[r]), r.apply(this, e);
      }return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
   true ? !(__WEBPACK_LOCAL_MODULE_2__factory = (e), (__WEBPACK_LOCAL_MODULE_2__module = { id: "get-size/get-size", exports: {}, loaded: false }), __WEBPACK_LOCAL_MODULE_2__ = (typeof __WEBPACK_LOCAL_MODULE_2__factory === 'function' ? (__WEBPACK_LOCAL_MODULE_2__factory.call(__WEBPACK_LOCAL_MODULE_2__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_2__module.exports, __WEBPACK_LOCAL_MODULE_2__module)) : __WEBPACK_LOCAL_MODULE_2__factory), (__WEBPACK_LOCAL_MODULE_2__module.loaded = true), __WEBPACK_LOCAL_MODULE_2__ === undefined && (__WEBPACK_LOCAL_MODULE_2__ = __WEBPACK_LOCAL_MODULE_2__module.exports)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {
  "use strict";
  function t(t) {
    var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);return i && e;
  }function e() {}function i() {
    for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; u > e; e++) {
      var i = h[e];t[i] = 0;
    }return t;
  }function n(t) {
    var e = getComputedStyle(t);return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
  }function o() {
    if (!d) {
      d = !0;var e = document.createElement("div");e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";var i = document.body || document.documentElement;i.appendChild(e);var o = n(e);s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e);
    }
  }function r(e) {
    if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.nodeType) {
      var r = n(e);if ("none" == r.display) return i();var a = {};a.width = e.offsetWidth, a.height = e.offsetHeight;for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
        var c = h[l],
            f = r[c],
            m = parseFloat(f);a[c] = isNaN(m) ? 0 : m;
      }var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width);b !== !1 && (a.width = b + (E ? 0 : p + _));var x = t(r.height);return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a;
    }
  }var s,
      a = "undefined" == typeof console ? e : function (t) {
    console.error(t);
  },
      h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      u = h.length,
      d = !1;return r;
}), function (t, e) {
  "use strict";
   true ? !(__WEBPACK_LOCAL_MODULE_3__factory = (e), (__WEBPACK_LOCAL_MODULE_3__module = { id: "desandro-matches-selector/matches-selector", exports: {}, loaded: false }), __WEBPACK_LOCAL_MODULE_3__ = (typeof __WEBPACK_LOCAL_MODULE_3__factory === 'function' ? (__WEBPACK_LOCAL_MODULE_3__factory.call(__WEBPACK_LOCAL_MODULE_3__module.exports, __webpack_require__, __WEBPACK_LOCAL_MODULE_3__module.exports, __WEBPACK_LOCAL_MODULE_3__module)) : __WEBPACK_LOCAL_MODULE_3__factory), (__WEBPACK_LOCAL_MODULE_3__module.loaded = true), __WEBPACK_LOCAL_MODULE_3__ === undefined && (__WEBPACK_LOCAL_MODULE_3__ = __WEBPACK_LOCAL_MODULE_3__module.exports)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";
  var t = function () {
    var t = window.Element.prototype;if (t.matches) return "matches";if (t.matchesSelector) return "matchesSelector";for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i],
          o = n + "MatchesSelector";if (t[o]) return o;
    }
  }();return function (e, i) {
    return e[t](i);
  };
}), function (t, e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_3__], __WEBPACK_LOCAL_MODULE_4__ = ((function (i) {
    return e(t, i);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__))) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function (t, e) {
  var i = {};i.extend = function (t, e) {
    for (var i in e) {
      t[i] = e[i];
    }return t;
  }, i.modulo = function (t, e) {
    return (t % e + e) % e;
  };var n = Array.prototype.slice;i.makeArray = function (t) {
    if (Array.isArray(t)) return t;if (null === t || void 0 === t) return [];var e = "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && "number" == typeof t.length;return e ? n.call(t) : [t];
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e);-1 != i && t.splice(i, 1);
  }, i.getParent = function (t, i) {
    for (; t.parentNode && t != document.body;) {
      if (t = t.parentNode, e(t, i)) return t;
    }
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;this[e] && this[e](t);
  }, i.filterFindElements = function (t, n) {
    t = i.makeArray(t);var o = [];return t.forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!n) return void o.push(t);e(t, n) && o.push(t);for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) {
          o.push(i[r]);
        }
      }
    }), o;
  }, i.debounceMethod = function (t, e, i) {
    i = i || 100;var n = t.prototype[e],
        o = e + "Timeout";t.prototype[e] = function () {
      var t = this[o];clearTimeout(t);var e = arguments,
          r = this;this[o] = setTimeout(function () {
        n.apply(r, e), delete r[o];
      }, i);
    };
  }, i.docReady = function (t) {
    var e = document.readyState;"complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };var o = t.console;return i.htmlInit = function (e, n) {
    i.docReady(function () {
      var r = i.toDashed(n),
          s = "data-" + r,
          a = document.querySelectorAll("[" + s + "]"),
          h = document.querySelectorAll(".js-" + r),
          u = i.makeArray(a).concat(i.makeArray(h)),
          d = s + "-options",
          l = t.jQuery;u.forEach(function (t) {
        var i,
            r = t.getAttribute(s) || t.getAttribute(d);try {
          i = r && JSON.parse(r);
        } catch (a) {
          return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + a));
        }var h = new e(t, i);l && l.data(t, n, h);
      });
    });
  }, i;
}), function (t, e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_LOCAL_MODULE_5__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize));
}(window, function (t, e) {
  "use strict";
  function i(t) {
    for (var e in t) {
      return !1;
    }return e = null, !0;
  }function n(t, e) {
    t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create());
  }function o(t) {
    return t.replace(/([A-Z])/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }var r = document.documentElement.style,
      s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
      h = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[s],
      u = { transform: a, transition: s, transitionDuration: s + "Duration", transitionProperty: s + "Property", transitionDelay: s + "Delay" },
      d = n.prototype = Object.create(t.prototype);d.constructor = n, d._create = function () {
    this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" });
  }, d.handleEvent = function (t) {
    var e = "on" + t.type;this[e] && this[e](t);
  }, d.getSize = function () {
    this.size = e(this.element);
  }, d.css = function (t) {
    var e = this.element.style;for (var i in t) {
      var n = u[i] || i;e[n] = t[i];
    }
  }, d.getPosition = function () {
    var t = getComputedStyle(this.element),
        e = this.layout._getOption("originLeft"),
        i = this.layout._getOption("originTop"),
        n = t[e ? "left" : "right"],
        o = t[i ? "top" : "bottom"],
        r = parseFloat(n),
        s = parseFloat(o),
        a = this.layout.size;-1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s;
  }, d.layoutPosition = function () {
    var t = this.layout.size,
        e = {},
        i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop"),
        o = i ? "paddingLeft" : "paddingRight",
        r = i ? "left" : "right",
        s = i ? "right" : "left",
        a = this.position.x + t[o];e[r] = this.getXValue(a), e[s] = "";var h = n ? "paddingTop" : "paddingBottom",
        u = n ? "top" : "bottom",
        d = n ? "bottom" : "top",
        l = this.position.y + t[h];e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]);
  }, d.getXValue = function (t) {
    var e = this.layout._getOption("horizontal");return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
  }, d.getYValue = function (t) {
    var e = this.layout._getOption("horizontal");return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
  }, d._transitionTo = function (t, e) {
    this.getPosition();var i = this.position.x,
        n = this.position.y,
        o = t == this.position.x && e == this.position.y;if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition();var r = t - i,
        s = e - n,
        a = {};a.transform = this.getTranslate(r, s), this.transition({ to: a, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 });
  }, d.getTranslate = function (t, e) {
    var i = this.layout._getOption("originLeft"),
        n = this.layout._getOption("originTop");return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
  }, d.goTo = function (t, e) {
    this.setPosition(t, e), this.layoutPosition();
  }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
    this.position.x = parseFloat(t), this.position.y = parseFloat(e);
  }, d._nonTransition = function (t) {
    this.css(t.to), t.isCleaning && this._removeStyles(t.to);for (var e in t.onTransitionEnd) {
      t.onTransitionEnd[e].call(this);
    }
  }, d.transition = function (t) {
    if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);var e = this._transn;for (var i in t.onTransitionEnd) {
      e.onEnd[i] = t.onTransitionEnd[i];
    }for (i in t.to) {
      e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
    }if (t.from) {
      this.css(t.from);var n = this.element.offsetHeight;n = null;
    }this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
  };var l = "opacity," + o(a);d.enableTransition = function () {
    if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(h, this, !1);
    }
  }, d.onwebkitTransitionEnd = function (t) {
    this.ontransitionend(t);
  }, d.onotransitionend = function (t) {
    this.ontransitionend(t);
  };var c = { "-webkit-transform": "transform" };d.ontransitionend = function (t) {
    if (t.target === this.element) {
      var e = this._transn,
          n = c[t.propertyName] || t.propertyName;if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
        var o = e.onEnd[n];o.call(this), delete e.onEnd[n];
      }this.emitEvent("transitionEnd", [this]);
    }
  }, d.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1;
  }, d._removeStyles = function (t) {
    var e = {};for (var i in t) {
      e[i] = "";
    }this.css(e);
  };var f = { transitionProperty: "", transitionDuration: "", transitionDelay: "" };return d.removeTransitionStyles = function () {
    this.css(f);
  }, d.stagger = function (t) {
    t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
  }, d.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]);
  }, d.remove = function () {
    return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem();
    }), void this.hide()) : void this.removeElem();
  }, d.reveal = function () {
    delete this.isHidden, this.css({ display: "" });var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("visibleStyle");e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e });
  }, d.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal");
  }, d.getHideRevealTransitionEndProperty = function (t) {
    var e = this.layout.options[t];if (e.opacity) return "opacity";for (var i in e) {
      return i;
    }
  }, d.hide = function () {
    this.isHidden = !0, this.css({ display: "" });var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("hiddenStyle");e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e });
  }, d.onHideTransitionEnd = function () {
    this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide"));
  }, d.destroy = function () {
    this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" });
  }, n;
}), function (t, e) {
  "use strict";
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_1__, __WEBPACK_LOCAL_MODULE_2__, __WEBPACK_LOCAL_MODULE_4__, __WEBPACK_LOCAL_MODULE_5__], __WEBPACK_LOCAL_MODULE_6__ = ((function (i, n, o, r) {
    return e(t, i, n, o, r);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__))) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
}(window, function (t, e, i, n, o) {
  "use strict";
  function r(t, e) {
    var i = n.getQueryElement(t);if (!i) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);var o = ++l;this.element.outlayerGUID = o, c[o] = this, this._create();var r = this._getOption("initLayout");r && this.layout();
  }function s(t) {
    function e() {
      t.apply(this, arguments);
    }return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
  }function a(t) {
    if ("number" == typeof t) return t;var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];if (!i.length) return 0;i = parseFloat(i);var o = m[n] || 1;return i * o;
  }var h = t.console,
      u = t.jQuery,
      d = function d() {},
      l = 0,
      c = {};r.namespace = "outlayer", r.Item = o, r.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } };var f = r.prototype;n.extend(f, e.prototype), f.option = function (t) {
    n.extend(this.options, t);
  }, f._getOption = function (t) {
    var e = this.constructor.compatOptions[t];return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
  }, r.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, f._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);var t = this._getOption("resize");t && this.bindResize();
  }, f.reloadItems = function () {
    this.items = this._itemize(this.element.children);
  }, f._itemize = function (t) {
    for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
      var r = e[o],
          s = new i(r, this);n.push(s);
    }return n;
  }, f._filterFindItemElements = function (t) {
    return n.filterFindElements(t, this.options.itemSelector);
  }, f.getItemElements = function () {
    return this.items.map(function (t) {
      return t.element;
    });
  }, f.layout = function () {
    this._resetLayout(), this._manageStamps();var t = this._getOption("layoutInstant"),
        e = void 0 !== t ? t : !this._isLayoutInited;this.layoutItems(this.items, e), this._isLayoutInited = !0;
  }, f._init = f.layout, f._resetLayout = function () {
    this.getSize();
  }, f.getSize = function () {
    this.size = i(this.element);
  }, f._getMeasurement = function (t, e) {
    var n,
        o = this.options[t];o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0;
  }, f.layoutItems = function (t, e) {
    t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
  }, f._getItemsForLayout = function (t) {
    return t.filter(function (t) {
      return !t.isIgnored;
    });
  }, f._layoutItems = function (t, e) {
    if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];t.forEach(function (t) {
        var n = this._getItemLayoutPosition(t);n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n);
      }, this), this._processLayoutQueue(i);
    }
  }, f._getItemLayoutPosition = function () {
    return { x: 0, y: 0 };
  }, f._processLayoutQueue = function (t) {
    this.updateStagger(), t.forEach(function (t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e);
    }, this);
  }, f.updateStagger = function () {
    var t = this.options.stagger;return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger);
  }, f._positionItem = function (t, e, i, n, o) {
    n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
  }, f._postLayout = function () {
    this.resizeContainer();
  }, f.resizeContainer = function () {
    var t = this._getOption("resizeContainer");if (t) {
      var e = this._getContainerSize();e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
    }
  }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) {
    if (void 0 !== t) {
      var i = this.size;i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
    }
  }, f._emitCompleteOnItems = function (t, e) {
    function i() {
      o.dispatchEvent(t + "Complete", null, [e]);
    }function n() {
      s++, s == r && i();
    }var o = this,
        r = e.length;if (!e || !r) return void i();var s = 0;e.forEach(function (e) {
      e.once(t, n);
    });
  }, f.dispatchEvent = function (t, e, i) {
    var n = e ? [e].concat(i) : i;if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) {
      var o = u.Event(e);o.type = t, this.$element.trigger(o, i);
    } else this.$element.trigger(t, i);
  }, f.ignore = function (t) {
    var e = this.getItem(t);e && (e.isIgnored = !0);
  }, f.unignore = function (t) {
    var e = this.getItem(t);e && delete e.isIgnored;
  }, f.stamp = function (t) {
    t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
  }, f.unstamp = function (t) {
    t = this._find(t), t && t.forEach(function (t) {
      n.removeFrom(this.stamps, t), this.unignore(t);
    }, this);
  }, f._find = function (t) {
    return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0;
  }, f._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
  }, f._getBoundingRect = function () {
    var t = this.element.getBoundingClientRect(),
        e = this.size;this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) };
  }, f._manageStamp = d, f._getElementOffset = function (t) {
    var e = t.getBoundingClientRect(),
        n = this._boundingRect,
        o = i(t),
        r = { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom };return r;
  }, f.handleEvent = n.handleEvent, f.bindResize = function () {
    t.addEventListener("resize", this), this.isResizeBound = !0;
  }, f.unbindResize = function () {
    t.removeEventListener("resize", this), this.isResizeBound = !1;
  }, f.onresize = function () {
    this.resize();
  }, n.debounceMethod(r, "onresize", 100), f.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout();
  }, f.needsResizeLayout = function () {
    var t = i(this.element),
        e = this.size && t;return e && t.innerWidth !== this.size.innerWidth;
  }, f.addItems = function (t) {
    var e = this._itemize(t);return e.length && (this.items = this.items.concat(e)), e;
  }, f.appended = function (t) {
    var e = this.addItems(t);e.length && (this.layoutItems(e, !0), this.reveal(e));
  }, f.prepended = function (t) {
    var e = this._itemize(t);if (e.length) {
      var i = this.items.slice(0);this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
    }
  }, f.reveal = function (t) {
    if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();t.forEach(function (t, i) {
        t.stagger(i * e), t.reveal();
      });
    }
  }, f.hide = function (t) {
    if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();t.forEach(function (t, i) {
        t.stagger(i * e), t.hide();
      });
    }
  }, f.revealItemElements = function (t) {
    var e = this.getItems(t);this.reveal(e);
  }, f.hideItemElements = function (t) {
    var e = this.getItems(t);this.hide(e);
  }, f.getItem = function (t) {
    for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];if (i.element == t) return i;
    }
  }, f.getItems = function (t) {
    t = n.makeArray(t);var e = [];return t.forEach(function (t) {
      var i = this.getItem(t);i && e.push(i);
    }, this), e;
  }, f.remove = function (t) {
    var e = this.getItems(t);this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
      t.remove(), n.removeFrom(this.items, t);
    }, this);
  }, f.destroy = function () {
    var t = this.element.style;t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
      t.destroy();
    }), this.unbindResize();var e = this.element.outlayerGUID;delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace);
  }, r.data = function (t) {
    t = n.getQueryElement(t);var e = t && t.outlayerGUID;return e && c[e];
  }, r.create = function (t, e) {
    var i = s(r);return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i;
  };var m = { ms: 1, s: 1e3 };return r.Item = o, r;
}), function (t, e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__WEBPACK_LOCAL_MODULE_6__, __WEBPACK_LOCAL_MODULE_2__], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
}(window, function (t, e) {
  var i = t.create("masonry");i.compatOptions.fitWidth = "isFitWidth";var n = i.prototype;return n._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];for (var t = 0; t < this.cols; t++) {
      this.colYs.push(0);
    }this.maxY = 0, this.horizontalColIndex = 0;
  }, n.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0],
          i = t && t.element;this.columnWidth = i && e(i).outerWidth || this.containerWidth;
    }var n = this.columnWidth += this.gutter,
        o = this.containerWidth + this.gutter,
        r = o / n,
        s = n - o % n,
        a = s && 1 > s ? "round" : "floor";r = Math[a](r), this.cols = Math.max(r, 1);
  }, n.getContainerWidth = function () {
    var t = this._getOption("fitWidth"),
        i = t ? this.element.parentNode : this.element,
        n = e(i);this.containerWidth = n && n.innerWidth;
  }, n._getItemLayoutPosition = function (t) {
    t.getSize();var e = t.size.outerWidth % this.columnWidth,
        i = e && 1 > e ? "round" : "ceil",
        n = Math[i](t.size.outerWidth / this.columnWidth);n = Math.min(n, this.cols);for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = { x: this.columnWidth * r.col, y: r.y }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) {
      this.colYs[u] = a;
    }return s;
  }, n._getTopColPosition = function (t) {
    var e = this._getTopColGroup(t),
        i = Math.min.apply(Math, e);return { col: e.indexOf(i), y: i };
  }, n._getTopColGroup = function (t) {
    if (2 > t) return this.colYs;for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
      e[n] = this._getColGroupY(n, t);
    }return e;
  }, n._getColGroupY = function (t, e) {
    if (2 > e) return this.colYs[t];var i = this.colYs.slice(t, t + e);return Math.max.apply(Math, i);
  }, n._getHorizontalColPosition = function (t, e) {
    var i = this.horizontalColIndex % this.cols,
        n = t > 1 && i + t > this.cols;i = n ? 0 : i;var o = e.size.outerWidth && e.size.outerHeight;return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, { col: i, y: this._getColGroupY(i, t) };
  }, n._manageStamp = function (t) {
    var i = e(t),
        n = this._getElementOffset(t),
        o = this._getOption("originLeft"),
        r = o ? n.left : n.right,
        s = r + i.outerWidth,
        a = Math.floor(r / this.columnWidth);a = Math.max(0, a);var h = Math.floor(s / this.columnWidth);h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) {
      this.colYs[l] = Math.max(d, this.colYs[l]);
    }
  }, n._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);var t = { height: this.maxY };return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
  }, n._getContainerFitWidth = function () {
    for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) {
      t++;
    }return (this.cols - t) * this.columnWidth - this.gutter;
  }, n.needsResizeLayout = function () {
    var t = this.containerWidth;return this.getContainerWidth(), t != this.containerWidth;
  }, i;
});

/***/ }),

/***/ "./resources/assets/libs/rating/bootstrap-rating.min.js":
/***/ (function(module, exports) {

(function ($, undefined) {
  'use strict';

  var OFFSET = 5;

  function Rating(element, options) {
    this.$input = $(element);
    this.$rating = $('<span class="wrapper-rating"></span>').css({
      cursor: 'default',
      whiteSpace: 'nowrap'
    }).insertBefore(this.$input);
    // Merge data and parameter options.
    // Those provided as parameter prevail over the data ones.
    this.options = function (opts) {
      // Sanitize start, stop, step, and fractions.
      // All of them start, stop, and step must be integers.
      opts.start = parseInt(opts.start, 10);
      opts.start = isNaN(opts.start) ? undefined : opts.start;
      // In case we don't have a valid stop rate try to get a reasonable
      // one based on the existence of a valid start rate.
      opts.stop = parseInt(opts.stop, 10);
      opts.stop = isNaN(opts.stop) ? opts.start + OFFSET || undefined : opts.stop;
      // 0 step is ignored.
      opts.step = parseInt(opts.step, 10) || undefined;
      // Symbol fractions and scale (number of significant digits).
      // 0 is ignored and negative numbers are turned to positive.
      opts.fractions = Math.abs(parseInt(opts.fractions, 10)) || undefined;
      opts.scale = Math.abs(parseInt(opts.scale, 10)) || undefined;

      // Extend/Override the default options with those provided either as
      // data attributes or function parameters.
      opts = $.extend({}, $.fn.rating.defaults, opts);
      // Inherit default filled if none is defined for the selected symbol.
      opts.filledSelected = opts.filledSelected || opts.filled;
      return opts;
    }($.extend({}, this.$input.data(), options));

    this._init();
  };

  Rating.prototype = {
    _init: function _init() {
      var rating = this,
          $input = this.$input,
          $rating = this.$rating;

      var ifEnabled = function ifEnabled(f) {
        return function (e) {
          // According to the W3C attribute readonly is not allowed on input
          // elements with type hidden.
          // Keep readonly prop for legacy but its use should be deprecated.
          if (!$input.prop('disabled') && !$input.prop('readonly') && $input.data('readonly') === undefined) {
            f.call(this, e);
          }
        };
      };

      // Build the rating control.
      for (var i = 1; i <= this._rateToIndex(this.options.stop); i++) {
        // Create the rating symbol container.
        var $symbol = $('<div class="rating-symbol"></div>').css({
          display: 'inline-block',
          position: 'relative'
        });
        // Add background symbol to the symbol container.
        $('<div class="rating-symbol-background ' + this.options.empty + '"></div>').appendTo($symbol);
        // Add foreground symbol to the symbol container.
        // The filled icon is wrapped with a div to allow fractional selection.
        $('<div class="rating-symbol-foreground"></div>').append('<span class="' + this.options.filled + '"></span>').css({
          display: 'inline-block',
          position: 'absolute',
          overflow: 'hidden',
          left: 0,
          // Overspecify right and left to 0 and let the container direction
          // decide which one is going to take precedence according to the
          // ltr/rtl direction.
          // (https://developer.mozilla.org/en-US/docs/Web/CSS/right)
          // When both the right CSS property and the left CSS property are
          // defined, the position of the element is overspecified. In that
          // case, the left value has precedence when the container is
          // left-to-right (that is that the right computed value is set to
          // -left), and the right value has precedence when the container is
          // right-to-left (that is that the left computed value is set to
          // -right).
          right: 0,
          width: 0
        }).appendTo($symbol);
        $rating.append($symbol);
        this.options.extendSymbol.call($symbol, this._indexToRate(i));
      }
      // Initialize the rating control with the associated input value rate.
      this._updateRate($input.val());

      // Keep rating control and its associated input in sync.
      $input.on('change', function () {
        rating._updateRate($(this).val());
      });

      var fractionalIndex = function fractionalIndex(e) {
        var $symbol = $(e.currentTarget);
        // Calculate the distance from the mouse pointer to the origin of the
        // symbol. We need to be careful with the CSS direction. If we are
        // right-to-left then the symbol starts at the right. So we have to add
        // the symbol width to the left offset to get the CSS rigth position.
        var x = Math.abs((e.pageX || e.originalEvent.touches[0].pageX) - (($symbol.css('direction') === 'rtl' && $symbol.width()) + $symbol.offset().left));

        // NOTE: When the mouse pointer is close to the left side of the symbol
        // a negative x is returned. Probably some precision error in the
        // calculation.
        // x should never be less than 0 because this would mean that we are in
        // the previous symbol.
        x = x > 0 ? x : rating.options.scale * 0.1;
        return $symbol.index() + x / $symbol.width();
      };
      // Keep the current highlighted index (fractional or not).
      var index;
      $rating.on('mousedown touchstart', '.rating-symbol', ifEnabled(function (e) {
        // Set input 'trigger' the change event.
        $input.val(rating._indexToRate(fractionalIndex(e))).change();
      })).on('mousemove touchmove', '.rating-symbol', ifEnabled(function (e) {
        var current = rating._roundToFraction(fractionalIndex(e));
        if (current !== index) {
          // Trigger pseudo rate leave event if the mouse pointer is not
          // leaving from another symbol (mouseleave).
          if (index !== undefined) $(this).trigger('rating.rateleave');
          // Update index and trigger rate enter event.
          index = current;
          $(this).trigger('rating.rateenter', [rating._indexToRate(index)]);
        }
        // Fill the symbols as fractions chunks.
        rating._fillUntil(current);
      })).on('mouseleave touchend', '.rating-symbol', ifEnabled(function () {
        // When a symbol is left, reset index and trigger rate leave event.
        index = undefined;
        $(this).trigger('rating.rateleave');
        // Restore on hover out.
        rating._fillUntil(rating._rateToIndex(parseFloat($input.val())));
      }));
    },
    // Fill rating symbols until index.
    _fillUntil: function _fillUntil(index) {
      var $rating = this.$rating;
      // Get the index of the last whole symbol.
      var i = Math.floor(index);
      // Hide completely hidden symbols background.
      $rating.find('.rating-symbol-background').css('visibility', 'visible').slice(0, i).css('visibility', 'hidden');
      var $rates = $rating.find('.rating-symbol-foreground');
      // Reset foreground
      $rates.width(0);
      // Fill all the foreground symbols up to the selected one.
      $rates.slice(0, i).width('auto').find('span').attr('class', this.options.filled);
      // Amend selected symbol.
      $rates.eq(index % 1 ? i : i - 1).find('span').attr('class', this.options.filledSelected);
      // Partially fill the fractional one.
      $rates.eq(i).width(index % 1 * 100 + '%');
    },
    // Calculate the rate of an index according the the start and step.
    _indexToRate: function _indexToRate(index) {
      return this.options.start + Math.floor(index) * this.options.step + this.options.step * this._roundToFraction(index % 1);
    },
    // Calculate the corresponding index for a rate.
    _rateToIndex: function _rateToIndex(rate) {
      return (rate - this.options.start) / this.options.step;
    },
    // Round index to the configured opts.fractions.
    _roundToFraction: function _roundToFraction(index) {
      // Get the closest top fraction.
      var fraction = Math.ceil(index % 1 * this.options.fractions) / this.options.fractions;
      // Truncate decimal trying to avoid float precission issues.
      var p = Math.pow(10, this.options.scale);
      return Math.floor(index) + Math.floor(fraction * p) / p;
    },
    // Check the rate is in the proper range [start..stop].
    _contains: function _contains(rate) {
      var start = this.options.step > 0 ? this.options.start : this.options.stop;
      var stop = this.options.step > 0 ? this.options.stop : this.options.start;
      return start <= rate && rate <= stop;
    },
    // Update empty and filled rating symbols according to a rate.
    _updateRate: function _updateRate(rate) {
      var value = parseFloat(rate);
      if (this._contains(value)) {
        this._fillUntil(this._rateToIndex(value));
        this.$input.val(value);
      } else if (rate === '') {
        this._fillUntil(0);
        this.$input.val('');
      }
    },
    rate: function rate(value) {
      if (value === undefined) {
        return this.$input.val();
      }
      this._updateRate(value);
    }
  };

  $.fn.rating = function (options) {
    var args = Array.prototype.slice.call(arguments, 1),
        result;
    this.each(function () {
      var $input = $(this);
      var rating = $input.data('rating');
      if (!rating) {
        $input.data('rating', rating = new Rating(this, options));
      }
      // Underscore are used for private methods.
      if (typeof options === 'string' && options[0] !== '_') {
        result = rating[options].apply(rating, args);
      }
    });
    return result !== undefined ? result : this;
  };

  // Plugin defaults.
  $.fn.rating.defaults = {
    filled: 'glyphicon glyphicon-star',
    filledSelected: undefined,
    empty: 'glyphicon glyphicon-star-empty',
    start: 0,
    stop: OFFSET,
    step: 1,
    fractions: 1,
    scale: 3,
    extendSymbol: function extendSymbol(rate) {}
  };

  $(function () {
    $('.alr-rating').rating();
  });
})(jQuery);

/***/ }),

/***/ "./resources/assets/sass/rating-demo-style2.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/sass/rating-demo-style5.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/scss/vendor_fe_shop.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets_45/sass/popup-reviews.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets_45/sass/rating-demo-style2.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets_45/sass/rating-demo-style5.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets_45/sass/rating-demo-style8.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/frontend/comment.js");
__webpack_require__("./resources/assets/scss/vendor_fe_shop.scss");
__webpack_require__("./resources/assets/sass/rating-demo-style2.scss");
__webpack_require__("./resources/assets/sass/rating-demo-style5.scss");
__webpack_require__("./resources/assets_45/sass/rating-demo-style8.scss");
__webpack_require__("./resources/assets_45/sass/rating-demo-style2.scss");
__webpack_require__("./resources/assets_45/sass/rating-demo-style5.scss");
module.exports = __webpack_require__("./resources/assets_45/sass/popup-reviews.scss");


/***/ })

/******/ });