export default function EmailModalAddCountry(){

    let listSelected = {};
    let listExist = {};
    let listCountry = {};

    const init = function(){
        getListExist();
        openModalAddCountry();
        removeRowCountry();
        toggleSelect();
        searchCountry();
        addCountry();
        addItem();
        removeItem();
        closeModal();
    }

    const getListExist = function(){
        let selectorInputCountry = $("input[name='targets[targets_append][country][]']");
        selectorInputCountry.length > 0 && selectorInputCountry.each(function() {
            let obj = $( this ).val() ? JSON.parse($( this ).val()) : {};
            listExist = Object.assign(listExist, obj);
        });
        console.log("listExist", listExist)
    }

    const addCountry = function(){
        $("#js-btn-submit-add-country").on('click', function(){
            let resultImg = '';
            let length = Object.keys(listSelected).length
            if(length === 1){
                resultImg += `<span class="ali-flag-slc ${Object.keys(listSelected)[0].toLowerCase()}" title="${Object.values(listSelected)[0]}"></span> &nbsp;&nbsp;
                            <span class="text-over-1 ali-flag-slc-name" title="${Object.values(listSelected)[0]}">${Object.values(listSelected)[0]}</span>`;
            }else if(length > 1 && length <= 3){
                $.each(listSelected, function (k, v) {
                    resultImg += `<span class="ali-flag-slc ${k.toLowerCase()}" title="${v}"></span> &nbsp;&nbsp;`;
                });
            }else{
                let count = 0;
                let title = '';
                $.each(listSelected, function (k, v) {
                    if(count >= 3){
                        title += `${v} (${k}), `
                    }else{
                        resultImg += `<span class="ali-flag-slc ${k.toLowerCase()}" title="${v}"></span> &nbsp;&nbsp;`;
                    }
                    count += 1;
                });
                let number = length > 13 ? "10+" : `+ ${length - 3}`;
                title = title && title.substr(0, title.length - 2);
                resultImg += `<div class="email-country__flag-plus" title="${title}"><span> ${number} </span></div>`;
            }
            listExist = Object.assign(listExist, listSelected);

            let parseListSelected = JSON.stringify(listSelected);
            // $('input[name=list_country_target]').val('['+listSelected+']');
            let htmlItemCountry = itemHtmlCountry(resultImg, parseListSelected);
            $('.email-country table tbody').prepend(htmlItemCountry);
            reset();
            $('#jsEmailAdd_Country').modal('hide');
            console.log("addCountry listExist", listExist)
        });
    }

    const openModalAddCountry = function(){
        $(document).on('click', '.js-email-add-country', function() {
            $('#jsEmailAdd_Country').modal('show');
            $("#js-btn-submit-add-country").prop( "disabled", true );
            getListCountry();
            let elementCountry = renderListCountry(listCountry);
            $('#js-email-country-load-more').append(elementCountry)
        });
    };

    const getListCountry = function(){
        let val = $('#listCountry').val();
        listCountry = JSON.parse(val) ;
    };

    const renderListCountry = function(list){
        console.log("renderListCountry listExist", listExist)
        let elementCountry = '';
        $.each(list, function(k, v) {

            elementCountry += `<li >
                <div class="media-left_location p-relative" style="width: 80px; min-width: 80px;">
                    <span class="ali-flag-slc ${k.toLowerCase()}"></span>
                    <span class="fz13 color-grey-800">${k}</span>
                </div>
                <span class="mail-country-title text-over-1" title="${v}"> ${v}</span>
                <div class="icon-toggle-wrap icon-toggle-wrap-country ${listExist[k] ? '' : (listSelected[k] ? 'remove' : 'add')}">
                    <i class="material-icons icon-toggle-add ml-10 js-mail-country-load-more-add" data-country-key="${k}" data-country-value="${v}">add_circle_outline</i>
                    <i class="material-icons icon-toggle-remove ml-10 js-mail-country-load-more-remove" data-country-key="${k}" data-country-value="${v}">remove_circle_outline</i>
                </div>
            </li>`;
        });
        return elementCountry;
    };

    const reset = function(){
        listSelected ={ };
        $("#mail-country-load-more-thumbnail").empty();
        $("#js-email-country-load-more").empty();
    };

    const renderListLoadMore = function(){
        console.log("listSelected", listSelected)
        let htmlImage = "";
        let length = Object.keys(listSelected).length
        if(length <= 5) {
            $.each(listSelected, function(k, v) {
                htmlImage += `<span class="ali-flag-slc ${k.toLowerCase()}" title="${v}"></span>`;
            });
        } else {
            let count = 1;
            $.each(listSelected, function(k, v) {
                htmlImage += `<span class="ali-flag-slc ${k.toLowerCase()}" title="${v}"></span>`;
                if(count >= 5) return false;
                count += 1;
            });
            let number = length > 15 ? "10+" : `+ ${length - 5}`;
            htmlImage += `
                <span class="email-thumb-country-more" more-country="${number}"></span>
            `;
        }
        $("#mail-country-load-more-thumbnail").html(htmlImage);
    };

    const addItem = function(){
        $('#js-email-country').on('click', '.js-mail-country-load-more-add', function() {
            const key = $(this).attr("data-country-key");
            const value = $(this).attr("data-country-value");
            if(listExist[key]){
                $.notify({message: "Country exists in target customer !"},
                    {
                        z_index: 999999,
                        timer: 500,
                        delay: 500,
                        type: "danger"
                    }
                );
                return;
            }
            listSelected[key] = value;
            let iconWrap = $(this).parent();
            $(iconWrap).removeClass('add');
            $(iconWrap).addClass('remove');
            $("#js-btn-submit-add-country").prop( "disabled", false );
            renderListLoadMore();
        });
    };

    const removeItem = function(){
        $('#js-email-country').on('click', '.js-mail-country-load-more-remove', function() {
            const key = $(this).attr("data-country-key");
            delete listSelected[key];
            let iconWrap = $(this).parent();
            $(iconWrap).removeClass('remove');
            $(iconWrap).addClass('add');
            let length = Object.keys(listSelected).length
            length <= 0 && $("#js-btn-submit-add-country").prop( "disabled", true );
            renderListLoadMore();
        });
    };
    const toggleSelect = function(){
        $(document).on('focus', '.js-email-search-country', function(e) {
            e.stopPropagation();
            let $this = $(this);
            if(!$this.hasClass('active')){
                $this.addClass('active');
                $("#js-email-country").addClass('open');
            }
        });

        $(document).on('click', '.js-email-button-country', function(e) {
            e.stopPropagation();
            let $this = $(this);
            if(!$this.hasClass('active')){
                $this.addClass('active');
                $("#js-email-country").addClass('open');
            }
        });

        $(document).on('click', '.js-email-button-country .icon-arrow', function(e) {
            e.stopPropagation();
            $(this).closest('.js-email-button-country').toggleClass('active');
            $("#js-email-country").toggleClass('open');
        });

        $("#js-email-country").click(function(e){
            e.stopPropagation();
        });

        $(document).click(function(){
            if ($('#jsEmailAdd_Country').hasClass('in')) {
                $('.js-email-button-country').removeClass('active');
                $("#js-email-country").removeClass('open');
            }
        });
    };

    const removeRowCountry = function(){
        $(".email-country").on('click', '.email-country__btn-del', function(){
            let selectorInputCountry = $(this).closest('tr').find("input[name='targets[targets_append][country][]']");
            let obj = JSON.parse(selectorInputCountry.val())
            $.each(obj, function(k, v) {
                delete listExist[k];
            });
            $(this).closest('tr').remove();
            console.log("removeRowCountry listExist", listExist)
        })
    };

    const closeModal = function(){
        $('#jsEmailAdd_Country .btn-close').on('click', function(){
            $('#jsEmailAdd_Country').modal('hide');
            reset();
            let selectorToogleSelect = $('.js-email-button-country');
            if(selectorToogleSelect.hasClass('active')){
                selectorToogleSelect.removeClass('active');
                $("#js-email-country").removeClass('open');
            }
        })
    };

    const itemHtmlCountry = function(listImg,country){

        let htmlItemCountry = `<tr>
            <td class="align-middle email-country__flag">
                <div class="d-flex align-items-center  align-items-center-country">
                    ${listImg}
                </div>
            </td>
            <td class="email-country__icon-remove"><i class="material-icons">remove</i></td>
            <td class="email-country__time">
                <div class="d-flex" style="flex: 1;">
                    <input type="hidden" name="targets[targets_append][country][]"  value='${country.replace("'","")}' />    <!--'{"US":"M\u1ef9","VN":"Viet Nam"}'  -->
                    <input type="number" name="targets[targets_append][times][value][]" min="0" class="form-control text-center" value="7" style="width: 50px;">
                    <select name="targets[targets_append][times][type][]" class="form-control"  style="min-width: 80px;">
                        <option value="minute">Minutes</option>
                        <option value="hour" >Hours</option>
                        <option value="day" selected>Day</option>
                    </select>
                </div>
            </td>
            <td class="email-country__icon-remove"><i class="material-icons">remove</i></td>
            <td class="align-middle email-country__flag">
                <div class="d-flex align-items-center " style="white-space: nowrap;">
                    <span class="ml-5">Order fulfilled</span>
                </div>
                <input name="targets[targets_append][after][]" type="hidden" value="order_placed"/>
                <!--<select name="targets[targets_append][after][]" class="form-control" style="width: 120px;">-->
                    <!--<option value="">Oder fulfilled</option>-->
                    <!--<option value="1">Oder placed<</option>-->
                <!--</select>-->
            </td>
            <td>
                <button type="button" class="button button--default email-country__btn-del"><i class="material-icons">delete_forever</i></button>
            </td>
        </tr>`
        return htmlItemCountry;
    };

    const searchCountry = function(){
        let timerSearch = null;
        $(document).on('input', '.js-email-search-country', function() {
            clearTimeout(timerSearch);
            let $this = $(this);
            let valSearch = $this.text().trim();
            if ($this.html().length && !$this.text().trim().length) {
                $this.empty();
            }
            timerSearch = setTimeout(function(){
                console.log('value search', valSearch);
                let loadMoreSelector = $('#js-email-country-load-more');
                let obj = {};
                $.each(listCountry, function(k, v) {
                    if((v.toLowerCase()).includes(valSearch.toLowerCase())){
                        obj[k] = v;
                    }
                });
                loadMoreSelector.empty();
                if(Object.keys(obj).length > 0){
                    let elementCountry = renderListCountry(obj);
                    loadMoreSelector.append(elementCountry);
                    $('#js-email-country').animate({scrollTop :0}, 500);
                }else{
                    let elementEmpty  = `<li id="elementEmptyCountry">
                                    <p class="text-info" style="height: 20px;"> List country empty !</p>
                                </li>` ;
                    loadMoreSelector.append(elementEmpty);
                }

            }, 1200);
        });
    };

    return {
        init
    }
}