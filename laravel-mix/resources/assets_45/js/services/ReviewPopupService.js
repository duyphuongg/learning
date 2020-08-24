import {request} from "./ApiService";
import { api } from './../shared/constant/api';

export const getReviewPopupThemeSettings = () => {
    let url = `${api.popup_reviews_theme_Settings}`;
    return request("GET", url, null, {}, true)
}

export const saveReviewPopupThemeSettings = (data) => {
    let url = `${api.popup_reviews_theme_Settings}`;
    return request("POST", url, data, {}, true)
}

export const resetReviewPopupThemeSettings = (data) => {
    let url = `${api.popup_reviews_reset_theme_settings}`;
    return request("POST", url, data, {}, true)
}

export const getReviewPopupPageRuleSettings = () => {
    let url = `${api.popup_reviews_api_page_rule_settings}`;
    return request("GET", url, null, {}, true)
}

export const saveReviewPopupPageRuleSettings = (data) => {
    let url = `${api.popup_reviews_api_page_rule_settings}`;
    return request("POST", url, data, {}, true)
}

export const getReviewPopupDisplayRuleSettings = () => {
    let url = `${api.popup_reviews_api_display_rule_settings}`;
    return request("GET", url, null, {}, true)
}

export const saveReviewPopupDisplaySettings = (data) => {
    let url = `${api.popup_reviews_api_display_rule_settings}`;
    return request("POST", url, data, {}, true)
}

export const resetReviewPopupDisplaySettings = (data = null) => {
    let url = `${api.popup_reviews_api_display_rule_settings_reset}`;
    return request("POST", url, data, {}, true)
}

export const getProducts = (key_word = '', page = null) => {
    let url = `${api.popup_reviews_api_search_products}?title=${key_word}&page=${page}`;
    return request("GET", url, null, {}, true)
}

export const getProductsSpecific = (type) => {
    let url = `${api.popup_reviews_api_products_specific}?type=${type}`;
    return request("GET", url, null, {}, true)
}

export const getCollections = () => {
    let url = `${api.popup_reviews_api_collections}`;
    return request("GET", url, null, {}, true)
}

export const getCollectionSpecific = () => {
    let url = `${api.popup_reviews_api_collection_specific}`;
    return request("GET", url, null, {}, true)
}

export const getCombo = () => {
    let url = `${api.popup_reviews_api_combo}`;
    return request("GET", url, null, {}, true)
}

export const getExcludedProducts = () => {
    let url = `${api.popup_reviews_api_excluded_products}`;
    return request("GET", url, null, {}, true)
}
