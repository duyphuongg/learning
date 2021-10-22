import { Pagination, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import EmailTemplateSetup from '../views/email-request/template-setup/email-template-setup';
import EmailManagement from '../views/email-request/email-management/email-management';

Vue.use(Pagination);
Vue.use(Select);
Vue.use(VeeValidate);

const dictionary = {
    en: {
        messages: {
            required: function () {
                return "Please fill in this required field"
            },
            email: function () {
                return "Invalid email!"
            },
            image: function () {
                return "This field must be an image."
            },
        }
    }
};

VeeValidate.Validator.localize(dictionary);

Vue.directive('select2', {
    inserted(el) {
        $(el).on('select2:select', () => {
            const event = new Event('change', { bubbles: true, cancelable: true });
            el.dispatchEvent(event);
        });

        $(el).on('select2:unselect', () => {
            const event = new Event('change', {bubbles: true, cancelable: true})
            el.dispatchEvent(event)
        })
    },
});

new Vue({
    el: '#js-email-template-setup',
    components: {
        "email-template-setup": EmailTemplateSetup
    }
});

new Vue({
    el: '#js-email-management',
    components: {
        "email-management": EmailManagement
    }
});

//Check first time show modal 
$(document).ready(function(){
    if($('div').hasClass('js-first-time-to-email-request-modal')){
        // handelShowOnBoardingEmailCampaign();
    }
});

function handelShowOnBoardingEmailCampaign(){
    let path_name = location.pathname;
    if(path_name == `/emails-request/template-settings` && (localStorage.getItem('onboarding_email_campaign') === 'true')){
        setTimeout(function(){ localStorage.removeItem('onboarding_email_campaign'); }, 1000);
        $('#first-time-to-email-request-modal').modal('show');
        $('.js-btn-next').on('click', function(){
            $("#first-time-to-email-request-modal .first-time__1").animate({left: '-100%'});
            $("#first-time-to-email-request-modal .first-time__2").animate({left: '0'});
            $('#first-time-to-email-request-modal .button--close').css({'display': 'block'});
            $('#first-time-to-email-request-modal .modal-content').css({'height': '690px'});
            $(document).on('keyup',function(evt) {
                if (evt.keyCode == 27) {
                   $('#first-time-to-email-request-modal').modal('hide');
                }
            });
        })

        $('#first-time-to-email-request-modal').on('click', '.js-btn-let-start', function(){
            $('#first-time-to-email-request-modal').modal('hide');
        })

        $('#first-time-to-email-request-modal').on('click', '.button--close', function(){
            $('#first-time-to-email-request-modal').modal('hide');
        });
    }
}

