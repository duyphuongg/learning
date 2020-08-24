
function PopupComment() {

    var CM = this;

    CM.createPopup = function(){
        let htmlPopup = "<div id='lightbox-modal' class='lightbox-modal'>" +
            "<div class='lightbox-dialog'>" +
                "<div class='lightbox-content'>" +
                    "<div class='lc-gallery-image'>" +
                        "<div class='lc-list-image'>" +
                            '' +
                        "</div>" +
                        "<div class='lc-arrow'>" +
                            "<div class='lc-arrow-left'>" +
                                "<i class='far alireview-fa-chevron-left'></i>" +
                            "</div>" +
                            "<div class='lc-arrow-right'>" +
                                "<i class='far alireview-fa-chevron-right'></i>" +
                            "</div>" +
                        "</div>" +
                        "<div class='lc-list-thumbnail'>" +
                        '' +
                        "</div>" +
                    "</div>" +
                    "<div class='lc-info'>" +
                        "<div class='lc-top'>" +
                            "<div class='lc-stars alireview-status'>" +
                            "" +
                            "</div>" +
                            "<div class='lc-author-content'>" +
                            "" +
                            "</div>" +
                        "</div>"+
                        "<div class='lc-desc'>" +
                        "" +
                        "</div>" +
                        "<div class='lc-like-wrap'>" +
                            "" +
                        "</div>" +
                    "</div>" +
                    "<div class='lc-close'>" +
                        "<span id='lightbox-close-modal' class='lightbox-close-modal'></span>" +
                    "</div>" +
                "</div>" +
            "</div>"
        "</div>";
        $("body").append(htmlPopup);
    }

    function htmlInfo(event){
        let targetClosest = $(event.target).closest('.alireview-row');
        let author = targetClosest.find('.alireview-author-content').html();
        let srcAvatar = targetClosest.find('.alireview-avatar').attr('src');
        let nationalInfo = targetClosest.find('.alireview-national-info').html();
        let status = targetClosest.find('.alireview-status .wrapper-rating').html();
        let desc_text = targetClosest.find('.alireview-post .alireview-post-hidden').val();
        // let desc = targetClosest.find('.alireview-post').html();
        let likeWrap = targetClosest.find('.alireview-like-wrap').html();
        // if(srcAvatar){
        //     $('.lightbox-modal .lc-avatar img').attr('src', srcAvatar);
        // }else{
        //     $('.lightbox-modal .lc-avatar').css({'margin-right': '0', 'width': '0', 'min-width': '0'});
        // }

        $('.lightbox-modal .lc-author-content').html(author);

        $('.lightbox-modal .lc-stars').html(status);
        $('.lightbox-modal .lc-desc').html(desc_text);
        $('.lightbox-modal .lc-like-wrap').html(likeWrap);
    }


    function clickArrow(event){
        let count = $(event.target).attr('data-lightbox-key') ? (parseInt($(event.target).attr('data-lightbox-key')) + 1) : 1;
        let length = $('.lc-list-image img').length;
        if(length <= 1){
            $('.lc-arrow').css('display', 'none');
        }else{
            $('.lc-arrow').css('display', 'block');
        }

        $('.lc-arrow-left').on('click', function(){
            if(count <= 1){
                count = length;
            }else{
                count -= 1;
            }
            handleActiveImage(count);
        });
        $('.lc-arrow-right').on('click', function(){
            if(count >= length){
                count = 1;
            }else{
                count += 1;
            }
            handleActiveImage(count);
        });

        $('.lc-list-thumbnail img').on('click', function(event){
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

    function handleSrcImage($this){
        var src = '';
        let data_src = $this.attr('data-src');
        if(data_src !== undefined){
            src = data_src;
            $this.removeAttr("data-src");
        }else{
            src = $this.attr('src')
        }
        let customSrc = src.replace('/_thumb', '')
        $this.attr('src', customSrc)
    }

    CM.addGalleryImage = function(event){
        let key = $(event.target).attr('data-lightbox-key') ? (parseInt($(event.target).attr('data-lightbox-key')) + 1) : 1;
        let targetParent = $(event.target).parent();
        let targetClosest = $(event.target).closest('.alireview-row');
        let listImage = targetClosest.find('.alireview-product-img').html();
        if(listImage != undefined) {
            $('.lc-list-image').html(listImage);
            $('.lc-list-thumbnail').html(listImage);
            $('.lc-list-image .lightbox-thmb').removeAttr("style");
            $('.lc-list-thumbnail img').removeAttr("style");

            let countListImage = $('.lc-list-image').find('.lightbox-thmb');
            let countListThumbnail = $('.lc-list-thumbnail').find('.lightbox-thmb');
            if(countListImage.length > 0){
                let key_lightbox = 0;
                countListImage.each(function() {
                    handleSrcImage($(this));
                });
                countListThumbnail.each(function() {
                    handleSrcImage($(this));
                    if(!($(this).attr('data-lightbox-key'))){
                        $(this).attr('data-lightbox-key', key_lightbox);
                        key_lightbox += 1;
                    }
                });
            }
            $('.lc-list-image img:nth-child('+ key +')').addClass('visible-img');
            $('.lc-list-thumbnail img:nth-child('+ key +')').addClass('lc-img-active');
            clickArrow(event);
            $('.lc-gallery-image').show();
            $('#lightbox-modal').removeClass('no-product-img');
        }else{
            $('.lc-gallery-image').hide();
            $('#lightbox-modal').addClass('no-product-img');
        }
        htmlInfo(event);
        close();
    }

    function close(){
        $("#lightbox-close-modal").click(function(){
            turnOffEvent();
        });
    }

    CM.hiddenPopup = function(){
        $(document).click(function(event) {
            //if you click on anything except the modal itself or the "open modal" link, close the modal
            if (!$(event.target).closest(".lightbox-content,img.lightbox-thmb, .count-img, .ali-show-full-review").length) {
                turnOffEvent();
            }
        });
    }

    function turnOffEvent(){
        $("body").find(".lightbox-modal").removeClass("visible-modal");
        $('body').removeClass('modal-open');
        $('.lc-arrow-left').off('click');
        $('.lc-arrow-right').off('click');
    }
}

const popupComment = new PopupComment();
export default popupComment;