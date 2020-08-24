export default function EmailModalCreateListProducts() {
    let listSelected = [];
    let listProductsCreated = [];
    let email_product_loading = false;

    const init = function(){
        openModal();
        toggleSelect();
        strollLoadMoreProduct();
        addItem();
        removeItem();
        removeItemListSelected();
        createListProduct();
        searchProducts();
        closeModal();
    }

    const createListProduct = function(){
        $("#js-btn-create-list-product").click(function (e) {
            e.preventDefault();

            listProductsCreated = [...listProductsCreated, ...listSelected];
            let strProductToInput = "";
            listProductsCreated.length > 0 && listProductsCreated.forEach(function(item) {
                strProductToInput += `,${item.id}`;
            });
            console.log("listProductsCreated", listProductsCreated)
            console.log("strProductToInput", strProductToInput)
            $('input[name="products_blacklist"]').val(strProductToInput.substring(1));
            listSelected = [];
            $("#jsEmailCreate_ProductList").modal("hide");
            $(".js-email-create-product-list, #js-btn-create-list-product").text("Edit List");
            $.notify(
                {
                    message: "Updated product have in order"
                },
                {
                    z_index: 999999,
                    timer: 2000,
                    type: "success"
                }
            );
        });
    };

    const openModal = function(){
        let isOpenFirst = true;
        $(document).on('click', '.js-email-create-product-list', function() {
            $('#jsEmailCreate_ProductList').modal('show');

            if(isOpenFirst){
                isOpenFirst = false;
                $.ajax({
                    type: "get",
                    url: appUrl + "/emails-request/list-products",
                    dataType: "json",
                    data: {
                        products_blacklist : $("#products_blacklist").val()
                    },
                    beforeSend: function() {
                        // obj.attr("disabled", true).css("opacity", 0.5);
                    }, // beforeSend
                    success: function(data) {
                        console.log('openmodal data', data)
                        $("input[name=offset]").val(data.offset);
                        // data.products.length === 0 && (data.offset === 20) ? $('#js-email-product-list').css("display", "none") : '';
                        if(data.status && data.products.length > 0){
                            listProductsCreated = data.products_blacklist;
                            let elementHtml = renderListProduct(data.products);
                            $('#js-email-product-load-more').append(elementHtml);
                            renderListLoadMore();
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }

        });
    }

    const renderListProduct = function(products){
        let elementHtml = '';
        let listAll = [...listProductsCreated, ...listSelected];
        console.log("renderListProduct listAll", listAll)
        $.each(products, function(k, v) {
            elementHtml  += `<li id="productId_${v.id}">
                                    <img src="${v.image}" class="img-rounded mr-10" style="width: 50px; height: 50px;">
                                    <span class="text-over-1 mail-product-title" style="height: 20px;" title="${v.title}">${v.title}</span>
                                    <div class="icon-toggle-wrap icon-toggle-wrap-product ${(filterIsBlackList(listAll, v.id)) ? 'remove' : 'add'}" data-id="${v.id}">
                                        <i class="material-icons icon-toggle-add ml-10 js-mail-product-load-more-add" data-id="${v.id}">add_circle_outline</i>
                                        <i class="material-icons icon-toggle-remove ml-10 js-mail-product-load-more-remove" data-id="${v.id}">remove_circle_outline</i>
                                    </div>
                                </li>` ;
        });
        return elementHtml;
    }

    // FUNCTION RENDER nay hien tai render cho product and country => chua viet xong
    const renderListLoadMore = function(){
        let arr = listProductsCreated.concat(listSelected)
        console.log("renderListLoadMore arr", arr)
        let htmlImage = "";
        let length = arr.length;
        if(length <= 5) {
            arr.forEach( function(item){
                htmlImage += `<div class="modal-create-list-product__item" title="${item.title}" data-id-product-selected="${item.id}"><img src="${item.image}" />
                    <button type="button" class="modal-create-list-product__item-close js-modal-create-list-product__item-close">
                        <i class="material-icons">close</i>
                    </button>
                </div>`;
            })
        } else {
            let count = 1;
            for (let item of arr){
                htmlImage += `<div class="modal-create-list-product__item" title="${item.title}" data-id-product-selected="${item.id}"><img src="${item.image}" />
                    <button type="button" class="modal-create-list-product__item-close js-modal-create-list-product__item-close">
                        <i class="material-icons">close</i>
                    </button>
                </div>`;
                if(count >= 5) break;
                count += 1;
            }
            let number = length > 15 ? "10+" : `+ ${length - 5}`;
            htmlImage += `
                <span class="email-thumb-product-list-more" more-products="${number}"></span>
            `;
        }

        $("#mail-product-load-more-thumbnail").html(htmlImage);

    }

    const strollLoadMoreProduct = function(){
        $("#js-email-product-list").scroll(function() {
            let $this = $(this);
            let $results = $("#js-email-product-load-more");

            if (email_product_loading === false) {
                if ($this.scrollTop() + $this.height() == ($results.height())) {

                    email_product_loading = true;
                    console.log("add data: loading");

                    $results.append(`<li id="js-email-product-loading">Loading...</li>`);
                    $results.scrollTop( $results.get(0).scrollHeight);
                    var key_search = $('.js-email-search-product-list').text();
                    email_product_loading && $.ajax({
                        type: "get",
                        url: appUrl + "/emails-request/list-products",
                        dataType: "json",
                        data: {
                            offset : $("input[name=offset]").val(),
                            products_blacklist : $("#products_blacklist").val(),
                            key_search : key_search
                        },
                        beforeSend: function() {
                            // obj.attr("disabled", true).css("opacity", 0.5);
                        }, // beforeSend
                        success: function(data) {
                            console.log("data", data)
                            $("input[name=offset]").val(data.offset);
                            data.products.length === 0 && (data.offset === 20) ? $('#js-email-product-list').css("display", "none") : '';
                            if(data.status && data.products.length > 0){
                                let elementHtml = renderListProduct(data.products);
                                setTimeout(function(){
                                    email_product_loading = false;
                                    $('#js-email-product-loading').remove();
                                    $('#js-email-product-load-more').append(elementHtml)
                                }, 1200)
                                console.log("removeData: loading");
                            }else{
                                email_product_loading = true;
                                $('#js-email-product-loading').remove();
                            }
                        }, // success
                        error: function(err) {
                            console.log(err)
                        } // error
                    });
                }
            }
        });
    }

    const filterIsBlackList = function(listAll, id){
        return listAll.some(item => item.id === id);
    };

    const addItem = function(){
        $('#js-email-product-list').on('click', '.js-mail-product-load-more-add', function() {
            const idProduct = $(this).attr("data-id");
            let srcImg = $(this).closest('li').find('img').attr('src');
            let title = $(this).closest('li').find('.mail-product-title').attr('title');
            listSelected.push({id: idProduct, image: srcImg, title});
            let iconWrap = $(this).parent();
            iconWrap.removeClass('add');
            iconWrap.addClass('remove');
            renderListLoadMore();
        });
    }

    const removeItem = function(){
        $('#js-email-product-list').on('click', '.js-mail-product-load-more-remove', function() {
            const idProduct = $(this).attr("data-id");
            let index = listSelected.findIndex(item => item.id == idProduct)
            if(index >= 0){
                listSelected.splice(index, 1);
                let iconWrap = $(this).parent();
                iconWrap.removeClass('remove');
                iconWrap.addClass('add');
                renderListLoadMore();
            }else{
                let indexCreated = listProductsCreated.findIndex(item => item.id == idProduct);
                if(indexCreated >= 0){
                    listProductsCreated.splice(indexCreated, 1);
                    let iconWrap = $(this).parent();
                    iconWrap.removeClass('remove');
                    iconWrap.addClass('add');
                    renderListLoadMore();
                }
            }
        });
    }

    const removeItemListSelected = function(){
        $(document).on('click', '.js-modal-create-list-product__item-close', function(){
            let parent = $(this).parent();
            let id = parent.attr('data-id-product-selected');
            let index = listSelected.findIndex(item => item.id == id)
            if(index >= 0){
                listSelected.splice(index, 1);
                $(`#productId_${id} .icon-toggle-wrap-product`).removeClass('remove').addClass('add');
                renderListLoadMore();
            }else{
                let indexCreated = listProductsCreated.findIndex(item => item.id == id);
                if(indexCreated >= 0){
                    listProductsCreated.splice(indexCreated, 1);
                    $(`#productId_${id} .icon-toggle-wrap-product`).removeClass('remove').addClass('add');
                    renderListLoadMore();
                }
            }
        })
    }

    const toggleSelect = function(){
        $(document).on('focus', '.js-email-button-product-list', function(e) {
            e.stopPropagation();
            let $this = $(this);
            if(!$this.hasClass('active')){
                $this.addClass('active');
                $("#js-email-product-list").addClass('open');
            }
        });

        $(document).on('click', '.js-email-button-product-list', function(e) {
            e.stopPropagation();
            let $this = $(this);
            if(!$this.hasClass('active')){
                $this.addClass('active');
                $("#js-email-product-list").addClass('open');
            }
        });

        $(document).on('click', '.js-email-button-product-list .icon-arrow', function(e) {
            e.stopPropagation();
            $(this).closest('.js-email-button-product-list').toggleClass('active');
            $("#js-email-product-list").toggleClass('open');
        });

        $("#js-email-product-list").click(function(e){
            e.stopPropagation();
        });

        $(document).click(function(){
            if ($('#jsEmailCreate_ProductList').hasClass('in')) {
                $('.js-email-button-product-list').removeClass('active');
                $("#js-email-product-list").removeClass('open');
            }
        });
    };

    const closeModal = function(){
        $('#jsEmailCreate_ProductList .btn-close').on('click', function(){
            $('#jsEmailCreate_ProductList').modal('hide');
            handleListCreateCloseModal();
            listSelected = [];
            renderListLoadMore();
            let selectorToogleSelect = $('.js-email-button-product-list');
            if(selectorToogleSelect.hasClass('active')){
                selectorToogleSelect.removeClass('active');
                $("#js-email-product-list").removeClass('open');
            }
        })
    };

    const handleListCreateCloseModal = function(){
        listSelected.forEach(function(item){
            console.log(item.id)
            $(`#productId_${item.id}`).find('.icon-toggle-wrap-product').removeClass('remove').addClass('add');
        });
    };

    const searchProducts = function(){
        let timerSearch = null;
        $(document).on('input', '.js-email-search-product-list', function() {
            clearTimeout(timerSearch);
            let $this = $(this);
            let valSearch = $this.text().trim();
            if ($this.html().length && !$this.text().trim().length) {
                $this.empty();
            }
            timerSearch = setTimeout(function(){
                $("input[name=offset]").val('');
                $.ajax({
                    type: "get",
                    url: appUrl + "/emails-request/list-products",
                    dataType: "json",
                    data: {
                        products_blacklist : $("#products_blacklist").val(),
                        key_search: valSearch,
                    },
                    beforeSend: function() {
                        // obj.attr("disabled", true).css("opacity", 0.5);
                    }, // beforeSend
                    success: function(data) {
                        console.log('data.offset', data.offset);
                        $("input[name=offset]").val(data.offset);
                        // data.products.length === 0 && (data.offset === 20) ? $('#js-email-product-list').css("display", "none") : '';
                        $('#js-email-product-load-more').empty();
                        if(data.status && data.products.length > 0){
                            email_product_loading = false;
                            $('#elementEmpty').remove();
                            let elementHtml = renderListProduct(data.products);
                            $('#js-email-product-load-more').append(elementHtml);
                            $('#js-email-product-list').animate({scrollTop :0}, 500);
                        }else{
                         let elementEmpty  = `<li id="elementEmptyListProduct">
                                    <p class="text-info" style="height: 20px;"> List product empty !</p>
                                </li>` ;
                         $('.email-product-list').css('max-height', '285px');
                         $('#js-email-product-load-more').append(elementEmpty) ;
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });

            }, 1200);
        });
    };

    return {
        init
    }
}