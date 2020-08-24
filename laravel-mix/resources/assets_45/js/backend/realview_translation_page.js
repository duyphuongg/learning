// only localTranslate.blade
const elHeaderTitle = document.getElementById('realHeaderTitle');
const elHeaderDescript = document.getElementById('realHeaderDescript'); 
const elHeaderButtonWrite = document.getElementById('realHeaderButtonWrite'); 
const elName  = document.getElementById('realName'); 
const elNameNotice = document.getElementById('realNameNotice'); 
const elEmail = document.getElementById('realEmail'); 
const elEmailNotice = document.getElementById('realEmailNotice'); 
const elRating = document.getElementById('realRating'); 
const elRatingPlaceholder = document.getElementById('realRatingPlaceholder'); 
const elRatingPlaceholderNotice = document.getElementById('realRatingPlaceholderNotice'); 
const elFooterAddImg = document.getElementById('realFooterAddImg'); 
const elFooterSend = document.getElementById('realFooterSend'); 
const elButtonThank = document.getElementById('realButtonThank'); 
const elImageNotice = document.getElementById('realImagePlaceholderNotice');
const elEmailRequiredNotice = document.getElementById('realEmailRequiredNotice');
const elThankTitle = document.getElementById('realThankTitle');
const elFeedback = document.getElementById('realFeedback');
const elButtonCancel = document.getElementById('realFooterCancel');

// input name
const inpHeaderTitle = document.querySelector('input[name="translate[title]"]');
const inpHeaderDescript = document.querySelector('input[name="translate[text_total_multi]"]');
const inpHeaderButtonWrite = document.querySelector('input[name="translate[button_add]"]');
const inpName = document.querySelector('input[name="translate[label_name]"]');
const inpNameNotice = document.querySelector('input[name="translate[error_required]"]');
const inpEmail = document.querySelector('input[name="translate[label_email]"]');
const inpEmailNotice = document.querySelector('input[name="translate[error_email]"]');
const inpRating = document.querySelector('input[name="translate[label_your_rating]"]');
const inpRatingPlaceholder = document.querySelector('input[name="translate[text_write_comment]"]');
const inpRatingPlaceholderNotice = document.querySelector('input[name="translate[error_rating_required]"]');
const inpFooterAddImg = document.querySelector('input[name="translate[label_image]"]');
const inpFooterSend = document.querySelector('input[name="translate[button_submit]"]');
const inpButtonThank = document.querySelector('input[name="translate[message_thanks_has_approve]"]');
const inpImageNotice = document.querySelector('input[name="translate[error_image_required]"]');
const inpEmailRequiredNotice = document.querySelector('input[name="translate[error_image_required]"]');
const inpThankTitle = document.querySelector('input[name="translate[text_header_thank_title]"]');
const inpFeedback = document.querySelector('input[name="translate[text_feedback_edit_label]"]');
const inpButtonCancel = document.querySelector('input[name="translate[button_cancel]"]');

inpHeaderTitle && inpHeaderTitle.addEventListener('keyup', (e) => elHeaderTitle && (elHeaderTitle.innerText = e.target.value));
inpHeaderDescript && inpHeaderDescript.addEventListener('keyup', (e) => elHeaderDescript && (elHeaderDescript.innerText = e.target.value));
inpHeaderButtonWrite && inpHeaderButtonWrite.addEventListener('keyup', (e) => elHeaderButtonWrite && (elHeaderButtonWrite.innerText = e.target.value));
inpName && inpName.addEventListener('keyup', (e) => elName && (elName.innerText = e.target.value));
inpNameNotice && inpNameNotice.addEventListener('keyup', (e) => elNameNotice && (elNameNotice.innerText = e.target.value));
inpEmail && inpEmail.addEventListener('keyup', (e) => elEmail && (elEmail.innerText = e.target.value));
inpEmailNotice && inpEmailNotice.addEventListener('keyup', (e) => elEmailNotice && (elEmailNotice.innerText = e.target.value));
inpRating && inpRating.addEventListener('keyup', (e) => elRating && (elRating.innerText = e.target.value));
inpRatingPlaceholder && inpRatingPlaceholder.addEventListener('keyup', (e) => elRatingPlaceholder && (elRatingPlaceholder.setAttribute('placeholder', e.target.value)));
inpRatingPlaceholderNotice && inpRatingPlaceholderNotice.addEventListener('keyup', (e) => elRatingPlaceholderNotice && (elRatingPlaceholderNotice.innerText = e.target.value));
inpFooterAddImg && inpFooterAddImg.addEventListener('keyup', (e) => elFooterAddImg && (elFooterAddImg.innerText = e.target.value));
inpFooterSend && inpFooterSend.addEventListener('keyup', (e) => elFooterSend && (elFooterSend.innerText = e.target.value));
inpButtonThank && inpButtonThank.addEventListener('keyup', (e) => elButtonThank && (elButtonThank.innerText = e.target.value));
inpImageNotice && inpImageNotice.addEventListener('keyup', (e) => elImageNotice && (elImageNotice.innerText = e.target.value));
inpEmailRequiredNotice && inpEmailRequiredNotice.addEventListener('keyup', (e) => elEmailRequiredNotice && (elEmailRequiredNotice.innerText = e.target.value));
inpThankTitle && inpThankTitle.addEventListener('keyup', (e) => elThankTitle && (elThankTitle.innerText = e.target.value));
inpFeedback && inpFeedback.addEventListener('keyup', (e) => elFeedback && (elFeedback.innerText = e.target.value));
inpButtonCancel && inpButtonCancel.addEventListener('keyup', (e) => elButtonCancel && (elButtonCancel.innerText = e.target.value));

//show box save
$("input, textarea, select").on('keyup change', function () {
    $(".rp__box-save, .box-save__button").show();
    $('#isSettingChange').val('true');
});

//hide box save
$(".button--cancel").click(function () {
    $(".rp__box-save, .box-save__button").hide();
    $('#isSettingChange').val('false');
});

$("#form_localTranslate button[type='submit']").click(function () {
    $(".rp__box-save .box-save__notify--default, .box-save__button").hide();
    $(".rp__box-save .box-save__notify--saving").show();
    $('.translate-page').addClass('disabled_setting');
});

// Reponsive use jQuery
$('#preview-real').on('shown.bs.modal', function () {
    const _wrapper = $('.wrapper-preview-real').parent().html();
    $('#showCurrentPreviewReal').html(_wrapper);
})

//Confirm leave page Translate
let selector_menu = $(".main-sidebar .sidebar-menu");
var href_leave_page = '';
const TRANSLATE_URL_LEAVE_PAGE = 'translate_url_leave_page';

function handleLeavePage() {
  let url = localStorage.getItem(TRANSLATE_URL_LEAVE_PAGE);
  if (url != null) {
    localStorage.removeItem(TRANSLATE_URL_LEAVE_PAGE);
    window.location.href = url;
  }
}
handleLeavePage();

selector_menu.on('click', function (e) {
  var isSettingChange = $('#isSettingChange').val();
  if(e.target && e.target.nodeName === "A" && e.target.host && isSettingChange === 'true' && $('.translate-page').length > 0) {
    e.preventDefault();
    href_leave_page = e.target.href;
    $("#modalConfirmLeavePage").modal("show");
    $('#modalConfirmLeavePage .button--primary').click(function(){
      $("#form_localTranslate [type='submit']").click();
      localStorage.setItem(TRANSLATE_URL_LEAVE_PAGE, href_leave_page);
    });

    $('#modalConfirmLeavePage .button--default').click(function(){
      window.location.href = href_leave_page;
      $("#modalConfirmLeavePage").modal("hide");
    });
  }
});


