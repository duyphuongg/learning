$(document).ready(function(){
    // handelShowOnBoardingReviewsPops();
});

function handelShowOnBoardingReviewsPops(){
    let path_name = location.pathname;
    if(path_name == `/popup-reviews/rule-settings` && (localStorage.getItem('onboarding_review_pops') === 'true')){
        setTimeout(function(){ localStorage.removeItem('onboarding_review_pops'); }, 1000);
        let app_plan = $('#review-pop-app-plan').val();
        $('#first-time-to-reviews-pops-modal').modal('show');
        if(app_plan == 'starter' || app_plan == 'free'){
            runStarter();
        }else{
            runCharges();
        }
        $('.js-btn-next').on('click', function(){
            $("#first-time-to-reviews-pops-modal .first-time__1").animate({left: '-100%'});
            $("#first-time-to-reviews-pops-modal .first-time__2").animate({left: '0'});
            $('#first-time-to-reviews-pops-modal .button--close').css({'display': 'block'});
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                   $('#first-time-to-reviews-pops-modal').modal('hide');
                }
            });
        })
    }
}

function runStarter(){
    let $el_modal = $('#first-time-to-reviews-pops-modal');
    let attr_img = $el_modal.find('.first-time__2 .first-time__img img').attr('src').replace('2', '3');
    $el_modal.find('.first-time__1 .first-time__title').text('Introducing Review Pops');
    $el_modal.find('.first-time__1 .first-time__note').html('Brighten up your store with recent review popups that trigger visitor actions <br> and boost sales. Why is it a must-have?');
    $el_modal.find('.first-time__2 .first-time__title').text('Just 1 meal for a long-lasting success');
    $el_modal.find('.first-time__2 .first-time__note').html('What a bargain! A world full of options and customizations is waiting for you. <br> Now shall we start to get stuff done?');
    $el_modal.find('.first-time__2 .js-btn-let-start').text('Upgrade Now');
    $el_modal.find('.first-time__2 .first-time__img img').attr('src', attr_img);
    $el_modal.find('.first-time__2 .first-time__img').removeClass('mar-t-40').addClass('mar-t-20');

    $('#first-time-to-reviews-pops-modal').on('click', '.js-btn-let-start', function(){
        location.href = `${appUrl}/pricing`;
        $('#first-time-to-reviews-pops-modal').modal('hide');
    });

    $('#first-time-to-reviews-pops-modal').on('click', '.button--close', function(){
        $('#first-time-to-reviews-pops-modal').modal('hide');
        // $('.js-dismiss-modal-first-time-review-pops').css({'display': 'block'});
    });
}
function runCharges(){
    $('#first-time-to-reviews-pops-modal').on('click', '.js-btn-let-start', function(){
        $('#first-time-to-reviews-pops-modal').modal('hide');
    })

    $('#first-time-to-reviews-pops-modal').on('click', '.button--close', function(){
        $('#first-time-to-reviews-pops-modal').modal('hide');
    });
}