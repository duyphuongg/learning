// import {manage_reviews_upgrade} from '../helpers/init_toastr.js';
// manage_reviews_upgrade({ count_product: 200, link_upgrade: "google.com"})

import {manage_reviews_upgrade} from "../helpers/init_toastr";

jQuery(document).ready(function($) {
  addSchemaGoogleRating();

  $(".pinReview").click(function() {
    var obj = $(this);
    var type = obj.attr("data-type");
    var comment_id = obj.attr("data-comment_id");
    var _token = obj.attr("data-token");

    // Loading
    const self = $(this);
    $(this).addClass("wrap-loading");
    $(this).prepend('<div class="lds-dual-ring"></div>');
    // Loading

    $.ajax({
      type: "post",
      url: appUrl + "/review/pin",
      dataType: "json",
      data: {
        comment_id: comment_id,
        type: type,
        _token: _token
      },
      beforeSend: function() {
      },
      success: function(data, statusText, xhr) {

        if (data.status && data.status == "success") {
          if (type == "pin") {
            obj
              .attr("data-type", "unpin")
              .addClass("active")
              .attr("title", "Unpin")
              .attr("data-original-title", "Unpin");
          } else {
            obj
              .attr("data-type", "pin")
              .removeClass("active")
              .attr("title", "Pin to top")
              .attr("data-original-title", "Pin to top");
          }

          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          // Load success
          $(self).removeClass("wrap-loading");
          $(self).find(".lds-dual-ring").remove();
          // END: Load success
        } else {
          alert(data.message);
        }
      },
      error: function() {
        obj.attr("disabled", false);
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
  });

  $(".editReview").click(function(e) {
    e.preventDefault();
    
    var modal = "#editReviewsModal";
    var comment_id = $(this).attr("data-comment_id");

    // Loading
    const self = $(this);
    $(this).addClass("wrap-loading");
    $(this).prepend('<div class="lds-dual-ring"></div>');

    $(modal).on("show.bs.modal", function() {
      $('body').addClass('trick-modal-edit-reviews');
    });

    $(modal).on("hide.bs.modal", function() {
      $('#editReviewsModal, .modal-backdrop').fadeOut('fast');
    });
    // Loading

    $(modal).on("shown.bs.modal", function() {
      $('select[name="country"]').select2();
      var obj = $(this);
      $.ajax({
        type: "get",
        url: appUrl + "/review-info",
        dataType: "json",
        data: {
          comment_id: comment_id
        },
        success: function(data, statusText, xhr) {
          

          if (data) {
            $('input[name="star"]').rating('rate', data.star)
            $('select#country option[value='+data.country+']').prop('selected',true);
            $('input[name="comment_id"]', obj).val(comment_id);
            $('input[name="author"]', obj).val(data.author);
            $('textarea[name="content"]', obj).val(data.content);
            $('input[name="star"]', obj).val(data.star);
            $('#editReviewsModal img.avatar').attr('src', appUrl + '/' + data.avatar);
            $('input[name="created_at"]', obj).val(data.created_at);
            $('select[name="country"]').val(data.country).trigger('change');

            if (data.img) {
              var html_img = "";
              if (data.img.length >= 5) {
                $(".ctn-upload-img").hide();
              }
              $.each(data.img, function(key, value) {
                var thumb = value;

                if (data.source == "web") {
                  var str = value;
                  thumb = str.replace(data.shop_id, data.shop_id + "/_thumb");
                }

                html_img += '<div class="wrapper-up-photo__item d-inline-block">' +
                  '<img src="' + thumb + '" class="img-rounded preview-result"> ' +
                  '<span class="remove-review-photo" data-image_name=""><i class="material-icons">close</i></span> ' +
                  '<input type="hidden" name="img[]" value="' + value + '">' +
                  '</div>';
              });

              $(".review-photo-list").prepend(html_img);
            }
            $('.datetimepicker').datetimepicker();
            $("form", obj).submit();

            // Load success
            $(self).removeClass("wrap-loading");
            $(self).find(".lds-dual-ring").remove();
            $('#editReviewsModal').css('opacity', '1');
            $('.modal-backdrop').css('opacity', '0.5');
            $('body').removeClass('trick-modal-edit-reviews');
            // END: Load success
          } else {
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

            $(modal).modal("hide");
          }
        },
        error: function() {
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

          $(modal).modal("hide");
        }
      });
    });

    // validate input author
    $(modal).on("input", 'input[name="author"]', function(){
      if($(this).val().trim().length > 150){
        $(this).val($(this).val().substr(0,150));
      }
    });

    // validate textarea Feedback
    $(modal).on("input", 'textarea[name="content"]', function(){
      if($(this).val().trim().length > 150){
        $(this).val($(this).val().substr(0,2000));
      }
    });

    var originalModal = $(modal).clone();
    $(modal).on("hidden.bs.modal", function() {
      $(modal).remove();
      var myClone = originalModal.clone();
      $("body").append(myClone);
    });

    $(modal).modal({
      show: "true"
    });
  });

  $("body").delegate("#formEditReview", "submit", function(e) {
    e.preventDefault();
    var obj = $(this);
    obj.validate({
      rules: {
        author: "required",
        star: {
          required: true,
          number: true,
          min: 1,
          max: 5
        }
      },
      submitHandler: function(form) {
        $.ajax({
          type: "post",
          url: appUrl + "/review/update",
          dataType: "json",
          data: $(form).serialize(),
          beforeSend: function() {
            $("input, button, textarea", $(form))
              .attr("disabled", true)
              .css("opacity", 0.5);
            $('select[name="country"]').prop("disabled", true);
          },
          success: function(data, statusText, xhr) {
            if (data.status == "success") {
              //alert(data.message);
              $.notify(
                {
                  message: data.message
                },
                {
                  z_index: 999999,
                  timer: 2000,
                  type: "success"
                }
              );

              window.location.reload();
            } else {
              $("input, button, textarea", $(form))
                .attr("disabled", false)
                .css("opacity", 1);
              $('select[name="country"]').prop("disabled", false);

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
            $("input, button, textarea", $(form))
              .attr("disabled", false)
              .css("opacity", 1);
            //alert(lang_reviews.notice_error);
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
  });

  $(".deleteReview").click(function(e) {
    e.preventDefault();

    var modal = "#deleteReviewsModal";
    var comment_id = $(this).attr("data-comment_id");

    $(modal).on("shown.bs.modal", function() {
      var obj = $(this);
      $('input[name="comment_id"]', obj).val(comment_id);
    });

    var originalModal = $(modal).clone();
    $(modal).on("hidden.bs.modal", function() {
      $(modal).remove();
      var myClone = originalModal.clone();
      $("body").append(myClone);
    });

    $(modal).modal({
      show: "true"
    });
  });

  $("body").delegate("#formDeleteReview", "submit", function(e) {
    e.preventDefault();
    var obj = $(this);

    var disabled = obj.attr("disabled");
    if (disabled) {
      return false;
    }

    $.ajax({
      type: "post",
      url: appUrl + "/review/delete",
      dataType: "json",
      data: obj.serialize(),
      beforeSend: function() {
        $("input, button, textarea", obj)
          .attr("disabled", true)
          .css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        $("input, button, textarea", obj)
          .attr("disabled", false)
          .css("opacity", 1);

        if (data.status && data.status == "success") {
          var comment_id = $('input[name="comment_id"]', obj).val();
          $("#ars-table-row-" + comment_id).remove();

          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          $("#deleteReviewsModal").modal("hide");
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
        $("input, button, textarea", obj)
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
  });

  // $(".review-approve-checked").on("change", function(ev) {
  //   var target = ev.currentTarget;
  //   if ($(target).is(":checked")) {
  //     $(".status-action-wrap").fadeIn();
  //   } else {
  //     var listReviewCheck = $(
  //       'input[name="listReviewCheck[]"]'
  //     ).serializeArray();
  //     console.log(listReviewCheck);
  //     if (listReviewCheck.length <= 0) {
  //       $("#review-approve-select-all").prop("checked", false);
  //       $(".status-action-wrap").fadeOut();
  //     }
  //   }
  // });

  $('#actionReview').select2({
    placeholder: "Action",
    minimumResultsForSearch: Infinity
  });


  $("#actionReview").on("change", function(e) {
    e.preventDefault();
    var obj = $(this);
    var _token = obj.attr("data-token");
    var action = obj.val();

    if (action) {
      if (action == "delete") {
        $("#deleteMulTiReviewsModal").modal({
          show: "true"
        });
        $("#deleteMulTiReviewsModal").on('hidden.bs.modal', function() {
          $(obj).val(null).trigger('change');
        });
      } else {
          let _listReviewCheck = [];
          let url = appUrl + "/review/multi-action";
          if ($('#ckc-all-reviews-prod').is(':checked')){
              url = appUrl + "/review/all-action";;
          }else{
              var listReviewCheck = $('input[name="listReviewCheck[]"]').serializeArray();

              _listReviewCheck = listReviewCheck.map(item => {
                  const value = item["value"];
                  const el = $(`#review-${value}`);
                  const source = el ? el.attr("data-source") : "";
                  const product_id = el ? el.attr("data-product-id") : "";
                  return { name: item["name"], value, source, product_id };
              });
          }

        $.ajax({
          type: "post",
          url: url,
          dataType: "json",
          data: {
            action: action,
            isAllReviews: $('#ckc-all-reviews-prod').is(':checked'),
            uncheckCurrentPage: $('#product-uncheck-current-page').val(),
            typePage:'',
            star : $('select[name="star[]"]').val(),
            source : getParamUrl('source'),
            keyword : getParamUrl('keyword'),
            status: getParamUrl('status'),
            _token: _token,
            listReviewCheck: _listReviewCheck,
            productID : $('input[name=product_id]').val()
          },
          beforeSend: function() {
            obj.attr("disabled", true).css("opacity", 0.5);
          },
          success: function(data, statusText, xhr) {
            obj.attr("disabled", false).css("opacity", 1);
            obj.prop('selectedIndex', 0);
            if (data.status && data.status == "success") {
              displayNotify(data.message, "success");
              window.location.reload();
            } else if(data.status && data.status == "warning"){
              let count_product = data.maxImport;
              let link_upgrade = data.linkUpdate;
              manage_reviews_upgrade({ count_product, link_upgrade, options: {timeOut:false}});
            } else{
              displayNotify(data.message, "danger");
            }
          },
          error: function() {
            obj.attr("disabled", false);
            displayNotify(lang_reviews.notice_error, "danger");
          }
        });
      }
    }
  });

  $('#actionProduct').select2({
        placeholder: "Action",
        minimumResultsForSearch: Infinity
    });

  $("#actionProduct").on("change", function(e) {
        e.preventDefault();

        var obj = $(this);

        var action = obj.val();

        $('input[name="action"]').val(action);

        switch (action) {
            case 'import':
                $("#importReviewProductChooseSourceModal").modal({
                    show: "true"
                });

                $("#importReviewProductChooseSourceModal").on('hidden.bs.modal', function() {
                    $(obj).val(null).trigger('change');
                });
                break ;
                
            case 'publish':
                $("#publishAllReviewProductModal").modal({
                    show: "true"
                });
                $("#publishAllReviewProductModal").on('hidden.bs.modal', function() {
                    $(obj).val(null).trigger('change');
                });
                break ;

            case 'unpublish':
                $("#unPublishAllReviewProductModal").modal({
                    show: "true"
                });
                $("#unPublishAllReviewProductModal").on('hidden.bs.modal', function() {
                    $(obj).val(null).trigger('change');
                });
                break ;

            case 'delete':
                $("#deleteAllReviewProductModal").modal({
                   show: "true"
                });
                $("#deleteAllReviewProductModal").on('hidden.bs.modal', function() {
                   $(obj).val(null).trigger('change');
                });
                break ;
        }
    });

   $('#formImportReviewProductsChooseSource').submit(function(e) {
      e.preventDefault();
      var obj = $(this);

      // const source = $('input[name="import-choose-source"]:checked').val();
      const product_seleted_ids = [];

      $('[name="listProductCheck[]"]:checked').each(function() {
        product_seleted_ids.push( parseInt($(this).val()) );
      });


      $.ajax({
        dataType: "JSON",
        type: 'POST',
        url: appUrl+'/check-condition-list-product-imported', 
        data:{
          list_products : product_seleted_ids
        },
        success: function(data){

          if(data.status && data.status === "error_product") {
        
            $("#importReviewProductChooseSourceModal").modal('hide');
            manage_reviews_upgrade({ count_product: data.count_product, link_upgrade:data.link_upgrade, options: {timeOut: false}});
            return false ;
          } 
         
          if(data.status === 'false') {
            obj.attr("disabled", false).css("opacity", 1);
            displayNotify(data.message, "danger");
            setTimeout(function(){
              window.location.reload();
            },2000);
            return false ;
            
          }

          if(data.status === 'true'){
            // Icon loading
            const button_submit = $("#formImportReviewProductsChooseSource button[type='submit']");
            $(button_submit).addClass("wrap-loading");
            $(button_submit).prepend('<div class="lds-dual-ring"></div>');
            // END: Icon loading

            
            
            const typeImport = $('input[name="rdb-bulk-import"]:checked').val();

            window.postMessage({
                type_message: "bulkImportReviewsAliOrdersFromBackend",
                product_ids: product_seleted_ids,
                type: typeImport,
              },
              "*"
            );

            window.addEventListener("message", event => {
              if (event.source != window) return;
              const {
                data: {
                  type_message = "",
                  products_status = []
                }
              } = event;

              if(type_message == "bulkImportReviewsAliOrdersFromBackend_result") {
                // message: `
                //       <p><strong>Import reviews successfully</strong></p>
                //       <div>Success: ${products_status.product_save_success.length}</div>
                //       <div>Product not found reviews: ${ $('[name="listProductCheck[]"]:checked').length - (products_status.product_save_success.length - products_status.product_save_fail.length) }</div>
                //       <div>Fail: ${products_status.product_save_fail.length}</div>
                //     `
                if(products_status.product_save_success.length <= 0){
                  $.notify(
                      {
                        message: "Import reviews unsuccessfully"
                      },
                      {
                        z_index: 999999,
                        timer: 2000,
                        type: "danger"
                      }
                  );
                }else{
                  $.notify(
                      {
                        message: "Import reviews successfully"
                      },
                      {
                        z_index: 999999,
                        timer: 2000,
                        type: "success"
                      }
                  );
                }


                // hide modal
                $('#formImportReviewProductsChooseSource .button--default').click()
                const buttons = document.querySelectorAll('#formImportReviewProductsChooseSource button');
                buttons.forEach(button => {
                  button.style.cssText = "pointer-events: initial; opacity: 1;";
                })

                // Finish Icon loading
                $(button_submit).removeClass("wrap-loading");
                $(button_submit).find(".lds-dual-ring").remove();
                // END: Finish Icon loading
                }
              }, false );
            }
        }
      });
      
  }) 

  $('#fromDeleteAllReviewProducts').submit(function (e) {
        var obj = $(this);
        e.preventDefault();

        var listReviewCheck = $('input[name="listProductCheck[]"]').serializeArray();

        let _listReviewCheck = [];

        listReviewCheck.map(item => {
             _listReviewCheck.push(item.value);
        });

        var importedReviews = null;

        if ($('input[name=importedReviews]').prop('checked') == true){

              importedReviews = true;

        }
        var customerReviews  = null;

        if ($('input[name=customerReviews]').prop('checked') == true){

              customerReviews = true;

        }

        $.ajax({
            type: 'POST',
            url: appUrl + "/product/review-product-multi-action",
            data: {productAllUncheck : $('input#product-uncheck-select-all').val(),  isReviews : $('select[name="is_review"]').val() , isAllProducts : $('input[name="isAllProducts"]').val(), action : $('input[name="action"]').val(), product_id :  _listReviewCheck, importedReviews  : importedReviews, customerReviews : customerReviews},
            success: function(data) {
                $('#deleteAllReviewProductModal').modal('toggle');
                if (data.status && data.status == "warning") {
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "warning"
                        }
                    );
                } else {
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: data.status
                        }
                    );
                }
            },
            error: function() {
                displayNotify(data.message, 'danger');
            }
        });
    });

  $('#formPublishAllReviewProducts').submit(function (e) {
        e.preventDefault();

        var listReviewCheck = $('input[name="listProductCheck[]"]').serializeArray();
        let _listReviewCheck = [];

        listReviewCheck.map(item => {
            _listReviewCheck.push(item.value);
        });
        var is_counter = getParamUrl('is_counter'); 
        var is_review = getParamUrl('is_review');
      
        $.ajax({
            type: 'POST',
            url: appUrl + "/product/review-product-multi-action",
            data: {is_review : is_review, is_counter : is_counter, listProductChecked : _listReviewCheck, productAllUncheck : $('input#product-uncheck-select-all').val(),isReviews : $('select[name="is_review"]').val() , isAllProducts : $('input[name="isAllProducts"]').val(),action : $('input[name="action"]').val(), product_id :  _listReviewCheck},
            success: function(data) {

                $('#publishAllReviewProductModal').modal('toggle');

                if(data.status && data.status === "error_product") {
                    manage_reviews_upgrade({ count_product: data.count_product, link_upgrade:data.link_upgrade, options: {timeOut: false}});
                    return false ;

                }else if (data.status && data.status == "warning") {
                    $.notify({message: data.message}, {z_index: 999999, timer: 2000, type: "warning"});
                } else {
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: data.status
                        }
                    );
                }

            },
            error: function(data) {
                displayNotify(data.message, 'danger');
            }
        });
    });

  $('#formUnPublishAllReviewProducts').submit(function (e) {

        e.preventDefault();

        var listReviewCheck = $('input[name="listProductCheck[]"]').serializeArray();

        let _listReviewCheck = [];

        listReviewCheck.map(item => {
            _listReviewCheck.push(item.value);
        });

        $.ajax({

            type: 'POST',

            url: appUrl + "/product/review-product-multi-action",

            data: {productAllUncheck : $('input#product-uncheck-select-all').val(), isReviews : $('select[name="is_review"]').val() ,isAllProducts : $('input[name="isAllProducts"]').val(), action : $('input[name="action"]').val(), product_id :  _listReviewCheck},

            success: function(data) {
                $('#unPublishAllReviewProductModal').modal('toggle');
                if (data.status && data.status == "warning") {
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "warning"
                        }
                    );
                } else {
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: data.status
                        }
                    );
                }
            },

            error: function() {
                console.log("Signup was unsuccessful");
            }
        });
    });

  $("body").delegate("#formDeleteMultiReview", "submit", function(e) {
    e.preventDefault();



      let _listReviewCheck = [];
      let url = appUrl + "/review/multi-action";
      if ($('#ckc-all-reviews-prod').is(':checked')){
          url = appUrl + "/review/all-action";;
      }else{
          var listReviewCheck = $('input[name="listReviewCheck[]"]').serializeArray();
           _listReviewCheck = listReviewCheck.map(item => {
              const value = item["value"];
              const el = $(`#review-${value}`);
              const source = el ? el.attr("data-source") : "";
              const product_id = el ? el.attr("data-product-id") : "";
              return { name: item["name"], value, source, product_id };
          });
      }

    var obj = $(this);
    $.ajax({
      type: "post",
      url: url,
      dataType: "json",
      data: {
        action: "delete",
        isAllReviews: $('#ckc-all-reviews-prod').is(':checked'),
        uncheckCurrentPage: $('#product-uncheck-current-page').val(),
        typePage:  $('#ckc-all-reviews-prod').attr('type-action'),
        star : $('select[name="star[]"]').val(),
        source : getParamUrl('source'),
        keyword : getParamUrl('keyword'),
        status : getParamUrl('status'),
        _token: $('input[name="_token"]', obj).val(),
        listReviewCheck: _listReviewCheck,
        productID : $('input[name=product_id]').val()
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        if (data.status && data.status == "success") {
          displayNotify(data.message, "success");

          window.location.reload();
        } else {
          obj.attr("disabled", false).css("opacity", 1);
          displayNotify(data.message, "danger");
        }
      },
      error: function() {
        obj.attr("disabled", false);
        displayNotify(lang_reviews.notice_error, "danger");
      }
    });
  });

  // $(".reviewChangeStatus").change(function(e) {
  //     e.preventDefault();
  //     var obj = $(this);
  //     var _token = obj.attr("data-token");
  //     var comment_id = obj.attr("data-comment_id");
  //     const source = obj.attr("data-source");

  //     var status = 0;
  //     if (this.checked) {
  //         status = 1;
  //     }

  //     $.ajax({
  //         type: "post",
  //         url: appUrl + "/review/change-status",
  //         dataType: "json",
  //         data: {
  //             _token: _token,
  //             comment_id: comment_id,
  //             status: status,
  //             source
  //         },
  //         beforeSend: function() {
  //             obj.attr("disabled", true).css("opacity", 0.5);
  //         },
  //         success: function(data, statusText, xhr) {
  //             obj.attr("disabled", false).css("opacity", 1);
  //             if (data.status && data.status == "success") {
  //                 if (status == 1) {
  //                     obj
  //                         .closest("label")
  //                         .attr("title", "Published")
  //                         .attr("data-original-title", "Published");
  //                 } else {
  //                     obj
  //                         .closest("label")
  //                         .attr("title", "Unpublished")
  //                         .attr("data-original-title", "Unpublished");
  //                 }
  //             } else {
  //                 $.notify(
  //                     {
  //                         message: data.message
  //                     },
  //                     {
  //                         z_index: 999999,
  //                         timer: 2000,
  //                         type: "danger"
  //                     }
  //                 );
  //             }
  //         },
  //         error: function() {
  //             obj.click();
  //             obj.attr("disabled", false);
  //             $.notify(
  //                 {
  //                     message: lang_reviews.notice_error
  //                 },
  //                 {
  //                     z_index: 999999,
  //                     timer: 2000,
  //                     type: "danger"
  //                 }
  //             );
  //         }
  //     });
  // });

    $(".lblReviewChangeStatus").on("click", function(event) {
        event.preventDefault();
        var obj = $(this);
        var input = obj.find($('input[type="checkbox"]'));

        var action = "publish"; // publish - unpublish
        var status = 1;
        if ($(input).is(":checked")) {
            status = 0;
            action = "unpublish";
        }

        $.ajax({
            type: "post",
            url: appUrl + "/review/change-status",
            dataType: "json",
            data: {
                _token: input.attr("data-token"),
                comment_id: input.attr("data-comment_id"),
                status: status,
                source: input.attr("data-source"),
                action: action,
                product_id: input.attr("data-product-id")
            },
            beforeSend: function () {
                obj.css({
                    opacity: 0.5,
                    "pointer-events": "none"
                });
            },
            success: function (data, statusText, xhr) {
                obj.css({
                    opacity: 1,
                    "pointer-events": "inherit"
                });

                console.log(111111)

                switch (data.status) {
                    case 'success':
                        $.notify(
                            {
                                message: data.message
                            },
                            {
                                z_index: 999999,
                                timer: 2000,
                                type: "success"
                            }
                        );

                        if ($(input).is(":checked")) {
                            // Published > Unpublished
                            obj
                                .attr("title", "UnPublished")
                                .attr("data-original-title", "UnPublished");

                            $(input).prop("checked", false);
                        } else {
                            // Unpublished > Published
                            obj
                                .attr("title", "Published")
                                .attr("data-original-title", "Published");

                            $(input).prop("checked", true);
                        }
                        break;
                    case 'warning':
                      let count_product = data.maxImport;
                      let link_upgrade = data.linkUpdate;
                      manage_reviews_upgrade({ count_product, link_upgrade, options: {timeOut:false}});

                        break;
                    default:
                        obj.attr("disabled", false).css("opacity", 1);
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
            error: function () {
                obj.attr("disabled", false);
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
    });

  $(".select-showing-reviews").change(function() {
    var obj = $(this);
    var perPage = obj.val();

    window.location.href = "?perPage=" + perPage;
  });

  $(".fillter-reviews").on("change", function() {
    var obj = $(this);
    obj.closest("form").submit();
  });

  $("#selectActionAllReviews").on("change", function(e) {
    var obj = $(this);
    var action = obj.val();

    if (action) {
      $(this).val('').trigger('change');
      if (action == "delete") {
        $("#deleteAllReviewsModal").modal({
          show: "true"
        });
      }

      if (action == "unpublish") {
        $("#unPublishAllReviewsModal").modal({
          show: "true"
        });
      }

      if (action == "publish") {
        $("#publishAllReviewsModal").modal({
          show: "true"
        });
      }
    }
    
  });

  $("body").delegate("#formDeleteAllReview", "submit", function(e) {
    $('.modal').modal('hide');
    e.preventDefault();

    var obj = $(this);
    $.ajax({
      type: "post",
      url: appUrl + "/review/all-action",
      dataType: "json",
      data: {
        action: "delete",
        product_id: $('input[name="product_id"]', obj).val(),
        _token: $('input[name="_token"]', obj).val()
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {

        if (data.status && data.status == "success") {
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          window.location.reload();
        } else {
          obj.attr("disabled", false).css("opacity", 1);
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
        obj.attr("disabled", false);
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
  });

  $("body").delegate("#formPublishAllReview", "submit", function(e) {
    $('.modal').modal('hide');
    e.preventDefault();

    var obj = $(this);
    $.ajax({
      type: "post",
      url: appUrl + "/review/all-action",
      dataType: "json",
      data: {
        action: "publish",
        product_id: $('input[name="product_id"]', obj).val(),
        _token: $('input[name="_token"]', obj).val()
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
        success: function(data, statusText, xhr) {

            obj.attr("disabled", false).css("opacity", 1);

            switch (data.status) {
                case 'success':
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "success"
                        }
                    );

                    window.location.reload();
                    break;
                case 'warning':
                  let count_product = data.maxImport;
                  let link_upgrade = data.linkUpdate;
                  manage_reviews_upgrade({ count_product, link_upgrade, options: {timeOut:false}});

                    break;
                default:
                    obj.attr("disabled", false).css("opacity", 1);
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
            $('.modal').modal('hide');

            obj.attr("disabled", false);
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
  });

  $("body").delegate("#formUnPublishAllReview", "submit", function(e) {
    $('.modal').modal('hide');
    e.preventDefault();

    var obj = $(this);
    $.ajax({
      type: "post",
      url: appUrl + "/review/all-action",
      dataType: "json",
      data: {
        product_id: $('input[name="product_id"]', obj).val(),
        action: "unpublish",
        _token: $('input[name="_token"]', obj).val()
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {

        if (data.status && data.status == "success") {
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          window.location.reload();
        } else {
          obj.attr("disabled", false).css("opacity", 1);
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
        obj.attr("disabled", false);
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
  });

    $('#selectActionDeleteAllReviews').select2({
        placeholder: "Delete product reviews",
        minimumResultsForSearch: Infinity
    });

  $('select[name="delete-shop-reviews"]').change(function (e) {
      var action = $(this).val();
      var title = $(this).find(":selected").attr('data-title');
      var modal = "#deleteAllReviewsShopModal";
      $('.title', $(modal)).text(title);

      if ($(this).val() === "") return false;

      $(modal).on("shown.bs.modal", function() {
          $('input[name="action"]', $(modal)).val(action);
      });

      var originalModal = $(modal).clone();
      $(modal).on("hidden.bs.modal", function() {
          $(modal).remove();
          var myClone = originalModal.clone();
          $("body").append(myClone);
      });

      $(modal).modal({
          show: "true"
      });

      $(this)
          .val(null)
          .trigger("change");
  });

    $("body").delegate("#formDeleteAllReviewShop", "submit", function(e) {
        e.preventDefault();

        var obj = $(this);
        var action = $('input[name="action"]',obj).val();
        $.ajax({
            type: "post",
            url: appUrl + "/review/delete-reviews-in-shop",
            dataType: "json",
            data: {
                action: action,
                _token: $('input[name="_token"]', obj).val()
            },
            beforeSend: function() {
                obj.attr("disabled", true).css("opacity", 0.5);
            },
            success: function(data, statusText, xhr) {
                $('#deleteAllReviewsShopModal').modal('toggle');

                if (data.status && data.status == "success") {
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "warning"
                        }
                    );

                    // window.location.reload();
                } else {
                    obj.attr("disabled", false).css("opacity", 1);
                    $.notify(
                        {
                            message: data.message
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "warning"
                        }
                    );
                }
            },
            error: function() {
                $('#deleteAllReviewsShopModal').modal('toggle');

                obj.attr("disabled", false);
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
    });

});

function addSchemaGoogleRating() {
  $('#add_schema_google_rating').on('click', function() {
    var obj = $(this);
    $.ajax({
      type: "post",
      url: appUrl + "/manage-reviews/add_google_rating",
      dataType: "json",
      data: {
        product_id: obj.attr('productID'),
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      }, // beforeSend
      success: function(data, statusText, xhr) {
        if (data.status && data.status == "success") {
          displayNotify(data.message, 'success');
        } else {
          displayNotify(data.message, 'danger');
        }

        obj.attr("disabled", false).css("opacity", 1);
      }, // success
      error: function() {
        obj.attr("disabled", false);
        displayNotify(lang_reviews.notice_error, 'danger');
      } // error
    });
  });
}

function displayNotify(msg, style) {
  $.notify(
    {
      message: msg
    },
    {
      z_index: 999999,
      timer: 2000,
      type: style
    }
  );
}

function getParamUrl( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
