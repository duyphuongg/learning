import { getEmailCount } from '../services/EmailRequestService';

$(document).ready(function() {

    async function  getEmailSummary(number = 30 ){
        let res = await getEmailCount(number);
        if(res.status){
            let param = res.data;
            $('h2.email_summary_feedback').empty().html(param.feedback);
            $('h2.email_summary_sent').empty().html(param.sent);
            $('h2.email_summary_delivered').empty().html(param.delivered);
            $('h2.email_summary_opened').empty().html(param.opened);
            $('h2.email_summary_clicked').empty().html( param.clicked);
            $('b.email_summary_sent').empty().html(param.sent);
            $('b.email_summary_feedback').empty().html(param.feedback);
            $('b.email_summary_delivered').empty().html(param.delivered);
            $('b.email_summary_opened').empty().html(param.opened);
            $('b.email_summary_clicked').empty().html( param.clicked);
        }

    }

    $('select.email_count').change(function () {
        let obj = $(this);
        let number = obj.val();
        getEmailSummary(number);
    });

    Chart.defaults.global.defaultFontColor = '#92929C';
    Chart.defaults.global.defaultFontFamily = "'Poppins', sans-serif";
    Chart.defaults.global.defaultFontSize = 11;
    let config = {
        type: 'line',
        data: {
            labels: [], //result.labels
            datasets: [{
                borderColor: '', //color.border
                backgroundColor:  null, //gradient
                borderWidth: 1,
                pointRadius: [2, 2, 2, 2, 2, 2, 2],
                data: [], //result.data
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                display: false
            },
            layout: {
                padding: {
                    left: 10,
                    right: 20
                }
            },
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        // color: ['', '', '', color.border]
                    }
                }],
                yAxes: [{
                    gridLines: {display: false},
                    ticks: {
                        display: false,
                        stepSize: 10,
                        min: 0
                    }
                }]
            },
            tooltips: {
                enabled: false,
                mode: 'index',
                intersect: false,
                custom: null
            }
        }
    };

    let config_engagement = JSON.parse(JSON.stringify(config));
    let config_conversion = JSON.parse(JSON.stringify(config));
    let config_sale = JSON.parse(JSON.stringify(config));

    function formatNumber(num,toFixed = 0) {
        let number  = Number(num) ;
        return (number).toFixed(toFixed).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function createChart(ele_param, eleTooltip_param, color_param, currency_param = ''){

        let ctx;
        let result;
        let ele = ele_param;
        let eleTooltip = eleTooltip_param;
        let data_options;
        let paramVisitor;
        let color = color_param;
        let type = 'engagement';

        let customTooltips = function(tooltip) {
            let obj = getObjStatistic();
            let chartCanvas =  $(this._chart.canvas);
            chartCanvas.css('cursor', 'pointer');
            let positionY = this._chart.canvas.offsetTop;
            let positionX = this._chart.canvas.offsetLeft;
            $('.chartjs-tooltip').css({
                opacity: 0,
            });
            if (!tooltip || !tooltip.opacity) {
                return;
            }
            if (tooltip.dataPoints.length > 0) {
                let content = '';
                let val = obj.data_detail[tooltip.dataPoints[0].index];
                let val_number;
                if(type === 'engagement'){

                    val_number = `${formatNumber(val,0)} visitors`;
                }else if(type === 'conversion'){
                    val_number = `${formatNumber(val,0)} buyers`;
                }else{
                    if(currency_param != ''){
                        val_number = `$${formatNumber(val,2)}`;
                    }else {
                        val_number = `$${formatNumber(val,2)}`;
                    }
                }
                if(parseInt(paramVisitor) === 7){
                    content = `<b>${obj.dayOfWeek[tooltip.dataPoints[0].index]}</b><br /><b>${obj.arrDate[tooltip.dataPoints[0].index]}</b><p>${val_number}</p>`;
                }else{
                    content = `<b>${obj.arrDate[tooltip.dataPoints[0].index]}</b><br /><p>${val_number}</p>`;
                }
                let $tooltip = $(`#${eleTooltip}`);
                let left = '';
                let selectorTooltip =  $('.chartjs-tooltip');
                if(tooltip.caretX < (chartCanvas.width()/2)){
                    left =  positionX + tooltip.dataPoints[0].x + ($tooltip.width() + 2 + 16)/2 + 5;
                    selectorTooltip.removeClass('chartjs-tooltip-arrow-right');
                    selectorTooltip.addClass('chartjs-tooltip-arrow-left');
                }else{
                    left =  positionX + tooltip.dataPoints[0].x - ($tooltip.width() + 2 + 16)/2 - 5;
                    selectorTooltip.removeClass('chartjs-tooltip-arrow-left');
                    selectorTooltip.addClass('chartjs-tooltip-arrow-right');
                }
                let top =  positionY + tooltip.dataPoints[0].y - 15;
                $tooltip.html(content);
                $tooltip.css({
                    opacity: 1,
                    top: top + 'px',
                    left: left + 'px',
                });
            }
        };

        function initCTX() {
            ctx = document.getElementById(ele)
            if (!ctx) return;
            ctx.style.marginBottom = "25px";
            ctx.style.marginTop = "10px";
            ctx = ctx.getContext('2d');

        }
        function getObjStatistic(){
            let labels = [];
            let dayOfWeek = [];
            let data = [];
            let arrDate = [];
            let data_temp = [];
            let total_percentage = 0;
            if(parseInt(paramVisitor) === 7) // check condition week
                $.each(data_options, function(key, value){
                    let dayStr = moment(key, "MM/DD/YYYY").format('dddd');
                    // labels.push(dayStr.substr(0,3));
                    labels.push(key.substr(0, key.lastIndexOf('/')));
                    dayOfWeek.push(dayStr);
                    arrDate.push(key);
                    total_percentage += value;
                    data_temp.push(value);
                });
            else{
                $.each(data_options, function(key, value){
                    labels.push(key.substr(0, key.lastIndexOf('/')));
                    arrDate.push(key);
                    total_percentage += value;
                    data_temp.push(value);
                });
            }
            if(total_percentage > 0){
                $.each(data_temp, function(key, val){
                    let val_percentage = (val/total_percentage) * 100;
                    data.push(val_percentage);
                });
            }else{
                data = data_temp;
            }
            return{
                labels,
                data,
                data_detail: data_temp,
                arrDate,
                dayOfWeek,
                total_percentage
            }
        }

         function init(data_param, paramVisitor_param, type_param){
             data_options = data_param;
             paramVisitor = paramVisitor_param;
             type = type_param;
             initCTX();
             let gradient = ctx.createLinearGradient(0, 0, 0, 200);
             gradient.addColorStop(0, color.gradient);
             gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.7)');
             result = getObjStatistic();
             console.log("result", result)
             if(type === 'engagement'){
                 config_engagement.data.datasets.forEach(function(dataset) {
                     dataset.data = result.data.map(function(item) {
                         return item;
                     });
                     dataset.borderColor =  color.border;
                     dataset.backgroundColor = gradient;
                 });
                 config_engagement.data.labels = result.labels.map(function(item) {
                     return item;
                 });
                 config_engagement.options.tooltips.custom = customTooltips;
                 if(window.engagement){
                     window.engagement.update();
                 }else{
                     window.engagement = new Chart(ctx, config_engagement);
                 }
             }else if(type === 'conversion'){
                 config_conversion.data.datasets.forEach(function(dataset) {
                     dataset.data = result.data.map(function(item) {
                         return item;
                     });
                     dataset.borderColor =  color.border;
                     dataset.backgroundColor = gradient;
                 });
                 config_conversion.data.labels = result.labels.map(function(item) {
                     return item;
                 });
                 config_conversion.options.tooltips.custom = customTooltips;
                 if(window.conversion){
                     window.conversion.update();
                 }else{
                     window.conversion = new Chart(ctx, config_conversion);
                 }
             }else{
                 if(type === 'sales'){
                     config_sale.data.datasets.forEach(function(dataset) {
                         dataset.data = result.data.map(function(item) {
                             return item;
                         });
                         dataset.borderColor =  color.border;
                         dataset.backgroundColor = gradient;
                     });
                     config_sale.data.labels = result.labels.map(function(item) {
                         return item;
                     });
                     config_sale.options.tooltips.custom = customTooltips;
                     if(window.sales){
                         window.sales.update();
                     }else{
                         window.sales = new Chart(ctx, config_sale);
                     }
                 }
             }

        }
        return {
            init
        }
    }

    function runChart(valChart, paramVisitor = 7){
        // let valEngagement = valChart && getObjStatistic(valChart.engagement, paramVisitor)
        // let valConversion = valChart && getObjStatistic(valChart.conversion, paramVisitor)
        // let valSales = valChart && getObjStatistic(valChart.sales, paramVisitor)

        createChart('statistic-engagement', 'tooltip-engagement', {gradient:'rgba(255, 179, 3, 0.7)', border: 'rgb(255, 179, 3)'}).init(valChart.engagement, paramVisitor, 'engagement');
        createChart('statistic-conversion', 'tooltip-conversion', {gradient:'rgba(91, 212, 182, 0.7)', border: 'rgb(91, 212, 182)'}).init(valChart.conversion, paramVisitor, 'conversion');
        createChart('statistic-sale', 'tooltip-sale', {gradient:'rgba(0, 157, 206, 0.7)', border: 'rgb(0, 157, 206)'}, valChart.currency_format).init(valChart.sales, paramVisitor, 'sales');
    }

    function  getStatisticDay(visitor = 7){
        $.ajax({
            dataType : "JSON",
            type: "GET",
            url:appUrl+"/statistic-visitor",
            data : {
                visitor : visitor
            },
            success:function(data) {

                /**
                 This code will be removed after testing
                 */
                // $('span#statistic_engaged_visitors').empty().html(data.engaged_visitors);
                // $('span#statistic_non_engaged_visitors').empty().html(data.non_engaged_visitors);
                // $('span#statistic_total_visitors').empty().html(data.total_visitors);
                // $('span#statistic_total_engaged_order').empty().html(data.total_engaged_order);
                // $('span#statistic_total_non_engaged_order').empty().html(data.total_non_engaged_order);
                // $('span#statistic_total_orders').empty().html(data.total_orders);
                // $('span#statistic_total_sales').empty().html(data.total_sales);
                // $('span#statistic_engagement').empty().html(data.engagement);
                // $('span#statistic_conversion').empty().html(data.conversion);
                // $('span#statistic_sales').empty().html(data.sales);
                // $('span#statistic_engaged_orders').empty().html(data.engaged_orders);
                // $('span#statistic_lift').empty().html(data.lift);
                // $('span#statistic_CR2').empty().html(data.CR2);
                /**
                 end testing
                 */
                $('span#statistic_visitor_engaged_orders').empty().html(data.engaged_orders + '% Engaged orders');
                $('span#statistic_visitor_left').empty().html((data.lift >= 0) ? (data.lift + '% Lift') : '');
                $('span#statistic_visitor_engagement').empty().html(data.engagement + '%');
                $('span#statistic_visitor_conversion').empty().html(data.conversion + '%');
                $('span#statistic_visitor_sales').empty().html('$'+formatNumber(data.sales,2));
                runChart(data.options, visitor)
                // data.options && checkStatisticConversion(data.options.conversion);
            }
        });
    }

    $(".statistic_visitor").change(function() {
        let obj = $(this);
        let number = obj.val();
        getStatisticDay(number) ;
    });

    if ($(".dashboard-page")[0]){
        getStatisticDay(7);
    }

    $('button.copy-code').click(function(){
        var button = $(this);
        button.addClass('clicked');
        setTimeout(function(){
            button.removeClass('clicked');
        }, 1000);
        var parents = $(this).parents('.missing-review-box');
        var ele = $(parents).find('.pre-code');
        copyToClipboard(ele);
    });

    setHeightBox('changelog-content', 'manual-installation__content');
    setHeightBox('quickguide_thumb img', 'missing-review-box');

    // Tooltip for Statistic Dashboard
    $(".rel-tooltip--progress").tooltip({
        placement: "bottom",
        html: true,
        template: '<div class="tooltip tooltip--progress" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });

    $(".rel-tooltip--dot").tooltip({
        placement: "top",
        html: true,
        template: '<div class="tooltip tooltip--dot" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
});

function checkStatisticConversion(val){
    let obj = Object.values(val);
    let length =  obj.length;
    let selector = $('.media-chart--heading-conversion span i');
    if(obj[length - 1] >= obj[length - 2]){
        selector.css({'color': '#1adc1a'});
        selector.text('arrow_drop_up');
    }else{
        selector.css({'color': 'red'});
        selector.text('arrow_drop_down');
    }
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

function setHeightBox(ele1, ele2){
    let ele1_height = $(`.${ele1}`).outerHeight();
    let ele2_height = $(`.${ele2}`).outerHeight();
    if(ele2_height > ele1_height){
        $(`.${ele1}`).css('min-height', ele2_height);
    }else{
        $(`.${ele2}`).css('min-height', ele1_height);
    }
}

function currencyFormat(string = '', number = 0 ){
    var newString = string.replace(/{{[a-zA-Z_]+}}/gm,number);
    console.log(newString);
    return newString;
}


$(document).ready(function(){
    //Check show modal Store Test
    // let check_first_time_store = $('#first_time_onboarding').val();
    let check_support_free_covid19 = $('#support_free_covid19').val();
    // let plan_user = $('#plan_user').val();
    // if(check_first_time_store == ''  && plan_user != 'new'){
    //     $('#notiStoreTest').modal('show');
    //     saveFirstTimeStoreTest();
    // }
    
    if(check_support_free_covid19 == 'true'){
        $('#modalSupportFreeCovid19').modal('show');
    }

    //What new slider
    let what_new_slider = $('#what-new-slider');
    what_new_slider.owlCarousel({
        loop:true,
        // nav:true,
        margin:10,
        items: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        // autoplayHoverPause: true
    })

    what_new_slider.mouseover(function(){
        what_new_slider.trigger('stop.owl.autoplay');
    })
  
    what_new_slider.mouseleave(function(){
        what_new_slider.trigger('play.owl.autoplay',[7000]);
    })
});

function saveFirstTimeStoreTest(){
    $.ajax({
      url: `${appUrl}/first-time-onboarding`,
      type: 'GET',
      dataType: 'json',
      data : {
        _token : $('meta[name="csrf-token"]').attr('content'),
        first_time: true
      },
      success: function (res) {
        console.log("saveFirstTimeStoreTest", res)
      }
    });
}

