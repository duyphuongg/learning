jQuery(document).ready(function($) {
  const TAB_SETTING_ACTIVE = 'tab_setting_active';
  const URL_LEAVE_PAGE = 'url_leave_page';
  function checkTabSettingActive(){
    let tab =  $('.tab-setting-header .nav-tabs').find('li.active').attr('id');
    return tab;
  }

  function setActiveTab(){
    let tab_active = localStorage.getItem(TAB_SETTING_ACTIVE);
    if(tab_active != null){
      $(`.tab-setting-header ul li#${tab_active} a`).tab('show');
      setTimeout(function(){ localStorage.removeItem(TAB_SETTING_ACTIVE); }, 2000);
    }
  }

  function handleLeavePage(){
    let url = localStorage.getItem(URL_LEAVE_PAGE);
    if(url != null){
      localStorage.removeItem(URL_LEAVE_PAGE);
      window.location.href = url;
    }
  }

  function setDateTimePicker(){
    var stringFormat = 'DD/MM/YYYY';
    var applyClicked = true;
    var bodyClicked = false;
    var start = moment();
    var end = moment();

    var old_all_time = parseInt($('.datetimerange-input-all-time').val());
    var old_7_days = parseInt($('.datetimerange-input-7-days').val());
    if(old_7_days){
      start = moment().add(1,'days');
      end = moment().add(1,'days');
    }else if(!old_all_time){
      start = moment($('.datetimerange-input-start-date').val(), stringFormat);
      end = moment($('.datetimerange-input-end-date').val(), stringFormat);
    }

    var prev_start_date = start.format(stringFormat);
    var prev_end_date = end.format(stringFormat);

    localStorage.setItem('DATA-OLD-DATE-RANGE', JSON.stringify({
      all_time: old_all_time,
      old_7_days: old_7_days,
      start: start.format(stringFormat),
      end: end.format(stringFormat),
    }));

    var old_date = prev_start_date + ' - ' + prev_end_date;

    function cb(start, end) {
      if (start.format(stringFormat) === end.format(stringFormat)) {
        if(rangeBetweenDays(end) === 1){
          $('.datetimerangepicker span').html('Exclude last 7 days');
        }else{
          $('.datetimerangepicker span').html('All time');
        }
      } else {
        $('.datetimerangepicker span').html(start.format(stringFormat) + ' - ' + end.format(stringFormat));
      }
    }

    $('.datetimerangepicker').daterangepicker({
      startDate: start,
      endDate: end,
      maxDate: moment().add(1,'days'),
      ranges: {
        'All time': [moment(), moment()],
        'Exclude last 7 days': [moment().add(1,'days'), moment().add(1,'days')],
        'Last 30 days': [moment().subtract(29, 'days'), moment()],
        // 'Last 60 days': [moment().subtract(59, 'days'), moment()],
        'Last 90 days': [moment().subtract(89, 'days'), moment()],
      },
      alwaysShowCalendars: true,
      autoApply: false,
      locale: {
        format: stringFormat,
        direction: 'ltr custom-daterangepicker',
        customRangeLabel: "Custom range",
      },
      opens: "center"
    }, cb);

    $("body").click(function () {
        bodyClicked = true;
    });
    $(".ranges ul li").click(function () {
        bodyClicked = false;
        applyClicked = false;
    });
    $(".applyBtn").click(function () {
        bodyClicked = false;
        applyClicked = true
    });

    $('.datetimerangepicker').on('hide.daterangepicker', function (ev, picker) {
      $('.datetimerangepicker').removeClass('focus');
      if(bodyClicked){
        var startDate = old_date.split(' - ')[0];
        var endDate = old_date.split(' - ')[1];
        handleUpdateDateRange(startDate, endDate, false, true);
        bodyClicked = false;
      }
    });

    $('.datetimerangepicker').on('show.daterangepicker', function (ev, picker) {
      $('.ranges .custom-date-range').remove();
      $('.ranges .tooltip__container').remove();
      var html = `
        <div class="custom-date-range">
          <button class="btn-cancel-range btn btn-sm btn-default" type="button">Cancel</button>
          <button class="btn-apply btn btn-sm btn-primary button--orange" type="button">Apply</button>
        </div>
      `;

      var tooltip7days = `<div class="tooltip__container">
                            <i class="tooltip__icon fas alireview-fa-info"></i>
                            <div class="tooltip__body fade">
                              <div class="tooltip__inner">
                                <p>Select this if you want to translate all imported reviews. AliExpress only translates reviews older than <span>7 days</span></p>
                              </div>
                            </div>
                          </div>`;

      $('.ranges').append(html);
      $('.ranges ul li:nth-child(2)').append(tooltip7days);

      $('.datetimerangepicker').addClass('focus');

      $('.btn-cancel-range').unbind().click(function () {
          $('.cancelBtn').trigger('click');
      })

      $('.btn-apply').unbind().click(function () {
          $('.applyBtn').trigger('click');
      })

      $('.tooltip__container').unbind().click(function (e) {
        e.preventDefault();
        e.stopPropagation();
      })

      if (applyClicked) {
        prev_start_date = picker.startDate.format(stringFormat);
        prev_end_date = picker.endDate.format(stringFormat);
        old_date = prev_start_date + ' - ' + prev_end_date;
      }
    })

    $('.datetimerangepicker').on('apply.daterangepicker', function (ev, picker) {
      if (!applyClicked) {
        picker.show();
      } else {
        var startDate = picker.startDate.format(stringFormat);
        var endDate = picker.endDate.format(stringFormat);
        handleUpdateDateRange(startDate, endDate, false, false, old_date);
        picker.hide();
      }
    });

    $('.datetimerangepicker').on('cancel.daterangepicker', function (ev, picker) {
      handleUpdateDateRange(prev_start_date, prev_end_date, false, false, old_date);
    });

    cb(start, end);
  }

  function resetDataDateRange() {
    handleUpdateDateRange(null, null, true);
  }

  function rangeBetweenDays(end) {
    var stringFormat = 'YYYY-MM-DD';
    var today = new Date(moment().format(stringFormat));
    var endDate = new Date(end.format(stringFormat));
    var rangeDates = endDate.getTime() - today.getTime(); 
    return rangeDates / (1000 * 3600 * 24); 
  }

  function handleUpdateDateRange(startDate, endDate, reset = false, bodyClicked = false, old_date = '') {
    var stringFormat = 'DD/MM/YYYY';
    if (reset) {
      var data_old = JSON.parse(localStorage.getItem('DATA-OLD-DATE-RANGE'));
      var { all_time, old_7_days, start, end } = data_old;
      if (old_7_days) {
        startDate = moment().add(1, 'days').format(stringFormat);
        endDate = moment().add(1, 'days').format(stringFormat);
      } else if (all_time) {
        startDate = moment();
        endDate = moment();
      } else {
        startDate = start;
        endDate = end;
        $('.datetimerangepicker span').html(startDate + ' - ' + endDate);
      }
    }
    $('.datetimerangepicker').data('daterangepicker').setStartDate(startDate);
    $('.datetimerangepicker').data('daterangepicker').setEndDate(endDate);
    $('.range-date-special').val(0);
    if (startDate === endDate) {
      if (rangeBetweenDays(moment(endDate, stringFormat)) === 1) {
        $('.datetimerange-input-7-days').val(1);
        $('.datetimerangepicker span').html('Exclude last 7 days');
      }else{
        $('.datetimerange-input-all-time').val(1);
        $('.datetimerangepicker span').html('All time');
      }
    }else {
      $('.datetimerange-input-start-date').val(startDate);
      $('.datetimerange-input-end-date').val(endDate);
      $('.datetimerangepicker span').html(startDate + ' - ' + endDate);
    }

    if(!reset && !bodyClicked){
      var new_date = startDate + ' - ' + endDate;
      if (old_date != new_date) {
        handleShowBoxSave();
      }
    }
  }

  $(window).keydown(function(event){
    if(event.keyCode == 13 && $('#tab-setting-import-ae')) {
      return true;
    }
    if(event.keyCode == 13 && $('.general-settings-page').length > 0) {
      event.preventDefault();
      return false;
    }
  });

  setActiveTab();
  handleLeavePage();
  setDateTimePicker();
  const keyWords = $("textarea").val();
  const trans = $("select#select-trans").val();
  var country = $('#select-country').val();
  var csv_country = $('#csv_customer_country').val();
  const choose_smart = $('[name="setting[choose_import_method]"]:checked').val();
  const csv_choose_smart = $('[name="csv_setting[csv_choose_import_method]"]:checked').val();
  setTimeout(function(){ $("#save-success-box").css("display", "none"); }, 2000);

  //Event Box save
  $('#box-save-import-setting .btn-save').click(function(){
    let tab = checkTabSettingActive();
    localStorage.setItem(TAB_SETTING_ACTIVE, tab);
    if(tab == 'import-ae'){
      $("#form_settings [type='submit']").click();
    }else if(tab = 'import-file'){
      $("#form_settings_csv [type='submit']").click();
    }
  });

  $('#box-save-import-setting .btn-cancel').click(function(){
    let tab = checkTabSettingActive();
    if(tab == 'import-ae'){
      $("#form_settings [type='reset']").click();
    }else if(tab = 'import-file'){
      $("#form_settings_csv [type='reset']").click();
    }

    resetDataDateRange();
  });
  //END: Event Box save

  //Show box save 
  function handleShowBoxSave(){
    $("#save-success-box").css("display", "none");
    $(".box-save-import-setting").css("display", "block");
    $('#isSettingChange').val('true');
  }

  $(" input, textarea, select").on('keyup change', function () {
    handleShowBoxSave()
  });
  $("body").on('DOMSubtreeModified', "#text-key_tagsinput", function() {
    onDelTagInput()
  });
  onDelTagInput()
  function onDelTagInput(){
    $('#text-key_tagsinput a[title="Removing tag"]').on('click', function(){
      handleShowBoxSave()
    });
  }

  //Handle Import AE
  $( "input[name='setting[translate_reviews]']" ).on( "change", function() {
    if($(this).val() == 1){
      $('.js-select-translate-reviews').removeClass( "only_available" );
    }else{
      $('.js-select-translate-reviews').addClass( "only_available" );
    }
  });

  $( "#input_max" ).on( "click", function() {
      $( "#input_max_value" ).removeClass( "only_available" );
      $( "#input_smart_value" ).addClass( "only_available" );
  });

  $( "#input_smart" ).on( "click", function() {
      $( "#input_smart_value" ).removeClass( "only_available" );
      $( "#input_max_value" ).addClass( "only_available" );
  });

  $('input[name="setting[male_name_percent]"]').bind('keyup keydown mouseup change', function () {
    var female_name_percent = 100 - $(this).val();
    $('input[name="setting[female_name_percent]"]').val(female_name_percent);
  });

  $('input[name="setting[good_rating_percent]"]').bind('keyup keydown mouseup change', function () {
      var rating_percent = 100 - $(this).val();
      $('input[name="setting[bad_rating_percent]"]').val(rating_percent);
  });

  $('#approve-review-manually').change(function () {
      if ($(this).is(':checked')) {
          $('.approve-review-stars').show();
      }else{
          $('.approve-review-stars').hide();
      }
  });

  $("#form_settings [type='reset']").click(function () {
    $('#select-trans').val(trans).trigger('change');
    $('#text-key').importTags(keyWords);
    $("#select-country").val(country).trigger('change');
    if(choose_smart ==0){
      $( "#input_smart_value" ).removeClass( "only_available" );
      $( "#input_max_value" ).addClass( "only_available" );
    }else {
      $( "#input_max_value" ).removeClass( "only_available" );
      $( "#input_smart_value" ).addClass( "only_available" );
    }
    $(".box-save-import-setting").css("display", "none");
    $('.box-save-import-setting .box-save__notify--default').css({'display': 'flex'});
    $('.box-save-import-setting .box-save__notify--error').css({'display': 'none'});
    $('#isSettingChange').val('false');
  });

  $("#form_settings [type='submit']").click(function () {
    let tab = checkTabSettingActive();
    localStorage.setItem(TAB_SETTING_ACTIVE, tab);
    let hasErrors = 0;
    // Max number review
    const valMaxNumberReview = Number($('[name="setting[get_max_number_review]"]').val());
    var choose_import = Number($('[name="setting[choose_import_method]"]:checked').val());
    let errorMaxNumberReview = $('#get_max_number_review_error');
    let inputMaxNumberReview = $('[name="setting[get_max_number_review]"]');
    errorMaxNumberReview.text('');
    if (choose_import == 1) {
      if (valMaxNumberReview === "") {
        errorMaxNumberReview.text('This field is required.');
        inputMaxNumberReview.addClass('error-input');
        hasErrors++;
      } else if (isNaN(valMaxNumberReview)) {
        errorMaxNumberReview.text('Please enter a valid number.');
        inputMaxNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valMaxNumberReview < 1 || valMaxNumberReview > 1500) {
        errorMaxNumberReview.text('Please input a number from 1-1500  ');
        inputMaxNumberReview.addClass('error-input');
        hasErrors++;
      }
    }

    const valNumberReviewFrom = Number($('[name="setting[get_number_review_from]"]').val());
    const valNumberReviewTo = Number($('[name="setting[get_number_review_to]"]').val());
    let errorMaxRandomNumberReview = $('#get_max_random_number_review_error');
    let inputMaxRandomNumberReview = $('[name="setting[get_number_review_from]"], [name="setting[get_number_review_to]"]');
    errorMaxRandomNumberReview.text('');
    if (choose_import == 0) {
      if (valNumberReviewFrom === "" || valNumberReviewTo === "") {
        errorMaxRandomNumberReview.text('This field is required.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (isNaN(valNumberReviewFrom) || isNaN(valNumberReviewTo)) {
        errorMaxRandomNumberReview.text('Please enter a valid number.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valNumberReviewFrom < 1 || valNumberReviewFrom > 1500) {
        errorMaxRandomNumberReview.text('Please input a number from 1-1500.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valNumberReviewTo < 1 || valNumberReviewTo > 1500) {
        errorMaxRandomNumberReview.text('Please input a number from 1-1500.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valNumberReviewTo <= valNumberReviewFrom) {
        errorMaxRandomNumberReview.text('The To number must be greater than the From number.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      }
    }

    //check percent bad-good rating
    var percentGoodrating = $('[name="setting[good_rating_percent]"]').val();
    let errorGoodrating = $('#get_percent_review_error');
    let inputGoodrating = $('[name="setting[good_rating_percent]"]');
    errorGoodrating.text('');
    if (percentGoodrating > 100 || percentGoodrating < 0) {
      errorGoodrating.text('Please input a number from 0-100.');
      inputGoodrating.addClass('error-input');
      hasErrors++;
    } else if (percentGoodrating == '') {
      errorGoodrating.text('Please input a number from 0-100.');
      inputGoodrating.addClass('error-input');
      hasErrors++;
    }

    // Country
    const valCountry = $('[name="setting[country_get_review][]"]').val();
    let errorCountry = $('#country_get_review_error');
    let inputCountry = $('[name="setting[country_get_review][]"]');
    errorCountry.text('');
    if (valCountry == "") {
      errorCountry.text('Please select a location.');
      inputCountry.addClass('error-input');
      hasErrors++;
    }

    // gender percent name="setting[male_name_percent]"
    var gender_percent_error = $('.gender_percent_error');
    const male_percent = $('input[name="setting[male_name_percent]"]').val();
    let input_male_percent = $('input[name="setting[male_name_percent]"]');
    if (male_percent > 100 || male_percent < 0) {
      gender_percent_error.text('Please input a number from 0-100.');
      input_male_percent.addClass('error-input');
      hasErrors++;
    }

      // Auto publish reviews
    let errorApproveReview = $('#approve-review-manually-error');
    const listItemApproveReviewStar = $('[name="setting[approve_review_stars][]"]');
    errorApproveReview.text('');
    if ( $('#approve-review-manually').is(':checked') && $(listItemApproveReviewStar).is(':checked') === false ) {
      errorApproveReview.text('You must select at least 1 star option.');
      hasErrors++;
    }

    if(hasErrors > 0) {
      $('.box-save-import-setting .box-save__notify--default').css({'display': 'none'});
      $('.box-save-import-setting .box-save__notify--error').css({'display': 'flex'});
      return false;
    }
    $('.box-save-import-setting .box-save__notify--default, .box-save-import-setting .box-save__notify--error, .box-save__button').css({'display': 'none'});
    $('.box-save-import-setting .box-save__notify--saving').css({'display': 'flex'});
    $('.general-settings-page').addClass('disabled_setting');
    $('.general-settings-page input').removeClass('error-input');
    return true;
  });
  //END: Handle Import AE

  //Handle Import File
  $( "#csv_input_max" ).on( "click", function() {
    $( "#csv_input_max_value" ).removeClass( "only_available" );
    $( "#csv_input_smart_value" ).addClass( "only_available" );
  });

  $( "#csv_input_smart" ).on( "click", function() {
      $( "#csv_input_smart_value" ).removeClass( "only_available" );
      $( "#csv_input_max_value" ).addClass( "only_available" );
  });

  $('input[name="csv_setting[csv_male_name_percent]"]').bind('keyup keydown mouseup change', function () {
    var female_name_percent = 100 - $(this).val();
    $('input[name="csv_setting[csv_female_name_percent]"]').val(female_name_percent);
  });

  $('input[name="csv_setting[csv_good_rating_percent]"]').bind('keyup keydown mouseup change', function () {
      var rating_percent = 100 - $(this).val();
      $('input[name="csv_setting[csv_bad_rating_percent]"]').val(rating_percent);
  });

  $("#form_settings_csv [type='reset']").click(function () {
    $("#csv_customer_country").val(csv_country).trigger('change');
    if(csv_choose_smart ==0){
      $( "#csv_input_smart_value" ).removeClass( "only_available" );
      $( "#csv_input_max_value" ).addClass( "only_available" );
    }else {
      $( "#csv_input_max_value" ).removeClass( "only_available" );
      $( "#csv_input_smart_value" ).addClass( "only_available" );
    }
    $(".box-save-import-setting").css("display", "none");
    $('.box-save-import-setting .box-save__notify--default').css({'display': 'flex'});
    $('.box-save-import-setting .box-save__notify--error').css({'display': 'none'});
    $('#isSettingChange').val('false');
  });

  $("#form_settings_csv [type='submit']").click(function () {
    let tab = checkTabSettingActive();
    localStorage.setItem(TAB_SETTING_ACTIVE, tab);
    let hasErrors = 0;
    // Max number review
    const valMaxNumberReview = Number($('[name="csv_setting[csv_get_max_number_review]"]').val());
    var choose_import = Number($('[name="csv_setting[csv_choose_import_method]"]:checked').val());
    let errorMaxNumberReview = $('#csv_get_max_number_review_error');
    let inputMaxNumberReview = $('[name="csv_setting[csv_get_max_number_review]"]');
    let limitNumberImportEssPlan = parseInt($('#csv_limit_number_review_ess_plan').val());
    let limitNumberImportPrePlan = parseInt($('#csv_limit_number_review_pre_plan').val());
    let shopCurrentPlan = $('#shopCurrentPlan').val();
    let limitNumberImport = 0;
    let textErrorLimitNumber = '';
    switch (shopCurrentPlan) {
      case 'essential':
        limitNumberImport = limitNumberImportEssPlan
        textErrorLimitNumber = `Max ${limitNumberImportEssPlan} reviews for current plan. <a href="/pricing" target="_blank">Upgrade</a> to get ${limitNumberImportPrePlan} reviews per import.`
        break;
      case 'premium':
      case 'plus':
        limitNumberImport = limitNumberImportPrePlan
        textErrorLimitNumber = `Max ${limitNumberImportPrePlan} reviews for current plan.`
        break;
    }
    errorMaxNumberReview.text('');
    if (choose_import == 1) {
      if (valMaxNumberReview === "") {
        errorMaxNumberReview.text('This field is required.');
        inputMaxNumberReview.addClass('error-input');
        hasErrors++;
      } else if (isNaN(valMaxNumberReview)) {
        errorMaxNumberReview.text('Please enter a valid number.');
        inputMaxNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valMaxNumberReview < 1 || valMaxNumberReview > limitNumberImport) {
        errorMaxNumberReview.html(textErrorLimitNumber);
        inputMaxNumberReview.addClass('error-input');
        hasErrors++;
      }
    }

    const valNumberReviewFrom = Number($('[name="csv_setting[csv_get_number_review_from]"]').val());
    const valNumberReviewTo = Number($('[name="csv_setting[csv_get_number_review_to]"]').val());
    let errorMaxRandomNumberReview = $('#csv_get_max_random_number_review_error');
    let inputMaxRandomNumberReview = $('[name="csv_setting[csv_get_number_review_from]"], [name="csv_setting[csv_get_number_review_to]"]');
    errorMaxRandomNumberReview.text('');
    if (choose_import == 0) {
      if (valNumberReviewFrom === "" || valNumberReviewTo === "") {
        errorMaxRandomNumberReview.text('This field is required.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (isNaN(valNumberReviewFrom) || isNaN(valNumberReviewTo)) {
        errorMaxRandomNumberReview.text('Please enter a valid number.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valNumberReviewFrom < 1 || valNumberReviewFrom > limitNumberImport) {
        errorMaxRandomNumberReview.html(textErrorLimitNumber);
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valNumberReviewTo < 1 || valNumberReviewTo > limitNumberImport) {
        errorMaxRandomNumberReview.html(textErrorLimitNumber);
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      } else if (valNumberReviewTo <= valNumberReviewFrom) {
        errorMaxRandomNumberReview.text('The To number must be greater than the From number.');
        inputMaxRandomNumberReview.addClass('error-input');
        hasErrors++;
      }
    }

    //check percent bad-good rating
    var percentGoodrating = $('[name="csv_setting[csv_good_rating_percent]"]').val();
    let errorGoodrating = $('#csv_get_percent_review_error');
    let inputGoodrating = $('[name="csv_setting[csv_good_rating_percent]"]');
    errorGoodrating.text('');
    if (percentGoodrating > 100 || percentGoodrating < 0) {
      errorGoodrating.text('Please input a number from 0-100.');
      inputGoodrating.addClass('error-input');
      hasErrors++;
    } else if (percentGoodrating == '') {
      errorGoodrating.text('Please input a number from 0-100.');
      inputGoodrating.addClass('error-input');
      hasErrors++;
    }

    // Country
    const valCountry = $('[name="csv_setting[csv_customer_country][]"]').val();
    let errorCountry = $('#csv_country_get_review_error');
    let inputCountry = $('[name="csv_setting[csv_customer_country][]"]');
    errorCountry.text('');
    if (valCountry == "") {
      errorCountry.text('This field is required.');
      inputCountry.addClass('error-input');
      hasErrors++;
    }

    // gender percent 
    var gender_percent_error = $('.csv_gender_percent_error');
    const male_percent = $('input[name="csv_setting[csv_male_name_percent]"]').val();
    let input_male_percent = $('input[name="csv_setting[csv_male_name_percent]"]');
    if (male_percent > 100 || male_percent < 0) {
      gender_percent_error.text('Please input a number from 0-100.');
      input_male_percent.addClass('error-input');
      hasErrors++;
    }

    if(hasErrors > 0) {
      $('.box-save-import-setting .box-save__notify--default').css({'display': 'none'});
      $('.box-save-import-setting .box-save__notify--error').css({'display': 'flex'});
      return false;
    }
    $('.box-save-import-setting .box-save__notify--default, .box-save-import-setting .box-save__notify--error, .box-save__button').css({'display': 'none'});
    $('.box-save-import-setting .box-save__notify--saving').css({'display': 'flex'});
    $('.general-settings-page').addClass('disabled_setting');
    $('.general-settings-page input').removeClass('error-input');
    return true;
  });
  //END: Handle Import File

  // Handle Reset default setting 
  $(".resetImportSettingDefault").click(function (e) {
    $("#modalResetImportSettingDefault").modal("show");
  });

  $("#formResetImportSettingDefault").submit(function (e) {
    e.preventDefault();
    var obj = $(this);
    let tab = checkTabSettingActive();
    let url_reset = '';
    localStorage.setItem(TAB_SETTING_ACTIVE, tab);
    if(tab == 'import-ae'){
      url_reset = '/settings/reset-import-setting';
    }else if(tab = 'import-file'){
      url_reset = '/settings/reset-csv-setting';
    }

    $.ajax({
      type: "post",
      url: appUrl + url_reset,
      dataType: "json",
      data: obj.serialize(),
      beforeSend: function () {
        $(obj)
          .attr("disabled", true)
          .css("opacity", 0.5);
      },
      success: function (data, statusText, xhr) {
        $('.modal').modal('hide');
        console.log('formResetImportSettingDefault', data);
        if (data.status == "success") {
          $(".box-save-import-setting").show();
          $(".box-save-import-setting .box-save__notify--default, .box-save__button").hide();
          $(".box-save-import-setting .box-save__notify--finish").show();
          setTimeout(function () {
            window.location.reload();
          }, 1000);

        } else {
          $(obj)
            .attr("disabled", false)
            .css("opacity", 1);
          $.notify({
            message: data.message
          }, {
            z_index: 999999,
            timer: 2000,
            type: "danger"
          });
        }
      },
      error: function () {
        $(obj)
          .attr("disabled", false)
          .css("opacity", 1);

        $.notify({
          message: lang_reviews.notice_error
        }, {
          z_index: 999999,
          timer: 2000,
          type: "danger"
        });
      }
    });
  });
  // END: Handle Reset default setting

  //Confirm leave page Import Setting
  let selector_menu = $(".main-sidebar .sidebar-menu");
  var href_leave_page = '';
  
  selector_menu.on('click', function (e) {
    var isSettingChange = $('#isSettingChange').val();
    if(e.target && e.target.nodeName === "A" && e.target.host && isSettingChange === 'true' && $('.general-settings-page').length > 0) {
      e.preventDefault();
      href_leave_page = e.target.href;
      $("#modalConfirmLeavePage").modal("show");
      $('#modalConfirmLeavePage .button--primary').click(function(){
        let tab = checkTabSettingActive();
        localStorage.setItem(TAB_SETTING_ACTIVE, tab);
        localStorage.setItem(URL_LEAVE_PAGE, href_leave_page);
        if(tab == 'import-ae'){
          $("#form_settings [type='submit']").click();
        }else if(tab = 'import-file'){
          $("#form_settings_csv [type='submit']").click();
        }
      });

      $('#modalConfirmLeavePage .button--default').click(function(){
        window.location.href = href_leave_page;
        $("#modalConfirmLeavePage").modal("hide");
      });
    }
  });
  // END: Confirm leave page

  //Confirm change tab
  $('.tab-setting-header ul li a').click( function (e) {
    var isSettingChange = $('#isSettingChange').val();
    let next_tab = $(this).parent().attr('id');
    let current_tab = (next_tab == 'import-ae') ? 'import-file' : 'import-ae';
    if(isSettingChange === 'true') {
      e.preventDefault();
      e.stopImmediatePropagation();
      $("#modalConfirmChangeTab").modal("show");
      $('#modalConfirmChangeTab .button--primary').click(function(){
        localStorage.setItem(TAB_SETTING_ACTIVE, next_tab);
        if(current_tab == 'import-ae'){
          $("#form_settings [type='submit']").click();
        }else if(current_tab = 'import-file'){
          $("#form_settings_csv [type='submit']").click();
        }
      });

      $('#modalConfirmChangeTab .button--default').click(function(){
        $(`.tab-setting-header ul li#${next_tab} a`).tab('show');
        if(current_tab == 'import-ae'){
          $("#form_settings [type='reset']").click();
        }else if(current_tab = 'import-file'){
          $("#form_settings_csv [type='reset']").click();
        }
      });
    }
  });
  // END: Confirm change tab

  $("#form-update-app button").on("click", function(e) {
    e.preventDefault();
    let obj = $(this);

    $.ajax({
      type: "post",
      url: appUrl + "/updateHandle",
      dataType: "json",
      data: obj.serialize(),
      beforeSend: function() {
        $(obj).text("Updating...");
        $(obj)
          .attr("disabled", true)
          .css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        if (data.status == "success") {
          // alert(data.message);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          window.location.href = data.url;
        } else {
          $(obj).text("Update App");
          $(obj)
            .attr("disabled", false)
            .css("opacity", 1);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
          );
        }
      },
      error: function() {
        $(obj).text("Update App");
        $(obj)
          .attr("disabled", false)
          .css("opacity", 1);

        $.notify(
          {
            message: lang_reviews.notice_error
          },
          {
            z_index: 999999,
            timer: 2000,
            type: "danger"
          }
        );
      }
    });
  });

  $("#form-critical-update-app button").on("click", function(e) {
    e.preventDefault();
    var obj = $(this);

    $.ajax({
      type: "post",
      url: appUrl + "/cs/critical-update",
      dataType: "json",
      data: obj.serialize(),
      beforeSend: function() {
        $(obj).text("Updating...");
        $(obj)
          .attr("disabled", true)
          .css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        if (data.status == "success") {
          //alert(data.message);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          window.location.href = data.url;
        } else {
          $(obj).text("Update App");
          $(obj)
            .attr("disabled", false)
            .css("opacity", 1);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
          );
        }
      },
      error: function() {
        $(obj).text("Update App");
        $(obj)
          .attr("disabled", false)
          .css("opacity", 1);

        $.notify(
          {
            message: lang_reviews.notice_error
          },
          {
            z_index: 999999,
            timer: 2000,
            type: "danger"
          }
        );
      }
    });
  });

  $("#form-internal-update button").on("click", function(e) {
    e.preventDefault();
    var obj = $(this);

    $.ajax({
      type: "post",
      url: appUrl + "/internal-update-handle/",
      dataType: "json",
      data: obj.serialize(),
      beforeSend: function() {
        $(obj).text("Updating...");
        $(obj)
          .attr("disabled", true)
          .css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        if (data.status == "success") {
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          window.location.href = data.url;
        } else {
          $(obj).text("Update App");
          $(obj)
            .attr("disabled", false)
            .css("opacity", 1);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
          );
        }
      },
      error: function() {
        $(obj).text("Update App");
        $(obj)
          .attr("disabled", false)
          .css("opacity", 1);

        $.notify(
          {
            message: lang_reviews.notice_error
          },
          {
            z_index: 999999,
            timer: 2000,
            type: "danger"
          }
        );
      }
    });
  });

  $("#form-update-themes button").on("click", function(e) {
    e.preventDefault();
    var obj = $(this);

    $.ajax({
      type: "post",
      url: appUrl + "/updateThemesHandle/",
      dataType: "json",
      data: obj.serialize(),
      beforeSend: function() {
        $(obj).text("Updating...");
        $(obj)
          .attr("disabled", true)
          .css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        if (data.status == "success") {
          //alert(data.message);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "success"
            }
          );

          window.location.href = data.url;
        } else {
          $(obj).text("Update");
          $(obj)
            .attr("disabled", false)
            .css("opacity", 1);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
          );
        }
      },
      error: function() {
        $(obj).text("Update");
        $(obj)
          .attr("disabled", false)
          .css("opacity", 1);

        $.notify(
          {
            message: lang_reviews.notice_error
          },
          {
            z_index: 999999,
            timer: 2000,
            type: "danger"
          }
        );
      }
    });
  });

  $(".resetLocalTranslate").click(function(e) {
    $("#modalResetLocalTranslate").modal("show");
  });

  $("#formResetLocalTranslate").submit(function(e) {
    e.preventDefault();
    var obj = $(this);

    $.ajax({
      type: "post",
      url: appUrl + "/settings/reset-local-translate",
      dataType: "json",
      data: obj.serialize(),
      beforeSend: function() {
        $(obj)
          .attr("disabled", true)
          .css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
          $('.modal').modal('hide');
        if (data.status == "success") {
          // $.notify(
          //   {
          //     message: data.message
          //   },
          //   {
          //     z_index: 999999,
          //     timer: 2000,
          //     type: "success"
          //   }
          // );
          $(".rp__box-save").show();
          $(".rp__box-save .box-save__notify--default").hide();
          $(".rp__box-save .box-save__notify--finish").show();
          setTimeout(function(){
              window.location.reload();
          }, 1000); 

        } else {
          $(obj)
            .attr("disabled", false)
            .css("opacity", 1);
          $.notify(
            {
              message: data.message
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
          );
        }
      },
      error: function() {
        $(obj)
          .attr("disabled", false)
          .css("opacity", 1);

        $.notify(
          {
            message: lang_reviews.notice_error
          },
          {
            z_index: 999999,
            timer: 2000,
            type: "danger"
          }
        );
      }
    });
  });

  // $(".convertingUser").click(function(e) {
  //   $("#convertingUser").modal("show");
  // });

  //$('#addDefaultReviewsModal').modal("show");

  if ($(".theme-store-wrap .popular-block").hasClass("disabled")) {
    $(
      'input[type="radio"]',
      $(".theme-store-wrap .popular-block.disabled")
    ).remove();
  }

  $('form#form_update_theme').submit(function(e){
      var form = $(this);
      e.preventDefault();

      var url = form.attr('action');
      $.ajax({
          type: "POST",
          url: url,
          success: function(data)
          {
            if(data.status){
                $.notify(
                    {
                        message: data.messages
                    },
                    {
                        z_index: 999999,
                        timer: 2000,
                        type: "success"
                    }
                );

                window.location.href = appUrl;
            }else {
                $.notify(
                    {
                        message: "An error occurred"
                    },
                    {
                        z_index: 999999,
                        timer: 2000,
                        type: "danger"
                    }
                );
            }
          }
      });
  })
    $('form#form_update_settings').submit(function(e){
        var form = $(this);
        e.preventDefault();

        var url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            success: function(data)
            {
                if(data.status){
                    $.notify(
                        {
                            message: data.messages
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "success"
                        }
                    );

                    location.reload();
                }else {
                    $.notify(
                        {
                            message: "An error occurred"
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "danger"
                        }
                    );
                }
            }
        });
    })

    $('form#form_update_products').submit(function(e){
        var form = $(this);
        e.preventDefault();

        var url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            beforeSend: function() {
                form.attr("disabled", true).css("opacity", 0.5);
                form.find('button').attr('disabled','disabled');
            },
            success: function(data)
            {
                form.attr("disabled", false).css("opacity", 1);

                if(data.status){
                    $.notify(
                        {
                            message: data.messages
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "success"
                        }
                    );

                    location.reload();
                }else {
                    form.find('button').attr('disabled',false);

                    $.notify(
                        {
                            message: "An error occurred"
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "danger"
                        }
                    );
                }
            }
        });
    })

    $('form#form_update_master').submit(function(e){
        var form = $(this);
        e.preventDefault();

        var url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            success: function(data)
            {
                if(data.status){
                    $.notify(
                        {
                            message: data.messages
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "success"
                        }
                    );

                    location.reload();
                }else {
                    $.notify(
                        {
                            message: "An error occurred"
                        },
                        {
                            z_index: 999999,
                            timer: 2000,
                            type: "danger"
                        }
                    );
                }
            }
        });
    })

});
