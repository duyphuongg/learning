$(document).ready(function(){
    let KEY_ONBOARDING_IMPORT_REVIEW = 'onboarding_import_reviews';
    let KEY_GO_IT_QUICK_GUIDE = 'onboarding_go_it_quick_guide';
    let KEY_INITIAL_SETUP_ONBOARDING = 'onboarding_initial_setup';
    let path_name_manage_reviews = 'manage-reviews';
    let link_demo_import_review = 'https://www.aliexpress.com/item/32847548221.html';
    let location_pathname = location.pathname;
    let finish_all_section_onboarding = false;
    let CDN = cdnUrl;
    let link_product_any = $('input[name="check_now_product"]').val();
    let val_event_choose_plan = $('input[name="event_choose_plan"]').val();
    let turn_off_flow_modal_import_review = false;

    if(location_pathname === '/charge_successful' && localStorage.getItem(KEY_INITIAL_SETUP_ONBOARDING)){
        $('.main-sidebar').css({'pointer-events': 'none'});
        let ele_btn_discover = $('.thank-you-wrap .discover-charge-thanks');
        ele_btn_discover.css({'position': 'relative'});
        ele_btn_discover.append("<div class='onboarding__pulse'></div>");
    }

    if(location_pathname === '/'){
        // handle onboarding section 1
        handleOnboardingInstallAliReviews();

        // handle onboarding section 2
        handleOnboardingMiniTour();

        // check disabled review box visibility
        checkReviewBoxVisibility();

        handleEventChoosePlan();

        if(localStorage.getItem(KEY_INITIAL_SETUP_ONBOARDING) && !val_event_choose_plan){
            localStorage.removeItem(KEY_INITIAL_SETUP_ONBOARDING);
            $("#wellcome-onboarding").modal('show');
            $("#wellcome-onboarding button").on('click', function(){
                $("#wellcome-onboarding").modal('hide');
                // $('.dashboard__onboarding').addClass('open');

                // Support add event for Add AdRoll.
                try{
                    __adroll.record_user({"adroll_segments": "9d70b332"});
                } catch(err) {}

                setTimeout(function() {
                    $("#onboarding-install-alireviews-modal").modal('show');
                    $("#onboarding-install-alireviews-modal .button--close").css({'display': 'none'});
                }, 500);
            });
        }else{
            getDisplayOnboarding();
        }
        // active section finished
        handleActiveSectionOnboarding();
    }else {
        getDisplayOnboarding();
    }

    // handle onboarding section 3
    handleOnboardingImportReviews();
    handleOnboardingLinkImportReviews();
    handleOnboardingLinkImportReviewsDetail();

    // contact our developers
    $('.contact-our-developers a').on('click', function(e){
        e.preventDefault();
        let ele_onboarding_install_alireviews_modal = $('#onboarding-install-alireviews-modal');
        ele_onboarding_install_alireviews_modal.find('.modal-content').css({'height': '800px', 'max-height': '800px'});
        ele_onboarding_install_alireviews_modal.find(".modal-content .modal-body").animate({left: '-100%'}, 0);
        ele_onboarding_install_alireviews_modal.find(".fix-now__step-2__2").animate({left: '0'}, 0);
        ele_onboarding_install_alireviews_modal.find(".button--close").css({'display': 'block'});
        ele_onboarding_install_alireviews_modal.modal('show');
    });

    $(".dashboard__onboarding").on('click', '.button--close, .js-hidden-oboarding', function () {
        handleHideTableOnboarding();
        setDisplayOnboarding(0);
    });

    function checkFinishOnboarding(){
        let number_section_finish = 0;
        let ele_dashboard_onboarding = $('.dashboard__onboarding');
        if($(".dashboard__onboarding #onboarding__install-alireviews").hasClass('active')){
            number_section_finish += 1;
            let html_header = `<h3>Getting started</h3>
                                <p>Great to have you on board! Feel free to explore, or get a head start below.</p>`;
            ele_dashboard_onboarding.find('.dashboard__onboarding-header').html(html_header);
        }
        if($(".dashboard__onboarding #onboarding__mini-tour").hasClass('active')){
            number_section_finish += 1;
        }
        if($(".dashboard__onboarding #onboarding__import-reviews").hasClass('active')){
            number_section_finish += 1;
        }
        if(number_section_finish >= 3){
            let html_header = `<h3 class="dashboard__onboarding-header__title--finish"><i class="material-icons">thumb_up</i>Looks like you’re all set!</h3>
                                <p class="dashboard__onboarding-header__desc--finish">When you’re ready, <span class="js-hidden-oboarding">click here to hide guide box.</span></p>`;
            ele_dashboard_onboarding.find('.dashboard__onboarding-header').html(html_header);
            let ele_user_menu = $('.main-header li.user-menu');
            ele_user_menu.find('#menu-user__quick-guide i').remove();
            ele_user_menu.find('.material-icons__info').remove();
            finish_all_section_onboarding = true;
        }
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
                    $(".dashboard__onboarding #onboarding__mini-tour").addClass('active');
                }
                if(result.section_third){
                    $(".dashboard__onboarding #onboarding__import-reviews").addClass('active');
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
        let ele_welcome = $('#wellcome-onboarding');
        if(val_event_choose_plan){
            ele_welcome.modal('show');
            let html_content_welcome = '';
            if(val_event_choose_plan === 'up'){
                html_content_welcome += `<h3>Successfully upgraded</h3>
                                        <p class="note mar-b-15">
                                            Let us help you grow even better with our exclusive features!
                                        </p>`;
            }else{
                html_content_welcome += `<h3>Change of plan</h3>
                                        <p class="note mar-b-15">
                                            Didn’t have great experiences with previous plan? Let us know if you need any support
                                        </p>`;
                ele_welcome.find('.modal-footer').append(`<p class="welcome__contact-support">Contact Support</p>`);
                $('#wellcome-onboarding .welcome__contact-support') && $('#wellcome-onboarding .welcome__contact-support').on('click', function() {
                    var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
                    if( intercom_on_messager == null ) {
                        Intercom('show');
                    } else {
                        Intercom('hide');
                    }
                    ele_welcome.modal('hide');
                });
            }
            ele_welcome.find('.modal-body__content').html(html_content_welcome);
            $("#wellcome-onboarding button").on('click', function(){
                $("#wellcome-onboarding").modal('hide');
            });
            clearCacheEventChoosePlane();
        }
    }

    function handleHideTableOnboarding(){
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

    function eventShowTableOnboarding(){
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
            ele_2.addClass('highlight-section-onboarding');
            if(ele_2.hasClass('active')){
                ele_3.addClass('highlight-section-onboarding');
            }
        }else{
            ele_1.addClass('highlight-section-onboarding');
        }
    }

    function checkReviewBoxVisibility(){
        if(link_product_any == ''){
            let ele_check_review_box = $('#onboarding-install-alireviews-modal .onboarding__check-review-box');
            ele_check_review_box.find('.js-crb-check-now').attr('disabled', 'disabled');
            ele_check_review_box.find('.onboarding__crb__content .onboarding__check-review-box__got-it').css({'display': 'block'});
        }
    }

    function handleOnboardingInstallAliReviews(){
        let ele_onboarding_install_alireviews_modal = $("#onboarding-install-alireviews-modal");
        let height_content = 800;
        let max_height_content_1 = 800;
        let max_height_content_2 = 385;
        let min_height_content_1 = 580;
        let min_height_content_2 = 160;

        $('#onboarding__install-alireviews').on('click', function(){
            ele_onboarding_install_alireviews_modal.modal('show');
            checkReviewBoxVisibility();
            ele_onboarding_install_alireviews_modal.find('.button--close').css({'display': 'none'});
        });

        ele_onboarding_install_alireviews_modal.on('click', '.js-crb-check-now', function(){
            if(link_product_any){
                window.open(`${link_product_any}?ar-onboarding=true`);
            }
            let html_button = `<button type="button" class="button button--green js-crb-install-now">Install Now</button>
                                <button type="button" class="button button--black js-crb-looks-good"  data-dismiss="modal">Looks good!</button>
                                `;
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .onboarding__crb__desc').text(`In case you didn’t see it, install manually with our instruction.`);
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-check-now').css({'display': 'none'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-install-now').css({'display': 'inline-block'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-looks-good').css({'display': 'inline-block'});
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
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .onboarding__crb__desc').text(`Check your Product page to see if Review Box is auto installed yet`);
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-check-now').css({'display': 'inline-block'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-install-now').css({'display': 'none'});
            ele_onboarding_install_alireviews_modal.find('.onboarding__check-review-box .onboarding__crb__content .js-crb-looks-good').css({'display': 'none'});
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

        $("#fix-now__step-1__1").hover(function(){
            $(this).find('img').attr('src', `${CDN}/images/onboarding/setting-icon-active.png`)
        },function () {
            $(this).find('img').attr('src', `${CDN}/images/onboarding/setting-icon.png`)
        })

        $("#fix-now__step-1__2").hover(function(){
            $(this).find('img').attr('src', `${CDN}/images/onboarding/plane-icon-active.png`)
        },function () {
            $(this).find('img').attr('src', `${CDN}/images/onboarding/plane-icon.png`)
        })

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

    function handleOnboardingImportReviews(){
        $("#onboarding__import-reviews").on('click', function () {
            localStorage.setItem(KEY_ONBOARDING_IMPORT_REVIEW, 'step_1');
            location.href = `${appUrl}/${path_name_manage_reviews}`;
        });
    }

    // handle step onboarding section 3
    function handleOnboardingLinkImportReviews(){
        let path_name = location.pathname;
        if(path_name === `/${path_name_manage_reviews}` && (localStorage.getItem(KEY_ONBOARDING_IMPORT_REVIEW) === 'step_1')){
            let html_info = `<div class="onboarding__import-reviews onboarding__import-reviews__step-1__1">
                            <div class="onboarding__import-reviews__content">
                                <i><img src="${CDN}/images/onboarding/onboarding-info-icon.png" alt="i"/></i>
                                <p>Start adding your first reviews by clicking <b>Import Reviews</b>.</p>
                            </div>
                            <button type="button" class="button button--close"><i class="material-icons">close</i></button>
                        </div>`;
            let html_info_not_products = `<div class="onboarding__import-reviews onboarding__import-reviews__step-1__2">
                            <div class="onboarding__import-reviews__content">
                                <i class="material-icons">weekend</i>
                                <p>Sync your products into Ali Reviews with a simple click on Update Product List below.</p>
                                <p>Have no products yet? Please add some products on your store first then get back with us!</p>
                            </div>
                            <button type="button" class="button button--close"><i class="material-icons">close</i></button>
                            <div class="onboarding__ir__info-icon">
                                <img src="${CDN}/images/onboarding/onboarding-info-icon.png" alt="i"/>
                            </div>
                        </div>`;
            let ele_import_reviews = $("#page-list-product-get-review");
            let ele_result_total_reviews_checked = ele_import_reviews.find('.wrapper-tbl-action #result-total-reviews-checked');
            let ele_number_reviews = ele_result_total_reviews_checked.find('.number-reviews').eq(1).text();
            if(parseInt(ele_number_reviews) > 0){
                ele_import_reviews.prepend(html_info);
                let ele_modal_import_review = $("#modalImportReview");
                let ele_btn_import_reviews = ele_import_reviews.find('table tbody tr:first-child td:last-child button');
                ele_btn_import_reviews.css({position: 'relative'});
                ele_btn_import_reviews.append("<div class='onboarding__pulse'></div>");

                let ele_btn_import_reviews_all = ele_import_reviews.find('table tbody tr td:last-child');
                ele_btn_import_reviews_all.off();
                let link_import_review_detail = '';
                ele_btn_import_reviews_all.on('click', 'button', function(){
                    link_import_review_detail = $(this).closest('tr').find('.media-heading a').attr('href');
                });

                handleModalImportReview();

                let ele_add_review_finish = ele_modal_import_review.find('.add-review-finish');

                ele_add_review_finish.on('click', 'a.button--primary', function(e){
                    localStorage.setItem(KEY_ONBOARDING_IMPORT_REVIEW, 'step_2');
                    e.preventDefault();
                    // setActiveSectionOnboarding('section_third');
                    location.href = link_import_review_detail;
                });

                $('.onboarding__import-reviews').on("click", '.button--close', function(){
                    localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
                    ele_btn_import_reviews_all.off();
                    $(".onboarding__import-reviews").remove();
                    ele_btn_import_reviews.find(".onboarding__pulse").remove();
                    ele_add_review_finish.find('.button--default').attr("disabled", false);
                    ele_add_review_finish.find('.modal-body__logo img').attr('src', `${CDN}/images/modals/check.png`);
                    turn_off_flow_modal_import_review = true;
                });

            }else{
                ele_import_reviews.prepend(html_info_not_products);
                $('.onboarding__import-reviews').on("click", '.button--close', function(){
                    localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
                    $(".onboarding__import-reviews").remove();
                });
            }
        }
    }

    // handle step onboarding section 3
    function handleOnboardingLinkImportReviewsDetail(){
        let path_name = location.pathname
        let ele_page_list_product_get_review = $(".product-reviews-page");
        if(path_name.includes(`/${path_name_manage_reviews}/`) && (localStorage.getItem(KEY_ONBOARDING_IMPORT_REVIEW) === 'step_1')){
            let ele_modal_import_review = $("#modalImportReview");
            let ele_btn_import_reviews = ele_page_list_product_get_review.find('#page-list-product-get-review button[class*="add-reviews-btn"]');
            ele_btn_import_reviews.css({position: 'relative'});
            ele_btn_import_reviews.append("<div class='onboarding__pulse'></div>");

            handleModalImportReview();

            let ele_add_review_finish = ele_modal_import_review.find('.add-review-finish');

            ele_add_review_finish.on('click', 'a.button--primary', function(e){
                localStorage.setItem(KEY_ONBOARDING_IMPORT_REVIEW, 'step_2');
                e.preventDefault();
                location.reload();
            });
        }
        if(path_name.includes(`/${path_name_manage_reviews}`) && (localStorage.getItem(KEY_ONBOARDING_IMPORT_REVIEW) === 'step_2')){
            localStorage.removeItem(KEY_ONBOARDING_IMPORT_REVIEW);
            let first_set_active_section_onboarding = true;
            let html_info = `<div class="onboarding__import-reviews__detail">
                                <div class="onboarding__ipd__header" >
                                    <h4>Bravo! Reviews have just flowed in!</h4>
                                    <!-- <img src="${CDN}/images/onboarding/img_info_import_review_detail.png" alt="Ali Review"/>-->
                                    <img class="onboarding__ipd__heade-bg" src="${CDN}/images/onboarding/bg_info_import_reviews_detail.png" alt="Ali Review"/>
                                </div>
                                <p>Successfully imported reviews for your products</p>
                                <div class="onboarding__ipd__footer">
                                    <button type="button" class="button button--green">Quick tips</button>
<!--                                    <a href="${appUrl}" class="button button&#45;&#45;gray">Back to Dashboard</a>-->
                                </div>
                                <button type="button" class="button button--close"><i class="material-icons">close</i></button>
                                <div class="onboarding__ird__info-icon">
                                    <img src="${CDN}/images/onboarding/onboarding-info-icon.png" alt="i"/>
                                </div>
                             </div>`;
            ele_page_list_product_get_review.prepend(html_info);
            let btn_view_product = ele_page_list_product_get_review.find('.wrapper-tbl-action-1 a.button');
            btn_view_product.css({position: 'relative'});
            // btn_view_product.css({position: 'relative', 'z-index': '1053'});
            btn_view_product.append("<div class='onboarding__pulse'></div>");
            // btn_view_product.after("<div class='onboarding__view_product'></div>");
            // $('body').css({'overflow': 'hidden'});
            btn_view_product.click(function(e){
                e.preventDefault();
                let href_product_shopify = $(this).attr('href');
                window.open(`${href_product_shopify}?ar-onboarding=true`);
                btn_view_product.find('.onboarding__pulse').remove();
                // $('.onboarding__view_product').remove();
                // btn_view_product.attr('style', '');
                // $('body').css({'overflow': ''});
            });


            let ele_onboarding_import_products_modal = $("#onboarding-import-products-modal");

            $('.onboarding__import-reviews__detail').on('click', '.button--green', function(){
                ele_onboarding_import_products_modal.modal('show');
            });

            $('.onboarding__import-reviews__detail').on('click', '.button--close', function(){
                $('.onboarding__import-reviews__detail').remove();
                btn_view_product.find('.onboarding__pulse').remove();
            });

            $("#onboarding-import-products-modal .onboarding__ipm__content-footer").on('click', '.btn__try-now', function () {
                window.open('https://apps.shopify.com/ali-orders-by-fireapps?utm_source=ali-reviews&utm_medium=onboarding');
                ele_onboarding_import_products_modal.modal('hide');
                if(first_set_active_section_onboarding){
                    first_set_active_section_onboarding = false;
                    setActiveSectionOnboarding('section_third');
                }

            });

            $("#onboarding-import-products-modal .onboarding__ipm__content-footer").on('click', '.button--try-later', function () {
                $("#onboarding-import-products-modal").modal('hide');
                if(first_set_active_section_onboarding){
                    first_set_active_section_onboarding = false;
                    setActiveSectionOnboarding('section_third');
                }

            });
        }
    }

    function handleModalImportReview(){
        let ele_modal_import_review = $("#modalImportReview");
        let ele_add_review_finish = ele_modal_import_review.find('.add-review-finish');
        let html_modal_import_review = `<div class="modal-import-review__onboarding-content">
                                                    <div>
                                                        <h3>Ali<span>Express</span></h3>
                                                        <div class="input-group">
                                                            <span class="input-group-addon span-sample-link">Sample link</span>
                                                            <input type="text" class="form-control" name="link-demo" value="${link_demo_import_review}" disabled>
                                                            <span class="span-copy-code"><i class="material-icons">filter_none</i></span>
                                                        </div>
                                                        <p><span>Copy</span> the product link from AliExpress and <span>Paste</span> in the box below</p>
                                                    </div>
                                                    <button type="button" class="button button--close" data-dismiss="modal"><i class="material-icons">close</i></button>
                                                    <div class="onboarding__info-icon">
                                                        <img src="${CDN}/images/onboarding/onboarding-info-icon.png" alt="i"/>
                                                    </div>
                                                </div>`;

        ele_modal_import_review.on('shown.bs.modal', function (e) {
            if(!turn_off_flow_modal_import_review) {
                ele_modal_import_review.find('.modal-content').addClass('modal-import-review__onboarding');
                let ele_modal_import_review_form = ele_modal_import_review.find('.modal-content .modal-body form').eq(0);
                // ele_modal_import_review_form.prepend(html_modal_import_review);
                let input_aliexpress_import_review = ele_modal_import_review_form.find('input[name="aliexpress-url"]');
                // input_aliexpress_import_review.attr("data-link-demo", link_demo_import_review);
                // input_aliexpress_import_review.attr('placeholder', 'Paste in AE URL');
                input_aliexpress_import_review.css({border: '1px solid #00C35C'});
                ele_modal_import_review_form.find('.modal-body__title').text('Get reviews from AliExpress');
                let ele_btn_import_later_modal = ele_modal_import_review_form.find('.button--default');
                let ele_btn_import_review_modal = ele_modal_import_review_form.find('.button--primary');
                ele_btn_import_review_modal.css({position: 'relative'});
                ele_btn_import_review_modal.append("<div class='onboarding__pulse'></div>");
                // ele_btn_import_later_modal.text(`I’ll import later`);
                ele_btn_import_later_modal.remove();
                input_aliexpress_import_review.on('input', function(){
                    if(input_aliexpress_import_review.val() === link_demo_import_review){
                        ele_modal_import_review_form.find('.modal-body__content').css({'max-height': '999px'})
                    }
                })
                $('.span-copy-code').on('click', function(){
                    let $this = $(this);
                    let ele_copy = $('input[name="link-demo"]');
                    copyToClipboard(ele_copy);
                    $this.addClass('copy-code-clicked');
                    setTimeout(function(){
                        $this.removeClass('copy-code-clicked');
                    }, 1000);
                });

                ele_btn_import_review_modal.on('click', function(){
                    setTimeout(function(){
                        let style_display = ele_modal_import_review.find('.modal-content .modal-body form').eq(0).css('display');
                        if(style_display === 'none'){
                            $('.modal-import-review__onboarding').css({'border': '1px solid rgba(0, 0, 0, 0.2)'});
                        }
                    }, 200)
                })
            }
        });

        ele_modal_import_review.on('hidden.bs.modal', function (e) {
            if(!turn_off_flow_modal_import_review){
                ele_modal_import_review.find('.modal-content').removeClass('modal-import-review__onboarding');
                let ele_modal_import_review_form = ele_modal_import_review.find('.modal-content .modal-body form');
                ele_modal_import_review_form.find('.modal-import-review__onboarding-info').remove();
                let ele_btn_import_later_modal = ele_modal_import_review_form.find('.button--default');
                ele_btn_import_later_modal.text('Cancel');
                let ele_btn_import_review_modal = ele_modal_import_review_form.find('.button--primary');
                ele_btn_import_review_modal.find(".onboarding__pulse").remove();
                ele_modal_import_review.find('.modal-content .button--close').remove();
            }
        });

        ele_add_review_finish.find('.button--default').attr("disabled", true);
        ele_add_review_finish.find('.modal-body__logo img').attr('src', `${CDN}/images/onboarding/import-reviews-finish-check.png`);
    }

    function copyToClipboard(element) {
        let val_copy = element.val() ? element.val() : element.text();
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(val_copy).select();
        document.execCommand("copy");
        $temp.remove();
    }
});