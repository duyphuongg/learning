import { theme_settings_default } from './../config/theme-setting';

export const displayRatingCard = function(styleRating) {
    const classBackgroundDefault = 'rating-symbol-background';
    const classForegroundDefault = '';
    let class_name = theme_settings_default.rating_star.find((item) => item.value == styleRating);
    $('.rating-symbol-background').attr('class', classBackgroundDefault + " " + class_name.icon);
    $('.rating-symbol-foreground > span').attr('class', classForegroundDefault + " " + class_name.icon);
    $('.alr-star i').attr('class', classForegroundDefault + " " + class_name.icon);
}

export const getClassReaction = function(type) {
    let result = theme_settings_default.class_name_reaction.find((item) => item.value == type);
    return {like: result.like, unlike: result.unlike};
}

export const changeColorRatingCard = function(color) {
    $('.rating-symbol-foreground > span').css('color', color);
    $('.alr-summary .alr-count-reviews .alr-progress-bar > div').css('backgroundColor', color);
    $('.alr-star i').css('color', color);
}

export const getClassRating = function (type) {
    let class_name = theme_settings_default.rating_star.find((item) => item.value == type);
    return class_name.icon;
}