jQuery(document).ready(function($) {
  $("body").delegate(".btn-add-discount-code", "click", function(e){
    e.preventDefault();
    var obj = $(this);

    var plan = obj.attr("data-plan");
    var modal = "#modalDiscountHandle";
    $.ajax({
      type: "get",
      url: appUrl + "/planInfo",
      dataType: "json",
      data: {
        plan: plan
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        obj.attr("disabled", false).css("opacity", 1);
        if (data.status == "success") {
          var planInfo = data.data;

          $('input[name="app_plan"]', $(modal)).val(planInfo.name);
          $(".package_name", $(modal)).text(planInfo.package_name);
          $(".current_discount", $(modal)).text(planInfo.current_discount);
          $(".total_payment", $(modal)).text(planInfo.total_payment);
          $(".price", $(modal)).text(planInfo.price);
          switch (planInfo.name) {
            case "premium":
              $("button[type='submit']").attr("id", "button-purchase-pro");
              break;
            case "unlimited":
              $("button[type='submit']").attr("id", "button-purchase-unlimited");
              break;
            default:
              break;
          }

          var originalModal = $(modal).clone();
          $(modal).on("hidden.bs.modal", function() {
            $(modal).remove();
            var myClone = originalModal.clone();
            $("body").append(myClone);
              $(".message-code-discount").text('');
          });

          $(modal).modal({
            show: "true"
          });
        } else {
          $.notify(
              {
                message: data.message
              },
              {
                z_index: 999999,
                timer: 2000,
                type: "danger"
              }
          );

          // $(modal).modal("hide");
        }
      },
      error: function() {
        obj.attr("disabled", false).css("opacity", 1);
        $.notify(
            {
              message: lang_reviews.notice_error
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
        );
        // $(modal).modal("hide");
      }
    });
    // $(modal).on("shown.bs.modal", function() {
    //
    // });
  });


  // document.querySelector('#sumbmit_voucher');
  // button_submit.disabled = true;

  $("body").delegate("#formDiscountHandle", "submit", function(e) {
  $('.modal').modal('hide');
    e.preventDefault();
    var obj = $(this);
    var discount_code = $('input[name="discount_code"]', obj).val();
    if (discount_code == "") {
      $('.message-code-discount').text('Please enter your discount code!!')
    } else {
      $.ajax({
        type: "post",
        url: appUrl + "/addDiscount",
        dataType: "json",
        data: obj.serialize(),
        beforeSend: function() {
          $("input, button, textarea,a", obj)
            .attr("disabled", true)
            .css("opacity", 0.5);
        },
        success: function(data, statusText, xhr) {
          if (data.status == "success") {
            $("input, button, textarea,a", obj)
                .attr("disabled", false)
                .css("opacity", 1);
           window.location.href = data.url;
          } else {
            $.notify(
              {
                message: data.message
              },
              {
                z_index: 999999,
                timer: 2000,
                type: "danger"
              }
            );
          }
        },
        error: function() {
          $("input, button, textarea,a", obj)
            .attr("disabled", false)
            .css("opacity", 1);
          $.notify(
            {
              message: lang_reviews.notice_error
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
          );
        }
      });
    }
  });

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  $("body").delegate(
    "#discount_code",
    "keyup",
    debounce(function(e) {
      e.preventDefault();
      var obj = $(this).closest("form");
      var discount_code = $('input[name="discount_code"]', obj).val();
      var app_plan = $('input[name="app_plan"]', obj).val();
      var  total_pay = $('#formDiscountHandle .total_payment').text();
      var  price = $('#formDiscountHandle .price_value').text();

      if(discount_code){
          $.ajax({
              type: "get",
              url: appUrl + "/checkDiscount/" + discount_code,
              dataType: "json",
              data: {
                  app_plan : app_plan
              },
              beforeSend: function() {
                  $("button, textarea,a", obj)
                      .attr("disabled", true)
                      .css("opacity", 0.5);
              },
              success: function(data, statusText, xhr) {
                  if (data.status == "success") {
                      $("button, textarea,a", obj)
                          .attr("disabled", false)
                          .css("opacity", 1);
                      $(".message-code-discount")
                          .text(data.message)
                          .removeClass("text-danger")
                          .addClass("text-success");
                      $(".current_discount").text(data.discount);
                      var round_pay =(price) - (price)*data.discount/100;
                      // console.log((price));
                      // console.log((price)*data.discount/100);
                      $(".total_payment").text(round_pay);
                      /*$.notify({
                                 message: data.message
                             },{
                                 z_index: 999999,
                                 timer: 2000,
                                 type: 'success'
                             });*/


                  } else {
                      /*$.notify({
                                  message: data.message
                              },{
                                  z_index: 999999,
                                  timer: 2000,
                                  type: 'danger'
                              });*/
                      $("button[type='submit']",obj).attr("disabled", true);
                      $(".current_discount").text(0);
                      $(".total_payment").text(price);
                      $(".message-code-discount")
                          .text(data.message)
                          .addClass("text-danger")
                          .removeClass("text-success");
                  }
              },
              error: function() {
                  $(".total_payment").text(price);
                  $(".current_discount").text(0);
                  $("button[type='submit']",obj).attr("disabled", true);
                  $(".message-code-discount")
                      .text('Please enter your discount code!!')
                      .addClass("text-danger")
                      .removeClass("text-success");
              }
          });
      }else{
          $(".total_payment").text(price);
          $(".current_discount").text(0);
          $("button[type='submit']",obj).attr("disabled", true);
          $(".message-code-discount")
              .text('Please enter your discount code!!')
              .addClass("text-danger")
              .removeClass("text-success");
      }

    }, 300)
  );

  $('.btn-add-discount-code').on('click', function() {
    $('#modalDiscountHandle').on('show.bs.modal', function() {
      if($('div').hasClass('choose-plan-blind')){
        $('.choose-plan-blind').hide();
        $('.choose-plan-page').hide();
      }
      if($('div').hasClass('reinstall-page-blind')){  
        $('.reinstall-page-blind').hide();
        $('.reinstall-page').hide();
      }
    });

    $('#modalDiscountHandle').on('hidden.bs.modal', function() {
      if($('div').hasClass('choose-plan-blind')){
        document.body.classList.add('modal-open');
        $('.choose-plan-blind').show();
        $('.choose-plan-page').show();
      }
      if($('div').hasClass('reinstall-page-blind')){ 
        document.body.classList.add('modal-open'); 
        $('.reinstall-page-blind').show();
        $('.reinstall-page').show();
      }
    });
  });
  
});
