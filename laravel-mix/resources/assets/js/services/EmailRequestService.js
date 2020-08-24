import {request} from "./ApiService";
import { api } from './../shared/constant/api';
import * as enviroment from './../shared/config/environment';

export const getEmailRequestCustom = () => {
    let url = `${api.email_request_custom}?shop_id=${enviroment.SHOP_ID}`;
    return request("GET", url)
}

export const saveEmailRequestCustom = (data) => {
    data.append('shop_id', enviroment.SHOP_ID);
    return request("POST", api.email_handle_request_custom, data, {'Content-Type': 'multipart/form-data'})
}

export const getListCountry = (data) => {
    return request("GET", api.email_country)
}


export const getListEmail = (params) => {
    let url = api.manage_email;
    console.log('paramsparams',params);
    let body = {
        page : params.page,
        status : params.status,
        sort_by : params.sort_by,
        sort : params.sort,
    };

    if(params.keyword && params.keyword !== '' && params.type_search){
        switch (params.type_search){
            case 'email_id':
                body.email_id = params.keyword;
                break;
            case 'item':
                body.item = params.keyword;
                break;
            case 'email_received':
                body.email_received = params.keyword;
                break;
            case 'sent_at':
                body.sent_at = params.keyword;
                break;
        }
    }

    return request("POST", url,body);
}

export const getTotalEmails = (params) => {
    let url = api.manage_email_get_total;
    return request("GET", url);
}

export const sendNow = (emailId) => {
    let url = api.manage_email_send_now;

    return request('POST', url,{email_id : emailId});
}
export const sendNowAgain = (body) => {
    let url = api.manage_email_send_now_again;

    return request('POST', url,body);
}
export const bulkSendNow = (body) => {
    // body = {shop_id,emails_id};
    let url = api.manage_email_bulk_send_now;
    if (body.checked_all_email){
        url = api.manage_email_bulk_send_now_all;
    }

    return request('POST', url,body);
}

export const stopEmail = (emailId) => {
    let url = api.manage_email_stop_email;

    return request('POST', url,{email_id : emailId});
}
export const bulkStopEmail = (body) => {
    // body = {shop_id,emails_id};
    let url = api.manage_email_bulk_stop_email;
    if (body.checked_all_email){
        url = api.manage_email_bulk_stop_email_all;
    }

    return request('POST', url,body);
}

export const deleteEmail = (emailId) => {
    let url = api.manage_email_delete_email;

    return request('POST', url, {email_id : emailId});
}
export const bulkDeleteEmail = (body) => {
    // body = {shop_id,emails_id};
    let url = api.manage_email_bulk_delete_email;
    if (body.checked_all_email){
        url = api.manage_email_bulk_delete_email_all;
    }
    return request('POST', url,body);
}

export const blockuser = (body) => {
    let url = api.manage_email_block_user;
    // let body = {
    //     shop_id : shopId,
    //     email : email
    // }

    return request('POST', url,body);
}
export const checkWelcome = () => {
    let url = api.manage_email_check_welcome;

    return request('GET', url);
}

export const emailResetSetting = (tab) => {
    let url = api.email_reset_setting;
    let body = {
        shop_id : enviroment.SHOP_ID,
        options : tab
    }
    return request('POST', url, body);
}

export const usingEmail = (is_using) => {
    let url = api.email_using_email;
    let body = {
        shop_id : enviroment.SHOP_ID,
        is_using_email : is_using ? '1' : '0'
    }
    return request('POST', url, body);
}

export const blockProduct = (body) => {
    let url = api.manage_email_block_product;
    // let body = {
    //     shop_id : shopId,
    //     email : email
    // }

    return request('POST', url,body);
}

export const getListProductBlacklist = (shopId) => {
    let url = api.manage_email_get_product_blacklist+'?shop_id='+shopId;
    return request("GET", url);
}

export const getEmailBlacklist = (keyword = '', page = 1) => {
    let url = `${api.email_blacklist}?shop_id=${enviroment.SHOP_ID}&type=paginate&keyword=${keyword}&page=${page}`;
    return request("GET", url);
}

export const getEmailBlacklistAll = () => {
    let url = `${api.email_blacklist}?shop_id=${enviroment.SHOP_ID}&type=paginate&keyword=&type=all`;
    return request("GET", url);
}

export const getProductBlacklistAll = () => {
    let url = `${api.product_blacklist}?shop_id=${enviroment.SHOP_ID}&type=paginate&keyword=&type=all`;
    return request("GET", url);
}

export const getListProduct = () => {
    let url = `${api.email_product}?shop_id=${enviroment.SHOP_ID}`;
    return request("GET", url);
}

export const getListEmailCustomer = () => {
    return request("GET", api.email_customer);
}

export const sendEmailTest = (body) => {
    return request("POST", api.send_email_test, body);
}

export const getEmailCount = (number) => {
    let url = `${api.email_summary}?limit=${number}`;
    return request("GET", url);
}



