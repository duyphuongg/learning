import {request} from "./ApiService";
import { api } from './../shared/constant/api';

export const getSettingGoogleShopping = () => {
    let url = `${api.google_shopping_get_setting_product_rating}`;
    return request("GET", url, null, {}, true)
}

export const getAllProducts = (key_word = '', page = null) => {
    let url = `${api.google_shopping_all_product_use_product_rating}?title=${key_word}&page=${page}`;
    return request("GET", url, null, {}, true)
}

export const resetSettingGoogleShopping = () => {
    let url = `${api.google_shopping_reset_settings_auto_product_rating}`;
    return request("GET", url, null, {}, true)
}

export const saveSettingGoogleShopping = (data) => {
    let url = `${api.google_shopping_update_setting_product_rating}`;
    return request("POST", url, data, {}, true)
}

export const saveFirstTime = (data = null) => {
    let url = `${api.google_shopping_save_firstime_google_shopping}`;
    return request("POST", url, data, {}, true)
}
export const checkFileGoogleShopping = () => {
    let url = `${api.google_shopping_check_file_google_shopping}`;
    return request("GET", url, null, {}, true)
}