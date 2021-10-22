import {request} from "./ApiService";
import { api } from './../shared/constant/api';

export const getSettingAutoUpdate = () => {
    let url = `${api.auto_update_review_get_settings_auto_update}`;
    return request("GET", url, null, {}, true)
}

export const saveSettingsAutoUpdate = (data) => {
    let url = `${api.auto_update_review_settings_auto_update_reviews}`;
    return request("POST", url, data, {}, true)
}

export const saveSettingsPerProductGetReviews= (data) => {
    let url = `${api.auto_update_review_settings_per_product_get_reviews}`;
    return request("POST", url, {data}, {}, true)
}

export const getListAutoUpdateProducts = (key_word = '', page = null) => {
    let url = `${api.auto_update_review_list_auto_update_products}?title=${key_word}&page=${page}`;
    return request("GET", url, null, {}, true)
}

export const saveLinkAeFromAutoUpdate = (data) => {
    let url = `${api.auto_update_review_update_link_aliexpress_from_auto_update}`;
    return request("POST", url, data, {}, true)
}

export const resetSettingsAutoUpdateImportReview = () => {
    let url = `${api.auto_update_review_reset_settings_auto_update_reviews}`;
    return request("GET", url, null, {}, true)
}

export const getListProductRunAutoUpdate = () => {
    let url = `${api.auto_update_review_list_products_run_auto_update}`;
    return request("GET", url, null, {}, true)
}

export const saveSettingAutoPerProduct = (data) => {
    let url = `${api.auto_update_review_post_settings_per_product_get_reviews}`;
    return request("POST", url, data, {}, true)
}

export const getSettingAutoPerProduct = (product_id) => {
    let url = `${api.auto_update_review_get_settings_per_product_get_reviews}?product_id=${product_id}`;
    return request("GET", url, null, {}, true)
}

export const resetMultiSettingsAutoUpdate = (data) => {
    let url = `${api.auto_update_review_reset_multi_action_setting_per_product}`;
    return request("POST", url, data, {}, true)
}

export const saveFirstTimeAutoSetting = () => {
    let url = `${api.auto_update_review_save_firstime_auto_update}`;
    return request("POST", url, null, {}, true)
}
