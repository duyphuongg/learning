// JS common for choose plan and pricing page -> webpack

$(document).ready(function(){
    runDesktop();
    runMobile();
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

    /* Exit popup*/
    let choose_plan_page = $('.choose-plan-page-5-3');
    let has_trial_modal = $('#exit-popup-trial-user');
    let no_trial_modal = $('#exit-popup-no-trial-user');
    let json_data = $('#check-exit-popup-choose-plan').val();
    let data_user = (json_data != null) ? JSON.parse(json_data) : '';
    let KEY_EXIT_POPUP = 'exit_popup_choose_plan';
    let href = window.location.href;
    $(document).mouseleave(function(e){
        if( e.clientY < 0 && (sessionStorage.getItem(KEY_EXIT_POPUP) != 'true') && !is_show_modal_get_plan){
            handleExitPopup();
        }
    });

    function handleExitPopup(){
        if(data_user.status){
            if(data_user.exit_popup_rule == 'rule_1'){ /*Has trial day*/
                has_trial_modal.modal({
                    backdrop: "static",
                    keyboard: false
                });
                let date_trial_text = (data_user.trial_days > 1) ? `${data_user.trial_days} days` : `${data_user.trial_days} day`
                has_trial_modal.find('.js-trial-day').text(date_trial_text);
            }
            if(data_user.exit_popup_rule == 'rule_2'){ /*No trial day*/
                no_trial_modal.modal({
                    backdrop: "static",
                    keyboard: false
                });
            }
        }
    }

    has_trial_modal.find('button').click(function(){
        $('.choose-plan-page .nav-tabs li:eq(0) a').tab('show');
        sessionStorage.setItem(KEY_EXIT_POPUP, 'true');
    });   
    no_trial_modal.find('button').click(function(){
        sessionStorage.setItem(KEY_EXIT_POPUP, 'true');
    });     

    $('.choose-plan-page .tab__plan form .button--orange').click(function(){
        sessionStorage.setItem(KEY_EXIT_POPUP, 'true');
    })
    /* END: Exit popup*/

    /*Contact CS*/
    $('.js-btn-choose-plan-let-chat').click(function(){
        var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
        if( intercom_on_messager == null ) {
            Intercom('showNewMessage');
        } else {
            Intercom('hide');
        }
    });
    /*END: Contact CS*/

    /*Choose-plan 5.3 : sticky plan*/
    let width = $(window).width();
    let eleSticky = $('.choose-plan__content-scroll')
    let eleListFunc = $('.choose-plan__list-feature-wrap')
    let eleSpace = $('.space-element');    
    if($('#choose_plan_content_scroll_before').length){
        var observer = new IntersectionObserver(function(entries) {
            if (entries.some(entry => entry.intersectionRatio > 0)) {
                eleSticky.removeClass('sticky-item')
                eleSticky.find('.img-wrap').removeClass('image-scroll')
                eleListFunc.removeClass('choose-plan__list-feature-scroll')
                eleSpace.removeClass('space-scroll')
            }
            else{
                eleSticky.addClass('sticky-item')
                eleSticky.find('.img-wrap').addClass('image-scroll')
                eleListFunc.addClass('choose-plan__list-feature-scroll')
                eleSpace.addClass('space-scroll')
            }

        }, { rootMargin: href.endsWith('/choose-plan') ? '-20px 0px 0px 0px' : '-90px 0px 0px 0px',threshold: [0,1] });
        
        observer.observe(document.querySelector("#choose_plan_content_scroll_before"));
    }
    
    /*Hover show tootip*/
    var timeout_tootip;
    $( ".choose-plan-5-3-wrap li.js-tooltip-func" ).hover(
        function() {
            $( this ).removeClass('tooltip-func bottom top');
            
            // let height = href.endsWith('/choose-plan') ? 650 : 750;
            if(href.endsWith('/choose-plan')){
                let checkDiv = checkDivToBottom(this);
                let classPosition = (checkDiv > 650 ) ? "bottom" : "top";
                clearTimeout(timeout_tootip)
                timeout_tootip = setTimeout(() => {
                    $( this ).addClass(`tooltip-func ${classPosition}`);
                }, 800);
            }else{
                if(href.endsWith('/pricing')){
                    let classPosition = 'bottom';
                    if(checkHeightDiv(this)){
                        classPosition = 'top';
                    }
                    clearTimeout(timeout_tootip)
                    timeout_tootip = setTimeout(() => {
                        $( this ).addClass(`tooltip-func ${classPosition}`);
                    }, 800);
                }
            }
        
        }, function() {
          $( this ).removeClass('tooltip-func bottom top');
        }
    );
    $( ".choose-plan-5-3-wrap li .tooltip-func__wrap" ).hover(
        function() {
            $( this ).parent().removeClass('tooltip-func bottom top');
        }, function() {
            $( this ).parent().removeClass('tooltip-func bottom top');
        }
    );

    function checkHeightDiv(element){
        let isBottom = false;
        // get the scollTop (distance scrolled from top)
        let scrollTop = $(window).scrollTop();
        // get the top offset of the dropdown (distance from top of the page)
        let topOffset = $(element).offset().top;
        // calculate the dropdown offset relative to window position
        let relativeOffset = topOffset - scrollTop;
        
        // get the window height
        let windowHeight = $(window).height();
        
        // if the relative offset is greater than half the window height,
        // reverse the dropdown.
        if(relativeOffset > windowHeight/2){
            // $(".dropdown-menu").addClass("reverse");
            isBottom = true;
        }
        return isBottom;
        // }
        // else{
        //     // $(".dropdown-menu").removeClass("reverse");
        // }
    }
    
    function checkDivToBottom(element){
        let heightPage = $('.choose-plan-page-5-3').outerHeight()
        let position = $(element).position();        
        let positionTop = position ? position.top : 0
        return heightPage - positionTop
    }
    
    //Click show tooltip mobile
    if(width < 767){
        $('[data-toggle="tooltip-choose-plan-mobile"]').tooltip({html: true});   
    }else{
        $('[data-toggle="tooltip-choose-plan-mobile"]').attr('title', '');
    }
    $(window).resize(function(){
        let width = $(window).width();
        if(width < 767){
            $('[data-toggle="tooltip-choose-plan-mobile"]').tooltip({html: true});   
        }else{
            $('[data-toggle="tooltip-choose-plan-mobile"]').attr('title', '');
        }
    });
    
    /*Handle show popup upgrade-plan */

    href.endsWith('/choose-plan') && choose_plan_page.parents('body').css('overflow', 'hidden')
    let KEY_UPGRADE_PLAN_POPUP = 'upgrade-plan-popup'; 
    var is_show_modal_get_plan = false
    $('.modal-get-a-plan').on('shown.bs.modal', function() {
        is_show_modal_get_plan = true
    })
    $('.modal-get-a-plan').on('hidden.bs.modal', function() {
        is_show_modal_get_plan = false
        sessionStorage.setItem(KEY_UPGRADE_PLAN_POPUP, 'true');
    })

    $('.js-btn-starter-plan').click(function(e){
        if(sessionStorage.getItem(KEY_UPGRADE_PLAN_POPUP) != 'true'){
            e.preventDefault();
            $('#modalGetEssentialPlan').modal('show')
        }
    })
    $('.js-btn-essential-plan').click(function(e){
        if(sessionStorage.getItem(KEY_UPGRADE_PLAN_POPUP) != 'true'){
            e.preventDefault();
            $('#modalGetPremiumPlan').modal('show')

        }
    })

    // check update data A/B testing
    $("body").delegate(".button-ab-testing", "click", function (e) {
        var plan = $(this).attr('data-plan');
        if (plan == undefined || plan == '') {
            let obj = $(this).closest("form");
            plan = $('input[name="app_plan"]', obj).val();
        }
        var abChoosePlan = $('input#choose-plan-version').val();
        
        if (plan != undefined || plan != '') {
            if (abChoosePlan === 'choicePlan52') {
                $.ajax({
                    type: "get",
                    url: appUrl + "/testing/update/" + shopId + '/click/' + plan,
                    dataType: "json",
                    success: function (data, statusText, xhr) {
                        console.log(data)
                    }
                });
            }

            if(plan ==="premium" && abChoosePlan === 'choicePlan') {
                $.ajax({
                    type: "get",
                    url: appUrl + "/testing/update/" + shopId + '/click/' + plan,
                    dataType: "json",
                    success: function (data, statusText, xhr) {
                        console.log(data)
                    }
                });
            } else {
                if (abChoosePlan === 'choicePlan' && sessionStorage.getItem(KEY_UPGRADE_PLAN_POPUP) == 'true') {

                    $.ajax({
                        type: "get",
                        url: appUrl + "/testing/update/" + shopId + '/click/' + plan,
                        dataType: "json",
                        success: function (data, statusText, xhr) {
                            console.log(data)
                        }
                    });

                }
            }

        }
    });



    /*END : Handle show popup upgrade-plan */
});

function runMobile(){
    let content = {
        '0': '83% people trust reviews as their friends. Start importing, engage visitors and grow your revenue!',
        '00': '83% people trust reviews as their friends. Start importing, engage visitors and grow your revenue!',
        '01': '83% people trust reviews as their friends. Start importing, engage visitors and grow your revenue!',
        '02': 'Import bulk of reviews for all products via Ali Orders or Oberlo in a snap',
        '03': 'No reviews on AliExpress? Import instant reviews for any product on your Shopify store via our editable file.',
        '04': 'Enable you to bulk import reviews via Oberlo in just few clicks',
        '1': 'Get in touch with your customers to ask for reviews and generate more sales',
        '10': 'Automatically send emails to happy customers to request them to review products',
        '11': 'Get a head start with branded emails: request review, upsell, cross sell to get repeat purchase',
        '2': 'Make your store look busy with live review popups, add credibility and increase cart value',
        '20': 'Showcase recent and clickable review popups when visitors browsing your store',
        '21': 'Create visually stunning popups & show on homepage, product page,... to capture visitors attention'
    };

    let list_plan = $('.choose-plan-mobile .choose-plan__item');
    let lenght_list = list_plan.length;
    let timer_auto_features = null;
    let plan_active = $('.choose-plan-mobile .choose-plan__item.active');
    let $el_old = plan_active.length ? plan_active.find('.plan__features').attr('id') : 'parentPremiumPlan';
    if(list_plan.eq(2).hasClass('active')){
        let width_item = $('.choose-plan-mobile .choose-plan__item').eq(2).width();
        $('.choose-plan-mobile .choose-plan__item').eq(2).addClass('active');
        $('.choose-plan-mobile .choose-plan__list').animate({left: -(width_item * 2)}, 0);
        $('.dots > div').removeClass('active');
        $('.dots > div').eq(2).addClass('active');
        let id = $('.choose-plan-mobile .choose-plan__item').eq(2).find('.plan__features').attr('id');
    }else if(list_plan.eq(1).hasClass('active')){
        let width_item = $('.choose-plan-mobile .choose-plan__item').eq(1).width();
        $('.choose-plan-mobile .choose-plan__item').eq(1).addClass('active');
        $('.choose-plan-mobile .choose-plan__list').animate({left: -(width_item * 1)}, 0);
        $('.dots > div').removeClass('active');
        $('.dots > div').eq(1).addClass('active');
        let id = $('.choose-plan-mobile .choose-plan__item').eq(1).find('.plan__features').attr('id');
    }

    autoFulfillFeature(`#${$el_old}`);
    function startAutoFulfillFeature($el){
        
        clearInterval(timer_auto_features);
        let list_collapse =  $($el + ' .panel-collapse');
        list_collapse.not(':first').collapse('hide');
        list_collapse.eq(0).collapse('show');
        $($el_old + ' .features__title').off();
        $($el_old + ' .features__item').off();
        $el_old = $el;
        let $features_nav = $($el + ' .features__title');
        let $features_content = $($el).parent().find('.gift__list .gift__item');
        $($el + ' .features__item').removeClass('active');
        $features_nav.removeClass('active');
        $features_content.removeClass('active');
        $features_nav.eq(0).addClass('active');
        $features_content.eq(0).addClass('active');
        autoFulfillFeature($el);
    }

    function autoFulfillFeature($el){ 
        let $list_features = $($el + ' .features__title');
        let $list_gift = $($el).parent().find('.gift__list .gift__item');
        let count = 0;
        let max_count = $list_features.length;
        timer_auto_features = setInterval(() => {
            $list_features.removeClass('active');
            $list_features.eq(count).next().collapse('hide');
            if($list_features.eq(count + 1).next().hasClass('collapse')){
                $list_features.eq(count + 1).next().collapse('show');
            }
            $list_features.eq(count + 1).addClass('active');
            $list_gift.removeClass('active');
            $list_gift.eq(count + 1).addClass('active');
            if((max_count - 2) <= count){
                count = -1;
            }else{
                count += 1;
            }
        }, 7000)
    
        $($el).on('click', '.features__title', function(){
            clearInterval(timer_auto_features);
            let list_collapse =  $($el + ' .panel-collapse');
            list_collapse.not(this).collapse('hide');
            if($(this).find('a') && $(this).find('a').length > 0){
                $(this).next().collapse('show');
            }
            let $features_content = $($el).parent().find('.gift__list .gift__item');
            let index_features = $(this).attr('data-index');
            $($el + ' .features__title').removeClass('active');
            $($el + ' .features__item').removeClass('active');
            $features_content.removeClass('active');
            $(this).addClass('active');
            let content_features = content[index_features];
            $features_content.eq(parseInt(index_features)).addClass('active');
            $features_content.eq(parseInt(index_features)).find('.gift__desc').text(content_features);
        })

        $($el).on('click', '.features__item', function(){
            clearInterval(timer_auto_features);
            let $features_content = $($el).parent().find('.gift__list .gift__item');
            let index_features = $(this).attr('data-index');
            let index_parent = index_features.substring(0, 1);
            $($el + ' .features__title').removeClass('active');
            $($el + ' .features__item').removeClass('active');
            $features_content.removeClass('active');
            $(this).addClass('active');
            let content_features = content[index_features];
            if(index_features == '03'){
                $('.features__content .gift_img.import-review img.img-import-file').show();
                $('.features__content .gift_img.import-review img.img-normal').hide();
            }else{
                $('.features__content .gift_img.import-review img.img-import-file').hide();
                $('.features__content .gift_img.import-review img.img-normal').show();
            }
            $features_content.eq(parseInt(index_parent)).addClass('active');
            $features_content.eq(parseInt(index_parent)).find('.gift__desc').text(content_features);
        })
    }

    $(".choose-plan-mobile").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function(event){
            var xMove = event.originalEvent.touches[0].pageX;
            if( Math.floor(xClick - xMove) > 5 ){
                // prev
                slidePlan('leftToRight');
            }
            else if( Math.floor(xClick - xMove) < -5 ){
                // next
                slidePlan('rightToLeft');
            }
        });
        $(".choose-plan-mobile").on("touchend", function(){
            $(this).off("touchmove");
            $(this).off("touchend");
        });
    });

    arrowDots();

    function slidePlan(type){
        let $dot_active = $('.dots > div.active');
        let index_dot = parseInt($dot_active.attr('data-dot-index'));
        if(type == 'leftToRight'){
            if(index_dot >= (lenght_list - 1)){
                return;
            }
            let width_item = $('.choose-plan-mobile .choose-plan__item').eq(index_dot + 1).width();
            $('.choose-plan-mobile .choose-plan__item').removeClass('active');
            $('.choose-plan-mobile .choose-plan__item').eq(index_dot + 1).addClass('active');
            width_item = (index_dot + 1) > 0 && (index_dot + 1) < (lenght_list - 1) ? width_item + 3 : width_item;
            $('.choose-plan-mobile .choose-plan__list').animate({left: -(width_item * (index_dot + 1))});
            $('.dots > div').eq(index_dot + 1).addClass('active');
            $dot_active.removeClass('active');
            let id = $('.choose-plan-mobile .choose-plan__item').eq(index_dot + 1).find('.plan__features').attr('id');
            startAutoFulfillFeature(`#${id}`);
        }else{
            if(index_dot <= 0){
                return;
            }
            let width_item = $('.choose-plan-mobile .choose-plan__item').eq(index_dot - 1).width();
            $('.choose-plan-mobile .choose-plan__item').removeClass('active');
            $('.choose-plan-mobile .choose-plan__item').eq(index_dot - 1).addClass('active');
            width_item = (index_dot - 1) > 0 && (index_dot - 1) < (lenght_list - 1) ? width_item + 3 : width_item;
            $('.choose-plan-mobile .choose-plan__list').animate({left: -(width_item * (index_dot - 1))});
            $('.dots > div').eq(index_dot - 1).addClass('active');
            $dot_active.removeClass('active');
            let id = $('.choose-plan-mobile .choose-plan__item').eq(index_dot - 1).find('.plan__features').attr('id');
            startAutoFulfillFeature(`#${id}`);
        }
    }
    
    function arrowDots(){
        $('.dots').on('click', 'div', function(){
            let $this = $(this);
            if($this.hasClass('active')){
                return
            };
            let index_dot = parseInt($this.attr('data-dot-index'));
            let width_item = $('.choose-plan-mobile .choose-plan__item').eq(index_dot).width();
            $('.choose-plan-mobile .choose-plan__item').removeClass('active');
            $('.choose-plan-mobile .choose-plan__item').eq(index_dot).addClass('active');
            width_item = index_dot > 0 && index_dot < (lenght_list - 1) ? width_item + 20 : width_item;
            $('.choose-plan-mobile .choose-plan__list').animate({left: -(width_item * index_dot)});
            $('.dots > div').removeClass('active');
            $this.addClass('active');
            let id = $('.choose-plan-mobile .choose-plan__item').eq(index_dot).find('.plan__features').attr('id');
            startAutoFulfillFeature(`#${id}`);
        })
    }
}

function runDesktop(){
    let content = {
        '0': '83% people trust reviews as their friends. Start importing, engage visitors and grow your revenue!',
        '00': '83% people trust reviews as their friends. Start importing, engage visitors and grow your revenue!',
        '01': '83% people trust reviews as their friends. Start importing, engage visitors and grow your revenue!',
        '02': 'Import bulk of reviews for all products via Ali Orders or Oberlo in a snap',
        '03': 'No reviews on AliExpress? Import instant reviews for any product on your Shopify store via our editable file.',
        '04': 'Enable you to bulk import reviews via Oberlo in just few clicks',
        '1': 'Get in touch with your customers to ask for reviews and generate more sales',
        '10': 'Automatically send emails to happy customers to request them to review products',
        '11': 'Get a head start with branded emails: request review, upsell, cross sell to get repeat purchase',
        '2': 'Make your store look busy with live review popups, add credibility and increase cart value',
        '20': 'Showcase recent and clickable review popups when visitors browsing your store',
        '21': 'Create visually stunning popups & show on homepage, product page,... to capture visitors attention'
    };

    let timer_auto_features = null;
    let id_active = $('.choose-plan .tab-content .tab-pane.active').attr('id');
    let $el_old = id_active ? `#${id_active}` : '#premium-plan';
    autoFulfillFeature($el_old);
    $('.choose-plan__aside a').on('click', function(){
        clearInterval(timer_auto_features);
        let $el = $(this).attr('href');
        $($el_old + ' .features__title').off();
        $($el_old + ' .features__item').off();
        $el_old = $el;
        let $features_nav = $($el + ' .features__nav .features__title');
        let $features_content = $($el + ' .features__content .gift__item');
        $($el + ' .features__nav .features__item').removeClass('active');
        $features_nav.removeClass('active');
        $features_content.removeClass('active');
        $features_nav.eq(0).addClass('active');
        $features_content.eq(0).addClass('active');
        autoFulfillFeature($el);
    })

    function autoFulfillFeature($el){ 
        let $list_features = $($el + ' .features__nav .features__title');
        let $list_gift = $($el + ' .features__content .gift__item');
        let count = 0;
        let max_count = $list_features.length;
        timer_auto_features = setInterval(() => {
            $list_features.removeClass('active');
            $list_features.eq(count + 1).addClass('active');
            $list_gift.removeClass('active');
            $list_gift.eq(count + 1).addClass('active');
            if((max_count - 2) <= count){
                count = -1;
            }else{
                count += 1;
            }
        }, 7000)
    
        $($el).on('click', '.features__title', function(){
            clearInterval(timer_auto_features);
            let $features_content = $($el + ' .features__content .gift__item');
            let index_features = $(this).attr('data-index');
            $($el + ' .features__nav .features__title').removeClass('active');
            $($el + ' .features__nav .features__item').removeClass('active');
            $features_content.removeClass('active');
            $(this).addClass('active');
            let content_features = content[index_features];
            $features_content.eq(parseInt(index_features)).addClass('active');
            $features_content.eq(parseInt(index_features)).find('.gift__desc').text(content_features);
        })

        $($el).on('click', '.features__item', function(){
            clearInterval(timer_auto_features);
            let $features_content = $($el + ' .features__content .gift__item');
            let index_features = $(this).attr('data-index');
            let index_parent = index_features.substring(0, 1);
            $($el + ' .features__nav .features__title').removeClass('active');
            $($el + ' .features__nav .features__item').removeClass('active');
            $features_content.removeClass('active');
            $(this).addClass('active');
            let content_features = content[index_features];
            if(index_features == '03'){
                $('.features__content .gift_img.import-review img.img-import-file').show();
                $('.features__content .gift_img.import-review img.img-normal').hide();
            }else{
                $('.features__content .gift_img.import-review img.img-import-file').hide();
                $('.features__content .gift_img.import-review img.img-normal').show();
            }
            $features_content.eq(parseInt(index_parent)).addClass('active');
            $features_content.eq(parseInt(index_parent)).find('.gift__desc').text(content_features);
        })
    }
}