import toastr from '../../libs/toastr/toastr.js';
import '../../libs/toastr/toastr.css';

export const toastrOptions = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": 0,
    "extendedTimeOut": 0,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    onShown: function(){
        $('[data-notify="container"]').remove();
    }
}

toastr.options = toastrOptions;

/**
 * @param {number} count_product 
 * @param {string} link_upgrade 
 */
export function manage_reviews_upgrade(obj) {

    // not overide toast other
    $('#toast-container').remove();

    const { count_product = 0, link_upgrade = "pricing", options = {} } = obj

    const title = `
        <p class="alrv-mb-0 lh18">You’ve reached the limit of ${count_product} products</p>
        <hr class="alrv-mt-15 alrv-mb-15">
        <a href="${link_upgrade}" target="_blank" class="text-warning fw600 upgrade-to-hight-plan">UPGRADE TO HIGHER PLAN!</a>
    `;

    Object.assign(toastr.options, options, {
        addClass: "toastr-manage-reviews-upgrade",
        closeButton: true,
    });

    toastr["warning"](title)
}

export default function _toastr(obj) {
    const { type = "success", title = "", message = "", options = {} } = obj;
    Object.assign(toastr.options, options);
    toastr[type](title, message)
}