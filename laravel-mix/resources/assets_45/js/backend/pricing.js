$(document).ready(function() {
    $("body").delegate(".btn-remove-data", "click", function(e){
        var obj = $(this);
    
        /*$("#deleteDataModal").modal({
              show: "true"
            });*/
    
        var modal = "#deleteDataModal";
        var plan = $(this).attr("data-plan");
    
        $(modal).on("shown.bs.modal", function() {
            $('input[name="plan"]', $(modal)).val(plan);
        });
    
        var originalModal = $(modal).clone();
        $(modal).on("hidden.bs.modal", function() {
            $(modal).remove();
            var myClone = originalModal.clone();
            $("body").append(myClone);
        });
    
        $(modal).modal({
            show: "true",
            backdrop: 'static',
            keyboard: false
        });
    });
    
    $("body").delegate("#formDeleteData", "submit", function(e) {
        // $('.modal').modal('hide');
        e.preventDefault();
    
        var obj = $(this);
        var btnSubmit = $(this).find('button[type=submit]');
        var btn = $(this).find('button');
        addLoading(btnSubmit);
        $.ajax({
            type: "post",
            url: appUrl + "/removeDataHandle",
            dataType: "json",
            data: {
                _token: $('input[name="_token"]', obj).val(),
             plan: $('input[name="plan"]', obj).val()
            },
             beforeSend: function() {
                // obj.attr("disabled", true).css("opacity", 0.5);
                btn.attr("disabled", true);
                disableEscKey();
            },
            success: function(data, statusText, xhr) {
                // $('.modal').modal('hide');
                if (data.status && data.status == "success") {
                window.location.href = data.url;
                } else {
              // obj.attr("disabled", false).css("opacity", 1);
                    btn.attr("disabled", false);
                    removeLoading(btnSubmit);
                    enableEscKey();
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
                // obj.attr("disabled", false);
                btn.attr("disabled", false);
                removeLoading(btnSubmit);
                enableEscKey();
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

    $("body").delegate(".button-affiliate", "click", function(e){
        $.notify(
            {
                message: "Upgrade to Shopify paid plan to get this plan."
            },
            {
                z_index: 999999,
                timer: 3000,
                type: "warning warning-shop-test"
            }
        );
        let self= $(this);
        self.prop('disabled', true);
        setTimeout(() => {
            self.prop('disabled', false);
        }, 9000);
    });
});

function addLoading(el) {
    $(el).addClass('wrap-loading');
    $(el).prepend('<div class="lds-dual-ring"></div>');
}

function disableEscKey(){
    $(document).keydown(function(e) {
        if (e.keyCode == 27) return false;
    });
}
  
function enableEscKey(){
    $(document).keydown(function(e) {
        if (e.keyCode == 27) return true;
    });
}

function removeLoading(el) {
    $(el).removeClass('wrap-loading');
    $(el).find('.lds-dual-ring').remove();
}

$(document).on('keyup', function (evt) {
    if (evt.keyCode == 27) {
        $('#deleteDataModal').modal('hide');
    }
});