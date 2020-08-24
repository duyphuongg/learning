import config from "./config";
import  {statisticReviewPopup, getCookies} from  './statistics-popup-reviews';
document.addEventListener("DOMContentLoaded", function () {
    let isAdminLogin = false;
    // Check isAdminLogin
    const tagsSCRIPT = document.querySelectorAll('head script');
    for(var i = 0; i < tagsSCRIPT.length; i++) {
        const regex = /adminBarInjector\.init\(\)\;/m;
        const rawResult = regex.exec(tagsSCRIPT[i].outerHTML);
        if(rawResult !== null) {
            isAdminLogin = true;
            break;
        }
    }

    let ar_stop_popup_reviews = false;
    let ar_data_popup_reviews = []; // list all popup reviews
    let ar_data_popup_reviews_exist = []; // list popup reviews còn lại
    let ar_data_statistics_popup_reviews = {};
    let elShopifyAliReview = $("#shopify-ali-review");
    let alireviews_product_id = 0;
    let alireviews_list_products_in_cart = [];
    if (elShopifyAliReview.length && !elShopifyAliReview.attr("data-shop-id")) {
        alireviews_product_id = elShopifyAliReview.attr("product-id");
    }
    let shopUrl = window.Shopify.shop;
    let ar_betweenTime = 5000;
    let ar_loopPopup = 0;
    let ar_limitPopup = false;
    let ar_listCommentOld = [];

    let checkTabBrowserActiveAr = (function () {
        var stateKey, eventKey, keys = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function (c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    })();

    if (typeof alireviews_page_type != 'undefined' && ar_stop_popup_reviews === false) {
        if(alireviews_page_type === 'cart'){
            $.ajax({
                method: "GET",
                url: "/cart.json",
                data: {
                },
                success: function (result) {
                    if(result.item_count > 0){
                        var list_products_in_cart = [];
                        $.each(result.items, function( index, value ) {
                            list_products_in_cart.push(value.product_id);
                        });

                        alireviews_list_products_in_cart = list_products_in_cart;
                        aliReviewsListPopupReviews();
                    }
                },
                error: function () {

                }
            });

            if(typeof isAdminLogin != 'undefined' && !isAdminLogin) {
                var shopId = sessionStorage.getItem('shopId');
                if (typeof shopId != 'undefined' && shopId != null) {
                    let myCookies = getCookies();
                    if ((sessionStorage.getItem('obj_cart') === null) || sessionStorage.getItem('obj_cart') !== myCookies.cart) {
                        let shopId = sessionStorage.getItem('shopId');
                        statisticReviewPopup({
                            cart_token: myCookies.cart,
                            type: 'cart_token',
                            review_id: myCookies.review_id,
                            shop_id: shopId
                        });
                    }
                }
            }

        }else{
            aliReviewsListPopupReviews()
        }
    }

    function aliReviewsListPopupReviews(type = "first") {
        $.ajax({
            method: "POST",
            url: config.shop_url + "/reviews_popup/list",
            data: {
                shop_domain: shopUrl,
                isAdminLogin: isAdminLogin,
                alireviews_page_type: alireviews_page_type,
                alireviews_product_id: alireviews_product_id,
                list_products_in_cart: alireviews_list_products_in_cart,
                alireviews_collection_id: typeof alireviews_collection_id != 'undefined' ? alireviews_collection_id : '',
                list_comment_old : ar_listCommentOld
            },
            success: function (result) {

                if (result.status) {
                    ar_data_popup_reviews = JSON.parse(JSON.stringify(result.data));

                    let data = JSON.parse(JSON.stringify(result.data));
                    sessionStorage.setItem('shopId', result.data[0].shop_id);
                    if(sessionStorage.getItem('review_id') == null || typeof sessionStorage.getItem('review_id') == 'undefined'){
                        getCookies(result.data[0].shop_id);
                    }
                    if(typeof isAdminLogin != 'undefined' && !isAdminLogin){
                        if(alireviews_page_type == 'cart'){
                            let myCookies = getCookies();
                            if((sessionStorage.getItem('obj_cart') === null ) ||  sessionStorage.getItem('obj_cart') !== myCookies.cart){
                                let shopId = sessionStorage.getItem('shopId');
                                statisticReviewPopup({cart_token :myCookies.cart,type : 'cart_token',review_id :myCookies.review_id , shop_id : shopId}) ;
                            }
                        }
                    }

                    if(type == 'first'){
                        ar_loopPopup = result.loop;
                        var firtsTime = result.firstTime;

                        setTimeout(function () {
                            showPopupReviewAr(data);
                        }, firtsTime); // thời gian hiên popup đầu tiên
                    }else{
                        setTimeout(function () {
                            showPopupReviewAr(data);
                        }, ar_betweenTime); // thời gian giữa các popup
                    }
                }else {
                    // nếu còn lặp thì gọi lên lại 1 lần nữa
                    if(ar_loopPopup && parseInt(ar_loopPopup) > 0){
                        ar_loopPopup = parseInt(ar_loopPopup) - 1;
                        // set lại list comment đã hiện bằng rỗng
                        ar_listCommentOld = [];

                        aliReviewsListPopupReviews('loop');
                    }
                }
            },
            error: function () {

            }
        });
    }

    $("body").delegate(".ar-btn-click-popup-close", "click", function (e) {
        $('.mfp-move-horizontal').addClass('mfp-removing');
        $('.mfp-move-horizontal').removeClass('mfp-ready');
        setTimeout(function () {
            $('.ar-ctn-popup-reviews').remove();
        }, 200); 
        ar_stop_popup_reviews = true;
    });

    $("body").delegate(".ar-btn-show-modal-reviews", "click", function (e) {
        e.preventDefault();
        var modalPopup = $(this).closest('.ar-ctn-popup-reviews').find('.ar-modal-popup-reviews');
        modalPopup.css('display', 'block');
        $('.ar-popup-reviews').remove();
        handelListReviewImage(e);
        replacePositionFlagCountry();
        if(typeof isAdminLogin != 'undefined' && !isAdminLogin){
            ar_data_statistics_popup_reviews.type = 'click';
            ar_data_statistics_popup_reviews.is_reviews = true ;
            ar_data_statistics_popup_reviews.reviewPerformance = 'true';
            statisticReviewPopup(ar_data_statistics_popup_reviews);
        }


        /**
         * Modal hiện thì ngưng chạy các popup còn lại
         */
        ar_stop_popup_reviews = true;
        setTimeout(function () {
            $('body').addClass('popup-reviews-modal-open');
        });
    });
    $("body").delegate(".ar-btn-click-popup-direct", "click", function (e) {
        e.preventDefault();
        var modalPopup = $(this).closest('.ar-btn-click-popup-direct').find('.ar-btn-click-popup-direct');
        modalPopup.css('display', 'block');
        $('.ar-popup-reviews').remove();
        if(typeof isAdminLogin != 'undefined' && !isAdminLogin){
            ar_data_statistics_popup_reviews.type = 'click';
            ar_data_statistics_popup_reviews.href = $(this).attr('href');
            ar_data_statistics_popup_reviews.target = $(this).attr('target');
            ar_data_statistics_popup_reviews.is_reviews = true ;
            ar_data_statistics_popup_reviews.reviewPerformance = 'true';
            statisticReviewPopup(ar_data_statistics_popup_reviews);
        }else {
            var win = window.open($(this).attr('href'), $(this).attr('target'));
            win.focus();
        }

        // ar_stop_popup_reviews = true;
        // setTimeout(function () {
        //     $('body').addClass('popup-reviews-modal-open');
        // });
    });
    $("body").delegate(".ar-modal-popup-reviews .button-close", "click", function (e) {
        /**
         * Đóng modal thì hiện popup review lại với data còn lại
         */
        ar_stop_popup_reviews = false;
        $('body').removeClass('popup-reviews-modal-open');
        setTimeout(function () {
            showPopupReviewAr(ar_data_popup_reviews_exist);
        }, ar_betweenTime); // thời gian giữa các popup
        $('.ar-ctn-popup-reviews').remove();
    });

    function showPopupReviewAr(data) {
        if(!$('.ar-ctn-popup-reviews').length){
            var isTabActive = true;
            isTabActive = checkTabBrowserActiveAr() ? true : false;
            console.log('isTabActive', isTabActive);

            /**
             * Check tab active thì mới chạy popup
             */
            var lifetime = 5000;

            if (isTabActive === true) {
                // nếu hết data thì gọi api lên để lấy trang tiếp theo
                if (data.length < 1 || typeof data === 'undefined') {
                    aliReviewsListPopupReviews('pagination');
                    return ;
                }

                let firstPopup = data.shift();
                lifetime = firstPopup.lifetime;
                ar_listCommentOld.push(firstPopup.comment_id);
                if(typeof (firstPopup.betweenTime.from) !=="undefined" && firstPopup.betweenTime.from ){
                    ar_betweenTime =Math.floor(Math.random() * (firstPopup.betweenTime.to - firstPopup.betweenTime.from)) + firstPopup.betweenTime.from;
                    ar_betweenTime = ar_betweenTime * 1000;
                }else {
                    ar_betweenTime = firstPopup.betweenTime;
                }
                console.log('ar_betweenTime - '+firstPopup.comment_id,ar_betweenTime);

                ar_data_popup_reviews_exist = data;
                $('body').append(firstPopup.view);

                var avatarImage = $('.ar-popup-reviews--products-avatar img');
                if(avatarImage.length){
                    //check if the image is already on cache
                    if(avatarImage.prop('complete')){ 
                        setTimeout(function(){
                            $('.mfp-move-horizontal').addClass('mfp-ready');
                        }, 50);
                    }else{
                        /* Call the codes/function after the image is loaded */
                        avatarImage.on('load',function(){
                            setTimeout(function(){
                                $('.mfp-move-horizontal').addClass('mfp-ready');
                            }, 50);
                        });
                    }
                }else{
                    setTimeout(function(){
                        $('.mfp-move-horizontal').addClass('mfp-ready');
                    }, 50);
                }

                $('.alr-rating').length && $('.alr-rating').rating();
                /**
                 * Run statistic
                 */
                console.log("isAdminLogin", isAdminLogin) ;

                if(typeof isAdminLogin != 'undefined' && !isAdminLogin){
                    // condition when display combo products

                    if(typeof firstPopup.combo != 'undefined' && firstPopup.combo != null && firstPopup.combo !== ''){
                        firstPopup.combo_id = firstPopup.combo.id;
                        firstPopup.combo_title = firstPopup.combo.title;
                        firstPopup.type_oject ='combo';
                    }
                    firstPopup.reviewPerformance =(typeof sessionStorage.getItem('reviewPerformance') !='undefined' && sessionStorage.getItem('reviewPerformance') !== 'true' ) ? 'false' : 'true';
                    statisticPopupReviewAr(firstPopup);
                }

            }

            setTimeout(function(){
                ar_circlePopup(data)
            }, lifetime); // thời gian sống của 1 popup
        }
    }
    
    function ar_circlePopup(data) {
        if(ar_stop_popup_reviews === false){
            // kiểm tra xem có đang hover popup không mới tắt
            var isHovered = $('.ar-popup-reviews:hover').length; // returns true or false
            console.log('isHovered',isHovered);

            if(isHovered === 0){
                $('.mfp-move-horizontal').addClass('mfp-removing');
                $('.mfp-move-horizontal').removeClass('mfp-ready');
                setTimeout(function () {
                    $('.ar-ctn-popup-reviews').remove();
                }, 200); 

                setTimeout(function () {
                    showPopupReviewAr(data)
                }, ar_betweenTime); // thời gian giữa các popup
            }else{
                /*
                Nếu đang hover popup thì cứ mỗi 1 giây lại gọi lại circle popup để khi rê chuột ra có thể chạy tiếp
                 */
                setTimeout(function(){
                    ar_circlePopup(data)
                }, 1000);
            }
        }
    }

    function statisticPopupReviewAr(object) {

        let myCookies = getCookies();
        let objProducts = {
            type_page : alireviews_page_type,
            product_id : object.product.id ,
            product_title:object.product.title,
            shop_id: object.shop_id,
            review_id :  myCookies.review_id,
            product_avatar : object.product.image ,
            product_link : (typeof object.product.handle != 'undefined') && (object.product.handle) ? '/products/'+object.product.handle :"",
            type :'review',
            is_reviews : true ,
            reviewPerformance : object.reviewPerformance
        };
        if(typeof  object.type_oject != 'undefined' && object.type_oject === 'combo'){
            objProducts.combo_id = object.combo_id;
            objProducts.combo_title = object.combo_title;
        }
        if(alireviews_page_type ==='cart'){
            objProducts.cart_token = myCookies.cart
        }

        statisticReviewPopup(objProducts) ;
        ar_data_statistics_popup_reviews = objProducts;
    }

    //Popup detail
    function clickArrow(event){
        let count = $(event.target).attr('data-lightbox-key') ? (parseInt($(event.target).attr('data-lightbox-key')) + 1) : 1;
        let length = $('.ar-modal-popup-reviews .lc-list-image img').length;
        if(length <= 1){
            $('.ar-modal-popup-reviews .lc-arrow').css('display', 'none');
        }else{
            $('.ar-modal-popup-reviews .lc-arrow').css('display', 'block');
        }
        $("body").delegate(".ar-modal-popup-reviews .lc-arrow-left", "click", function (e) {
            if(count <= 1){
                count = length;
            }else{
                count -= 1;
            }
            handleActiveImage(count);
        });
        $("body").delegate(".ar-modal-popup-reviews .lc-arrow-right", "click", function (e) {
            if(count >= length){
                count = 1;
            }else{
                count += 1;
            }
            handleActiveImage(count);
        });

        $('.ar-modal-popup-reviews .lc-list-thumbnail img').on('click', function(event){
            count = $(event.target).attr('data-lightbox-key') ? (parseInt($(event.target).attr('data-lightbox-key')) + 1) : 1;
            handleActiveImage(count);
        })
    }

    function handleActiveImage(count){
        $('.lc-list-image img').removeClass('visible-img');
        $('.lc-list-image img:nth-child('+ count +')').addClass('visible-img');
        $('.lc-list-thumbnail img').removeClass('lc-img-active');
        $('.lc-list-thumbnail img:nth-child('+ count +')').addClass('lc-img-active');
    }

    function handelListReviewImage(event){
        let key = $(event.target).attr('data-lightbox-key') ? (parseInt($(event.target).attr('data-lightbox-key')) + 1) : 1;
        $('.ar-modal-popup-reviews .lc-list-image img:nth-child('+ key +')').addClass('visible-img');
        $('.ar-modal-popup-reviews .lc-list-thumbnail img:nth-child('+ key +')').addClass('lc-img-active');
        clickArrow(event);
    }

    function replacePositionFlagCountry(){
        var ali_country_flag_shape = $('.ali_country_flag_shape').val();
        setTimeout(() => {
            $('.ali-flag-slc').not('.ali-flag-replaced').each(function(){
                let a = $(this).css('backgroundPositionY');
                let b = Number(a.replace(/[^0-9-]/g, ''));
                $(this).addClass('ali-flag-replaced');
                if(ali_country_flag_shape == 'rectangle'){
                  $(this).css({'background-position-y': `${b - 6}px`});
                }else if(ali_country_flag_shape == 'circle'){
                  $(this).css({'background-position-y': `${b - 4}px`});
                }
            })
        }, 300)
    }
});

