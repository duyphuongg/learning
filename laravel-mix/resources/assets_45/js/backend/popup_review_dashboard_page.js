document.addEventListener("DOMContentLoaded", function (event) {
    // Init
    select2();

    $('select.statistic_popup_review').change(function () {
        let obj = $(this);
        let number = obj.val();
        getDayOptionStatisticPopupReviews(number);
    });

    $(document).on('click', '.see_more', function () {
        let obj = $(this);
        let type_sort = $('input[name=type_sort]').val();
        let order_by = $('input[name=order_by]').val();
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            type: "post",
            url: appUrl + "/popup-reviews/get-statistics-popup-reviews",
            dataType: "json",
            data: {
                type_day: $("select[name='statistic_popup_review'] option:selected").val(),
                type_sort: type_sort,
                show_more: 1, count_object: $('input[name=show_more]').val()
            },
            beforeSend: function () {
                obj.attr("disabled", true).css("opacity", 0.5);
            },
            success: function (result) {
                obj.attr("disabled", false).css("opacity", 1);
                console.log(result);
                if (result.status) {
                    let classDefault = "fas alireview-fa-sort";
                    let classDown = "fas alireview-fa-sort-down text-info";
                    let classUp = "fas alireview-fa-sort-up text-info";
                    $("th").children().removeClass().addClass(classDefault);

                    $('input[name=show_more]').val(result.data.count_object);
                    var eleTableCombo = $('#tableProductCombo tbody');
                    var htmlTableCombo = '';
                    var productsCombo = result.data.products_combo;
                    productsCombo = Object.values(productsCombo);
                    switch (type_sort) {

                        case 'total_click' :
                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                productsCombo.sort((a, b) => (a.total_click > b.total_click) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classDown);

                            } else {
                                productsCombo.sort((a, b) => (a.total_click < b.total_click) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classUp);
                            }
                            break;

                        case 'total_order' :

                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                productsCombo.sort((a, b) => (a.total_order > b.total_order) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classDown);
                            } else {
                                productsCombo.sort((a, b) => (a.total_order < b.total_order) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classUp);
                            }
                            break;
                        case 'total_revenue' :
                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                productsCombo.sort((a, b) => (a.total_revenue > b.total_revenue) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classDown);
                            } else {
                                productsCombo.sort((a, b) => (a.total_revenue < b.total_revenue) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classUp);
                            }
                            break;
                        default :
                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                productsCombo.sort((a, b) => (a.total_review > b.total_review) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classDown);
                            } else {
                                productsCombo.sort((a, b) => (a.total_review < b.total_review) ? 1 : -1);
                                $('th.' + type_sort).children().removeClass().addClass(classUp);
                            }
                            break;
                    }
                    var no = 1;
                    for (var key in productsCombo) {
                        htmlTableCombo += renderHtmlTopProductsCombo(no, productsCombo[key]);
                        no++;
                    }

                    let count_object = parseInt(result.data.count_object);

                    if (count_object % 10 === 0) {
                        htmlTableCombo += `
                    <tr id="statistic-combo-see-more" class="text-center">
                        <td colspan="6"><span class="see_more">See more</span></td>
                    </tr>`;
                    }

                    eleTableCombo.html(htmlTableCombo);
                }

            },
            error: function () {

            }
        });
    });
    $(document).on('click', '.detailProductCombo', function () {
        let obj = $(this);
        console.log(obj.attr('data-id'));

        $.ajax({
            type: "get",
            url: appUrl + "/popup-reviews/detailProductCombo",
            dataType: "json",
            data: {
                combo_id: obj.attr('data-id'),
                type_day: $("select[name='statistic_popup_review'] option:selected").val(),
                type_sort: 'total_review'
            },
            beforeSend: function () {
                obj.attr("disabled", true).css("opacity", 0.5);
            },
            success: function (data) {
                obj.attr("disabled", false).css("opacity", 1);

                if (data.status) {
                    $("#productComboModal").empty().append(data.data);
                    $("#productComboModal").modal("show");
                }
            },
            error: function () {

            }
        });
    });

    $(document).on('click', '.sort_product_combo', function () {
        let obj = $(this);
        console.log(obj.attr('data-id'));

        var type = obj.attr('data-id');
        var type_sort = $('input[name=type_sort]').val();

        if (type !== type_sort) {
            $('input[name=order_by]').val('asc');
            $('input[name=type_sort]').val(type_sort);
        }
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            type: "post",
            url: appUrl + "/popup-reviews/get-statistics-popup-reviews",
            dataType: "json",
            data: {
                type_day: $("select[name='statistic_popup_review'] option:selected").val(),
                type_sort: obj.attr('data-id'),
                show_more: 0,
                count_object: $('input[name=show_more]').val()
            },
            beforeSend: function () {
                obj.attr("disabled", true).css("opacity", 0.5);
            },
            success: function (result) {
                obj.attr("disabled", false).css("opacity", 1);
                if (result.status) {
                    var classDefault = "fas alireview-fa-sort";
                    var classDown = "fas alireview-fa-sort-down text-info";
                    var classUp = "fas alireview-fa-sort-up text-info";
                    $("th").children().removeClass().addClass(classDefault);
                    var order_by = $('input[name=order_by]').val();
                    var eleTableCombo = $('#tableProductCombo tbody');
                    var htmlTableCombo = '';
                    var productsCombo = result.data.products_combo;
                    productsCombo = Object.values(productsCombo);
                    switch (type) {

                        case 'total_click' :
                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                obj.children().removeClass().addClass(classUp);
                                $('input[name=order_by]').val('desc');
                                productsCombo.sort((a, b) => (a.total_click < b.total_click) ? 1 : -1);
                            } else {
                                obj.children().removeClass().addClass(classDown);
                                $('input[name=order_by]').val('asc');
                                productsCombo.sort((a, b) => (a.total_click > b.total_click) ? 1 : -1);
                            }
                            break;
                        case 'total_order' :

                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                obj.children().removeClass().addClass(classUp);
                                $('input[name=order_by]').val('desc');
                                productsCombo.sort((a, b) => (a.total_order < b.total_order) ? 1 : -1);
                            } else {
                                obj.children().removeClass().addClass(classDown);
                                $('input[name=order_by]').val('asc');
                                productsCombo.sort((a, b) => (a.total_order > b.total_order) ? 1 : -1);
                            }
                            break;
                        case 'total_revenue' :

                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                obj.children().removeClass().addClass(classUp);
                                $('input[name=order_by]').val('desc');
                                productsCombo.sort((a, b) => (a.total_revenue < b.total_revenue) ? 1 : -1);
                            } else {
                                obj.children().removeClass().addClass(classDown);
                                $('input[name=order_by]').val('asc');
                                productsCombo.sort((a, b) => (a.total_revenue > b.total_revenue) ? 1 : -1);
                            }
                            break;
                        default :
                            if (typeof order_by != 'undefined' && order_by !== 'desc') {
                                obj.children().removeClass().addClass(classUp);
                                $('input[name=order_by]').val('desc');
                                productsCombo.sort((a, b) => (a.total_review < b.total_review) ? 1 : -1);
                            } else {
                                obj.children().removeClass().addClass(classDown);
                                $('input[name=order_by]').val('asc');
                                productsCombo.sort((a, b) => (a.total_review > b.total_review) ? 1 : -1);
                            }
                            break;
                    }

                    $('input[name=type_sort]').val(type);
                    var no = 1;
                    for (var key in productsCombo) {
                        htmlTableCombo += renderHtmlTopProductsCombo(no, productsCombo[key], result.data.currencyFormat);
                        no++;
                    }

                    let count_object = parseInt(result.data.count_object);
                    if (count_object % 10 == 0 && count_object >0) {
                        htmlTableCombo += `
                        <tr id="statistic-combo-see-more" class="text-center">
                            <td colspan="6"><span class="see_more">See more</span></td>
                        </tr>`;
                    }


                    let countCombo = parseInt(result.data.countCombo);

                    if(countCombo <= 0 ){
                        htmlTableCombo += `
                        <tr class="text-center">
                            <td colspan="6">
                            ${result.data.infoMessageCombo}
                        </td>
                        </tr>` ;
                    } else {
                        if(count_object <= 0){
                            htmlTableCombo += `
                        <tr class="text-center">
                            <td colspan="6">
                            ${result.data.infoMessageCombo}
                            </td>
                        </tr>` ;
                        }
                    }
                    eleTableCombo.html(htmlTableCombo);
                }
            },
            error: function () {

            }
        });

    })
});

const formatNumbers = (number ,toFixed) =>{
    return (number).toFixed(toFixed).replace(/\d(?=(\d{3})+\.)/g, '$&,');

};

function getDayOptionStatisticPopupReviews(obj) {

    $.ajax({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        dataType: "JSON",
        type: "POST",
        url: appUrl + "/popup-reviews/get-statistics-popup-reviews",
        data: {
            type_day: obj
        },
        success: function (result) {
            console.log(result);
            if (result.status) {
                //update statistic
                // var currency_format = result.data.currencyFormat;    
                $('span.total_session').text(result.data.statistics.total_session);
                $('.js-total-review .statistic-number').text(result.data.statistics.total_review);
                $('.js-total-click .statistic-number').text(result.data.statistics.total_click);
                $('.js-total-order .statistic-number').text(result.data.statistics.total_order);
                $('.js-total-revenue .statistic-number').text('$'+formatNumbers(result.data.statistics.total_revenue,2));
                //END : update statistic
                //update tooltip statistic
                $('.js-total-review .statistic-number').attr('data-statistic-popup-reviews', result.data.statistics.total_review);
                $('.js-total-click .statistic-number').attr('data-statistic-popup-reviews', result.data.statistics.total_click);
                $('.js-total-order .statistic-number').attr('data-statistic-popup-reviews', result.data.statistics.total_order);
                $('.js-total-revenue .statistic-number').attr('data-statistic-popup-reviews','$'+formatNumbers(result.data.statistics.total_revenue,2));
                //END : update tooltip statistic
                //update top 5 products
                var object_review = result.data.statistics.options.object_review;
                var object_click = result.data.statistics.options.object_click;
                var object_order = result.data.statistics.options.object_order;
                var object_revenue = result.data.statistics.options.object_revenue;

                var eleListViews = $('.js-list-review');
                var eleListClicks = $('.js-list-click');
                var eleListOrders = $('.js-list-order');
                var eleListRevenue = $('.js-list-revenue');

                var htmlListViews = '';
                for (var key in object_review) {

                    htmlListViews += renderHtmlTopProducts('review', object_review[key], parseInt(key) + 1, object_review[key].total_review, 'views');

                }
                eleListViews.html(htmlListViews);

                var htmlListClicks = '';
                for (var key in object_click) {
                    htmlListClicks += renderHtmlTopProducts('click', object_click[key], parseInt(key) + 1, object_click[key].total_click, 'clicks');
                }
                eleListClicks.html(htmlListClicks);

                var htmlListOrders = '';
                for (var key in object_order) {
                    htmlListOrders += renderHtmlTopProducts('order', object_order[key], parseInt(key) + 1, object_order[key].total_order, 'orders');
                }
                eleListOrders.html(htmlListOrders);

                var htmlListRevenue = '';
                for (var key in object_revenue) {
                    htmlListRevenue += renderHtmlTopProducts('revenue', object_revenue[key], parseInt(key) + 1,'$'+formatNumbers(object_revenue[key].total_revenue,2), '');
                }
                eleListRevenue.html(htmlListRevenue);
                //END : update top 5 products
                //update top 10 product combos
                var eleTableCombo = $('#tableProductCombo tbody');
                var htmlTableCombo = '';
                var productsCombo = result.data.products_combo;

                var classDefault = "fas alireview-fa-sort";
                var classUp = "fas alireview-fa-sort-up text-info";
                $("th").children().removeClass().addClass(classDefault);
                $("th.total_review").children().removeClass().addClass(classUp);
                productsCombo.sort((a, b) => (a.total_review < b.total_review) ? 1 : -1);
                var no = 1;

                for (var key in productsCombo) {
                    htmlTableCombo += renderHtmlTopProductsCombo(no, productsCombo[key]);
                    no++;
                }

                let count_object = parseInt(result.data.count_object);

                if (count_object % 10 === 0 && count_object> 0) {
                    htmlTableCombo += `
                    <tr id="statistic-combo-see-more" class="text-center">
                        <td colspan="6"><span class="see_more">See more</span></td>
                    </tr>`;
                }
                let countCombo = parseInt(result.data.countCombo);

                if(countCombo <= 0 ){
                    htmlTableCombo += `
                        <tr class="text-center">
                            <td colspan="6">
                            ${result.data.infoMessageCombo}
                        </td>
                        </tr>` ;
                } else {
                    if(count_object <= 0){
                        htmlTableCombo += `
                        <tr class="text-center">
                            <td colspan="6">
                            ${result.data.infoMessageCombo}
                            </td>
                        </tr>` ;
                    }
                }

                eleTableCombo.html(htmlTableCombo);
                //END : update top 10 product combos
            }
        }
    });
}

function renderHtmlTopProductsCombo(no, value, currency_format = '') {

    let html = `
    <tr class="product-item" data-id="${value.combo_id}">
        <td class="text-center product-item__number"><span>${no}</span></td>
        <td>
            <a class="detailProductCombo" data-id="${value.combo_id}">
                ${value.combo_title}
            </a>
        </td>
        <td>${value.total_review}</td>
        <td>${value.total_click}</td>
        <td>${value.total_order}</td>
        <td>$${formatNumbers(value.total_revenue,2)}</td>
    </tr>
    `;
    return html;
}

function renderHtmlTopProducts(type, value, no, price, text) {
    let condition = '';
    let html = '';
    let default_img_src = cdnUrl + '/images/no-img-product.png';
    let shop_url = 'https://' + shopDomain + value.product_link;
    switch (type) {
        case 'review':
            condition = (parseFloat(value.total_review) <= 0) ? false : true;
            break;
        case 'click':
            condition = (parseFloat(value.total_click) <= 0) ? false : true;
            break;
        case 'order':
            condition = (parseFloat(value.total_order) <= 0) ? false : true;
            break;
        case 'revenue':
            condition = (parseFloat(value.total_revenue) <= 0) ? false : true;
            break;
        default:
            break;
    }
    if (type === 'revenue') {
        price = price;
    }
    if (condition) {
        html = `
        <div class="product-item">
            <p class="product-no"><span>${no}</span></p>
            <div class="product-info">
                <div class="product-info-left">
                    ${value.product_avatar ? `<img src="${value.product_avatar}" alt="">` : `<img src="${default_img_src}" alt="">`}
                </div>
                <div class="product-info-body">
                    <a href="${shop_url}" target="_blank">
                    ${value.product_title}
                    </a>
                    
                    <p class="product-price"> ${price} <span>${text}</span></p>
                </div>
            </div>
        </div>`;
    } else {
        html = `
        <div class="product-item">
            <p class="product-no no-number"><span>-</span></p>
            <div class="product-info">
                <div class="product-info-left">
                    <img src="${default_img_src}"
                            alt="">
                </div>
                <div class="product-info-body no-product-text">
                    <p>--</p>
                </div>
            </div>
        </div>`;
    }
    return html;
}

function select2() {
    $(".select2:not('.unsearch')").select2();

    $(".select2.unsearch").select2({
        minimumResultsForSearch: Infinity
    });

    // Custom 
    $('.selectActionAllReviews2').select2({
        placeholder: "Action",
        minimumResultsForSearch: Infinity
    });

    $('#selectActionAllReviews').select2({
        placeholder: "Action",
        minimumResultsForSearch: Infinity
    });
}

function currencyFormat(string = '', number = 0 ){
    var newString = string.replace(/{{[a-zA-Z_]+}}/gm,number);
    return newString;
}