import {request} from "./ApiService";
import { api } from './../shared/constant/api';

export const getAutoPublishReviewSetting = () => {
    let url = `${api.setting_auto_publish_reviews}`;
    return request("GET", url, null, {}, true)
}

export const saveAutoPublishReviewSetting = (data) => {
    let url = `${api.setting_auto_publish_reviews}`;
    return request("POST", url, data, {}, true)
}