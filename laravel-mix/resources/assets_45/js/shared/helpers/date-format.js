import { theme_settings_default } from './../config/theme-setting';

export const formatDate= function(type) {
    let date_format = theme_settings_default.date_format;
    let result = date_format.find((item) => item.id === type);
    return result.text;
}