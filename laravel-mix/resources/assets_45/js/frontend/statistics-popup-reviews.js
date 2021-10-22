import config from "./config";

// export

function getCookies(shopId = null , product) {
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair[1]);
    }
    var data = sessionStorage.getItem('review_id');
    var visitorId = sessionStorage.getItem('visitor_id');
    if ((visitorId !== null || typeof visitorId !== 'undefined') && typeof shopId !== 'undefined'){
        data =  visitorId ;
        sessionStorage.setItem('review_id', visitorId);
    }
    if ((data === null || typeof data === 'undefined') && typeof shopId !== 'undefined') {
        var review_id = shopId + (Date.now()).toString() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        cookies.review_id = review_id;
        sessionStorage.setItem('review_id', review_id);
        sessionStorage.setItem('visitor_id', review_id);

    } else {
        cookies.review_id = sessionStorage.getItem('review_id');
        cookies.visitor_id = sessionStorage.getItem('review_id');
    }
    return cookies;

}

export function configCookieVisitor() {
    var time_limit_track_value = Date.now();
    var time_limit_track = ((5) * 1000);
    setCookie('time_limit_track', time_limit_track_value, time_limit_track);
    setCookie('review_id', sessionStorage.getItem('review_id'));
    setCookie('visitor_id', sessionStorage.getItem('review_id'));
}

configCookieVisitor();



/**
 *
 * @param {*} cname
 * @param {*} cvalue
 */

export function setCookie(cname, cvalue, time_limit = null) {
    var date = new Date();
    if (time_limit !== null) {
        date.setTime(date.getTime() + time_limit);

        var expires = "expires=" + date.toGMTString();

        window.document.cookie = cname + "=" + cvalue + "; " + expires;
    } else {
        window.document.cookie = cname + "=" + cvalue;
    }

}


function statisticReviewPopup(object = {}) {

    let Url   = config.shop_url + "/reviews_popup/statistic" ;
    $.ajax({
        type: "GET",
        url:Url,
        data: object,
        dataType: "json",
        success: function (result) {
            if(result.status && result.cart_token) {
                sessionStorage.setItem('obj_cart', result.cart_token);
            } else if(result.status){
                sessionStorage.setItem('reviewPerformance', 'true');
                sessionStorage.setItem('is_visitor', sessionStorage.getItem('visitor_id'));
                setCookie('is_visitor',sessionStorage.getItem('visitor_id'));
                if(typeof result.data.href !='undefined' && result.data.href != null){
                    if(typeof result.data.target !='undefined' && result.data.target != null){
                        var win = window.open(result.data.href, result.data.target);
                        win.focus();
                    }
                }
            }
        }, // success
        error: function () {

        } // error
    });
}



export {getCookies ,statisticReviewPopup}
