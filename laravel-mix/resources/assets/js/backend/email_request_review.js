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
                return "This field is required!"
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