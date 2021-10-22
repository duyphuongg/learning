export const replacePositionFlagCountry = function(type) {
    $('.ali-flag-slc').each(function(){
        $(this).css({'background-position-y': ''});
        let a = $(this).css('backgroundPositionY');
        let b = Number(a.replace(/[^0-9-]/g, ''));
        if(type == 'rectangle'){
            $(this).css({'background-position-y': `${b - 6}px`});
        }else if(type == 'circle'){
            $(this).css({'background-position-y': `${b - 4}px`});
        }
    })
};
