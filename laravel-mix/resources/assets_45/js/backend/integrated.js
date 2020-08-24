$(document).ready(function(){
    let navChild = $('.integration__nav-child li');
    navChild.on('click', function(){
        if($(this).hasClass('active')){
            setTimeout(() => {
                $(this).removeClass('active');
                let parent = $(this).closest('.tab-pane').find('.tab-content > .tab-pane').addClass('in active')
            })
        }
    })
    let flitsAppStatus = $('.integration__item .flits-app .flits-app__status');
    // if (window.location.pathname === '/integrations') {
    //     $.ajax({
    //         type: "get",
    //         url: appUrl + "/integrations/check-app-flits",
    //         dataType: "json",
    //         success: function (data, statusText, xhr) {
    //             if (data.status) {
    //                 flitsAppStatus.addClass('active').html('<i class="far alireview-fa-check"></i> Activated')
    //             }
    //         }
    //     });
    // }

    flitsAppStatus.click(function (e) {
        let checkActive = $(this).hasClass('active')
        if (!checkActive) {
            $.ajax({
                type: 'post',
                crossDomain: true,
                url: appUrl + "/integrations/flits",
                dataType: 'json',
                success: function (data, statusText, xhr) {
                    console.log(data);
                    const { status, installation_url = null, message = null } = data
                    if (!status && installation_url) {
                        window.location = installation_url
                    } else if (!status && message) {
                        $.notify(
                            {
                                message: message
                            },
                            {
                                z_index: 999999,
                                timer: 2000,
                                type: "danger"
                            }
                        );
                    } else if (status) {
                        flitsAppStatus.addClass('active').html('<i class="far alireview-fa-check"></i> Activated')
                        $.notify(
                            {
                                message: message
                            },
                            {
                                z_index: 999999,
                                timer: 2000,
                                type: "success"
                            }
                        );
                    }
                }
            });
        }
    })
});