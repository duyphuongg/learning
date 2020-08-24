$(document).ready(function(){
    let KEY_ONBOARDING_IMPORT_REVIEW = 'onboarding_import_reviews';
    let KEY_GO_IT_QUICK_GUIDE = 'onboarding_go_it_quick_guide';
    let KEY_ONBOARDING_EMAIL_CAMPAIGN = 'onboarding_email_campaign';
    let KEY_ONBOARDING_REVIEW_POPS = 'onboarding_review_pops';
    let KEY_INITIAL_SETUP_ONBOARDING = 'onboarding_initial_setup';
    let KEY_ONBOARDING_AUTO_REVIEWS = 'onboarding_auto_reviews';
    let path_name_manage_reviews = 'manage-reviews';
    let path_name_review_pops = 'popup-reviews/rule-settings';
    let path_name_email_campaign = 'emails-request/template-settings';
    let path_name_auto_reviews = 'auto-update-review';
    
    let link_demo_import_review = 'https://www.aliexpress.com/item/32847548221.html';
    let location_pathname = location.pathname;
    let finish_all_section_onboarding = false;
    let CDN = cdnUrl;
    let link_product_any = $('input[name="check_now_product"]').val();
    let val_event_choose_plan = $('input[name="event_choose_plan"]').val();
    let val_event_adapt_plan = $('input[name="event_adapt_plan"]').val();
    let turn_off_flow_modal_import_review = false;

    if(location_pathname === '/charge_successful' && localStorage.getItem(KEY_INITIAL_SETUP_ONBOARDING)){
        $('.main-sidebar').css({'pointer-events': 'none'});
        let ele_btn_discover = $('.thank-you-wrap .discover-charge-thanks');
        ele_btn_discover.css({'position': 'relative'});
        ele_btn_discover.append("<div class='onboarding__pulse'><span></span></div>");
    }

    if(location_pathname === '/'){
        // handle onboarding section 1
        handleOnboardingInstallAliReviews();

        // handle onboarding section 2
        handleOnboardingMiniTour();

        // check disabled review box visibility
        checkReviewBoxVisibility();

        handleEventChoosePlan();

        // active section finished
        handleActiveSectionOnboarding();

        if(localStorage.getItem(KEY_INITIAL_SETUP_ONBOARDING)){
            let max_height_content_onboarding_install = 385;
            if(link_product_any == ''){
                max_height_content_onboarding_install = 410;
            }
            localStorage.removeItem(KEY_INITIAL_SETUP_ONBOARDING);
            let ele_onboarding_install_alireviews_modal = $("#onboarding-install-alireviews-modal");
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': '442px', 'height': '442px'});
            ele_onboarding_install_alireviews_modal.find(".dashboard__onboarding__info-icon").css({'display': 'none '});
            ele_onboarding_install_alireviews_modal.modal('show');
            ele_onboarding_install_alireviews_modal.find('.onboarding__wellcome button').on('click', function(){
                ele_onboarding_install_alireviews_modal.find(".modal-content").css({'border': '2px solid #00C35C'});
                ele_onboarding_install_alireviews_modal.find(".dashboard__onboarding__info-icon").css({'display': 'block'});
                ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': `${max_height_content_onboarding_install}px`, 'height': `${max_height_content_onboarding_install}px`, 'width': '650px', 'max-width': '650px'});
                $(".onboarding__wellcome").animate({left: '-100%'});
                $(".onboarding__check-review-box").animate({left: '0px'});

                // $("#wellcome-onboarding").modal('hide');
                // $('.dashboard__onboarding').addClass('open');

                // Support add event for Add AdRoll.
                try{
                    __adroll.record_user({"adroll_segments": "9d70b332"});
                } catch(err) {}

                setTimeout(function() {
                    $("#onboarding-install-alireviews-modal").modal('show');
                    // $("#onboarding-install-alireviews-modal .button--close").css({'display': 'none'});
                }, 500);
            });
        }else{
            getDisplayOnboarding();
        }
    }else {
        getDisplayOnboarding();
    }
    handleOnBoardingSlider();
    hanldeOnboardingRatingApp();
    // handle onboarding Import Review AE
    handleOnboardingImportReviews();
    handleOnboardingLinkImportReviews();
    // handle onboarding Import Review CSV
    handleOnboardingImportReviewsCSV();
    handleOnboardingLinkImportReviewsCSV();
    //EmailCampaign tour
    handleOnboardingEmailCampaign();
    handleOnboardingLinkEmailCampaign();
    //review pops tour
    handleOnboardingReviewPops();
    handleOnboardingLinkReviewPops();
    //auto import review tour
    handleOnboardingAutoReviews();
    handleOnboardingLinkAutoReviews();

    // contact our developers
    $('.contact-our-developers a').on('click', function(e){
        e.preventDefault();
        let ele_onboarding_install_alireviews_modal = $('#onboarding-install-alireviews-modal');
        ele_onboarding_install_alireviews_modal.find('.modal-content').css({'height': '800px', 'max-height': '800px', 'width': '650px', 'max-width': '650px'});
        ele_onboarding_install_alireviews_modal.find(".modal-content .modal-body").animate({left: '-100%'}, 0);
        ele_onboarding_install_alireviews_modal.find(".fix-now__step-2__2").animate({left: '0'}, 0);
        ele_onboarding_install_alireviews_modal.find(".button--close").css({'display': 'block'});
        ele_onboarding_install_alireviews_modal.modal('show');
    });

    $(".dashboard__onboarding").on('click', '.button--close, .js-hidden-oboarding', function () {
        handleHideTableOnboarding();
        setDisplayOnboarding(0);
        let html = `
        <div class="onboarding-tooltip-box">
            <div class="onboarding-tooltip-box__content">
                <h4 class="onboarding-tooltip-box__title">Tutorials</h4>
                <p class="onboarding-tooltip-box__desc">You can redo tutorials by visiting Support page.</p>
            </div>
            <div class="onboarding-tooltip-box__info-icon"><img src="${CDN}/images/onboarding/onboarding-info-icon.png" alt="i"></div>
        </div>`;
        let dashboard_page = $('.dashboard-page');
        if(dashboard_page.find('.onboarding-tooltip-box').length == 0){
            dashboard_page.prepend(html);
        }
        setTimeout(function(){
            dashboard_page.find('.onboarding-tooltip-box').remove();
        }, 3000);
    });

    function handleOnboardingAutoReviews(){
        $("#onboarding__auto-update-reviews").on('click', function () {
            localStorage.setItem(KEY_ONBOARDING_AUTO_REVIEWS, 'true');
            $('#spinnerOnBoardingModal').modal('show');
            setTimeout(() => {
                location.href = `${appUrl}/${path_name_auto_reviews}`;
            }, 2000);
        });
    }

    function handleOnboardingLinkAutoReviews(){
        let path_name = location.pathname;
        if(path_name === `/${path_name_auto_reviews}` && (localStorage.getItem(KEY_ONBOARDING_AUTO_REVIEWS) === 'true')){
            handleTopBarOnBoarding();
            let ele_auto_reviews_page = $(".auto-update-review-settings-page");
            let ele_ob_auto_reviews_finish = $(".onboarding-auto-review-finish");
            let ele_ob_finish_header = ele_ob_auto_reviews_finish.find('.onboarding-auto-review__header')
            let ele_ob_finish_col_old_time = ele_ob_auto_reviews_finish.find('.col-old-time')
            let ele_ob_finish_col_new_time = ele_ob_auto_reviews_finish.find('.col-new-time')
            let ele_ob_finish_col_result = ele_ob_auto_reviews_finish.find('.col-result')
            let ele_ob_finish_col_result_title = ele_ob_finish_col_result.find('.content-title')
            let ele_ob_finish_col_result_desc = ele_ob_finish_col_result.find('.content-desc')
            let ele_ob_finish_col_result_btn = ele_ob_finish_col_result.find('.js-btn-end-ob-auto-reviews')
            let ele_modal, ele_quantity_step_1, ele_btn_next, step = 1, ele_select_rule_step_2, ele_btn_hide_modal;
            let ele_topbar = ele_auto_reviews_page.find('.ob-topbar');
            ele_topbar.addClass('top-bar-wrap-center-screen');
            let appPlanInfo = $('#appPlanInfo').val()
            if(appPlanInfo != 'premium' && appPlanInfo != 'plus'){
                ele_ob_finish_col_result_title.text('Updating reviews manually is time-consuming')
                ele_ob_finish_col_result_desc.text('Get more free time for yourself. Upgrade to Premium Plan to use Auto Update Reviews.')
                ele_ob_finish_col_result_btn.text('Upgrade Now')
                ele_ob_finish_col_result_btn.click(function(){
                    localStorage.removeItem(KEY_ONBOARDING_AUTO_REVIEWS);
                    window.location = `${appUrl}/pricing`;
                })
            }else{
                ele_ob_finish_col_result_btn.click(function(){
                    localStorage.removeItem(KEY_ONBOARDING_AUTO_REVIEWS);
                    window.location.reload();
                })
            }
    
            delayTime(500) /*STEP 1*/
            .then(()=>{
                ele_modal = ele_auto_reviews_page.find('.onboarding-auto-reviews')
                ele_quantity_step_1 = ele_modal.find('.setting-quantity-step-1')
                ele_btn_next = ele_modal.find('.btn-next')
                ele_btn_next.prop('disabled', true)
                ele_quantity_step_1.addClass('none-event')
                return delayTime(1000);
            })
            .then(()=>{
                ele_quantity_step_1.append('<i class="far alireview-fa-check"></i>');
                ele_quantity_step_1.addClass('active')
                return delayTime(1000);
            })
            .then(()=>{
                ele_btn_next.prop('disabled', false).append("<div class='onboarding__pulse'><span></span></div>");
                delayTime(0)
            })
            .then(()=>{
                /*STEP 2*/
                ele_btn_next.on('click', function(){
                    if(step == 1){
                        step += 1;
                        ele_btn_next.prop('disabled', true)
                        ele_btn_next.find('.onboarding__pulse').remove()
                        delayTime(0)
                        .then(()=>{
                            ele_select_rule_step_2 = ele_modal.find('.ob-step-2-checked')
                            return delayTime(1000);
                        })
                        .then(()=>{
                            ele_select_rule_step_2.append('<i class="far alireview-fa-check"></i>');
                            return delayTime(1000);
                        })
                        .then(()=>{
                            ele_btn_next.prop('disabled', false).append("<div class='onboarding__pulse'><span></span></div>");
                            delayTime(0)
                        })
                        .then(()=>{
                            /*STEP 3*/
                            ele_btn_next.on('click', function(){
                                if(step == 2){
                                    step += 1;
                                    ele_btn_next.hide()
                                    delayTime(200)
                                    .then(()=>{
                                        $('.js-ob-1-done, .js-ob-2-done, .js-ob-3-done, .js-ob-4-done, .js-ob-5-done, .js-ob-6-done, .js-ob-7-done, .js-ob-8-done').append('<i class="far alireview-fa-check"></i>');
                                        ele_btn_hide_modal = ele_modal.find('.btn-hide-modal-onboarding')
                                        ele_btn_hide_modal.prop('disabled', true)
                                        ele_btn_hide_modal.find('.onboarding__pulse').remove()
                                        ele_modal.find('input, button.multiselect, .select2-container span.select2-selection, .wrap-custom-box').addClass('none-event')
                                        ele_modal.find('.setting-percent').removeClass('disabled-action')
                                        return delayTime(1000);
                                    })
                                    .then(()=>{
                                        $('.js-ob-1').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        $('.js-ob-1').removeClass('animation-follow-ob hide-follow-ob').addClass('border-done');
                                        $('.js-ob-2').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        $('.js-ob-2').removeClass('animation-follow-ob hide-follow-ob').addClass('border-done');;
                                        $('.js-ob-3').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        $('.js-ob-3').removeClass('animation-follow-ob hide-follow-ob');
                                        $('.js-ob-4').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        $('.js-ob-4').removeClass('animation-follow-ob hide-follow-ob').addClass('border-done');;
                                        $('.js-ob-5').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        $('.js-ob-6').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        $('.js-ob-7').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        $('.js-ob-8').addClass('animation-follow-ob');
                                        return delayTime(1500);
                                    })
                                    .then(()=>{
                                        ele_btn_hide_modal.prop('disabled', false).append("<div class='onboarding__pulse'><span></span></div>");
                                        delayTime(0)
                                    })
                                    .then(()=>{
                                        /*STEP 4-FINISH*/
                                        ele_btn_hide_modal.on('click', function(){
                                            if(step == 3){
                                                step += 1;
                                                ele_topbar.removeClass('top-bar-wrap-center-screen').addClass('top-bar-wrap-center');
                                                ele_ob_auto_reviews_finish.show()
                                                delayTime(0)
                                                .then(()=>{
                                                    ele_ob_finish_header.addClass('animation-follow-ob');
                                                    return delayTime(1000)
                                                })
                                                .then(()=>{
                                                    ele_ob_finish_col_old_time.addClass('ob-reviews-pops-left-to-right');
                                                    return delayTime(1000);
                                                })
                                                .then(()=>{
                                                    $('.img-old-time-three').addClass('ob-auto-review-image');
                                                    return delayTime(2000);
                                                })
                                                .then(()=>{
                                                    $('.img-old-time-two').addClass('ob-auto-review-image-second');
                                                    return delayTime(2000);
                                                })
                                                .then(()=>{
                                                    $('.img-old-time-one').addClass('ob-auto-review-image-three');
                                                    return delayTime(2000);
                                                })
                                                .then(()=>{
                                                    ele_ob_finish_col_new_time.addClass('ob-reviews-pops-left-to-right');
                                                    return delayTime(1000);
                                                })
                                                .then(()=>{
                                                    $('.img-new-time-three').addClass('ob-auto-review-image-new-first');
                                                    return delayTime(2000);
                                                })
                                                .then(()=>{
                                                    $('.img-new-time-two').addClass('ob-auto-review-image-new-second');
                                                    return delayTime(2000);
                                                })
                                                .then(()=>{
                                                    $('.img-new-time-one').addClass('ob-auto-review-image-three');
                                                    return delayTime(2000);
                                                })
                                                .then(()=>{
                                                    ele_ob_finish_col_result.addClass('ob-reviews-pops-left-to-right');
                                                    setActiveSectionOnboarding('section_seven'); //Auto reviews
                                                })
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                })
            })
        }
    }

    function handleOnboardingEmailCampaign(){
        $("#onboarding__email-campaign").on('click', function () {
            localStorage.setItem(KEY_ONBOARDING_EMAIL_CAMPAIGN, 'true');
            $('#spinnerOnBoardingModal').modal('show');
            setTimeout(() => {
                location.href = `${appUrl}/${path_name_email_campaign}`;
            }, 2000);
        });
    }

    function handleOnboardingLinkEmailCampaign(){
        let path_name = location.pathname;
        if(path_name === `/${path_name_email_campaign}` && (localStorage.getItem(KEY_ONBOARDING_EMAIL_CAMPAIGN) === 'true')){
            handleTopBarOnBoarding();
            let ele_email_campaign = $(".email-request-page");
            let ele_topbar = ele_email_campaign.find('.ob-topbar');
            let ele_ob_email_campaign = $(".onboarding-email-request");
            let ele_ob_email_campaign_step1 = $(".onboarding-email-request .onboarding-email-request__step1");
            let ele_ob_email_campaign_step2 = $(".onboarding-email-request .onboarding-email-request__step2");
            let ele_fake_input_one = $("#collapse1 .ob-panel-body__fake-input");
            let ele_fake_input_two = $("#collapse2 .ob-panel-body__fake-input");
            let ele_button_step1 = $(".ob-email-request__cta button");
            let data_finish_ob = ($('#on-boarding-email-finish').val() != '') ? JSON.parse($('#on-boarding-email-finish').val()) : '';
            
            if(data_finish_ob != ''){
                let data_title = data_finish_ob.title;
                let data_content = data_finish_ob.content;
                let data_cta = data_finish_ob.cta;
                let data_link = data_finish_ob.link;
                $('.col-result .content-title').text(data_title);
                $('.col-result .content-desc').text(data_content);
                $('.col-result .js-btn-end-on-email-request').text(data_cta).attr('href', data_link);
            }

            let check = setInterval(function() {
                if(ele_email_campaign.find('.email-template-setup').length > 0){
                    ele_email_campaign.find('.email-template-setup').hide();
                    clearInterval(check)
                }
            }, 100);
            ele_email_campaign.find('.email-template-setup').hide();
            ele_ob_email_campaign.show();
            ele_topbar.addClass('top-bar-wrap-center');

            delayTime(2000)  /*STEP 1*/
            .then(()=>{
                ele_fake_input_one.find('p').hide();
                $("#collapse1").collapse('show');
                return delayTime(1500);
            })
            .then(()=>{
                ele_fake_input_one.find('p').show().addClass('typing');
                return delayTime(3500);
            })
            .then(()=>{
                ele_fake_input_one.addClass('active');
                return delayTime(1500);
            })
            .then(()=>{
                ele_fake_input_one.append('<i class="far alireview-fa-check"></i>');
                return delayTime(1500);
            })
            .then(()=>{
                ele_fake_input_two.find('p').hide();
                $("#collapse2").collapse('show');
                return delayTime(1500);
            })
            .then(()=>{
                ele_fake_input_two.find('p').show().addClass('typing');
                return delayTime(3500);
            })
            .then(()=>{
                ele_fake_input_two.addClass('active');
                return delayTime(1500);
            })
            .then(()=>{
                ele_fake_input_two.append('<i class="far alireview-fa-check"></i>');
                return delayTime(1500);
            })
            .then(()=>{
                ele_button_step1.prop('disabled', false).append("<div class='onboarding__pulse'><span></span></div>");
            }) /* END: STEP 1*/

            /*STEP 2*/
            ele_button_step1.click(function(){
                ele_ob_email_campaign_step1.hide();
                ele_ob_email_campaign_step2.show();
                let ele_step2_header = $('.ob-email-request-step2__header');
                let ele_step2_col_time_line = $('.ob-email-request-step2__content .col-time-line');
                let ele_step2_col_chart = $('.ob-email-request-step2__content .col-chart');
                let ele_step2_col_result = $('.ob-email-request-step2__content .col-result');

                $('html, body').animate({
                    scrollTop: 0
                }, 0);
                delayTime(500)
                .then(()=>{
                    ele_step2_header.addClass('animation-follow-ob');
                    return delayTime(2500);
                })
                .then(()=>{ /*Col time-line*/
                    ele_step2_col_time_line.addClass('ob-reviews-pops-left-to-right');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-time-line-follow-1').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-time-line-follow-2').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-time-line-follow-3').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-time-line-follow-4').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-time-line-follow-5').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-time-line-follow-6').addClass('animation-follow-ob');
                    return delayTime(3000);
                }) /*END: Col time-line*/
                .then(()=>{ /*Col chart*/
                    ele_step2_col_chart.addClass('ob-reviews-pops-left-to-right');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-title').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-1').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-2').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-3').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-4').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-5').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-6').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-7').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-8').addClass('animation-follow-ob');
                    return delayTime(3000);
                }) /*END: Col chart*/
                .then(()=>{
                    ele_step2_col_result.addClass('ob-reviews-pops-left-to-right');
                    setActiveSectionOnboarding('section_four');
                    $('.js-btn-end-on-email-request').click(function(){
                        localStorage.removeItem(KEY_ONBOARDING_EMAIL_CAMPAIGN);
                    })
                })
            })
        }
    }

    function handleOnboardingReviewPops(){
        $("#onboarding__review-pops").on('click', function () {
            localStorage.setItem(KEY_ONBOARDING_REVIEW_POPS, 'true');
            $('#spinnerOnBoardingModal').modal('show');
            setTimeout(() => {
                location.href = `${appUrl}/${path_name_review_pops}`;
            }, 2000);
        });
    }

    function handleOnboardingLinkReviewPops(){
        let path_name = location.pathname;
        if(path_name === `/${path_name_review_pops}` && (localStorage.getItem(KEY_ONBOARDING_REVIEW_POPS) === 'true')){
            handleTopBarOnBoarding();
            let ele_review_pops = $(".review-popup-rule-settings-page");
            let ele_topbar = ele_review_pops.find('.ob-topbar');
            let ele_warning_plan = $(".alireview-noti-waring");
            let ele_onboarding_review_pops = $("#obReviewPopsWrap");
            let ele_review_popup_1 = $('.review_popup_1');
            let ele_review_popup_2 = $('.review_popup_2');
            let ele_review_popup_3 = $('.review_popup_3');
            let ele_review_popup_1_step2 = $('.step2_review_popup_1');
            let ele_review_popup_2_step2 = $('.step2_review_popup_2');
            let ele_review_popup_3_step2 = $('.step2_review_popup_3');
            let ele_review_popup_1_step3 = $('.step3_review_popup_1');
            let ele_review_popup_2_step3 = $('.step3_review_popup_2');
            let ele_review_popup_3_step3 = $('.step3_review_popup_3');
            let ele_review_pops_step_1 = $('.ob-review-pops-step-1');
            let ele_review_pops_step_2 = $('.ob-review-pops-step-2');
            let ele_review_pops_step_3 = $('.ob-review-pops-step-3');
            let ele_switch_input = $('.ob-rp__row-setting__switch-wrap input.switch-input');
            let ele_checkbox_input = $('.ob-rp__row-setting__checkbox-wrap input');
            let ele_step_2_btn_done = $('.ob-review-pops-step-2__footer button');
            let data_finish_ob = ($('#on-boarding-review-pops-finish').val() != '') ? JSON.parse($('#on-boarding-review-pops-finish').val()) : '';
            if(data_finish_ob != ''){
                let data_title = data_finish_ob.title;
                let data_content = data_finish_ob.content;
                let data_cta = data_finish_ob.cta;
                let data_link = data_finish_ob.link;
                $('.col-result .content-title').text(data_title);
                $('.col-result .content-desc').text(data_content);
                $('.col-result .js-btn-end-on-review-pops').text(data_cta).attr('href', data_link);
            }

            ele_review_pops.find('.rp__container').hide();
            ele_warning_plan.attr('style', 'display: none!important;')
            ele_onboarding_review_pops.show();
            ele_step_2_btn_done.prop('disabled', true);
            $('body').css('overflow', 'hidden')

            delayTime(500)  /*STEP 1*/
            .then(()=>{
                ele_review_popup_1.addClass('animation-review-pops-first');
                return delayTime(2500);
            })
            .then(()=>{
                ele_review_popup_1.hide();
                ele_review_popup_2.show().addClass('animation-review-pops');
                return delayTime(2500);
            })
            .then(()=>{
                ele_review_popup_2.hide();
                ele_review_popup_3.show().addClass('animation-review-pops');
                return delayTime(2500);
            })
            .then(()=>{
                ele_review_pops_step_1.fadeOut(500);
                $('body').css('overflow', '')
                $('html, body').animate({
                    scrollTop: 0
                }, 0);
                ele_topbar.addClass('top-bar-wrap-center');
                $('.ob-step-2-follow-1, .ob-step-2-follow-2, .ob-step-2-follow-3, .ob-step-2-follow-4').addClass('hide-follow-ob');
                return delayTime(1500);
            })   /*END: STEP 1*/
            .then(()=>{ /*STEP 2*/
                $('.ob-step-2-follow-1').addClass('animation-follow-ob');
                return delayTime(2500);
            })
            .then(()=>{
                $('.ob-step-2-follow-2').addClass('animation-follow-ob');
                return delayTime(2000);
            })
            .then(()=>{
                ele_review_popup_1_step2.addClass('ob-reviews-pops-left-to-right-20');
                return delayTime(2000);
            })
            .then(()=>{
                ele_review_popup_2_step2.show().addClass('ob-reviews-pops-left-to-right-20');
                return delayTime(2000);
            })
            .then(()=>{
                ele_review_popup_3_step2.show().addClass('ob-reviews-pops-left-to-right-20');
                return delayTime(2000);
            })
            .then(()=>{
                ele_review_popup_1_step2.addClass('opacity04')
                ele_review_popup_3_step2.addClass('opacity04')
                ele_review_popup_2_step2.addClass('border-orange')
                return delayTime(2000);
            })
            .then(()=>{
                $('.ob-step-2-follow-3').addClass('animation-follow-ob');
                return delayTime(2000);
            })
            .then(()=>{
                ele_switch_input.prop('checked', true);
                return delayTime(2000);
            })
            .then(()=>{
                $('.ob-step-2-follow-4').addClass('animation-follow-ob');
                return delayTime(2000);
            })
            .then(()=>{
                ele_checkbox_input.prop('checked', true);
                return delayTime(2000);
            })
            .then(()=>{
                ele_step_2_btn_done.prop('disabled', false);
                ele_step_2_btn_done.append("<div class='onboarding__pulse'><span></span></div>");
            }) /*END: STEP 2*/

            /*STEP 3*/
            ele_step_2_btn_done.click(function(){
                ele_review_pops_step_2.hide();
                ele_review_pops_step_3.show();
                let ele_step3_header = $('.ob-review-pops-step-3__header');
                let ele_step3_col_review_pops = $('.ob-review-pops-step-3__content .col-review-pops');
                let ele_step3_col_chart = $('.ob-review-pops-step-3__content .col-chart');
                let ele_step3_col_result = $('.ob-review-pops-step-3__content .col-result');
                $('html, body').animate({
                    scrollTop: 0
                }, 0);
                delayTime(500)
                .then(()=>{
                    ele_step3_header.addClass('animation-follow-ob');
                    return delayTime(2500);
                })
                .then(()=>{
                    ele_step3_col_review_pops.addClass('ob-reviews-pops-left-to-right');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-review-pops-follow-1').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-review-pops-follow-2').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-review-pops-follow-3').addClass('animation-follow-ob');
                    return delayTime(1000);
                })
                .then(()=>{
                    ele_review_popup_1_step3.addClass('animation-review-pops-first');
                    return delayTime(2500);
                })
                .then(()=>{
                    ele_review_popup_1_step3.hide();
                    ele_review_popup_2_step3.show().addClass('animation-review-pops');
                    return delayTime(2500);
                })
                .then(()=>{
                    ele_review_popup_2_step3.hide();
                    ele_review_popup_3_step3.show().addClass('animation-review-pops-last');
                    return delayTime(3000);
                })
                .then(()=>{
                    ele_step3_col_chart.addClass('ob-reviews-pops-left-to-right');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-1').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-2').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-3').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-4').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-5').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-6').addClass('animation-follow-ob');
                    return delayTime(2000);
                })
                .then(()=>{
                    $('.col-chart-follow-7').addClass('animation-follow-ob');
                    return delayTime(3000);
                })
                .then(()=>{
                    ele_step3_col_result.addClass('ob-reviews-pops-left-to-right');
                    setActiveSectionOnboarding('section_fine');
                    $('.js-btn-end-on-review-pops').click(function(){
                        localStorage.removeItem(KEY_ONBOARDING_REVIEW_POPS);
                    })
                }) /*END: STEP 3*/
            })
        }
    }

    function delayTime(time){
        return new Promise((relsove, reject) => {
            setTimeout(relsove, time);
        })
    }

    $(document).on('keyup',function(evt) {
        if (evt.keyCode == 27) {
           $('#onboarding-install-alireviews-modal').modal('hide');
        }
    });

    function checkFinishOnboarding(){
        let number_section_finish = 0;
        let ele_dashboard_onboarding = $('.dashboard__onboarding');
        let arrSectionDone = [];
        if($(".dashboard__onboarding #onboarding__install-alireviews").hasClass('active')){
            number_section_finish += 1;
            arrSectionDone.push({title: 'Install Review Box'})
        }
        if($("#onboarding__import-reviews").hasClass('active')){
            number_section_finish += 1;
            arrSectionDone.push({title: 'Import Review From AliExpress'})
        }
        if($("#onboarding__auto-update-reviews").hasClass('active')){
            number_section_finish += 1;
            arrSectionDone.push({title: 'Auto Update Reviews'})
        }
        if($("#onboarding__import-reviews-csv").hasClass('active')){
            number_section_finish += 1;
            arrSectionDone.push({title: 'Mass Import Reviews From File'})
        }
        if($("#onboarding__email-campaign").hasClass('active')){
            number_section_finish += 1;
            arrSectionDone.push({title: 'Create Email Campaign'})
        }
        if($("#onboarding__review-pops").hasClass('active')){
            number_section_finish += 1;
            arrSectionDone.push({title: 'Create Review Pops'})
            $('#onboarding__review-pops .icon-review-pop').attr('src',`${CDN}/images/onboarding/review-pop-done.png`).addClass('icon-review-pop-done');
        }
        if($("#onboarding__rating-app").hasClass('active-rating')){
            number_section_finish += 1;
            arrSectionDone.push({title: 'Make Our Day'})
        }

        let ob_dot_wrap = document.querySelector('.dashboard__onboarding-time-line');
        let ob_dot = document.querySelectorAll('.dashboard__onboarding-time-line .ob-dot');
        let ob_dot_icon = document.querySelectorAll('.dashboard__onboarding-time-line .ob-dot .ob-dot__icon');
        let btn_close = document.querySelector('.dashboard__onboarding__wrap .button--close');
        let arrIconClass = ['fas alireview-fa-bread-loaf', 'fas alireview-fa-cheese', 'fas alireview-fa-egg-fried', 'fas alireview-fa-bacon', 'fas alireview-fa-salad', 'fas alireview-fa-sandwich'];
        btn_close.style.display = 'none';
        
        arrSectionDone.forEach((item, index) => {
            ob_dot_icon[index].innerHTML = handleOnBoardingTimeLine(item.title, index + 1);
            ob_dot_icon[index].classList.add('ob-dot__icon-hide');
            if(index < 6){
                ob_dot[index].classList.add('active');
            }
            if(index == 6){
                btn_close.style.display = 'block';
                ob_dot_wrap.classList.add('active');
            }
        })
    }

    function handleOnBoardingTimeLine(title, icon){
        let html = `
        <div class="dot__icon-done">
            <span class="number">${icon}</span>
            <div class="dot__tooltip">
                ${title}
            </div>
        </div>
        `;
        return html;
    }

    function handleActiveSectionOnboarding(){
        $.ajax({
            url: `${appUrl}/step-on-boarding?type=get`,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (res) {
                console.log("handleActiveSectionOnboarding", res);
                let result = res.data;
                if(result.section_one){
                    $(".dashboard__onboarding #onboarding__install-alireviews").addClass('active');
                }
                if(result.section_two){
                    $(".dashboard__onboarding #onboarding__import-reviews-csv").addClass('active');
                }
                if(result.section_third){
                    $(".dashboard__onboarding #onboarding__import-reviews").addClass('active');
                }
                if(result.section_four){
                    $(".dashboard__onboarding #onboarding__email-campaign").addClass('active');
                }
                if(result.section_fine){
                    $(".dashboard__onboarding #onboarding__review-pops").addClass('active');
                }
                if(result.section_six){
                    $(".dashboard__onboarding #onboarding__rating-app").addClass('active-rating');
                }
                if(result.section_seven){
                    $(".dashboard__onboarding #onboarding__auto-update-reviews").addClass('active');
                }
                checkFinishOnboarding();
            },
            error : function (error) {
                console.log("error", error)
            }
        });
    }

    function setActiveSectionOnboarding(section){
        $.ajax({
            url: `${appUrl}/step-on-boarding?type=set&${section}=1`,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (res) {
                console.log("setActiveSectionOnboarding res", res)
            },
            error : function (error) {
                console.log("error", error)
            }
        });
    }

    function setDisplayOnboarding(is_display){
        $.ajax({
            url: `${appUrl}/display-boarding?type=set&display=${is_display}`,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (res) {
                console.log("setDisplayOnboarding res", res)
            },
            error : function (error) {
                console.log("error", error)
            }
        });
    }

    function getDisplayOnboarding(){
        $.ajax({
            url: `${appUrl}/display-boarding?type=get`,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (res) {
                console.log("getDisplayOnboarding res", res)
                if(res.data.status){
                    $('.dashboard__onboarding').addClass('open');
                }else{
                    handleHideTableOnboarding();
                }
                handleHighlightSectionOnboarding();
            },
            error : function (error) {
                console.log("error", error)
            }
        });
    }

    function clearCacheEventChoosePlane(){
        $.ajax({
            url: `${appUrl}/update-event-choose-plan?event_choose_plan=true`,
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
            },
            success: function (res) {
                console.log("clearCacheEventChoosePlane res", res)
            },
            error : function (error) {
                console.log("error", error)
            }
        });
    }

    function handleEventChoosePlan(){
        /**
         * Kiểm tra nếu có sự kiện hiện popup welcome thì không hiện popup up/down
         */
        if(!localStorage.getItem(KEY_INITIAL_SETUP_ONBOARDING)){
            let ele_onboarding_install_alireviews_modal = $("#onboarding-install-alireviews-modal");
            if(val_event_adapt_plan =='adapt'){
                val_event_choose_plan = val_event_adapt_plan;
            }
            if(val_event_choose_plan){
                ele_onboarding_install_alireviews_modal.find(".dashboard__onboarding__info-icon").css({'display': 'none '});
                ele_onboarding_install_alireviews_modal.modal('show');
                let html_content_welcome = '';
                if(val_event_choose_plan ==='adapt'){
                    html_content_welcome += `<h3>Successfully switched Shopify plan</h3>
                                        <p class="note mar-b-15">
                                            All things are well prepared for you to get started.
                                        </p>`;
                    $(".onboarding__wellcome__img").css("display", "none");
                    $(".modal-body__title img").css("display", "block");
                    $(".onboarding__wellcome__footer button").text("Get Started");
                    $(".modal-body__title img").css("margin-left", "165px");
                }
                else if(val_event_choose_plan === 'up'){
                    html_content_welcome += `<h3>Successfully upgraded</h3>
                                        <p class="note mar-b-15">
                                            Let us help you grow even better with our exclusive features!
                                        </p>`;
                    $(".onboarding__wellcome__img").css("display", "none");
                    $(".modal-body__title img").css("display", "block");
                    $(".onboarding__wellcome__footer button").text("Get Started");


                }else{
                    html_content_welcome += `<h3>Change of plan</h3>
                                        <p class="note mar-b-15">
                                            Didn’t have great experiences with previous plan?</br> Let us know if you need any support
                                        </p>`;
                    $(".onboarding__wellcome__img").css("display", "none");
                    $(".modal-body__title img").css("display", "block");
                    $(".modal-body__title img").css("margin-left", "110px");
                    $(".onboarding-modal#onboarding-install-alireviews-modal .modal-dialog").css("width", "446px");
                    $(".onboarding__wellcome__footer button").text("Get Started");

                    ele_onboarding_install_alireviews_modal.find('.onboarding__wellcome .onboarding__wellcome__footer').append(`<p class="welcome__contact-support">Contact Support</p>`);
                    $('#onboarding-install-alireviews-modal .onboarding__wellcome .welcome__contact-support') && $('#onboarding-install-alireviews-modal .onboarding__wellcome .welcome__contact-support').on('click', function() {
                        var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
                        if( intercom_on_messager == null ) {
                            Intercom('show');
                        } else {
                            Intercom('hide');
                        }
                        ele_onboarding_install_alireviews_modal.modal('hide');
                    });
                }
                ele_onboarding_install_alireviews_modal.find('.onboarding__wellcome__content').html(html_content_welcome);
                $("#onboarding-install-alireviews-modal .onboarding__wellcome button").on('click', function(){
                    ele_onboarding_install_alireviews_modal.modal('hide');
                });
            }
        }

        clearCacheEventChoosePlane();
    }

    //NEW 5.2.1
    function handleHideTableOnboarding(){
        $('.dashboard__onboarding').removeClass('open');
        eventShowTableOnboarding();
    }

    function handleHideTableOnboardingOld(){
        let ele_icon_error = $('.sidebar-menu .alrv-support-menu .alireview-fa-exclamation-circle');
        if(location_pathname !== '/') {
            $.ajax({
                url: `${appUrl}/step-on-boarding?type=get`,
                type: 'GET',
                dataType: 'json',
                beforeSend: function () {
                },
                success: function (res) {
                    console.log("handleHideTableOnboarding handleActiveSectionOnboarding", res);
                    let result = res.data;
                    if (result.section_one && result.section_two && result.section_third && result.section_four && result.section_fine) {
                        ele_icon_error.hide();
                    }else{
                        // handleIconWaringMenuHelp();
                    }
                    eventShowTableOnboarding();
                },
                error: function (error) {
                    console.log("error", error)
                }
            });
            return;
        }
        $('.dashboard__onboarding').removeClass('open');

        if(finish_all_section_onboarding){
            ele_icon_error.hide();
        }else{
            // handleIconWaringMenuHelp();
        }
        eventShowTableOnboarding();
    }

    function eventShowTableOnboarding(){
        $('.sidebar-menu .js-onboarding-tutorial a').on('click', function(e){
            setDisplayOnboarding(1);
            if(location.pathname !== '/'){
                location.href = appUrl;
            }else{
                e.preventDefault();
            }
            
            $(".dashboard__onboarding").addClass('open');
        });
    }

    function handleHideTableOnboardingOld(){
        let ele_user_menu = $('.main-header li.user-menu');
        let ele_user_menu_li_second = ele_user_menu.find('ul.dropdown-menu li').eq(1);
        let ele_user_menu_icon = ele_user_menu.find('a.dropdown-toggle span.ali-icon-down');
        let html_quick_guide = '';
        if(location_pathname !== '/') {
            $.ajax({
                url: `${appUrl}/step-on-boarding?type=get`,
                type: 'GET',
                dataType: 'json',
                beforeSend: function () {
                },
                success: function (res) {
                    console.log("handleHideTableOnboarding handleActiveSectionOnboarding", res);
                    let result = res.data;
                    if (result.section_one && result.section_two && result.section_third) {
                        html_quick_guide += `<li id="menu-user__quick-guide">
                                    <a>
                                        <span>Quick guide</span>
                                    </a>
                                </li>`;
                    }else{
                        html_quick_guide += `<li id="menu-user__quick-guide">
                                    <a>
                                        <span>Quick guide</span>
                                        <i class="material-icons">error</i>
                                    </a>
                                </li>`;
                        ele_user_menu_icon.append(`<i class="material-icons material-icons__info">error</i>`);
                    }
                    ele_user_menu_li_second.after(html_quick_guide);
                    eventShowTableOnboarding();
                },
                error: function (error) {
                    console.log("error", error)
                }
            });
            return;
        }
        $('.dashboard__onboarding').removeClass('open');

        if(finish_all_section_onboarding){
            html_quick_guide += `<li id="menu-user__quick-guide">
                                    <a>
                                        <span>Quick guide</span>
                                    </a>
                                </li>`;
        }else{
            html_quick_guide += `<li id="menu-user__quick-guide">
                                    <a>
                                        <span>Quick guide</span>
                                        <i class="material-icons">error</i>
                                    </a>
                                </li>`;
            ele_user_menu_icon.append(`<i class="material-icons material-icons__info">error</i>`);
        }
        ele_user_menu_li_second.after(html_quick_guide);
        eventShowTableOnboarding();
    }

    function eventShowTableOnboardingOld(){
        let ele_user_menu = $('.main-header li.user-menu');
        let html_tooltip_quick_guide = `<div class="tooltip__quick-guide">
                                            <p>You can comeback to this <b>Quick guide</b> anytime right here</p>
                                            <button type="button" class="button button--primary">Got it!</button>
                                        </div>`;
        if(!localStorage.getItem(KEY_GO_IT_QUICK_GUIDE)){
            ele_user_menu.append(html_tooltip_quick_guide);
            $('.tooltip__quick-guide button').off();
            $('.tooltip__quick-guide button').on('click', function(){
                $('.tooltip__quick-guide').remove();
                localStorage.setItem(KEY_GO_IT_QUICK_GUIDE, 'true');
            });
        }

        $('.tooltip__quick-guide b, #menu-user__quick-guide a').off();
        $('.tooltip__quick-guide b, #menu-user__quick-guide a').on('click', function(){
            setDisplayOnboarding(1);
            if(location.pathname !== '/'){
                location.href = appUrl;
            }
            ele_user_menu.find('.tooltip__quick-guide').remove();
            ele_user_menu.find('#menu-user__quick-guide').remove();
            ele_user_menu.find('.material-icons__info').remove();
            $(".dashboard__onboarding").addClass('open');
        });
    }

    function handleHighlightSectionOnboarding(){
        let ele_1 = $('#onboarding__install-alireviews');
        let ele_2 = $('#onboarding__mini-tour');
        let ele_3 = $('#onboarding__import-reviews');
        if(ele_1.hasClass('active')){
            // ele_2.addClass('highlight-section-onboarding');
            // if(ele_2.hasClass('active')){
            //     ele_3.addClass('highlight-section-onboarding');
            // }
            ele_3.addClass('highlight-section-onboarding');
        }else{
            ele_1.addClass('highlight-section-onboarding');
        }
    }

    function checkReviewBoxVisibility(){
        let ele_check_review_box = $('#onboarding-install-alireviews-modal .onboarding__check-review-box');
        let ele_check_review_box_has_product = ele_check_review_box.find('.onboarding__check-review-box__has-product');
        let ele_check_review_box_no_product = ele_check_review_box.find('.onboarding__check-review-box__no-product');
        if(link_product_any == ''){
            ele_check_review_box_has_product.hide();
            ele_check_review_box_no_product.show();
        }else{
            ele_check_review_box_has_product.show();
            ele_check_review_box_no_product.hide();
        }
    }

    function handleOnboardingInstallAliReviews(){
        let ele_onboarding_install_alireviews_modal = $("#onboarding-install-alireviews-modal");
        let height_content = 800;
        let max_height_content_1 = 800;
        let max_height_content_2 = 385;
        let min_height_content_1 = 580;
        let min_height_content_2 = 160;

        if(link_product_any == ''){
            max_height_content_2 = 410;
        }
        $('#onboarding__install-alireviews').on('click', function(){
            ele_onboarding_install_alireviews_modal.find(".modal-content").css({'border': '2px solid #00C35C'});
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': `${max_height_content_2}px`, 'height': `${max_height_content_2}px`, 'width': '650px', 'max-width': '650px'}); 
            ele_onboarding_install_alireviews_modal.modal('show');
            $(".onboarding__wellcome").animate({left: '-100%'}, 0);
            $(".onboarding__check-review-box").animate({left: '0px'}, 0);
            checkReviewBoxVisibility();
        });

        ele_onboarding_install_alireviews_modal.on('click', '.js-crb-check-now', function(){
            if(link_product_any){
                window.open(`${link_product_any}?ar-onboarding=true`);
            }
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content h3').html(`Did you see a <b>Review Box</b> ?`);
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .onboarding__crb__desc').text(`In case you didn’t, install Review Box with our instructions.`);
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-check-now').css({'display': 'none'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-install-now').css({'display': 'inline-block'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-looks-good').css({'display': 'inline-block'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .check-review-box-arrow-icon').css({'display': 'inline-block'});
        });

        ele_onboarding_install_alireviews_modal.on('click', '.js-crb-install-now', function(){
            ele_onboarding_install_alireviews_modal.find(".modal-content").css({'border': 'none'});
            ele_onboarding_install_alireviews_modal.find(".dashboard__onboarding__info-icon").css({'display': 'none'});
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': `${max_height_content_2}px`});
            ele_onboarding_install_alireviews_modal.find(".button--close").css({'display': 'block'});
            $(".onboarding__check-review-box").animate({left: '-100%'});
            $(".fix-now__step-1").animate({left: '0px'});
        });

        ele_onboarding_install_alireviews_modal.on('click', '#fix-now__step-1__1', function(){
            let height = ele_onboarding_install_alireviews_modal.find('.modal-content').height();
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'height': `${height_content}px`, 'max-height': height});
            $(".fix-now__step-1").animate({left: '-100%'});
            $(".fix-now__step-2__1").animate({left: '0px'});
        });
        ele_onboarding_install_alireviews_modal.on('click', '#fix-now__step-1__2', function(){
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'height': `${height_content}px`, 'max-height': `${max_height_content_1}px`});
            $(".fix-now__step-1").animate({left: '-100%'});
            $(".fix-now__step-2__2").animate({left: '0px'});
        });

        ele_onboarding_install_alireviews_modal.on('hidden.bs.modal', function (e) {
            ele_onboarding_install_alireviews_modal.find(".modal-content .modal-body").animate({left: '100%'}, 0);
            ele_onboarding_install_alireviews_modal.find(".modal-content .onboarding__check-review-box").animate({left: '0'}, 0);
            if(link_product_any != ''){
                ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content h3').html(`Check if <b>Review Box</b> is installed`);
                ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .onboarding__crb__desc').text(`Check your Product page to see if Review Box is auto installed yet`);
            }
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-check-now').css({'display': 'inline-block'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-install-now').css({'display': 'none'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-looks-good').css({'display': 'none'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .check-review-box-arrow-icon').css({'display': 'none'});
            ele_onboarding_install_alireviews_modal.find(".modal-content").removeAttr('style');
            ele_onboarding_install_alireviews_modal.find(".dashboard__onboarding__info-icon").css({'display': 'block'});
            $('.dashboard__onboarding').addClass('open');
            $('#onboarding-install-alireviews-modal .panel-collapse').collapse('hide');
            if(link_product_any){
                if(!($(".dashboard__onboarding #onboarding__install-alireviews").hasClass('active'))){
                    $(".dashboard__onboarding #onboarding__install-alireviews").addClass('active');
                    checkFinishOnboarding();
                    setActiveSectionOnboarding('section_one')
                }
                handleHighlightSectionOnboarding();
            }
        });

        $("#js-contact-our-developers").on('click', function(){
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': `${max_height_content_1}px`});
            $(".fix-now__step-2__1").animate({left: '-100%'});
            $(".fix-now__step-2__2").animate({left: '0px'});
        });

        // $("#fix-now__step-1__1").hover(function(){
        //     $(this).find('img').attr('src', `${CDN}/images/onboarding/setting-icon-active.png`)
        // },function () {
        //     $(this).find('img').attr('src', `${CDN}/images/onboarding/setting-icon.png`)
        // })

        // $("#fix-now__step-1__2").hover(function(){
        //     $(this).find('img').attr('src', `${CDN}/images/onboarding/plane-icon-active.png`)
        // },function () {
        //     $(this).find('img').attr('src', `${CDN}/images/onboarding/plane-icon.png`)
        // })

        $("#onboarding-install-alireviews-modal .fix-now__step-2__1 .panel-title").on('click', 'a', function(){
            $('#onboarding-install-alireviews-modal .panel-collapse').collapse('hide');
            $('#onboarding-install-alireviews-modal .fix-now__step-2__1 .panel-title a').css({'pointer-events': 'none'});
            setTimeout(function(){
                $('#onboarding-install-alireviews-modal .fix-now__step-2__1 .panel-title a').removeAttr('style');
            }, 500);
        });

        $('#onboarding-install-alireviews-modal .collapse').on('show.bs.collapse', function(){
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': `${max_height_content_1}px`});
            ele_onboarding_install_alireviews_modal.find(".fix-now__step-2__1 .fix-now__content").css({'min-height': `${min_height_content_1}px`})
        })

        $('#onboarding-install-alireviews-modal .collapse').on('hide.bs.collapse', function(){
            ele_onboarding_install_alireviews_modal.find(".fix-now__step-2__1 .fix-now__content").css({'min-height': `${min_height_content_2}px`})
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': `${max_height_content_2}px`});
        })

        ele_onboarding_install_alireviews_modal.on('click', '.js-btn-back', function(){
            ele_onboarding_install_alireviews_modal.find('.modal-content').css({'max-height': `${max_height_content_2}px`});
            ele_onboarding_install_alireviews_modal.find(".fix-now__step-2__1 .fix-now__content").css({'min-height': `${min_height_content_2}px`})
            $(".fix-now__step-2__1, .fix-now__step-2__2").animate({left: '100%'});
            $(".fix-now__step-1").animate({left: '0px'});
            $('#onboarding-install-alireviews-modal .panel-collapse').collapse('hide');
        });

        ele_onboarding_install_alireviews_modal.on('click', '.js-btn-copy', function(){
            let $this = $(this);
            let ele_copy = $this.closest('li').find('.pre-code');
            copyToClipboard(ele_copy);
            $this.addClass('copy-code-clicked');
            setTimeout(function(){
                $this.removeClass('copy-code-clicked');
            }, 1000);
        });

        $("#js-submit-request-onboarding").attr("disabled", true);
        $("textarea#mail-request-onboarding").on("input", function(){
            if($(this).val().trim().length > 0){
                $("#js-submit-request-onboarding").attr("disabled", false);
            }else{
                $("#js-submit-request-onboarding").attr("disabled", true);
            }
            if($(this).val().trim().length > 2000){
                $(this).val($(this).val().substr(0,2000));
            }
        });

        ele_onboarding_install_alireviews_modal.on('click', '#js-submit-request-onboarding', function(){
            let val_desc = $("textarea#mail-request-onboarding").val();
            let problems_contacts = [];
            $.each($("input[name='problems_contacts']:checked"), function(){
                problems_contacts.push($(this).val());
            });
            $.ajax({
                url: `${appUrl}/send-mail-request`,
                type: 'POST',
                dataType: 'json',
                data : {
                    problems: problems_contacts,
                    description : val_desc,
                    _token : $('meta[name="csrf-token"]').attr('content')
                },
                beforeSend: function () {
                    $("#js-submit-request-onboarding").attr("disabled", true);
                },
                success: function (res) {
                    console.log("res", res)
                    $("#js-submit-request-onboarding").attr("disabled", false);
                    $("textarea#mail-request-onboarding").val('');
                    ele_onboarding_install_alireviews_modal.modal('hide');
                    if(res.status){
                        $.notify(
                            {
                                message: 'You successfully sent request to our developer.'
                            },
                            {
                                z_index: 999999,
                                timer: 2000,
                                type: "success"
                            }
                        );
                    }
                },
                error : function (error) {
                    console.log("error", error)
                }
            });
        });
    }

    function handleOnboardingMiniTour(){
        $("#onboarding__mini-tour").on('click', function () {
            let number_step = 1;
            let ele_menu_reviews = $('li[data-target="#reviews"]');
            let ele_submit_step = $("#onboarding-mini-tour-modal .modal-footer");
            if(ele_menu_reviews.hasClass('collapsed')){
                ele_menu_reviews.click();
            }
            $('body').addClass('onboarding-wrapper');
            $("#onboarding-mini-tour-modal").modal('show');
            handleOnboardingMiniTourStep(number_step);
            ele_submit_step.off();
            ele_submit_step.on('click', 'button', function(){
                number_step += 1;
                handleOnboardingMiniTourStep(number_step);
            });

        });
    }

    function handleOnboardingMiniTourStep(number){
        let $this = $("#onboarding-mini-tour-modal");
        let tag_menu_active =  $( `#reviews ul li:nth-child(${number})` );
        $this.find('.modal-footer > span i').text(number);
        tag_menu_active.addClass("onboarding__menu-active");
        switch (number) {
            case 1:
                $('html').animate({
                    scrollTop: 0
                }, 100);
                $('.main-sidebar .sidebar-menu').animate({
                    scrollTop: 0
                }, 200);
                setTimeout(function () {
                    offsetTopMinitour();
                }, 1000)
                break;
            case 2:
                $this.find(".modal-content #mini-tour-step-1").css({display: 'none'});
                $this.find(".modal-content #mini-tour-step-2").css({display: 'block'});
                offsetTopMinitour();
                break;
            case 3:
                $this.find(".modal-content #mini-tour-step-2").css({display: 'none'});
                $this.find(".modal-content #mini-tour-step-3").css({display: 'block'});
                offsetTopMinitour();
                break;
            case 4:
                $this.find(".modal-content #mini-tour-step-3").css({display: 'none'});
                $this.find(".modal-content #mini-tour-step-4").css({display: 'block'});
                offsetTopMinitour();
                break;
            default:
                $("#onboarding-mini-tour-modal").modal('hide');
                $('body').removeClass('onboarding-wrapper');
                $( `#reviews ul li:nth-child(${number - 1})` ).removeClass("onboarding__menu-active");
                $("#onboarding-mini-tour-modal .modal-dialog").removeAttr('style');
                $this.find(".modal-content #mini-tour-step-4").css({display: 'none'});
                $this.find(".modal-content #mini-tour-step-1").css({display: 'block'});
                if(!($(".dashboard__onboarding #onboarding__mini-tour").hasClass('active'))){
                    $(".dashboard__onboarding #onboarding__mini-tour").addClass('active');
                    checkFinishOnboarding();
                    setActiveSectionOnboarding('section_two')
                }
                handleHighlightSectionOnboarding();
        }

        function offsetTopMinitour(){
            if(number > 1){
                $( `#reviews ul li:nth-child(${number - 1})` ).removeClass("onboarding__menu-active");
            }
            let ele_reviews_offset_top = $("#reviews .onboarding__menu-active").offset().top;
            let offset_tab_active = ele_reviews_offset_top - ($('#onboarding-mini-tour-modal .modal-content').height() / 2) - 5;
            $("#onboarding-mini-tour-modal .modal-dialog").css({top: offset_tab_active + 'px'});
        }
    }

    function handleOnBoardingSlider(){
        let btn_next = $('.dashboard__onboarding .onboarding-slider-btn-next');
        let btn_prev = $('.dashboard__onboarding .onboarding-slider-btn-prev');
        let curr_slider = 1;
        btn_prev.hide();
        btn_next.click(function(){
            curr_slider += 1
            handleActiveSlider(curr_slider)
		});
		btn_prev.click(function(){
            curr_slider -= 1
            handleActiveSlider(curr_slider)
        });
    }

    function handleActiveSlider(index){
        let btn_next = $('.dashboard__onboarding .onboarding-slider-btn-next');
        let btn_prev = $('.dashboard__onboarding .onboarding-slider-btn-prev');
        if(index == 1){
            btn_prev.hide();
            btn_next.show();
            $('.dashboard__onboarding .onboarding-slider-1').animate({left: 0}, 0)
            $('.dashboard__onboarding .onboarding-slider-2').animate({left: "110%"}, 0)
        }
        else if(index == 2){
            btn_prev.show();
            btn_next.show();
            $('.dashboard__onboarding .onboarding-slider-1').animate({left: "-110%"}, 0)
            $('.dashboard__onboarding .onboarding-slider-2').animate({left:0}, 0)
            $('.dashboard__onboarding .onboarding-slider-3').animate({left:"110%"}, 0)
        }
        else if(index == 3){
            btn_prev.show();
            btn_next.hide();
            $('.dashboard__onboarding .onboarding-slider-2').animate({left: "-110%"}, 0)
            $('.dashboard__onboarding .onboarding-slider-3').animate({left:0}, 0)
        }
        $('.dashboard__onboarding-content').css({'pointer-events':'none'})
        setTimeout(function(){
            $('.dashboard__onboarding-content').css({'pointer-events':'unset'})
        }, 1100);
    }

    function hanldeOnboardingRatingApp(){
        $('#onboarding__rating-app .rating-app-wrap .full').click(function() {
            $('#modalRatingApp').modal('show');
            if(!($(".dashboard__onboarding #onboarding__rating-app").hasClass('active-rating'))){
                $(".dashboard__onboarding #onboarding__rating-app").addClass('active-rating');
                checkFinishOnboarding();
                setActiveSectionOnboarding('section_six')
            }
            switch(parseInt($(this).data('value'))){
                case 1:
                case 2:
                    $('#modalRatingApp .modal-body__step').animate({left: "-100%"}, 0)
                    $('#modalRatingApp #modal-body__step-two').animate({left: 0}, 0)
                    break;
                case 3:
                case 4:
                    $('#modalRatingApp .modal-body__step').animate({left: "-100%"}, 0)
                    $('#modalRatingApp #modal-body__step-three').animate({left: 0}, 0)
                    break;
                case 5:
                    $('#modalRatingApp .modal-body__step').animate({left: "-100%"}, 0)
                    $('#modalRatingApp #modal-body__step-four').animate({left: 0}, 0)
                    window.open(
                        "https://apps.shopify.com/ali-reviews?reveal_new_review=true",
                        "_blank"
                    );
                    break;
                default:
                    break;
            }
        });
    }

    function handleOnboardingImportReviews(){
        $("#onboarding__import-reviews").on('click', function () {
            localStorage.setItem(KEY_ONBOARDING_IMPORT_REVIEW, 'step_1');
            $('#spinnerOnBoardingModal').modal('show');
            setTimeout(() => {
                location.href = `${appUrl}/${path_name_manage_reviews}`;
            }, 2000);
        });
    }

    function handleOnboardingImportReviewsCSV(){
        $("#onboarding__import-reviews-csv").on('click', function () {
            localStorage.setItem(KEY_ONBOARDING_IMPORT_REVIEW, 'csv_step_1');
            $('#spinnerOnBoardingModal').modal('show');
            setTimeout(() => {
                location.href = `${appUrl}/${path_name_manage_reviews}`;
            }, 2000);
        });
    }

    function handleTopBarOnBoarding(){
        let html = `
        <div class="ob-topbar">
            <div class="ob-topbar__content d-flex">
                <div class="ob-topbar__body d-flex wrapper-space wrapper-space__20">
                    <div class="ob-topbar__notify ">
                        <div class="ob-topbar__notify--default"><i class="fas alireview-fa-info-circle"></i> <span>Tutorial Mode</span></div>
                    </div>
                    <div class="ob-topbar__button">
                        <button class="button js-btn-end-tour">End Tutorial</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        $('body.navside-fixed header.main-header').hide();
        $('.main-sidebar .sidebar-menu').css({'opacity': '0.4', 'pointer-events':'none'});
        let ele_import_reviews = $("#page-list-product-get-review");
        ele_import_reviews.prepend(html);
        //review_pops
        let ele_review_pops = $(".review-popup-rule-settings-page");
        ele_review_pops.prepend(html);
        //EmailCampaign
        let ele_email_campaign = $(".email-request-page");
        ele_email_campaign.prepend(html);
        //AutoUpdateReviews
        let ele_auto_reviews = $(".auto-update-review-settings-page");
        ele_auto_reviews.prepend(html);
        $('button.js-btn-end-tour').on('click', function(e){
            localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
            localStorage.removeItem(KEY_ONBOARDING_REVIEW_POPS);
            localStorage.removeItem(KEY_ONBOARDING_EMAIL_CAMPAIGN);
            localStorage.removeItem(KEY_ONBOARDING_AUTO_REVIEWS);
            window.location = appUrl;
        });
    }

    function htmlListProductSample(index){
        let html_product = `
        <tr id="product-item-${index}" class="fake-product-sample ">
            <td class="text-center fake-product-sample__checkbox">
                <label for="review-${index}" class="wrap-custom-box">
                    <input type="checkbox" data-index-stt="0" id="review-${index}" name="listProductCheck[]" value="${index}" data-source="" data-product-id="${index}" class="row-select review-approve-checked">
                    <span class="checkmark-ckb"></span>
                </label>
            </td>
            <td class="break-word">
                <div class="media">
                    <div class="media-left media-middle">
                        <img src="${CDN}/images/onboarding/product-sample-${index}.png" alt="" class="media-object img-rounded" style="width: 50px; height: 50px;">
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading fz13 fw500 p-realative mar-b-0"><a href="#">SAMPLE PRODUCT #${index}</a></h4>
                    </div>
                </div>
            </td>
            <td class="td-rating js-review-col">
                <div class="ob-rating-star-wrap">
                    <div class="ob-rating-star">
                        <i class="alr-icon-star ob-star-1"></i>
                        <i class="alr-icon-star ob-star-2"></i>
                        <i class="alr-icon-star ob-star-3"></i>
                        <i class="alr-icon-star ob-star-4"></i>
                        <i class="alr-icon-star ob-star-5"></i>
                    </div>
                    <span class="icon-icon_chat-room mar-r-3 fz13"><span class="product-item-total-review">0</span> reviews</span>
                </div>
                <div class="js-loading-bar-wrapper" style="display: none;">
                    <div class="loading-bar">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="status">
                        <div class="state"></div>
                        <div class="percentage"></div>
                    </div>
                </div>
            </td>
            <td>
                <div class="ctn-selectActionAllReviews">
                    <select class="form-control select2 unsearch selectActionAllReviews2 select2-hidden-accessible" tabindex="-1" aria-hidden="true">
                        <option value="">Action</option>
                        <option value="publishAllReviewsModal">Publish</option>
                    </select>
                </div>
            </td>
            <td>
                <button data-content="${index}" class="button button--primary js-btn-import-review">Import Reviews</button>
                <a href="#" class="button button--default-pink" style="padding-left: 8px; padding-right: 8px;">View</a>
            </td>
        </tr>`;
        return html_product;
    } 

    function htmlTableProductSample(){
        let html = `
        <table id="table-select-all-fake" class="table table-hover table-ali-custom table-mid table-pad-25 mar-b-15">
            <thead>
                <tr>
                    <th width="5%" class="text-center border-radius-tl">#</th>
                    <th>Product Name</th>
                    <th width="15%" class="border-radius-tr">Reviews</th>
                    <th width="15%" class="js-width-bulk-setting">Bulk Settings</th>
                    <th width="19%" class="js-width-action" style="min-width: 210px;">Actions</th>
                </tr>
            </thead>
            <tbody>`;
        
        let html_list_product_sample = '';
        for(let i = 1; i<4; i++){
            html_list_product_sample += htmlListProductSample(i);
        }
        html += html_list_product_sample;
        html += `
            </tbody>
        </table>
        `;
        let ele_import_reviews = $("#page-list-product-get-review");
        let table_wrap = ele_import_reviews.find('.table-responsive-xxs');
        if(table_wrap.length > 0){
            table_wrap.find('#table-select-all').hide();
            table_wrap.append(html);
        }else{
            let table_wrap_fake = `
                <div class="table-responsive-xxs">
                ${html}
                </div>
            `;
            ele_import_reviews.append(table_wrap_fake);
            ele_import_reviews.find('.product-search-no-review').hide();
        }
    }

    function countCheckSampleProduct(){
        var countChecked = 0;
        $('td.fake-product-sample__checkbox input[type=checkbox]').each(function() {
            if ( $(this).is(':checked') ) {
                countChecked++;
            }
        });
        return countChecked;
    }

    // NEW 5.2.1: handle step onboarding import review CSV
    function handleOnboardingLinkImportReviewsCSV(){
        let path_name = location.pathname;
        if(path_name === `/${path_name_manage_reviews}` && (localStorage.getItem(KEY_ONBOARDING_IMPORT_REVIEW) === 'csv_step_1')){
            handleTopBarOnBoarding();
            let ele_import_reviews = $("#page-list-product-get-review");
            htmlTableProductSample()
            ele_import_reviews.find('.ali-pagination').hide();
            $(".select2.unsearch").select2({
                minimumResultsForSearch: Infinity
            });
            
            $('.status-action-wrap .tooltip-upgrade-plan').remove();
            
            let count_sample_product = 0;
            let ele_status_action = $('.search-product-form .status-action-wrap');
            let ele_modal_import_review_csv = $("#modalImportReviewCSV");
            let product_checkbox = $('td.fake-product-sample__checkbox input[type=checkbox]');
            $('.fake-product-sample__checkbox').addClass('none-event');
            product_checkbox.on('change', function(e){
                let parent = $(this).parents('#table-select-all-fake tbody tr');
                console.log(parent);
                if($(this).is(':checked')){
                    parent.addClass('row-selected');
                }else{
                    parent.removeClass('row-selected');
                }
                count_sample_product = countCheckSampleProduct();
                $('#result-total-reviews-checked >div.number-reviews:first').text(count_sample_product);
                if(count_sample_product >0){
                    ele_status_action.show();
                    if($('.status-action-wrap .onboarding__pulse').length == 0){
                        ele_status_action.append("<div class='onboarding__pulse'><span></span></div>");
                    }
                }else{
                    ele_status_action.hide();
                    ele_status_action.find('.onboarding__pulse').remove();
                }
            });

            $('.search-product-form .input-group--search, .search-product-form .action-group, .search-product-form a.pull-right, .ctn-selectActionAllReviews, #table-select-all-fake button, #table-select-all-fake a.button, .alr-page-wrap').addClass('disabled-action');
            $('#result-total-reviews-checked').append("<div class='onboarding__pulse'><span></span></div>");
            $('.wrapper-tbl-action input[type=checkbox]').on('change', function(e){
                $('label#slc_all_product_wrap').hide();
                if($(this).is(':checked')){
                    $('table#table-select-all-fake tbody tr').addClass('row-selected');
                    $('.fake-product-sample input[type=checkbox]').prop('checked', true);
                    $('#result-total-reviews-checked >div.number-reviews').text(3);
                    $('#result-total-reviews-checked').find('.onboarding__pulse').remove();
                    count_sample_product = 3;
                }else{
                    $('table#table-select-all-fake tbody tr').removeClass('row-selected');
                    $('.fake-product-sample input[type=checkbox]').prop('checked', false);
                    $('#result-total-reviews-checked >div.number-reviews:first').text(0);
                    $('#result-total-reviews-checked >div.number-reviews:last').text(3);
                    $('#result-total-reviews-checked').append("<div class='onboarding__pulse'><span></span></div>");
                    count_sample_product = 0;
                }
                if(count_sample_product >0){
                    ele_status_action.show();
                    if($('.status-action-wrap .onboarding__pulse').length == 0){
                        ele_status_action.append("<div class='onboarding__pulse'><span></span></div>");
                    }
                }else{
                    ele_status_action.hide();
                    ele_status_action.find('.onboarding__pulse').remove();
                }
            });

            $('#result-total-reviews-checked >div.number-reviews:last').text(3);

            $('#actionProduct option[value="publish"], #actionProduct option[value="unpublish"], #actionProduct option[value="delete"]').prop('disabled',true);
            $('#actionProduct option[value="import-file"]').prop('disabled',false);
            $('#actionProduct').select2({
                placeholder: "Action",
                minimumResultsForSearch: Infinity
            });

            $('#actionProduct').on('select2:open', function (e) {
                ele_status_action.find('.onboarding__pulse').addClass('select-import-file');
                $('#select2-actionProduct-results').addClass('onboarding');
            });

            $('#actionProduct').on('select2:close', function (e) {
                ele_status_action.find('.onboarding__pulse').removeClass('select-import-file');
            });

            $("#actionProduct").on("change", function(e) {
                e.preventDefault();
                var action = $(this).val();
                if(action == 'import-file'){
                    $('.ob-sample__action, .ob-sample__action-cta').css('z-index', '0');
                    let ele_step_1 = ele_modal_import_review_csv.find('.modal-body__step-1');
                    let ele_import_review_btn = ele_modal_import_review_csv.find('.modal-body__cta .btn-import-review-step1');
                    let ele_choose_file_btn = ele_modal_import_review_csv.find('label.custom-file-upload-btn');
                    let ele_back_step_1 = ele_modal_import_review_csv.find('.modal-body__cta .button--default');
                    let ele_import_review_btn_step2 = ele_modal_import_review_csv.find('.btn-import-review-step2');
                    let ele_back_step_2 = ele_modal_import_review_csv.find('.btn-back-step2');
                    let ele_input_upload = ele_modal_import_review_csv.find('#file_upload_name span');
                    let ele_input_upload_loading = ele_modal_import_review_csv.find('#file_upload_name .lds-dual-ring');

                    ele_back_step_1.attr('disabled', true);
                    ele_back_step_2.attr('disabled', true);
                    ele_choose_file_btn.addClass('disabled-action none-event');
                    ele_modal_import_review_csv.find('button.close').hide();
                    ele_step_1.append("<div class='onboarding__pulse'><span></span></div>");
                    ele_modal_import_review_csv.on('click', '.modal-body__step-1 a', function(e){
                        e.preventDefault();
                        let self = $(this);
                        ele_step_1.find('.onboarding__pulse').remove();
                        self.html('Downloading...<i class="far animation-download alireview-fa-long-arrow-down"></i>');
                        delayTime(2000)
                        .then(()=>{
                            self.addClass('ob-download-done').html('Template downloaded <i class="far alireview-fa-check"></i>');
                            ele_input_upload.hide();
                            ele_input_upload_loading.show();
                            return delayTime(2000);
                        })
                        .then(()=>{
                            ele_input_upload_loading.hide();
                            ele_input_upload.show().html('alireviews_import_template.csv <i class="far alireview-fa-check"></i>').addClass('has-file-name');
                            ele_input_upload.parent().addClass('animation-follow-input-file');
                            return delayTime(3000);
                        })
                        .then(()=>{
                            ele_import_review_btn.append("<div class='onboarding__pulse'><span></span></div>");
                            ele_import_review_btn.attr('disabled', false);
                        })
                    });

                    ele_modal_import_review_csv.on('click', '.btn-import-review-step1', function(e){
                        ele_modal_import_review_csv.find('.modal-dialog').css({'margin-top': '100px'});
                        GenerateReview.csv_setting.csv_choose_import_method = 0;
                        GenerateReview.csv_setting.csv_get_good_rating_star = 5;
                        GenerateReview.csv_setting.csv_get_number_review_from = 50;
                        GenerateReview.csv_setting.csv_get_number_review_to = 200;
                        GenerateReview.csv_setting_all_country = {"US":"United States","PT":"Portugal","IL":"Israel","DE":"Germany","NL":"Netherlands","KR":"Korea, Republic of","RU":"Russian Federation","JP":"Japan","FR":"France","ES":"Spain","CN":"China","VN":"Viet Nam"};
                        GenerateReview.step = 'csv_step_filter_review';
                        ele_modal_import_review_csv.find('input').addClass('none-event');
                        ele_modal_import_review_csv.find('.js-ob-follow-2').addClass('none-event');
                        ele_import_review_btn_step2.attr('disabled', true);
                        $('.js-ob-follow-1').css({'margin-top':'25px'});
                        $('.js-ob-follow-1, .js-ob-follow-2, .js-ob-follow-3, .js-ob-follow-4, .js-ob-follow-5').addClass('hide-follow-ob');
                        $('.js-ob-follow-1-done, .js-ob-follow-2-done, .js-ob-follow-3-done, .js-ob-follow-4-done, .js-ob-follow-5-done').append('<i class="far alireview-fa-check"></i>').addClass('none-event');

                        $('.js-ob-follow-1').addClass('animation-follow-ob');
                        delayTime(3000)
                        .then(()=>{
                            $('.js-ob-follow-2').addClass('animation-follow-ob');
                            return delayTime(3000);
                        })
                        .then(()=>{
                            $('.js-ob-follow-3').addClass('animation-follow-ob');
                            return delayTime(3000);
                        })
                        .then(()=>{
                            $('.js-ob-follow-4').addClass('animation-follow-ob');
                            return delayTime(3000);
                        })
                        .then(()=>{
                            $('.js-ob-follow-5').addClass('animation-follow-ob');
                            return delayTime(3500);
                        })
                        .then(()=>{
                            ele_import_review_btn_step2.append("<div class='onboarding__pulse'><span></span></div>");
                            ele_import_review_btn_step2.attr('disabled', false);
                        })
                    });
                    
                    ele_modal_import_review_csv.on('click', '.btn-import-review-step2', function(e){
                        ele_modal_import_review_csv.modal('hide');
                        ele_import_reviews.find('.onboarding__pulse').remove();
                        ele_import_review_btn_step2.find('.onboarding__pulse').remove();
                        $(".fake-product-sample__checkbox input"). prop("checked", false);
                        $('table#table-select-all-fake tbody tr').removeClass('row-selected');
                        $('.status-action-wrap').hide();
                        $('.table-ali-custom tbody tr.fake-product-sample').addClass('finish-ob-csv');
                        $('.wrapper-tbl-action').css({"pointer-events": "none"});
                        handleAnimationFinishTourImport('file');
                        setActiveSectionOnboarding('section_two'); //Import File
                    });

                    $('#page-list-product-get-review').on('click', '.finish-tooltip .got-it-btn', function(e){
                        localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
                        window.location.reload();
                    });
                    $('#page-list-product-get-review').on('click', '.finish-tooltip .js-go-to-pricing', function(e){
                        localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
                    });
                    
                }else{
                    ele_modal_import_review_csv.find('.onboarding__pulse').remove();
                }
            });
                
        }
    }

    // NEW 5.2.1: handle onboarding Import Review AE
    function handleOnboardingLinkImportReviews(){
        let path_name = location.pathname;
        if(path_name === `/${path_name_manage_reviews}` && (localStorage.getItem(KEY_ONBOARDING_IMPORT_REVIEW) === 'step_1')){
            handleTopBarOnBoarding();
            let ele_import_reviews = $("#page-list-product-get-review");
            htmlTableProductSample();
            ele_import_reviews.find('.ali-pagination').hide();
            $(".select2.unsearch").select2({
                minimumResultsForSearch: Infinity
            });
            
            $('.status-action-wrap .tooltip-upgrade-plan').remove();
            
            $('.modal-import-review button.close').click(function(){
                window.location.reload();
            });

            let ele_modal_import_review = $("#modalImportReview");
            let ele_btn_import_reviews_first = ele_import_reviews.find('table#table-select-all-fake tbody tr:first-child td:last-child button');
            let ele_btn_import_reviews = ele_import_reviews.find('table#table-select-all-fake tbody tr td:last-child button');
            let ele_btn_import_aliexpress = ele_import_reviews.find('.type-add-review__aliexpress');
            let ele_btn_import_csv_file = ele_import_reviews.find('.type-add-review__csv');
            $('.search-product-form .input-group--search, .search-product-form .action-group, .search-product-form a.pull-right, .ctn-selectActionAllReviews, .fake-product-sample__checkbox .wrap-custom-box, #table-select-all-fake a.button, .search-product-form label.wrap-custom-box, .alr-page-wrap').addClass('disabled-action');
            $('#result-total-reviews-checked >div.number-reviews:last').text(3);

            ele_btn_import_reviews_first.css({position: 'relative'});
            ele_btn_import_reviews_first.append("<div class='onboarding__pulse'><span></span></div>");
            ele_btn_import_aliexpress.append("<div class='onboarding__pulse'><span></span></div>");
            ele_btn_import_csv_file.addClass('disabled-action');

            var product_no = '';
            ele_btn_import_reviews.on('click', function(){
                GenerateReview.step = 2;
                GenerateReview.is_add_review = 'success';
                product_no = $(this).attr('data-content');
                $("#modalImportReview").modal({
                    backdrop: "static",
                    keyboard: false
                });
                //handle modal import review
                handleModalImportReview(product_no);
            });
        }
    }

    function handleModalImportReview(product_no){
        let ele_modal_import_review = $("#modalImportReview");
        ele_modal_import_review.on('shown.bs.modal', function (e) {
            if(!turn_off_flow_modal_import_review) {
                ele_modal_import_review.find('.modal-content').addClass('modal-import-review__onboarding');
                let ele_modal_body_content = $("#modalImportReview").find('.modal-content .modal-body__content.step-2');
                ele_modal_body_content.hide();
                ele_modal_import_review.find('.button--close').hide();
                ele_modal_import_review.find('.close').hide();
                let ele_modal_import_review_form = ele_modal_import_review.find('.modal-content .modal-body form').eq(0);
                let input_aliexpress_import_review = ele_modal_import_review_form.find('input[name="aliexpress-url"]');
                let ele_loading = ele_modal_import_review_form.find('.modal-import-review__onboarding__product-url .lds-dual-ring');
                let ele_btn_import_later_modal = ele_modal_import_review_form.find('.button--default');
                let ele_btn_go_to_setting = ele_modal_import_review.find('.js-go-to-setting-ob');
                let ele_btn_import_review_modal = ele_modal_body_content.find('.button--primary');
                let ele_js_ob_1 = ele_modal_import_review.find('.js-ob-1');
                let ele_js_ob_2 = ele_modal_import_review.find('.js-ob-2');
                ele_btn_go_to_setting.prop('disabled', true);
                ele_btn_import_later_modal.remove();

                //STEP 1
                if(ele_js_ob_1.find('.alireview-fa-check').length == 0){
                    ele_js_ob_1.append('<i class="far alireview-fa-check"></i>');
                }
                
                delayTime(0)
                .then(()=>{
                    ele_js_ob_1.addClass('animation-ob-step-1__first');
                    return delayTime(2500);
                })
                .then(()=>{
                    ele_js_ob_1.find('.product-demo__content .span-copy-code').addClass('copy-code-clicked');
                    return delayTime(1500);
                })
                .then(()=>{
                    ele_js_ob_1.find('.product-demo__content .span-copy-code').removeClass('copy-code-clicked');
                    return delayTime(1500);
                })
                .then(()=>{
                    ele_js_ob_2.addClass('animation-ob-step-1__second');
                    return delayTime(1500);
                })
                .then(()=>{
                    input_aliexpress_import_review.attr('placeholder', '').addClass('none-event');
                    ele_loading.show();
                    return delayTime(1500);
                })
                .then(()=>{
                    ele_loading.hide();
                    input_aliexpress_import_review.val(link_demo_import_review);
                    GenerateReview.aliexpress = link_demo_import_review;
                    if(ele_js_ob_2.find('.alireview-fa-check').length == 0){
                        ele_js_ob_2.last().append('<i class="far alireview-fa-check"></i>');
                    }
                    ele_js_ob_2.addClass('animation-ob-step-1__three');
                    return delayTime(1500);
                })
                .then(()=>{
                    ele_btn_go_to_setting.prop('disabled', false);
                    ele_btn_go_to_setting.css({position: 'relative'});
                    ele_btn_go_to_setting.append("<div class='onboarding__pulse'><span></span></div>");
                    return delayTime(2500);
                })
                //END: STEP 1
                //STEP 2
                ele_btn_go_to_setting.on('click', function(){
                    ele_modal_body_content.show();
                    ele_btn_import_review_modal.prop('disabled', true);
                    $('.modal-body__content .modal-body__title, .modal-body__content .js-import-review-btn-wrap').show();
                    ele_modal_import_review.find('input').addClass('none-event');
                    ele_modal_import_review.find('.js-ob-follow-5-done, .js-ob-follow-6-done').addClass('none-event');
                    ele_modal_import_review.find('.modal-dialog').css({'margin-top': '100px'});
                    ele_btn_go_to_setting.find('.onboarding__pulse').remove();
                    GenerateReview.settings.choose_import_method = 0;
                    GenerateReview.settings.get_number_review_from = 50;
                    GenerateReview.settings.get_number_review_to = 200;
                    GenerateReview.settings.get_only_picture = ["true","false"];
                    GenerateReview.settings.get_only_content = ["true","false"];
                    GenerateReview.settings.get_good_rating_star = 5;
                    GenerateReview.settings.translate_reviews = 1;

                    $('.modal-import-review__onboarding-content, hr').hide();

                    $('.js-ob-follow-0, .js-ob-follow-1, .js-ob-follow-2, .js-ob-follow-3, .js-ob-follow-4, .js-ob-follow-5, .js-ob-follow-6, .js-ob-follow-7, .js-ob-follow-8, .js-ob-follow-9').addClass('hide-follow-ob');
                    $('.js-ob-follow-0-done, .js-ob-follow-1-done, .js-ob-follow-2-done, .js-ob-follow-3-done , .js-ob-follow-4-done, .js-ob-follow-5-done, .js-ob-follow-6-done, .js-ob-follow-7-done, .js-ob-follow-8-done, .js-ob-follow-9-done').append('<i class="far alireview-fa-check"></i>');

                    delayTime(0)
                    .then(()=>{
                        $('.js-ob-follow-0').addClass('animation-follow-ob');
                        return delayTime(3000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-1').addClass('animation-follow-ob');
                        return delayTime(3000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-2').addClass('animation-follow-ob');
                        return delayTime(3000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-3').addClass('animation-follow-ob-2s');
                        return delayTime(2000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-4').addClass('animation-follow-ob-2s');
                        return delayTime(2000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-5').addClass('animation-follow-ob');
                        return delayTime(2000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-6').addClass('animation-follow-ob');
                        return delayTime(2000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-7').addClass('animation-follow-ob');
                        return delayTime(3000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-8').addClass('animation-follow-ob');
                        return delayTime(3000);
                    })
                    .then(()=>{
                        $('.js-ob-follow-9').addClass('animation-follow-ob');
                        return delayTime(3500);
                    })
                    .then(()=>{
                        ele_btn_import_review_modal.prop('disabled', false);
                        ele_btn_import_review_modal.css({position: 'relative'});
                        ele_btn_import_review_modal.append("<div class='onboarding__pulse'><span></span></div>");
                    })
                });
                //END: STEP 2

                ele_btn_import_review_modal.on('click', function(){
                    ele_modal_import_review.modal('hide');
                    $("#page-list-product-get-review").find('.onboarding__pulse').remove();
                    $('.table-ali-custom tbody tr.fake-product-sample').addClass('finish-ob-csv');
                    $('.wrapper-tbl-action').css({"pointer-events": "none"});
                    $('.wrapper-tbl-action .checkmark-ckb').css({"opacity": "0.4"});
                    handleAnimationFinishTourImport('ae', product_no);
                    setActiveSectionOnboarding('section_third'); //Import AE
                })

                $('#page-list-product-get-review').on('click', '.finish-tooltip .got-it-btn', function(e){
                    localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
                    window.location.reload();
                });
                $('#page-list-product-get-review').on('click', '.finish-tooltip .js-go-to-pricing', function(e){
                    localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
                });
            }
        });
    }

    function copyToClipboard(element) {
        let val_copy = element.val() ? element.val() : element.text();
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(val_copy).select();
        document.execCommand("copy");
        $temp.remove();
    }

    function handleAnimationFinishTourImport(type, product_no = ''){
        let height_table = $('#table-select-all-fake tbody').outerHeight();
        let width_finish_tooltip = $('.js-width-bulk-setting').outerWidth() + $('.js-width-action').outerWidth();
        let data_finish = JSON.parse($("#on-boarding-finish").val());
        let title = 'Bravo! Reviews have just flowed in!';
        let desc = 'Successfully imported reviews for your products';
        let btn_text = 'Go To Pricing';
        let btn_url = `${appUrl}/pricing`;
        if(data_finish.status && data_finish.status_code == 200){
            if(type == 'file'){
                title = data_finish.data.csv.title;
                desc = data_finish.data.csv.content;
                btn_text = data_finish.data.csv.button;
                btn_url = data_finish.data.csv.link;
            }else{
                title = data_finish.data.ali.title;
                desc = data_finish.data.ali.content;
                btn_text = data_finish.data.ali.button;
                btn_url = data_finish.data.ali.link;
            }
        }
        
        let html_finish_tooltip = `
            <div class="finish-tooltip" style="background: url('${CDN}/images/onboarding/finish_bg_right.png') right top no-repeat, url('${CDN}/images/onboarding/finish_bg_left.png') left top no-repeat, #ffffff;">
                <div class="finish-tooltip-wrap">
                    <img src="${CDN}/images/onboarding/finish_img.png" alt="">
                    <p class="finish-tooltip__title">${title}</p>
                    <p class="inish-tooltip__desc">
                        ${desc}
                    </p>
                    <div class="finish-tooltip__btn-wrap d-flex align-items-center">
                        <a href="${btn_url}" class="button button--primary fw500 js-go-to-pricing">${btn_text}</a>
                    </div>
                </div>
            </div>`;
        //ANIMATION
        let ele_rating_star_1 =  $('#product-item-1 .js-review-col .ob-rating-star-wrap');
        let ele_progress_bar_1 =  $('#product-item-1 .js-review-col .js-loading-bar-wrapper');
        let ele_rating_star_2 =  $('#product-item-2 .js-review-col .ob-rating-star-wrap');
        let ele_progress_bar_2 =  $('#product-item-2 .js-review-col .js-loading-bar-wrapper');
        let ele_rating_star_3 =  $('#product-item-3 .js-review-col .ob-rating-star-wrap');
        let ele_progress_bar_3 =  $('#product-item-3 .js-review-col .js-loading-bar-wrapper');
        //TOUR CSV
        if(type =='file'){
            delayTime(0)
            .then(()=>{
                ele_rating_star_1.hide();
                ele_progress_bar_1.show().addClass('loading-bar-wrapper');
                return delayTime(3000);
            })
            .then(()=>{
                ele_rating_star_1.show();
                ele_progress_bar_1.hide();
                $('#product-item-1 .js-review-col .product-item-total-review').text('200');
                ele_rating_star_1.find('.alr-icon-star').addClass('ob-star-animation');
                return delayTime(2000);
            })
            .then(()=>{
                ele_rating_star_2.hide();
                ele_progress_bar_2.show().addClass('loading-bar-wrapper ob-product-2');
                return delayTime(3000);
            })
            .then(()=>{
                ele_rating_star_2.show();
                ele_progress_bar_2.hide();
                $('#product-item-2 .js-review-col .product-item-total-review').text('150');
                ele_rating_star_2.find('.alr-icon-star').addClass('ob-star-animation');
                return delayTime(2000);
            })
            .then(()=>{
                ele_rating_star_3.hide();
                ele_progress_bar_3.show().addClass('loading-bar-wrapper ob-product-3');
                return delayTime(3000);
            })
            .then(()=>{
                ele_rating_star_3.show();
                ele_progress_bar_3.hide();
                $('#product-item-3 .js-review-col .product-item-total-review').text('60');
                ele_rating_star_3.find('.alr-icon-star').addClass('ob-star-animation');
                return delayTime(2500);
            })
            .then(()=>{
                $('#product-item-2 .js-review-col').append(html_finish_tooltip);
                $('.fake-product-sample .finish-tooltip-wrap, .fake-product-sample .finish-tooltip').css({'height': height_table, 'width' : width_finish_tooltip});
            })
        }else{  //TOUR AE
            let ele_rating_star =  $(`#product-item-${product_no} .js-review-col .ob-rating-star-wrap`);
            let ele_progress_bar =  $(`#product-item-${product_no} .js-review-col .js-loading-bar-wrapper`);
            delayTime(0)
            .then(()=>{
                ele_rating_star.hide();
                ele_progress_bar.show().addClass(`loading-bar-wrapper ob-product-${product_no}`);
                return delayTime(3000);
            })
            .then(()=>{
                ele_rating_star.show();
                ele_progress_bar.hide();
                let number_review = '';
                switch(product_no){
                    case '1': number_review = 200; break;
                    case '2': number_review = 150; break;
                    case '3': number_review = 60; break;
                }
                $(`#product-item-${product_no} .js-review-col .product-item-total-review`).text(number_review);
                ele_rating_star.find('.alr-icon-star').addClass('ob-star-animation');
                return delayTime(2000);
            })
            .then(()=>{
                $('#product-item-2 .js-review-col').append(html_finish_tooltip);
                $('.finish-tooltip-wrap').addClass(`tour-ae-${product_no}`);
                $('.fake-product-sample .finish-tooltip-wrap, .fake-product-sample .finish-tooltip').css({'height': height_table, 'width' : width_finish_tooltip});
            })
        }
    }
});

function handleContactDeveloperThemeSetting(){
    let ele_onboarding_install_alireviews_modal = $('#onboarding-install-alireviews-modal');
    $("#js-submit-request-onboarding").attr("disabled", true);
    $("textarea#mail-request-onboarding").on("input", function(){
        if($(this).val().trim().length > 0){
            $("#js-submit-request-onboarding").attr("disabled", false);
        }else{
            $("#js-submit-request-onboarding").attr("disabled", true);
        }
        if($(this).val().trim().length > 2000){
            $(this).val($(this).val().substr(0,2000));
        }
    });

    ele_onboarding_install_alireviews_modal.on('click', '#js-submit-request-onboarding', function(){
        let val_desc = $("textarea#mail-request-onboarding").val();
        let problems_contacts = [];
        $.each($("input[name='problems_contacts']:checked"), function(){
            problems_contacts.push($(this).val());
        });
        $.ajax({
            url: `${appUrl}/send-mail-request`,
            type: 'POST',
            dataType: 'json',
            data : {
                problems: problems_contacts,
                description : val_desc,
                _token : $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: function () {
                $("#js-submit-request-onboarding").attr("disabled", true);
            },
            success: function (res) {
                console.log("res", res)
                $("#js-submit-request-onboarding").attr("disabled", false);
                $("textarea#mail-request-onboarding").val('');
                ele_onboarding_install_alireviews_modal.modal('hide');
                if(res.status){
                    $.notify(
                        {
                            message: 'You successfully sent request to our developer.'
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "success"
                        }
                    );
                }
            },
            error : function (error) {
                console.log("error", error)
            }
        });
    });
}

export { handleContactDeveloperThemeSetting } 