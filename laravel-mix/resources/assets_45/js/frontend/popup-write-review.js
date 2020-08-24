function PopupWriteReview(){
    if ($("#writeReviewModal").length > 0) {
        $("body").append($('.reviewFormHead #writeReviewModal'));

        //Show popup
        $(document).on('click', '.btn-add-alireview.popup', function (event) {
            $('body').addClass('write-review-open');
            $('body #writeReviewModal').addClass('visible-modal');

            if ($(".reviewFormHead #writeReviewModal").length > 0) {
                $(".reviewFormHead #writeReviewModal").remove();
            }
    
            //Check popup full screen
            checkPopupFullScreen()
            $(window).resize(function(){
                checkPopupFullScreen()
            });
    
        });
    
        //Hide popup
        $(document).on('click', '#writeReviewModal .button-close', function (event) {
            $('body').removeClass('write-review-open');
            $('body #writeReviewModal').removeClass('visible-modal');
        }); 
    }
}
  
function checkPopupFullScreen(){
    if ($( window ).width() <= 991) {
        var heightBrower = $( window ).height();
        var heightForm = $('.write-review-body').height();
        var heighBtnWrap = $('.btn-alireview-wrap').height();
        
        if((heightBrower - heightForm) <= heighBtnWrap){
            $('#writeReviewModal').addClass('full');
        }else{
            $('#writeReviewModal').removeClass('full');
        }
    }
}

export { PopupWriteReview }