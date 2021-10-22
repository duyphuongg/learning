import axios from 'axios';
import * as enviroment from './../shared/config/environment';

const TOKEN = tokenApi;

export const getParams = (method = 'GET', url = '', data = null, headers = {}, app_url = false) => {
    let headerDefault = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
    };

    if (data !== null) {
        let data_custom = data instanceof FormData ? data : JSON.stringify(data);
        return {
            method,
            url: app_url ? `${enviroment.APP_URL}/${url}` : `${enviroment.URL_API}/${url}`,
            headers: Object.assign(headerDefault, headers),
            data: data_custom
        }
    } else {
        return {
            method,
            url: app_url ? `${enviroment.APP_URL}/${url}` : `${enviroment.URL_API}/${url}`,
            headers: Object.assign(headerDefault, headers)
        }
    }
}

export const request = (method = 'GET', url, body, header, app_url) => {
    let options = getParams(method, url, body, header, app_url);
    console.log("options", options)
    return axios(options).then(res => {
        try {
            console.log("request res", res)
            return res
        } catch (e) {
            throw e
        }
    }).then((data) => {
        console.log("handleError", data)
        return handleError(data)
    }).catch(error => {
        throw error
    })
}

const handleError = (response) => {
    const error = response && response.error
    if (error) {
        throw {
            message: response.message,
            code: response.error,
        }
    } else {
        return response.data;
    }
}