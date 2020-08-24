import {request} from "./ApiService";
import { api } from './../shared/constant/api';

export const getThemeSetting = () => {
    let url = `${api.theme_setting}`;
    return request("GET", url, null, {}, true)
}

export const saveThemeSetting = (data) => {
    let url = `${api.theme_setting}`;
    return request("POST", url, data, {}, true)
}

export const resetThemeSetting = () => {
    let url = `${api.theme_setting_reset}`;
    return request("POST", url, null, {}, true)
}

export const checkThemeSettingVersion = () => {
    let url = `${api.theme_setting_version}`;
    return request("GET", url, null, {}, true)
}

export const upgradeThemeSetting = () => {
    let url = `${api.theme_setting_upgrade}`;
    return request("POST", url, null, {}, true)
}

export const checkContactThemeSetting = () => {
    let url = `${api.theme_setting_check_contact}`;
    return request("GET", url, null, {}, true)
}

export const closeContactThemeSetting = () => {
    let url = `${api.theme_setting_close_contact}`;
    return request("POST", url, null, {}, true)
}

export const getStatusReviewWidget = () => {
    let url = `${api.widget_themes_setting}`;
    return request("GET", url, null, {}, true)
}

export const updateWidgetThemesSetting = (data) => {
    let url = `${api.widget_themes_setting}`;
    return request("POST", url, data, {}, true)
}
