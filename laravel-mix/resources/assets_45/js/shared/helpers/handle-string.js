import { theme_settings_default } from './../config/theme-setting';

export const formatCustomNameReview = function(name, type) {
    let result  = '';
    if(!name){
        return '';
    }
    let first_name =  name.substring(0, name.indexOf(' ')).trim();
    let last_name =  name.substring(name.indexOf(' ')).trim();
    switch (type) {
        case theme_settings_default.customer_name[0].id:
            result = name;
            break;
        case theme_settings_default.customer_name[1].id:
            let first_1 = (first_name[0] && first_name[0].toUpperCase()) || '';
            let last_1 = (last_name[0] && last_name[0].toUpperCase()) || '';
            result = `${first_1}.${last_1}`;
            break;
        case theme_settings_default.customer_name[2].id:
            let last_2 = (last_name[0] && last_name[0].toUpperCase()) || '';
            result = `${first_name} ${last_2}`;
            break;
        case theme_settings_default.customer_name[3].id:
            let first_3 = (first_name[0] && first_name[0].toUpperCase()) || '';
            let last_3 = name.trim().substring(1).replace(/./g, '*');
            result = `${first_3}${last_3}`;
            break;
    }
    return result;
}