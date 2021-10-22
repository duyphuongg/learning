
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
                            "" +
                            "</div>" +
                            "<div class='lc-arrow-right'>" +
                            "" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                    "<div class='lc-info'>" +
                        "<div class='lc-top'>" +
                            "<div>" +
                                "<div class='lc-avatar'>" +
                                    "<img class='alireview-avatar' src='' />" +
                                "</div>" +
                                "<div class='lc-right'>" +
                                    "<div class='lc-username'>" +
                                    "" +
                                    "</div>" +
                                    "<div class='lc-national-info'>" +
                                    "" +
                                    "</div>" +
                                    "<div class='lc-stars alireview-status'>" +
                                    "" +
                                    "</div>" +
                                "</div>" +
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
        let author = targetClosest.find('.alireview-author').html();
        let srcAvatar = targetClosest.find('.alireview-avatar').attr('src');
        let nationalInfo = targetClosest.find('.alireview-national-info').html();
        let status = targetClosest.find('.alireview-status .wrapper-rating').html();
        let desc = targetClosest.find('.alireview-post').html();
        let likeWrap = targetClosest.find('.alireview-like-wrap').html();
        if(srcAvatar){
            $('.lightbox-modal .lc-avatar img').attr('src', srcAvatar);
        }else{
            $('.lightbox-modal .lc-avatar').css({'margin-right': '0', 'width': '0', 'min-width': '0'});
        }

        $('.lightbox-modal .lc-username').html(author);
        $('.lightbox-modal .lc-national-info').html(nationalInfo);
        $('.lightbox-modal .lc-stars').html(status);
        $('.lightbox-modal .lc-desc').html(desc);
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
            $('.lc-list-image img').removeClass('visible-img');
            $('.lc-list-image img:nth-child('+ count +')').addClass('visible-img');
        });
        $('.lc-arrow-right').on('click', function(){
            if(count >= length){
                count = 1;
            }else{
                count += 1;
            }
            $('.lc-list-image img').removeClass('visible-img');
            $('.lc-list-image img:nth-child('+ count +')').addClass('visible-img');
        });
    }

    CM.addGalleryImage = function(event){
        let key = $(event.target).attr('data-lightbox-key') ? (parseInt($(event.target).attr('data-lightbox-key')) + 1) : 1;
        let targetParent = $(event.target).parent();
        let listImage = targetParent.html();
        $('.lc-list-image').html(listImage);
        $('.lc-list-image').find('.lightbox-thmb').removeAttr("style");

        let countListImage = $('.lc-list-image').find('.lightbox-thmb')
        if(countListImage.length > 0){
            countListImage.each(function() {
                var src = '';
                let data_src = $(this).attr('data-src');
                if(data_src !== undefined){
                    src = data_src;
                    $(this).removeAttr("data-src");
                }else{
                    src = $(this).attr('src')
                }
                let customSrc = src.replace('/_thumb', '')
                $(this).attr('src', customSrc)
            });
        }
        $('.lc-list-image img:nth-child('+ key +')').addClass('visible-img');
        clickArrow(event);
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
            if (!$(event.target).closest(".lightbox-content,img.lightbox-thmb").length) {
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