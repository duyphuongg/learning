import config from "./config";

// export
let  isAdminLogin = false;
const tagsSCRIPT = document.querySelectorAll('head script');

for(var i = 0; i < tagsSCRIPT.length; i++) {
    const regex = /adminBarInjector\.init\(\)\;/m;
    const rawResult = regex.exec(tagsSCRIPT[i].outerHTML);
    if(rawResult !== null) {
        isAdminLogin = true;
        break;
    }
}
function getCookies() {
    var elShopifyAliReview = $("#shopify-ali-review"); //$('input[name=alireview_shop_id]').val();
    var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair[1]);
    }
    var data = sessionStorage.getItem('visitor_id');

    if ((data === null || typeof data === 'undefined') && typeof shopId !== 'undefined') {
        var visitor_id = shopId + (Date.now()).toString() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        cookies.visitor_id = visitor_id;
        sessionStorage.setItem('visitor_id', visitor_id);

    } else {
        cookies.visitor_id = sessionStorage.getItem('visitor_id');
    }

    return cookies;

}

export function configCookieVisitor() {
    var time_limit_track_value = Date.now();
    var time_limit_track = ((5) * 1000);
    setCookie('time_limit_track', time_limit_track_value, time_limit_track);
    setCookie('visitor_id', sessionStorage.getItem('visitor_id'));
}

configCookieVisitor();

export function checkCartToken() {
    const shopUrl = window.Shopify.shop;
    var urlCurrent = window.location.href;
    var res = urlCurrent.match(/\/cart/g);
    var myCookies = getCookies();
    var sessionStorageIsReviews = sessionStorage.getItem('is_reviews');
    if (myCookies.cart && res !== null) {

        $.ajax({
            type: "GET",
            url: config.shop_url + "/comment/visitor-tracking",
            data: {
                'shop_id': sessionStorage.getItem('shop_id'),
                'visitor_id': myCookies.visitor_id,
                'cart_token': myCookies.cart,
                'is_reviews': (sessionStorageIsReviews == null) ? false : true,
                'type' : 'cart'
            },
            dataType: "json",
            success: function (result) {
                setCookie('shop_id', result.shop_id);
                sessionStorage.setItem('obj_cart', myCookies.cart);
            }, // success
            error: function () {

            } // error
        });
    }
}

if ((sessionStorage.getItem('obj_cart') === null) || sessionStorage.getItem('obj_cart') !== getCookies().cart) {
    if(typeof isAdminLogin != 'undefined' && !isAdminLogin){
        checkCartToken();
    }
}

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


export function visitor_tracking() {
    var elShopifyAliReview = $("#shopify-ali-review");
    var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
    var myCookies = getCookies();
    return new Promise(function (resolve) {
        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: config.shop_url + "/comment/visitor-tracking",
                data: {
                    'shop_id': shopId,
                    'visitor_id': myCookies.visitor_id,
                    'type': 'visitor',
                    'is_reviews': false,
                    'cart_token': (typeof myCookies.cart === 'undefined') ? '' : myCookies.cart,
                },
                dataType: "json",
                success: function (result) {
                    if (result.status) {
                        sessionStorage.setItem('is_visitor', myCookies.visitor_id);
                        sessionStorage.setItem('shop_id', shopId)
                    }
                },
                error: function () {

                } // error
            });

            resolve("true")
        }, 5000);
    });
}

function isReviewBox() {

    var elShopifyAliReview = $("#shopify-ali-review");
    var shopId = elShopifyAliReview.find(".shop_info").attr("shop-id");
    var productId = elShopifyAliReview.attr("product-id");
    var myCookies = getCookies();
    var isViewBox = sessionStorage.getItem('is_reviews');


    $(function () {
        $('div#shopify-ali-review').on("mousewheel", function () {

            if (typeof isViewBox === 'undefined' || isViewBox == null ) {
                isViewBox = sessionStorage.getItem('visitor_id');
                $.ajax({
                    type: "GET",
                    url: config.shop_url + "/comment/visitor-tracking",
                    data: {
                        'shop_id': shopId,
                        'visitor_id': myCookies.visitor_id,
                        'type': 'visitor',
                        'is_reviews':  true,
                        'cart_token': (typeof myCookies.cart === 'undefined') ? '' : myCookies.cart,
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result.status) {
                            sessionStorage.setItem('shop_id', shopId);
                            sessionStorage.setItem('is_reviews', sessionStorage.getItem('visitor_id'))
                        }
                        console.log("Scroll Page");
                    }, // success
                    error: function () {
                        isViewBox = false;
                    } // error
                });
            }

        });
    });
}

function countInteractiveReviews(shopId, isTracking) {

    var myCookies = getCookies();
    var elShopifyAliReview = $("#shopify-ali-review");
    var productId = elShopifyAliReview.attr("product-id");

    $.ajax({
        type: "GET",
        url: config.shop_url + "/comment/visitor-tracking",
        data: {
            'shop_id': shopId,
            'product_id': productId,
            'visitor_id': myCookies.visitor_id,
            'time_limit_track': (isTracking === true || isTracking === 'true') ? Date.now() : null,
            'type_visitor': 'interactive'
        },
        dataType: "json",
        success: function (result) {
            console.log("View Image")
        }, // success
        error: function () {

        } // error
    });
}

export {getCookies, countInteractiveReviews, isReviewBox}
