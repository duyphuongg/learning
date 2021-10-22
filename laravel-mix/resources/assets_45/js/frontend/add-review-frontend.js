import config from './config';

$(document).on("click", ".btn-submit-review", function(e) {
  e.preventDefault();
  const self = $(this);

  // Validate 
  let countErrors = 0;
  const translate = JSON.parse( $('input[name="translate"]').val() );
  const template_error = `<label class="err"></label>`;
  $('[class*="alireview_error"]').remove();

  let inpAuthor = $('[name="alireview_author"]');
  if($(inpAuthor).val() === "") {
    let errAuthor = $(template_error).addClass('alireview_error_author');
    errAuthor = $(errAuthor).text(translate.error_name_required);
    $(errAuthor).insertAfter( $(inpAuthor) );
    countErrors++;
  }

  let inpContent = $('[name="alireview_content"]');
  if(($(inpContent).val() === "") && $(inpContent).data('required') == 1) {
    let errContent = $(template_error).addClass('alireview_error_content');
    errContent = $(errContent).text(translate.error_rating_required);
    $(errContent).insertAfter( $(inpContent) );
    countErrors++;
  }

  let inpEmail = $('[name="alireview_email"]');
  if(($(inpEmail).val() === "")) {
    let errEmail = $(template_error).addClass('alireview_error_email');
    errEmail = $(errEmail).text(translate.error_email_required);
    $(errEmail).insertAfter( $(inpEmail) );
    countErrors++;
  }
  if( $(inpEmail).val() !== "" && !validateEmail( $(inpEmail).val() ) ) {
    let errEmail = $(template_error).addClass('alireview_error_email');
    errEmail = $(errEmail).text(translate.error_email);
    $(errEmail).insertAfter( $(inpEmail) );
    countErrors++;
  }

  let inpPhoto = $('#alireview_file_upload');
  let list_image = $('.alireview_list_image').html().length;
  if((list_image == 0) && $(inpPhoto).data('required') == 1) {
    let errPhoto = $(template_error).addClass('alireview_error_image');
    errPhoto = $(errPhoto).text(translate.error_image_required);
    $(errPhoto).insertAfter( $('#alireview_file_upload_target') );
    countErrors++;
  } 

  if(countErrors > 0) {
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
  window.uploadPhoto.Upload().then(res => {
    $.ajax({
      method: "POST",
      url: config.shop_url + "/comment/post_review",
      data: $("#add_form_review").serialize(),
      success: function(e) {
        if (e.status == true) {
          
          // $("#add_form_review")
          //   .find(".err")
          //   .text("");
          $("#add_form_review")
            .find("input[name=alireview_author]")
            .val("");
          $("#add_form_review")
            .find("input[name=alireview_email]")
            .val("");
          $("#add_form_review")
            .find("textarea")
            .val("");

            // Remove animation loading
          $(self).find('.lds-dual-ring').remove();
          $(self).removeClass("wrap-loading");
          $(self).closest('form').find('input[type="text"], textarea').prop('readonly', false);
          $('.alireview_loading_upload').hide();

          // remove input list image
          $('input[name="alireview_img[]"]').remove();

          // hide modal review
          if ($("body").hasClass('write-review-open')) {
            $('body').removeClass('write-review-open');
            $('#writeReviewModal').removeClass('visible-modal');
          }

          if ($("body").hasClass('write-review-open')) {
            $('body').removeClass('write-review-open');
            $('#writeReviewModal').removeClass('visible-modal');
          }

          $("html,body").animate({
              scrollTop: absoluteOffset($("#shopify-ali-review").get(0)).top
          }, "slow");
          //Thank you page
          handleThankYou(e);
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

          let productUrlFmNew = location.protocol + '//' + location.host + location.pathname;
          window.history.pushState({}, document.title, productUrlFmNew);
      },
      error: function() {
        $(self).removeClass("wrap-loading");
        $(self).find('.lds-dual-ring').remove();
      }
    }); // End ajax
  });
});
var getCookies = function(){

  var pairs = document.cookie.split(";");
  var cookies = {};
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair[1]);
  }
  return cookies;
}


var alireview_run_like = 1;
$(document).on("click", ".alireview-comment-like", function(e) {
  e.preventDefault();
  var elShopifyAliReview = $("#shopify-ali-review");
  var target = $(this);
  var targetClass = $('.alireview-comment-like-id-'+ target.attr("data-comment_id"));
  var myCookies = getCookies() ; 
  if (alireview_run_like == 1) {
    $.ajax({
      method: "POST",
      url: config.shop_url + "/comment/like",
      data: {
        comment_id: target.attr("data-comment_id"),
        shop_id: target.attr("data-shop_id"),
        productId:elShopifyAliReview.attr("product-id"),
        session_visitor:myCookies._shopify_s
      },
      beforeSend: function(rs) {
        alireview_run_like = 0;
        target.attr("disabled", true);
      },
      success: function(data) {
        alireview_run_like = 1;
        target.attr("disabled", false);
        if (data.status == "success") {
          target.addClass("active");
          let numberData = data.data > 0 ? data.data : 0;
          let numberDataUnLike = (data.dataUnlike && data.dataUnlike > 0) ? data.dataUnlike : 0;
          $(".alireview-number-like-" + target.attr("data-comment_id")).text(
              numberData
          );

          if (data.type_like == "1") {
            targetClass.addClass("active");
          } else {
            targetClass.removeClass("active");
          }

          if (data.type_unlike == "-1") {
            $(
              ".alireview-number-unlike-" + target.attr("data-comment_id")
            ).text(numberDataUnLike);
            $(".alireview-number-unlike-" + target.attr("data-comment_id"))
              .closest("a")
              .removeClass("active");
          }
        } else {
          alert(data.message);
        }
      },
      error: function() {
        alireview_run_like = 1;
        target.attr("disabled", false);
        alert("An error, please try again.");
      }
    });
  }
});

var alireview_run_unlike = 1;
$(document).on("click", ".alireview-comment-unlike", function(e) {
  e.preventDefault();
  var elShopifyAliReview = $("#shopify-ali-review");
  
  var target = $(this);
  var targetClass = $('.alireview-comment-unlike-id-'+ target.attr("data-comment_id"));
  var myCookies = getCookies() ; 
  if (alireview_run_unlike == 1) {
    $.ajax({
      method: "POST",
      url: config.shop_url + "/comment/unlike",
      data: {
        comment_id: target.attr("data-comment_id"),
        shop_id: target.attr("data-shop_id"),
        productId:elShopifyAliReview.attr("product-id"), 
        session_visitor:myCookies._shopify_s
      },
      beforeSend: function(rs) {
        alireview_run_unlike = 0;
        target.attr("disabled", true);
      },
      success: function(data) {
        alireview_run_unlike = 1;
        target.attr("disabled", false);
        let numberData = data.data > 0 ? data.data : 0;
        let numberDataLike = (data.dataLike && data.dataLike > 0) ? data.dataLike : 0;
        if (data.status == "success") {
          $(".alireview-number-unlike-" + target.attr("data-comment_id")).text(
              numberData
          );

          if (data.type_unlike == "1") {
            targetClass.addClass("active");
          } else {
            targetClass.removeClass("active");
          }

          if (data.type_like == "-1") {
            $(".alireview-number-like-" + target.attr("data-comment_id")).text(
                numberDataLike
            );
            $(".alireview-number-like-" + target.attr("data-comment_id"))
              .closest("a")
              .removeClass("active");
          }
        } else {
          alert(data.message);
        }
      },
      error: function() {
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

function handleThankYou(value){
  if ($("#writeReviewModal").length > 0) { 
    //Show popup
    var thankyou = `<div id="thankYouModal" class="thank-you-modal visible-modal">
                      <div class="thank-you-dialog">
                        <div class="thank-you-content">
                          <span class="button-close">
                            <i class="far alireview-fa-times"></i>
                          </span>
                          <div class="alireview-thankyou">
                            <h4>${value.thank_title}</h4>
                            <p class="alireview-thankyou__message">${value.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>`;
    $("body").append(thankyou);
    $('body').addClass('thank-you-open');
  }else{  
    //Show normal
    var thankyou = `<div class="alireview-thankyou">
                      <h4>${value.thank_title}</h4>
                      <p class="alireview-thankyou__message">${value.message}</p>
                    </div>`;
    $(".alireview-add-form").after(thankyou);
    $(".alireview-add-form").hide();
    setTimeout(function(){
      $(".alireview-thankyou").remove();
      $(".alireview-add-form").show();
      $(".reviewFormHead").hide();
    }, 3000);
  }
}