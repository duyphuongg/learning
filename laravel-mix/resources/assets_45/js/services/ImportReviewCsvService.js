import {request} from "./ApiService";
import { api } from './../shared/constant/api';

export const getSettingImportCSV = () => {
    let url = `${api.settings_import_csv}`;
    return request("GET", url, null, {}, true)
}

export const postSettingImportCSV = (data) => {
    let url = `${api.settings_import_csv}`;
    return request("POST", url, data, {}, true)
}
export const getCsvProcessing = () => {
    let url = `${api.csv_processing}`;
    return request("GET", url, null, {}, true)
}
export const getTrackingImportReview = (data) => {
    let url = `${api.tracking_type_import}?type_import=${data}`;
    return request("GET", url, null, {}, true)
}