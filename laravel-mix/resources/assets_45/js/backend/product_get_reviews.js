import {manage_reviews_upgrade} from '../helpers/init_toastr.js';
import { getSettingImportCSV, postSettingImportCSV, getTrackingImportReview, getCsvProcessing } from '../services/ImportReviewCsvService';
let starSetting = [];

jQuery.fn.extend({
  loading: function(parents) {
    // $("#modalWaiting").modal("show");
  },
  loading_finish: function() {
    // $("#modalWaiting").modal("hide");
  }
});

let is_onboarding_import_review = localStorage.getItem('onboarding_import_reviews');
$(document).on('keyup',function(evt) {
  if (evt.keyCode == 27) {
    $('#modalSelectTypeGetReview').modal('hide');
  }
  if (evt.keyCode == 27 && GenerateReview.is_onboarding_step_csv == false) {
    $('#modalImportReviewCSV').modal('hide');
  }
  if (evt.keyCode == 27 && !is_onboarding_import_review && (GenerateReview.step == 1 || GenerateReview.step == 2)) {
    $('#modalImportReview').modal('hide');
  }
});

Vue.component("step2", {
  template: "#get-review-step2",
  props: [
    "title",
    "image",
    "settings",
    "valid_aliexpress",
    "aliexpress",
    "type",
    "product_id",
    "shop_id",
    "all_country",
    "is_add_review",
    "is_reviews"
  ],
  data() {
    return {
      isDefaultFillter: true,
      is_error: 0,
      valid_get_max_number_review: "",
      valid_get_max_number_review_from: "",
      valid_get_max_number_review_to: "",
      valid_get_max_rating_percent: "",
      valid_range_from_to_number_review: "",
      valid_country_get_review: "",
      valid_get_max_gender_percent: "",
      choiceTypeGetReview: false,
      is_onboarding__step: false,
      link_demo_import_review: 'https://www.aliexpress.com/item/32847548221.html',
      settings_old: null,
      // aliexpressCountry: {
      //   www: "English",
      //   en: "English",
      //   ru: "Russian",
      //   pt: "Portuguese",
      //   es: "Spanish",
      //   fr: "French",
      //   de: "German",
      //   it: "Italian",
      //   nl: "Dutch",
      //   tr: "Turkish",
      //   ja: "Japanese",
      //   ko: "Korean",
      //   th: "Thai",
      //   vi: "Vietnamese",
      //   ar: "Arabic",
      //   he: "Hebrew",
      //   pl: "Polish"
      // }
      // aliexpressCountryNoti: {
      //   ru: "Russian",
      //   pt: "Portuguese",
      //   es: "Spanish",
      //   fr: "French",
      //   de: "German",
      //   it: "Italian",
      //   nl: "Dutch",
      //   tr: "Turkish",
      //   ja: "Japanese",
      //   ko: "Korean",
      //   th: "Thai",
      //   vi: "Vietnamese",
      //   ar: "Arabic",
      //   he: "Hebrew",
      //   pl: "Polish"
      // }
    };
  },
  computed: {
    handleDisplayWarningSetting: function() {
      let quantityImport = 0;
      quantityImport = (this.settings.choose_import_method == 1) ? this.settings.get_max_number_review : this.settings.get_number_review_to;
      let getLengthSettingPhoto = this.settings.get_only_picture.length
      let getLengthSettingCountry = this.settings.country_get_review.length
      let getSettingContent = (this.settings.get_only_content.includes('false') && this.settings.get_only_content.length == 1) ? true : false;
      if(quantityImport >= 500 || getLengthSettingPhoto < 2 || getLengthSettingCountry <= 5 || getSettingContent){
        GenerateReview.is_warning_performance = true;
        return true;
      }else{
        GenerateReview.is_warning_performance = false;
        return false;
      }
    },
    getTranslateCountryAliexpress: function() {
      // v-bind:selected="code == settings.language_translate_reviews" 
      // this.country_code = this.settings.language_translate_reviews;
      return GenerateReview.aliexpressCountry;
    }
    // checkAliexpressCountryCode: function() {
    //   let aliExpressCountryNotification = Object.keys(
    //     this.aliexpressCountryNoti
    //   );
    //   return (
    //     aliExpressCountryNotification.indexOf(
    //       this.detectCountry(this.aliexpress)
    //     ) >= 0
    //   );
    // }
  },
  mounted: function(){
    let self = this;
    setTimeout(() => {
      this.settings_old = JSON.parse(JSON.stringify(this.settings));
      $('#modalImportReview').on('shown.bs.modal', function (e) {
        self.setDateTimePicker();
      });

      $("#modalImportReview").scroll(function() {
        $('.datetimerangepicker').blur();
        setTimeout(function(){
          var displayDateRange = $('.custom-daterangepicker').css("display")
          if(displayDateRange === 'block'){
            $('.applyBtn').trigger('click');
          }
        }, 200)
      });
    })
  },
  watch: {
    'is_add_review': {
      handler: function(val, oldVal) {
        let self = this;
        // Support for Onboarding, set value link demo aliexpress
        let KEY_ONBOARDING_IMPORT_REVIEW = 'onboarding_import_reviews';
        if(val === 'success' && localStorage.getItem(KEY_ONBOARDING_IMPORT_REVIEW) === 'step_1'){
          self.aliexpress = '';
          self.$emit("url-aliexpress", self.aliexpress);
          this.is_onboarding__step = true;
        }else{
          this.is_onboarding__step = false;
        }
        // let self = this;
        // if(val === 'success'){
        //   setTimeout(function(){
        //     let attr_link_demo = $('#modalImportReview input[name="aliexpress-url"]').attr('data-link-demo');
        //     if(attr_link_demo){
        //       self.aliexpress = attr_link_demo;
        //       self.$emit("url-aliexpress", self.aliexpress);
        //     }
        //   }, 500)
        // }
      },
      deep: true
    },
    'settings.good_rating_percent': {
      handler: function(val, oldVal) {
        this.settings.bad_rating_percent = 100 - parseInt(val);
      },
      deep: true
    },
    'settings.male_name_percent': {
      handler: function(val, oldVal) {
        this.settings.female_name_percent = 100 - parseInt(val);
      },
      deep: true
    },

    'isDefaultFillter': {
      handler: function(val, oldVal) {
        if(!val){
          this.setDateTimePicker();
        }
      },
      deep: true
    }
  },
  methods: {
    // clickTypeGetReview: function() {
    //   if (this.choiceTypeGetReview === true) {
    //     GenerateReview.type = "del_add_new";
    //   } else {
    //     GenerateReview.type = "add_in";
    //   }
    // },
    isCountrySelected: function(code) {
      return ( GenerateReview.settings.country_get_review.indexOf(code) > -1 ? true : false )
    },
    onChangeAliexpress: function() {
      GenerateReview.aliexpress = this.aliexpress;
    },
    checkTranslateReviews: function(translate) {
      this.settings.translate_reviews = translate;
    },
    validate: function(settings) {
      this.is_error = 0;
      this.valid_get_max_number_review = "";
      this.valid_country_get_review = "";
      this.valid_aliexpress = "";
      this.valid_get_max_number_review_to = '';
      this.valid_get_max_number_review_from = '';
      this.valid_get_max_rating_percent = '';
      this.valid_range_from_to_number_review = '';
      this.valid_get_max_gender_percent = '';

      if(settings.choose_import_method == true){
        // Validate max number review
        if ( settings.get_max_number_review === "" || parseInt(settings.get_max_number_review) <= 0 || parseInt(settings.get_max_number_review) > 1500 || Number.isInteger(Number(settings.get_max_number_review)) != true) {
          this.valid_get_max_number_review = lang_get_reviews.valid_get_max_number_review;
          this.is_error++;
        }
      }else{
        // Validate get_number_review_from
        if ( settings.get_number_review_from === "" || parseInt(settings.get_number_review_from) <= 0 || parseInt(settings.get_number_review_from) > 1500 || Number.isInteger(Number(settings.get_number_review_from)) != true) {
          this.valid_get_max_number_review_from = lang_get_reviews.valid_get_max_number_review;
          this.is_error++;
        }

        // Validate get_number_review_to
        if ( settings.get_number_review_to === "" || parseInt(settings.get_number_review_to) <= 0 || parseInt(settings.get_number_review_to) > 1500 || Number.isInteger(Number(settings.get_number_review_to)) != true) {
          this.valid_get_max_number_review_to = lang_get_reviews.valid_get_max_number_review;
          this.is_error++;
        }

        // Validate valid_range_from_to_number_review
        if ( settings.get_number_review_from !== "" &&  settings.get_number_review_to !== "" && parseInt(settings.get_number_review_from) >= parseInt(settings.get_number_review_to)) {
          this.valid_range_from_to_number_review = lang_get_reviews.valid_range_from_to_number_review;
          this.is_error++;
        }
      }
      
      // Validate get_max_rating_percent
      if ( settings.good_rating_percent === "" || parseInt(settings.good_rating_percent) < 0 || parseInt(settings.good_rating_percent) > 100 || Number.isInteger(Number(settings.good_rating_percent)) != true) {
        this.valid_get_max_rating_percent = lang_get_reviews.valid_get_max_rating_percent;
        this.is_error++;
      }

      // Validate valid_get_max_gender_percent
      if ( settings.male_name_percent === "" || parseInt(settings.male_name_percent) < 0 || parseInt(settings.male_name_percent) > 100 || Number.isInteger(Number(settings.male_name_percent)) != true) {
        this.valid_get_max_gender_percent = lang_get_reviews.valid_get_max_gender_percent;
        this.is_error++;
      }
      
      // Validate country
      if ( typeof settings.country_get_review === "undefined" || settings.country_get_review.length <= 0 ) {
        this.is_error++;
        this.valid_country_get_review = lang_get_reviews.valid_country_get_review;
      }

      // Validate url aliexpress
      if ( !this.validateAliLink(this.aliexpress) ) {
        this.valid_aliexpress = lang_get_reviews.validate_aliexpress;
        this.is_error++;
      }

      if (this.is_error > 0) {
        return false;
      }

      return true;
    },
    validateAliLink: function(aliexpress) {
      var pattern = /^((http:\/\/)|(https:\/\/))(()|(www\.)|(ru\.)|(pt\.)|(es\.)|(fr\.)|(de\.)|(it\.)|(nl\.)|(tr\.)|(ja\.)|(ko\.)|(th\.)|(vi\.)|(ar\.)|(he\.)|(pl\.))(aliexpress\.)((com\/)|(ru\/))((item\/)|(store\/product\/)|(store\/product\/-\/)|(item\/\/)|(item\/-\/)|(i\/))\w/;
      if (!pattern.test(aliexpress)) {
        return false;
      }
      return true;
    },
    // detectCountry: function(aliexpress) {
    //   var str = aliexpress.slice(0, 12);
    //   var country = str.match(
    //     /www|ru|pt|es|fr|de|it|nl|tr|ja|ko|th|vi|ar|he|pl/
    //   );
    //   if (country !== null) return country[0];
    //   else return null;
    // },
    goStep: function(step) {
      if (step === "3_aliexpress") {
        // this.valid_aliexpress = "";
        // if (!this.validateAliLink(this.aliexpress)) {
        //   this.valid_aliexpress = lang_get_reviews.validate_aliexpress;
        //   return false;
        // }
        if (!this.validate(this.settings)) {
          return false;
        }

        this.$emit("show-step", step);
        this.$emit("url-aliexpress", this.aliexpress);
        const get_only_star = this.settings.hasOwnProperty("get_only_star") ? this.settings.get_only_star : [];

        starSetting = get_only_star;
        if (get_only_star.length === 0) {
          this.settings.get_only_star = ["1", "2", "3", "4", "5"];
        }
        const get_only_picture = this.settings.hasOwnProperty("get_only_picture") ? this.settings.get_only_picture : [];

        if (get_only_picture.length === 0) {
          this.settings.get_only_picture = ["true", "false"];
        }

        const get_only_content = this.settings.hasOwnProperty(
          "get_only_content"
        )
          ? this.settings.get_only_content
          : [];

        if (get_only_content.length === 0) {
          this.settings.get_only_content = ["true", "false"];
        }

        this.$emit("settings", this.settings);
        GenerateReview.settings.get_only_content = get_only_content;
        
        //Post beforeImportReviewEvent
        GenerateReview.settings = this.isDefaultFillter ? JSON.parse($("#get-review-settings").val()) : GenerateReview.settings;
        GenerateReview.settings.is_default_filter_setting = this.isDefaultFillter;
        GenerateReview.aliexpress = GenerateReview.convertUrlAliexpressDefaultTranslate(this.aliexpress, (this.isDefaultFillter ? this.settings.language_translate_reviews : GenerateReview.country_code));
        this.choiceTypeGetReview === true ?  GenerateReview.type = "del_add_new" : GenerateReview.type = "add_in";

        if ( GenerateReview.settings.translate_reviews) {
          GenerateReview.settings.translate_reviews = parseInt(GenerateReview.settings.translate_reviews)
        }
        if ( GenerateReview.settings.is_local_name) {
          GenerateReview.settings.is_local_name = parseInt(GenerateReview.settings.is_local_name)
        }

        console.log('GenerateReview.aliexpress',GenerateReview.aliexpress);
        if(this.isDefaultFillter != true) {
          GenerateReview.settings.translate_language_selected = GenerateReview.country_code;
        }

        $.ajax({
          type: "POST",
          url: appUrl + "/api/prepareImportReview",
          dataType: "json",
          data: {
            shopId: GenerateReview.shop_id
          }
        });

        window.postMessage(
          {
            type_message: "aliReview",
            aliExpress: GenerateReview.aliexpress,
            settings: GenerateReview.settings
          },
          "*"
        );
      }
    },
    checkedOnlyRating: function(args, value) {
      if (args !== null && typeof args !== "undefined") {
        return args.indexOf(value) >= 0;
      }
    },
    existsValue: function(args, value) {
      if (args === null || typeof args === "undefined") {
        return false;
      }
      return args.includes(value);
    },
    onCancelImportReviews: function(){
      if(!this.settings_old){
        this.settings_old = JSON.parse(JSON.stringify(this.settings));
      }
      this.isDefaultFillter = true;
      this.settings = Object.assign(this.settings, JSON.parse(JSON.stringify(this.settings_old)));
    },

    setDateTimePicker: function (){
      var self = this;
      var stringFormat = 'DD/MM/YYYY';
      var applyClicked = true;
      var bodyClicked = false;
      var start = moment();
      var end = moment();
  
      var old_all_time = parseInt(self.settings.import_reviews_in_date_range.all_time);
      var old_7_days = parseInt(self.settings.import_reviews_in_date_range.exclude7days);
      if (old_7_days) {
        start = moment().add(1, 'days');
        end = moment().add(1, 'days');
      }else if(!old_all_time){
        start = moment(self.settings.import_reviews_in_date_range.start_date, stringFormat);
        end = moment(self.settings.import_reviews_in_date_range.end_date, stringFormat);
      }
  
      var prev_start_date = start.format(stringFormat);
      var prev_end_date = end.format(stringFormat);
  
      var old_date = prev_start_date + ' - ' + prev_end_date;
  
      function cb(start, end) {
        if (start.format(stringFormat) === end.format(stringFormat)) {
          if (self.rangeBetweenDays(end) === 1) {
            $('.datetimerangepicker span').html('Exclude last 7 days');
          } else {
            $('.datetimerangepicker span').html('All time');
          }
        } else {
          $('.datetimerangepicker span').html(start.format(stringFormat) + ' - ' + end.format(stringFormat));
        }
      }
  
      $('.datetimerangepicker').daterangepicker({
        startDate: start,
        endDate: end,
        maxDate: moment().add(1, 'days'),
        ranges: {
          'All time': [moment(), moment()],
          'Exclude last 7 days': [moment().add(1, 'days'), moment().add(1, 'days')],
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
        $('.ranges .tooltip__container').remove();
        if(bodyClicked){
          var startDate = old_date.split(' - ')[0];
          var endDate = old_date.split(' - ')[1];
          self.handleUpdateDateRange(startDate, endDate);
          bodyClicked = false;
        }
      });

      $('.datetimerangepicker').on('show.daterangepicker', function (ev, picker) {
        $('.ranges .custom-date-range').remove();
        var html = `
          <div class="custom-date-range">
            <button class="btn-cancel-range btn btn-sm btn-default" type="button">Cancel</button>
            <button class="btn-apply btn btn-sm btn-primary button--orange" type="button">Apply</button>
          </div>
        `;

        var tooltip7days = `
          <div class="tooltip__container">
            <i class="tooltip__icon fas alireview-fa-info"></i>
            <div class="tooltip__body fade">
              <div class="tooltip__inner">
                <p>Select this if you want to translate all imported reviews. AliExpress only translates reviews older than <span>7 days</span></p>
              </div>
            </div>
          </div>
        `;

        $('.datetimerangepicker').addClass('focus');
  
        $('.ranges').append(html);
        $('.ranges ul li:nth-child(2)').append(tooltip7days);
  
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
          self.handleUpdateDateRange(startDate, endDate);
          picker.hide();
        }
      });
  
      $('.datetimerangepicker').on('cancel.daterangepicker', function (ev, picker) {
        self.handleUpdateDateRange(prev_start_date, prev_end_date);
      });
  
      cb(start, end);
    },

    rangeBetweenDays: function (end) {
      var stringFormat = 'YYYY-MM-DD';
      var today = new Date(moment().format(stringFormat));
      var endDate = new Date(end.format(stringFormat));
      var rangeDates = endDate.getTime() - today.getTime(); 
      return rangeDates / (1000 * 3600 * 24); 
    },

    handleUpdateDateRange: function(startDate, endDate) {
      let self = this;
      var stringFormat = 'DD/MM/YYYY';
      $('.datetimerangepicker').data('daterangepicker').setStartDate(startDate);
      $('.datetimerangepicker').data('daterangepicker').setEndDate(endDate);
      $('.range-date-special').val(0);
      self.$set(self.settings.import_reviews_in_date_range, 'all_time', 0);
      self.$set(self.settings.import_reviews_in_date_range, 'exclude7days', 0);
      if (startDate === endDate) {
        if (self.rangeBetweenDays(moment(endDate, stringFormat)) === 1) {
          self.$set(self.settings.import_reviews_in_date_range, 'exclude7days', 1);
          $('.datetimerangepicker span').html('Exclude last 7 days');
        } else {
          self.$set(self.settings.import_reviews_in_date_range, 'all_time', 1);
          $('.datetimerangepicker span').html('All time');
        }
      } else {
        self.settings.import_reviews_in_date_range = Object.assign({}, self.settings.import_reviews_in_date_range, {
          start_date: startDate,
          end_date: endDate,
        });
        $('.datetimerangepicker span').html(startDate + ' - ' + endDate);
      }
    }
  }
});

Vue.component("step3_get_aliexpress", {
  props: ["is_warning_performance"],
  template: "#get-review-step3-get-aliexpress"
});

Vue.component("step3_save_database", {
  template: "#get-review-step3-save-database"
});

Vue.component("step4_no_review", {
  template: "#get-review-step4-no-review",
  methods: {
    goStep: function(step) {
      this.$emit("show-step", step);
    }
  }
});

Vue.component("step4_success", {
  props: ["review_url", "total_review", "reload"],
  template: "#get-review-step4-success"
});

/**
 * Component get reviews CSV
 */
Vue.component("csv_step_upload_file", {
  template: "#csv_step_upload_file",
  props: [
    'single_product_data',
    'valid_error_upload_file'
  ],
  data(){
    return {
      valid_error: "",
    }
  },
  mounted: function(){
    $(".modal-body__cta .btn-import-review-step1").attr('disabled', true);
    $('#csv_import_reviews_file').change(function(e){
      let file_name = e.target.files[0].name;
      $('#file_upload_name span').text(file_name).addClass('has-file-name');
      $(".modal-body__cta .btn-import-review-step1").attr('disabled', false);
      $('#delete-file-btn').show();
    });
  },
  methods: {
    goBack: function(){
      if(GenerateReview.csv_type_import == 'single_product'){
        $('#modalImportReviewCSV').modal('hide');
        setTimeout(function(){
          $("#modalSelectTypeGetReview").modal({
            backdrop: "static",
            keyboard: false
          });
        }, 500);
      }else{
        $('#modalImportReviewCSV').modal('hide');
      }
    },
    onDeleteFile: function(){
      $('#csv_import_reviews_file').val('');
      $('#file_upload_name span').text('No file selected').removeClass('has-file-name');
      $(".modal-body__cta .btn-import-review-step1").attr('disabled', true);
      $('#delete-file-btn').hide();
      GenerateReview.valid_error_upload_file = '';
    }
  }
});

Vue.component("csv_step_filter_review", {
  template: "#csv_step_filter_review",
  props: [
    "csv_setting",
    "product_id",
    "shop_id",
    "is_error",
    "csv_setting_all_country",
    "valid_get_max_number_review",
    "valid_get_max_number_review_from",
    "valid_get_max_number_review_to",
    "valid_range_from_to_number_review",
    "valid_get_max_rating_percent",
    "valid_get_max_gender_percent",
    "valid_country_get_review",
    "is_onboarding_step_csv"
  ],
  computed: {
    checkPlanRemoveReviewSetting : function(){
      if((this.csv_setting.shop_plan == 'free' || this.csv_setting.shop_plan == 'starter' || this.csv_setting.shop_plan == 'essential') && !this.is_onboarding_step_csv){
        return true;
      }
      return false;
    },
    tootipMaxImport : function(){
      return `Maximum ${this.csv_setting.csv_limit_number_review} reviews from the template file.`;
    },
  },
  watch:{
    'csv_setting.csv_good_rating_percent': {
      handler: function(val, oldVal) {
        this.csv_setting.csv_bad_rating_percent = 100 - parseInt(val);
      },
      deep: true
    },
    'csv_setting.csv_male_name_percent': {
      handler: function(val, oldVal) {
        this.csv_setting.csv_female_name_percent = 100 - parseInt(val);
      },
      deep: true
    },
  },
  data() {
  },
  methods: {
    goBack: function(){
      GenerateReview.step = 'csv_step_upload_file';
    },
    showTooltipUpgrade: function(){
      if(this.checkPlanRemoveReviewSetting){
        $('.tooltip-upgrade-plan').fadeIn(500);
      }
    },
    hideTooltipUpgrade: function(){
      if(this.checkPlanRemoveReviewSetting){
        $('.tooltip-upgrade-plan').hide();
      }
    },
    showPopupUpgradePlan : function(e) {
      $('.tooltip-upgrade-plan').hide();
      let self = this;
      $('#modalImportReviewCSV').modal('hide');
      setTimeout(function(){
        $('#modalUpgradePlan').modal('show');
        switch(self.csv_setting.shop_plan) {
          case 'starter':
            $('#modalUpgradePlan .nav-tabs li:eq(1) a').tab('show');
            break;
          case 'essential':
            $('#modalUpgradePlan .nav-tabs li:eq(0) a').tab('show');
            break;
          default:
            break;
        }
      }, 500);
      if(GenerateReview.step == 'csv_step_filter_review'){
        $('#modalUpgradePlan button.close').click(function(){
          $('#modalImportReviewCSV').modal('show');
          $('.tooltip-upgrade-plan').hide();
        });
      }
    },
  }
});

Vue.component("csv_step4_success", {
  template: "#get-review-csv-step4-success"
});
/**
 * END: Component get reviews CSV
 */

/**
 * Component Reviews App
 */
Vue.component("step_review_app", {
  template: "#step-review-app",
  methods: {
    addReviewsApp: function(event) {
      event.preventDefault();

      window.open(
        "https://apps.shopify.com/ali-reviews?reveal_new_review=true",
        "_blank"
      );

      $("#addReviewsModal").modal("hide");

      $.ajax({
        type: "post",
        url: appUrl + "/review_app",
        dataType: "json",
        data: {},
        success: function(data, statusText, xhr) {
          console.log("Review app!");
        }
      });
    }
  }
});

//Country change
function multiSelectCountryCSV(){
  $("#get-review-filter-country-csv").multiselect({
    nonSelectedText: "Select Location",
    enableFiltering: false,
    includeSelectAllOption: true,
    enableCaseInsensitiveFiltering: true,
    templates: {
      li: '<li class="checkList"><label class="wrap-custom-box"> one<input type="checkbox" checked="checked"><span class="checkmark-ckb"></span></label></li>',
      filter: '<li class="multiselect-item filter"><div class="input-group" style="width: 100%; padding-right: 10px;"><input class="form-control multiselect-search" type="text"></div></li>',
      filterClearBtn: false
    },
    onChange: function(option, checked) {
      GenerateReview.csv_setting.csv_customer_country = $("#get-review-filter-country-csv").val();
    },
    onSelectAll: function() {
      GenerateReview.csv_setting.csv_customer_country = $("#get-review-filter-country-csv").val();
    },
    onDeselectAll: function() {
      GenerateReview.csv_setting.csv_customer_country = $("#get-review-filter-country-csv").val();
    },
    onInitialized: function(select, container) {
      $(".multiselect, .multiselect-search").css("opacity", "1");
    }
  });

  $(".multiselect-search + div .multiselect-container .wrap-custom-box").each(function(index) {
    $(this).append('<span class="checkmark-ckb"></span>');

    $(this).click(function(e) {
      e.stopPropagation();
    });
    }
  );
}
$(function() {
  $("#modalImportReviewCSV").on("shown.bs.modal", function() {
    multiSelectCountryCSV();
  });
  $("#modalImportReview").on("shown.bs.modal", function() {
    //disable Enter key
    $('#modalImportReview input[type="number"]').bind('keypress', function(e)
    { 
      if(e.keyCode == 13 || e.keyCode == 44 || e.keyCode == 46)
      {
          return false;
      }
    });
    $('[data-toggle="tooltip-import"]').tooltip({
      html: true,
      container: "body"
    });

    $("#translate-language").select2({
      minimumResultsForSearch: Infinity
    });

    $('#translate-language').on('change.select2', function() {
      GenerateReview.country_code = $(this).val();
    });

    $("body").addClass("modal-open");
    // var countryGetReview = GenerateReview.settings.country_get_review;
    $("#get-review-filter-country").multiselect({
      nonSelectedText: "Select Location",
      enableFiltering: false,
      includeSelectAllOption: true,
      enableCaseInsensitiveFiltering: true,
      templates: {
        li: '<li class="checkList"><label class="wrap-custom-box"> one<input type="checkbox" checked="checked"><span class="checkmark-ckb"></span></label></li>',
        filter: '<li class="multiselect-item filter"><div class="input-group" style="width: 100%; padding-right: 10px;"><input class="form-control multiselect-search" type="text"></div></li>',
        filterClearBtn: false
      },
      onChange: function(option, checked) {
        // countryGetReview = $("#get-review-filter-country").val();
        GenerateReview.settings.country_get_review = $("#get-review-filter-country").val();
      },
      onSelectAll: function() {
        // countryGetReview = $("#get-review-filter-country").val();
        GenerateReview.settings.country_get_review = $("#get-review-filter-country").val();
      },
      onDeselectAll: function() {
        // countryGetReview = $("#get-review-filter-country").val();
        GenerateReview.settings.country_get_review = $("#get-review-filter-country").val();
      },
      onInitialized: function(select, container) {
        $(".multiselect, .multiselect-search").css("opacity", "1");
      }
    });

    $(".multiselect-search + div .multiselect-container .wrap-custom-box").each(function(index) {
      $(this).append('<span class="checkmark-ckb"></span>');

      $(this).click(function(e) {
        e.stopPropagation();
      });
      }
    );
  });

  $(".selectActionAllReviews2").on("change", function() {
    var dataProductId = $(this).attr("data-product_id");
    var modal = "#" + $(this).val();

    if ($(this).val() === "") return false;

    $(modal).on("shown.bs.modal", function() {
      $('input[name="product_id"]', $(modal)).val(dataProductId);
    });

    var originalModal = $(modal).clone();
    $(modal).on("hidden.bs.modal", function() {
      $(modal).remove();
      var myClone = originalModal.clone();
      $("body").append(myClone);
    });

    $(modal).modal({
      show: "true"
    });

    $(this)
      .val(null)
      .trigger("change");
  });

  $("body").delegate("#formDeleteAllReview2", "submit", function(e) {
    $('.modal').modal('hide');
    e.preventDefault();

    var obj = $(this);
    $.ajax({
      type: "post",
      url: appUrl + "/review/all-action",
      dataType: "json",
      data: {
        action: "delete",
        product_id: $('input[name="product_id"]', obj).val(),
        _token: $('input[name="_token"]', obj).val()
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {


        if (data.status && data.status == "success") {
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

          window.location.reload();
        } else {
          obj.attr("disabled", false).css("opacity", 1);
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
        $('.modal').modal('hide');
        obj.attr("disabled", false);
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

  $("body").delegate("#formPublishAllReview2", "submit", function(e) {
    $('.modal').modal('hide');
    e.preventDefault();

    var obj = $(this);
    $.ajax({
      type: "post",
      url: appUrl + "/review/all-action",
      dataType: "json",
      data: {
        action: "publish",
        product_id: $('input[name="product_id"]', obj).val(),
        _token: $('input[name="_token"]', obj).val()
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {

        obj.attr("disabled", false).css("opacity", 1);

        switch (data.status) {
          case 'success':
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

            window.location.reload();
            break;
          case 'warning':
            let count_product = data.maxImport;
            let link_upgrade = data.linkUpdate;
            manage_reviews_upgrade({ count_product, link_upgrade, options: {timeOut:false}});

            break;
          case 'warning_oberlo':
            $.notify({
              message: data.message
            }, {
              type: "warning"
            });
            setTimeout(function () {
              window.location.reload();
            }, 3000);
            break;
          default:
            obj.attr("disabled", false).css("opacity", 1);
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
        $('.modal').modal('hide');

        obj.attr("disabled", false);
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

  $("body").delegate("#formUnPublishAllReview2", "submit", function(e) {
    $('.modal').modal('hide');
    e.preventDefault();

    var obj = $(this);
    $.ajax({
      type: "post",
      url: appUrl + "/review/all-action",
      dataType: "json",
      data: {
        product_id: $('input[name="product_id"]', obj).val(),
        action: "unpublish",
        _token: $('input[name="_token"]', obj).val()
      },
      beforeSend: function() {
        obj.attr("disabled", true).css("opacity", 0.5);
      },
      success: function(data, statusText, xhr) {
        $('.modal').modal('hide');

        if (data.status && data.status == "success") {
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

          window.location.reload();
        } else {
          obj.attr("disabled", false).css("opacity", 1);
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
        $('.modal').modal('hide');
        obj.attr("disabled", false);
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

  $(document.body).on("click", function(event) {
    var highlight_review = $("body").hasClass("step-highlight-add-review");
    $(".sidebarDashboard").tooltip("show", {
      container: ".sidebar-container"
    });
    if (highlight_review) {
      $("body").removeClass("step-highlight-add-review");
      $("body").addClass("step-highlight-dashboard");
    } else {
      var highlight_dashboard = $("body").hasClass("step-highlight-dashboard");

      if (highlight_dashboard) {
        $("body").removeClass("step-highlight-open");
        $("body").removeClass("step-highlight-dashboard");
      }
    }
  });
});

window.GenerateReview = new Vue({
  el: "#page-list-product-get-review",
  data: {
    total_review: 0,
    product_total_reviews: 0,
    product_avg_reviews: 0,
    step: 1,
    title: "",
    image: "",
    aliexpress: "",
    shop_id: "",
    product_id: "",
    type: "add_in",
    settings: {},
    all_country: {},
    country_code: 'www',
    review_url: "",
    reload: "",
    valid_aliexpress: "",
    is_reviews: false,
    count_total_get_reviews: 0,
    is_reviews_app: 0,
    is_add_review: "",
    count_display_modal_vote: 3,
    aliexpressCountry: {
      www: "English",
      ru: "Russian",
      pt: "Portuguese",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      nl: "Dutch",
      tr: "Turkish",
      ja: "Japanese",
      ko: "Korean",
      th: "Thai",
      vi: "Vietnamese",
      ar: "Arabic",
      he: "Hebrew"
    },
    single_product_data: '',
    valid_error_upload_file: '',
    csv_setting: '',
    csv_type_import: '',
    csv_list_product_checked: '',
    csv_is_all_products: '',
    csv_product_all_uncheck: '',
    is_error: 0,
    valid_get_max_number_review: "",
    valid_get_max_number_review_from: "",
    valid_get_max_number_review_to: "",
    valid_range_from_to_number_review: "",
    valid_get_max_rating_percent: "",
    valid_get_max_gender_percent: "",
    valid_country_get_review: "",
    csv_setting_all_country: {},
    is_onboarding_step_csv: false,
    is_warning_performance: false
  },
  watch:{
    'csv_setting_all_country': {
      handler: function(val, oldVal) {
        $("#get-review-filter-country-csv").multiselect("destroy");
        setTimeout(function(){
          multiSelectCountryCSV();
          let listCountryChecked = Object.keys(val);
          $("#get-review-filter-country-csv").val(listCountryChecked);
          $("#get-review-filter-country-csv").multiselect("refresh");
          GenerateReview.csv_setting.csv_customer_country = $("#get-review-filter-country-csv").val();
        }, 200);
      },
      deep: true
    },
  },
  mounted: function() {
    if ($('#page-list-product-get-review').length > 0) {
      this.getSettingImportCSV();
    }
    let KEY_ONBOARDING_IMPORT_REVIEW = 'onboarding_import_reviews';
    if(localStorage.getItem(KEY_ONBOARDING_IMPORT_REVIEW) === 'csv_step_1'){
      this.is_onboarding_step_csv = true;
    }else{
      this.is_onboarding_step_csv = false;
    }
    this.settings = $("#get-review-settings").val() !== undefined ? JSON.parse($("#get-review-settings").val()) : {};

    if ( this.settings.get_only_star === null || typeof this.settings.get_only_star === "undefined" ) {
      this.settings.get_only_star = [];
    }

    if ( this.settings.country_get_review === null || typeof this.settings.country_get_review === "undefined" ) {
      this.settings.country_get_review = [];
    }

    if ( this.settings.language_translate_reviews === null || typeof this.settings.language_translate_reviews === "undefined" ) {
      this.settings.language_translate_reviews = 'www';
    } else {
      this.country_code = this.settings.language_translate_reviews;
    }

    this.shop_id = $("#get-review-shop-id").val();
    this.is_reviews_app = $("#shop-current-is-reviews-app").val();
    this.all_country = $("#all-country").val() !== undefined ? JSON.parse($("#all-country").val()) : [];

    //Handle Modal close
    $("#modalImportReview").on("hidden.bs.modal", function() {
      if ( GenerateReview.count_total_get_reviews === GenerateReview.count_display_modal_vote && !parseInt(GenerateReview.is_reviews_app) ) {
        // GenerateReview.step = "step_review_app";
        $("#modalRatingApp").modal('show');
        GenerateReview.is_reviews_app = 1;
      } else {
        $("#modalImportReview").modal("hide");
      }
    });

    $('#modalImportReviewCSV').on('shown.bs.modal', function() { 
      $('.tooltip__icon').tooltip(); 
      document.body.className += ' modal-open';
    });
  },
  methods: {
    getSettingImportCSV: async function(){
      let res = await getSettingImportCSV();
      if(res.status){
        this.csv_setting = res.data;
      }
    },
    validate: function(settings) {
      this.is_error = 0;
      this.valid_get_max_number_review = "";
      this.valid_get_max_number_review_to = '';
      this.valid_get_max_number_review_from = '';
      this.valid_get_max_rating_percent = '';
      this.valid_range_from_to_number_review = '';
      this.valid_get_max_gender_percent = '';
      this.valid_country_get_review = "";

      let textErrorLimitNumber = '';
      switch (settings.shop_plan) {
        case 'essential':
          textErrorLimitNumber = `Max 20 reviews for current plan. <a href="/pricing" target="_blank">Upgrade</a> to get 200 reviews per import.`
          break;
        case 'premium':
        case 'plus':
          textErrorLimitNumber = `Max 200 reviews for current plan.`
          break;
      }

      if(settings.csv_choose_import_method == true){
        // Validate max number review
        if ( settings.csv_get_max_number_review === "" || parseInt(settings.csv_get_max_number_review) <= 0 || parseInt(settings.csv_get_max_number_review) > settings.csv_limit_number_review || Number.isInteger(Number(settings.csv_get_max_number_review)) != true) {
          this.valid_get_max_number_review = textErrorLimitNumber;
          this.is_error++;
        }
      }else{
        // Validate get_number_review_from
        if ( settings.csv_get_number_review_from === "" || parseInt(settings.csv_get_number_review_from) <= 0 || parseInt(settings.csv_get_number_review_from) > settings.csv_limit_number_review || Number.isInteger(Number(settings.csv_get_number_review_from)) != true) {
          this.valid_get_max_number_review_from = textErrorLimitNumber;
          this.is_error++;
        }

        // Validate get_number_review_to
        if ( settings.csv_get_number_review_to === "" || parseInt(settings.csv_get_number_review_to) <= 0 || parseInt(settings.csv_get_number_review_to) > settings.csv_limit_number_review || Number.isInteger(Number(settings.csv_get_number_review_to)) != true) {
          this.valid_get_max_number_review_to = textErrorLimitNumber;
          this.is_error++;
        }

        // Validate valid_range_from_to_number_review
        if ( settings.csv_get_number_review_from !== "" &&  settings.csv_get_number_review_to !== "" && parseInt(settings.csv_get_number_review_from) >= parseInt(settings.csv_get_number_review_to)) {
          this.valid_range_from_to_number_review = lang_get_reviews.valid_range_from_to_number_review;
          this.is_error++;
        }
      }
      
      // Validate get_max_rating_percent
      if ( settings.csv_good_rating_percent === "" || parseInt(settings.csv_good_rating_percent) < 0 || parseInt(settings.csv_good_rating_percent) > 100 || Number.isInteger(Number(settings.csv_good_rating_percent)) != true) {
        this.valid_get_max_rating_percent = lang_get_reviews.valid_get_max_rating_percent;
        this.is_error++;
      }

      // Validate csv_male_name_percent
      if ( settings.csv_male_name_percent === "" || parseInt(settings.csv_male_name_percent) < 0 || parseInt(settings.csv_male_name_percent) > 100 || Number.isInteger(Number(settings.csv_male_name_percent)) != true) {
        this.valid_get_max_gender_percent = lang_get_reviews.valid_get_max_rating_percent;
        this.is_error++;
      }

      // Validate country
      if ( typeof settings.csv_customer_country === "undefined" || settings.csv_customer_country.length <= 0 ) {
        this.is_error++;
        this.valid_country_get_review = lang_get_reviews.valid_country_get_review;
      }

      if (this.is_error > 0) {
        return false;
      }
      return true;
    },
    onSubmitImportCSV: async function(e){
      let self = this;
      var formData = new FormData($('#csv_import_reviews')[0]);
      formData.append('shop_id' , GenerateReview.shop_id);
      formData.append('product_id' , GenerateReview.product_id);

      if(this.step == 'csv_step_upload_file'){
        if($('#csv_import_reviews_file').val() == ''){
          self.valid_error_upload_file = 'Please upload file first';
          $('#file_upload_name span').text('No file selected').removeClass('has-file-name');
          return;
        }
        formData.append('checkFile' , true);
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: appUrl + "/csv/import",
            type: 'POST',
            data:formData,
            dataType:'JSON',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
              // Icon loading
              $(".modal-body__cta .btn-import-review-step1").addClass("wrap-loading");
              $(".modal-body__cta .btn-import-review-step1").prepend(
                '<div class="lds-dual-ring"></div>'
              );
              // END: Icon loading
            },
            success: function(data) {
              // Icon loading
              $(".modal-body__cta .btn-import-review-step1").removeClass("wrap-loading");
              $(".modal-body__cta .btn-import-review-step1")
                .find(".lds-dual-ring")
                .remove();
              // END: Icon loading
              console.log('csv_import_reviews', data); 
              if(data.status){
                self.csv_setting_all_country = data.data.country;
                self.valid_error_upload_file = '';
                self.step = 'csv_step_filter_review';
                if(self.is_onboarding_step_csv == true){
                  self.csv_setting.csv_choose_import_method = 1;
                  self.csv_setting.csv_get_max_number_review = 200;
                }
              }else{
                self.valid_error_upload_file = data.message;
              }
            },
            error: function(err) {
              console.log('error', err); 
            }
        });
      }else if(this.step == 'csv_step_filter_review' && !this.is_onboarding_step_csv){
        if (!this.validate(this.csv_setting)) {
          return false;
        }

        formData.append('type' , GenerateReview.csv_type_import);
        formData.append('csv_list_product_checked' , GenerateReview.csv_list_product_checked);
        formData.append('csv_is_all_products' , GenerateReview.csv_is_all_products);
        formData.append('csv_product_all_uncheck' , GenerateReview.csv_product_all_uncheck);

        jQuery.each(GenerateReview.csv_setting, function(key, value) {
          formData.append('csv_setting['+key+']', value);
        });
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: appUrl + "/csv/import",
            type: 'POST',
            data:formData,
            dataType:'JSON',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
              $('#modalImportReviewCSV').modal('hide');
              $('#table-select-all tr td input[type="checkbox"]').prop('checked', false);
              $('#table-select-all tr').removeClass('row-selected');
              $.notify(
                {
                    message: 'Importing reviews… Feel free to keep using Ali Reviews.'
                },
                {
                    z_index: 999999,
                    timer: 3000,
                    type: "warning"
                }
              );
            },
            success: function(data) {
              console.log('POST_csv_import_reviews', data);
            },
            error: function(err) {
              console.log('POST_csv_import_reviews_err', err);
              $.notify(
                {
                  message: 'Upload failed. Try again or talk to our Customer Support team for help.'
                },
                {
                  z_index: 999999,
                  timer: 2000,
                  type: "danger"
                }
              ); 
            }
        });
      }
    },
    showModal: async function(e) {
      getTrackingImportReview('import_from_aliexpress');
      $('#modalSelectTypeGetReview').modal('hide');
      this.is_add_review = 1;
      this.product_total_reviews = e.total_reviews;
      this.product_avg_reviews = e.avg_reviews;
      this.valid_aliexpress = "";
      this.total_review = 0;
      // this.$emit("show-modal");
      this.step = 2;
      this.aliexpress = "";
      this.title = e.title;
      this.product_id = e.id;
      if (e.image === null) this.image = appUrl + "/images/avatar.jpg";
      else this.image = e.image;
      var product_id = this.product_id;
      const { extensionId = "", aliReviewPassExtensionId = false } = window;
      if(!aliReviewPassExtensionId){
        if (!extensionId || (extensionId && extensionId != extensionIdDefine)) {
          // show pop up extension
          $("#modalInstallChromeExtension").modal("show");
          $(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
               $('#modalInstallChromeExtension').modal('hide');
            }
          });
          return;
        }
      }
      console.log('aliReviewPassExtensionId', aliReviewPassExtensionId);
      $.ajax({
        type: "get",
        url: appUrl + "/checkAddReview",
        dataType: "json",
        data: {
          product_id: this.product_id
        },
        beforeSend: function() {
          $(".add-reviews-btn-" + product_id).loading();

          // Icon loading
          $(".add-reviews-btn-" + product_id).addClass("wrap-loading");
          $(".add-reviews-btn-" + product_id).prepend(
            '<div class="lds-dual-ring"></div>'
          );
          // END: Icon loading
        },
        success: function(data, statusText, xhr) {
          $(".add-reviews-btn-" + product_id).loading_finish();

          // Icon loading
          $(".add-reviews-btn-" + product_id).removeClass("wrap-loading");
          $(".add-reviews-btn-" + product_id)
            .find(".lds-dual-ring")
            .remove();
          // END: Icon loading

          const {
            status = false,
            message = "",
            review_link = "",
            has_imported_review = false,
            maxImport = 0,
            linkUpdate = "",
          } = data;
          
          GenerateReview.is_add_review = message;
          GenerateReview.is_reviews = has_imported_review;
          GenerateReview.aliexpress = review_link;
          GenerateReview.maxImport = maxImport;
          GenerateReview.linkUpdate = linkUpdate;

          if (GenerateReview.is_add_review === "error_products") {      
            // $("#convertingUserToPro").modal();
            // manage_reviews_upgrade({ count_product: GenerateReview.maxImport, link_upgrade: GenerateReview.linkUpdate, options: {timeOut:false}});
            let html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
              '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
              '<div>' +
              'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImportFormat + ' products</b><br>' +
              '<span class="upgrade-space">Upgrade your plan for more space!</span>' +
              '</div>' +
              '</div>';
            if (data.plan == "premium" || data.plan == "plus") {
                html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
                '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
                '<div>' +
                'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImportFormat + ' products</b><br>' +
                '<span class="upgrade-space">Need more products? <a class="alrv-toggle-intercom" href="javascript:void(0)" style="text-decoration: none;color: #FF881B;">Contact us</a></span>' +
                '</div>' +
                '</div>';
                $(".button-limit-premium").css("display", "none");
                $(".display-none-premium").removeClass("display-none-premium");
            }
            $('.choose-plan__notify').html(html);
            $('.alrv-toggle-intercom') && $('.alrv-toggle-intercom').on('click', function () {
              var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
              if (intercom_on_messager == null) {
                Intercom('show');
              } else {
                Intercom('hide');
              }
            });
            $('#modalUpgradePlan').modal('show');
            $('#modalUpgradePlan .nav-tabs li:first a').tab('show');
            switch(data.plan) {
              case 'starter':
                $('#modalUpgradePlan .nav-tabs li:gt(1)').addClass('disabled-plan');
                break;
              case 'essential':
                $('#modalUpgradePlan .nav-tabs li:gt(0)').addClass('disabled-plan');
                break;
              default:
                break;
            }
            return false;
          }
          
          if (GenerateReview.is_add_review === "error_reviews_per_product") {
            let html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
              '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
              '<div>' +
              'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImportReviewPerProduct + ' reviews/product</b><br>' +
              '<span class="upgrade-space">Upgrade your plan for more space!</span>' +
              '</div>' +
              '</div>';
            if (data.plan == "premium" || data.plan == "plus") {
              html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
              '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
              '<div>' +
              'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImportReviewPerProduct + ' reviews/product</b><br>' +
              '<span class="upgrade-space">Need more products? <a class="alrv-toggle-intercom" href="javascript:void(0)" style="text-decoration: none;color: #FF881B;">Contact us</a></span>' +
              '</div>' +
              '</div>';
              $(".button-limit-premium").css("display", "none");
              $(".display-none-premium").removeClass("display-none-premium");
            }
            $('.choose-plan__notify').html(html);
            $('.alrv-toggle-intercom') && $('.alrv-toggle-intercom').on('click', function () {
              var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
              if (intercom_on_messager == null) {
                Intercom('show');
              } else {
                Intercom('hide');
              }
            });
            $('#modalUpgradePlan').modal('show');
            $('#modalUpgradePlan .nav-tabs li:first a').tab('show');
            switch(data.plan) {
              case 'starter':
                $('#modalUpgradePlan .nav-tabs li:gt(1)').addClass('disabled-plan');
                break;
              case 'essential':
                $('#modalUpgradePlan .nav-tabs li:gt(0)').addClass('disabled-plan');
                break;
              default:
                break;
            }
            return false;
          }

          if (GenerateReview.is_add_review == "error_browser") {
            $("#modalImportReview").modal({
              backdrop: "static",
              keyboard: false
            });
          } else {
            $("#modalImportReview").modal({
              backdrop: "static",
              keyboard: false
            });
          }
        },
        error: function() {
          GenerateReview.is_add_review = "error";
          $("#modalImportReview").modal({
            backdrop: "static",
            keyboard: false
          });
        }
      });
    },
    showModalCSV: async function(e, type) {
      let self = this;
      if((self.csv_setting.shop_plan != 'free' && self.csv_setting.shop_plan != 'starter')){
        getTrackingImportReview('import_from_file');
        $('#modalSelectTypeGetReview').modal('hide');
        var product_id = self.product_id;
        //Check limit review
        $.ajax({
          type: "get",
          url: appUrl + "/check-limit-csv-review",
          dataType: "json",
          data: {
            product_id: self.product_id
          },
          beforeSend: function() {
            $(".add-reviews-btn-" + product_id).loading();

            // Icon loading
            $(".add-reviews-btn-" + product_id).addClass("wrap-loading");
            $(".add-reviews-btn-" + product_id).prepend(
              '<div class="lds-dual-ring"></div>'
            );
            // END: Icon loading
          },
          success: function(data, statusText, xhr) {
            $(".add-reviews-btn-" + product_id).loading_finish();

            // Icon loading
            $(".add-reviews-btn-" + product_id).removeClass("wrap-loading");
            $(".add-reviews-btn-" + product_id)
              .find(".lds-dual-ring")
              .remove();
            // END: Icon loading
            
            GenerateReview.is_add_review = data.limitImportMessage;
            GenerateReview.maxImport = data.maxImport;

            if (GenerateReview.is_add_review === "error_products") {      
              let html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
                '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
                '<div>' +
                'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImport + ' products</b><br>' +
                '<span class="upgrade-space">Upgrade your plan for more space!</span>' +
                '</div>' +
                '</div>';
              if (data.plan == "premium" || data.plan == "plus") {
                  html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
                  '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
                  '<div>' +
                  'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImport + ' products</b><br>' +
                  '<span class="upgrade-space">Need more products? <a class="alrv-toggle-intercom" href="javascript:void(0)" style="text-decoration: none;color: #FF881B;">Contact us</a></span>' +
                  '</div>' +
                  '</div>';
                  $(".button-limit-premium").css("display", "none");
                  $(".display-none-premium").removeClass("display-none-premium");
              }
              $('.choose-plan__notify').html(html);
              $('.alrv-toggle-intercom') && $('.alrv-toggle-intercom').on('click', function () {
                var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
                if (intercom_on_messager == null) {
                  Intercom('show');
                } else {
                  Intercom('hide');
                }
              });
              $('#modalUpgradePlan').modal('show');
              $('#modalUpgradePlan .nav-tabs li:first a').tab('show');
              switch(data.plan) {
                case 'starter':
                  $('#modalUpgradePlan .nav-tabs li:gt(1)').addClass('disabled-plan');
                  break;
                case 'essential':
                  $('#modalUpgradePlan .nav-tabs li:gt(0)').addClass('disabled-plan');
                  break;
                default:
                  break;
              }
              return false;
            }
            
            if (GenerateReview.is_add_review === "error_reviews_per_product") {
              let html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
                '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
                '<div>' +
                'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImportReviews + ' reviews/product</b><br>' +
                '<span class="upgrade-space">Upgrade your plan for more space!</span>' +
                '</div>' +
                '</div>';
              if (data.plan == "premium" || data.plan == "plus") {
                html = '<div style="margin-bottom: 60px;text-align: left;display: flex;">' +
                '<div style="padding-right: 15px"><img src="' + cdnUrl + '/images/choose-plan/exclamation-triangle.png"></div>' +
                '<div>' +
                'Your <b style="text-transform: uppercase;">' + data.plan + '</b> plan has reached the limit <b>' + data.maxImportReviews + ' reviews/product</b><br>' +
                '<span class="upgrade-space">Need more products? <a class="alrv-toggle-intercom" href="javascript:void(0)" style="text-decoration: none;color: #FF881B;">Contact us</a></span>' +
                '</div>' +
                '</div>';
                $(".button-limit-premium").css("display", "none");
                $(".display-none-premium").removeClass("display-none-premium");
              }
              $('.choose-plan__notify').html(html);
              $('.alrv-toggle-intercom') && $('.alrv-toggle-intercom').on('click', function () {
                var intercom_on_messager = document.querySelector('.intercom-messenger-frame');
                if (intercom_on_messager == null) {
                  Intercom('show');
                } else {
                  Intercom('hide');
                }
              });
              $('#modalUpgradePlan').modal('show');
              $('#modalUpgradePlan .nav-tabs li:first a').tab('show');
              switch(data.plan) {
                case 'starter':
                  $('#modalUpgradePlan .nav-tabs li:gt(1)').addClass('disabled-plan');
                  break;
                case 'essential':
                  $('#modalUpgradePlan .nav-tabs li:gt(0)').addClass('disabled-plan');
                  break;
                default:
                  break;
              }
              return false;
            }

            //END:Check limit review
            console.log('csv_type', type);
            GenerateReview.step = 'csv_step_upload_file';
            GenerateReview.csv_type_import = type;
            GenerateReview.valid_error_upload_file = '';
            
            $('#csv_import_reviews_file').val('');
            $('#delete-file-btn').hide();
            $('#file_upload_name span').text('No file selected').removeClass('has-file-name');
            $(".modal-body__cta .btn-import-review-step1").attr('disabled', true);
            
            $("#modalImportReviewCSV").modal({
              backdrop: "static",
              keyboard: false
            });
            
          },
          error: function(err) {
            GenerateReview.is_add_review = "error";
          }
        });
      }
    },
    showModalSelectTypeGetReview: function(e) {
      $("#modalSelectTypeGetReview").modal({
        backdrop: "static",
        keyboard: false
      });
      this.single_product_data = e;
      this.product_id = e.id;
    },
    showPopupUpgradePlan : function(e) {
      let self = this;
      $('#modalSelectTypeGetReview').modal('hide');
      setTimeout(function(){
        $('#modalUpgradePlan').modal('show');
        switch(self.csv_setting.shop_plan) {
          case 'starter':
            $('#modalUpgradePlan .nav-tabs li:eq(1) a').tab('show');
            break;
          case 'essential':
            $('#modalUpgradePlan .nav-tabs li:eq(0) a').tab('show');
            break;
          default:
            break;
        }
      }, 500);
    },
    showStep: function(step) {
      this.step = step;
    },
    settingsGetReview: function(settings) {
      this.settings = settings;
    },
    urlAliexpress: function(aliexpress) {
      this.aliexpress = aliexpress;
    },
    convertUrlAliexpressDefaultTranslate: function(aliexpress, country_code = 'www') {
      const pattHTTP_HTTPS = /^(https?:\/\/)/gi; 
      let http;

      if(aliexpress.match(pattHTTP_HTTPS)) {
        http = aliexpress.split("://")[0];
        aliexpress = aliexpress.split("://")[1];
      } 

      const countryCode = country_code === "en" ? "www" : country_code;
      let tempDomain = aliexpress.split('.aliexpress.com/')[1];
      if(!tempDomain || typeof  tempDomain == 'undefined'){
        tempDomain = aliexpress.split('aliexpress.ru/')[1];
      }

      const newDomain = `${http}://${ countryCode }${ countryCode ? '.' : '' }aliexpress.com/${tempDomain}`;
      
      console.log('[convertUrlAliexpressDefaultTranslate]', newDomain);
      // document.cookie = 'aep_usuc_f=; path=/; domain=.aliexpress.com; expires=Expires=Thu, 01 Jan 1970 00:00:01 GMT';
      
      return newDomain;
    },
    handleGetReviewExtension: function(reviewObj) {
      this.review_url = appUrl + "/manage-reviews/" + this.product_id;
      this.settings.get_only_star = starSetting;
      if (reviewObj.argsReviews.length <= 0) {
        Intercom('trackEvent', 'ar-import-failure');
        GenerateReview.step = "4_no_review";
        return false;
      }
      
      var dataBody = {
        type: this.type,
        shop_id: this.shop_id,
        product_id: this.product_id,
        reviewObj: JSON.stringify(reviewObj.argsReviews),
        get_max_number_review: this.settings.get_max_number_review,
        review_link: this.aliexpress,
        settings: this.settings
      };
      //Post review save to data
      $.ajax({
        type: "POST",
        url: appUrl + "/saveReviewAliexpress",
        data: dataBody,
        beforeSend: function() {
          GenerateReview.step = "3_save";
        },
        success: function(response) {
          if (response.status) {
            GenerateReview.reload = false;
            if ($("#page-list-product-get-review.product-review-wrap").length) {
              GenerateReview.reload = true;
            }
            GenerateReview.total_review = response.totalReviews;
            let product_total_reviews = parseInt(
              $(
                "#product-item-" +
                  GenerateReview.product_id +
                  " .product-item-total-review"
              ).text()
            );
            if (GenerateReview.type === "add_in") {
              product_total_reviews =
                product_total_reviews + parseInt(response.totalReviews);
            } else {
              product_total_reviews = parseInt(response.totalReviews);
            }
            $(
              "#product-item-" +
                GenerateReview.product_id +
                " .product-item-total-review"
            ).text(product_total_reviews);
            $(
              "#product-item-" + GenerateReview.product_id + " .alr-rating"
            ).attr("value", response.avgReviews);

            $(".alr-rating-" + GenerateReview.product_id).rating(
              "rate",
              response.avgReviews
            );

            $(
                "#product-item-" +
                GenerateReview.product_id +
                " .ctn-selectActionAllReviews"
            ).show();

            GenerateReview.step = "4_success";
            GenerateReview.reload = true;
            GenerateReview.count_total_get_reviews++;
          } else {
              Intercom('trackEvent', 'import-failed');
              GenerateReview.step = "4_no_review";
          }
        },
        error: function(error) {
          $.notify(
            {
              message: "Server Error, please contact support@fireapps.io"
            },
            {
              z_index: 999999,
              timer: 2000,
              type: "danger"
            }
          );
          $("#addReviewsModal").modal("hide");
        }
      });
    },
    getStarRating: function(rating) {
      rating = rating <= 5 || rating >= 0 ? rating : 0;
      rating = Math.floor(rating * 2) / 2;

      let str = '<div class="rate-it">';
      let strRating = '<i class="demo-icon icon-star-2 rated"></i>';
      let strRatingHalf = '<i class="demo-icon icon-star-half-alt rated"></i>';
      let strRatingEmpty = '<i class="demo-icon icon-star-empty-1 rated"></i>';

      for (let i = 0; i < 5; i++) {
        if (rating === i + 0.5) {
          str += strRatingHalf;
        } else if (rating > i) {
          str += strRating;
        } else str += strRatingEmpty;
      }

      str += "</div>";

      return str;
    }
  }
});

$(function(){
    // bind change event to select
    $('select[name=is_review]').on('change', function () {
        var urlRoot = appUrl+'/manage-reviews';
        var condition  =  $(this).val() === 'is_review' ||  $(this).val() ==='no_review' || $(this).val() === 'publish' || $(this).val() === 'un_publish';
        var url_string = window.location.href;
        var url = new URL(url_string);
        var is_review = url.searchParams.get("is_review");
        var is_counter = url.searchParams.get("is_counter");
        if (!condition  && !is_counter) {
            return   window.location = urlRoot;
        }else if(!is_counter){
            return window.location =  urlRoot+'?is_review='+$(this).val();
        }
        window.location =  urlRoot+'?is_counter='+is_counter+'&is_review='+$(this).val();
      
    });
});


$(function(){
    // bind change event to select
    $('select[name=is_counter]').on('change', function () {
        var urlRoot = appUrl+'/manage-reviews';
        var condition  =  $(this).val() === '1' ||  $(this).val() ==='0';
        var url_string = window.location.href;
        var url = new URL(url_string);
        var is_review = url.searchParams.get("is_review");
        var is_counter = url.searchParams.get("is_counter");
        if (!condition  && !is_review) {
          return   window.location = urlRoot; 
        } else if(!is_review){
            return window.location =  urlRoot+'?is_counter='+$(this).val();
        }
        window.location =  urlRoot+'?is_review='+is_review+'&is_counter='+$(this).val();
    });
});
