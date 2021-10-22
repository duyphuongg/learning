import { handleContactDeveloperThemeSetting } from './../backend/onboarding';

jQuery(document).ready(function($){
    $('.customer-support__chat .button').click(function(){
        var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
        if( intercom_on_messager == null ) {
            Intercom('show');
        } else {
            Intercom('hide');
        }
    });

    $('.customer-support__email .button').click(function(){
        let contact_our_developers_modal = $('#onboarding-install-alireviews-modal');
        let input_problems_contacts = contact_our_developers_modal.find("input[name='problems_contacts']");
        input_problems_contacts.prop('checked', false);
        contact_our_developers_modal.addClass('modal-send-mail-help-page');
        contact_our_developers_modal.find('.modal-content').css({'height': '577px', 'max-height': '577px', 'width': '650px', 'max-width': '650px'});
        contact_our_developers_modal.find(".modal-content .modal-body").animate({left: '-100%'}, 0);
        contact_our_developers_modal.find(".fix-now__step-2__2").animate({left: '0'}, 0);
        contact_our_developers_modal.find(".button--close").css({'display': 'block'});
        contact_our_developers_modal.modal('show');
        handleContactDeveloperThemeSetting();
    });
});