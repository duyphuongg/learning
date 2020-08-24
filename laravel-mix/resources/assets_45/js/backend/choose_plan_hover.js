jQuery(document).ready(function($){
    
    let eleTabContent = $('.choose-plan .tab-content');
    let eleTabContentHeader = eleTabContent.find('.tab__header');
    let eleLabelYouAreHere = eleTabContentHeader.find('.label-plan-hover');
    let eleTabContentHeaderPremium = eleTabContentHeader.find('.tab__header--hover__premium');
    let eleTabContentHeaderEssential = eleTabContentHeader.find('.tab__header--hover__essential');
    let eleTabContentHeaderStarter = eleTabContentHeader.find('.tab__header--hover__starter');
    let eleTabContentHeaderPlan = eleTabContentHeader.find('.tab__header--hover .tab__header--hover__plan');
    let eleTabContentHeaderNoti = eleTabContentHeaderPlan.find('.tab__header--hover__noti');

    let eleTabContentBody = eleTabContent.find('.tab__body');
    let eleTabContentBodyPremium = eleTabContentBody.find('.premium_list_func');
    let eleTabContentBodyEssential = eleTabContentBody.find('.essential_list_func');
    let eleTabContentBodyStarter = eleTabContentBody.find('.starter_list_func');
    let eleTabContentBodyPlan = eleTabContentBody.find('.features__content__hover .hover_list_func');
    let eleIcon = eleTabContentBodyPlan.find('.features__item.icon-hover');
    let eleIconStarter = eleTabContentBodyPlan.find('.icon-hover-starter');
    let eleIconOnlyPremium = eleTabContentBodyPlan.find('.icon-only-premium');
    let eleIconHideStarter = eleTabContentBodyPlan.find('.icon-hover-hide-starter');

    let columnCurrent = $('.tab__header .tab__header--current, .tab__body .tab__features');
    let columnHover = $('.tab__header .tab__header--hover, .tab__body .features__content .features__content__hover');
    let columnCurrentHeader = $('.tab__header .tab__header--current .tab__header__content');
    let columnCurrentContent = $('.tab__body .tab__features .features__nav .hover_list_func');
    let columnCurrentItem = columnCurrentContent.find('.features__item'); 

    let premiumPlan = '#premium-plan';
    let essentialPlan = '#essential-plan';
    let starterPlan = '#starter-plan';
    let plan = $('#current_plan_data').val();
    let page = $('#current_plan_data').attr('data-page');
    let currentPlan = `#${plan}-plan`;
    let isNotShowYouAreHere = false;

    let tabActive = $('.choose-plan__aside .nav-tabs li.active a').attr('href');
    
    $('#modalUpgradePlan').on('shown.bs.modal', function () {
        tabActive = $('.choose-plan__aside .nav-tabs li.active a').attr('href');
        console.log("tabActiveModal", tabActive)
        isNotShowYouAreHere = true;
    });

    // console.log("tabActive", tabActive)
    $( '.choose-plan__aside .nav-tabs li a' ).click( function(){
        tabActive = $(this).attr('href');
        // console.log("tabActive", tabActive)
        eleTabContent.removeClass('choose-plan-hover')
        eleTabContentHeader.removeClass('tab__header--hover')
        eleTabContentBody.removeClass('tab__body--hover')

        columnCurrentHeader.removeClass('hide-follow-plan animation-hover-header');
        columnHover.removeClass('hide-follow-plan animation-left-to-right');
        columnCurrentItem.removeClass('features__item__hide-icon features__item--hover');

        if(tabActive != currentPlan){
            eleTabContentHeaderNoti.hide();
            eleLabelYouAreHere.addClass('hide');
        }else if(page != 'apps.choicePlan'){
            eleTabContentHeaderNoti.show();
            eleLabelYouAreHere.removeClass('hide');
        }
    });

    $( '.choose-plan__aside .nav-tabs li a' ).mouseleave( function(){
        eleTabContent.removeClass('choose-plan-hover')
        eleTabContentHeader.removeClass('tab__header--hover')
        eleTabContentBody.removeClass('tab__body--hover')

        columnCurrentHeader.removeClass('hide-follow-plan');
        columnHover.removeClass('hide-follow-plan');
    });

    $( '.choose-plan__aside .nav-tabs' ).mouseleave( function(){
        eleTabContent.removeClass('choose-plan-hover')
        eleTabContentHeader.removeClass('tab__header--hover')
        eleTabContentBody.removeClass('tab__body--hover')

        columnCurrentHeader.removeClass('hide-follow-plan animation-hover-header');
        columnHover.removeClass('hide-follow-plan animation-left-to-right');
        columnCurrentItem.removeClass('features__item__hide-icon features__item--hover');
    });

    $( '.choose-plan__aside .nav-tabs li a' ).mouseenter( function(){
        let tabHover = $(this).attr('href');
        // console.log("tabHover", tabHover)

        if(page == 'apps.choicePlan' || isNotShowYouAreHere){
            eleTabContentHeaderNoti.hide();
            eleLabelYouAreHere.hide();
        }

        if(tabHover != tabActive){
            eleTabContent.addClass('choose-plan-hover')
            eleTabContentHeader.addClass('tab__header--hover')
            eleTabContentBody.addClass('tab__body--hover')
            eleTabContentHeaderPlan.hide();
            eleTabContentBodyPlan.hide();
            eleIcon.removeClass('icon-hover-down icon-hover-up');
            eleIconStarter.removeClass('icon-hover-down icon-hover-up');
            eleIconOnlyPremium.removeClass('icon-hover-down icon-hover-up');
            eleIconHideStarter.removeClass('icon-hide');
            eleTabContentHeaderNoti.removeClass('downgrade upgrade');
            /*animation*/
            columnCurrentHeader.addClass('hide-follow-plan');
            columnHover.addClass('hide-follow-plan');
            columnHover.removeClass('animation-left-to-right');
            
            let time = (columnCurrentItem.hasClass('features__item--hover')) ? 300 : 600;
            delayTime(100)
            .then(()=>{
                columnCurrentHeader.addClass('animation-hover-header');
                columnCurrentItem.addClass('features__item__hide-icon features__item--hover');
                return delayTime(time);
            })
            .then(()=>{
                columnHover.addClass('animation-left-to-right');
            })
            /*END: animation*/
            switch(tabActive) {
                case premiumPlan:
                    if(tabHover == essentialPlan){
                        eleTabContentHeaderEssential.show();
                        eleTabContentBodyEssential.show();
                    }
                    if(tabHover == starterPlan){
                        eleTabContentHeaderStarter.show();
                        eleTabContentBodyStarter.show();
                        eleIconStarter.addClass('icon-hover-down');
                    }
                    eleTabContentHeaderNoti.text('losing your powers').addClass('downgrade');
                    eleIcon.addClass('icon-hover-down');
                    eleIconOnlyPremium.addClass('icon-hover-down');
                    break;
                case essentialPlan:
                    if(tabHover == premiumPlan){
                        eleTabContentHeaderPremium.show();
                        eleTabContentBodyPremium.show();
                        eleIcon.addClass('icon-hover-up');
                        eleIconOnlyPremium.addClass('icon-hover-up');
                        eleTabContentHeaderNoti.text('power up your store').addClass('upgrade');
                    }
                    if(tabHover == starterPlan){
                        eleTabContentHeaderStarter.show();
                        eleTabContentBodyStarter.show();
                        eleIcon.addClass('icon-hover-down');
                        eleIconStarter.addClass('icon-hover-down');
                        eleTabContentHeaderNoti.text('losing your powers').addClass('downgrade');
                    }
                    break;
                case starterPlan:
                    if(tabHover == premiumPlan){
                        eleTabContentHeaderPremium.show();
                        eleTabContentBodyPremium.show();
                        eleIconOnlyPremium.addClass('icon-hover-up');
                    }
                    if(tabHover == essentialPlan){
                        eleTabContentHeaderEssential.show();
                        eleTabContentBodyEssential.show();
                    }
                    eleIcon.addClass('icon-hover-up');
                    eleIconStarter.addClass('icon-hover-up');
                    eleIconHideStarter.addClass('icon-hide');
                    eleTabContentHeaderNoti.text('power up your store').addClass('upgrade');
                    break;
                default:
                    break;
            }
        }else{
            eleTabContent.removeClass('choose-plan-hover')
            eleTabContentHeader.removeClass('tab__header--hover')
            eleTabContentBody.removeClass('tab__body--hover')

            columnCurrentHeader.removeClass('hide-follow-plan animation-hover-header');
            columnHover.removeClass('hide-follow-plan animation-left-to-right');
            columnCurrentItem.removeClass('features__item__hide-icon features__item--hover');
        }
    });

    function delayTime(time){
        return new Promise((relsove, reject) => {
            setTimeout(relsove, time);
        })
    }
});