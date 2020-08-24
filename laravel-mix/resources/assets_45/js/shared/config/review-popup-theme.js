export const theme_settings_default = {
    buyer_name: {
        type: [
            'reviewer_name', 
            'alternative'
        ]
    },
    popup_avatar: {
        type: [
            {id: 'review_photo', text: 'Use review photo (first photo)'},
            {id: 'product_thumbnail', text: 'Use product featured image'},
            {id: 'icon', text: 'Use abstract image'},
        ]
    },
    desktop: {
        position: [
            {id: 'bottom/left', text: 'Bottom (left)'},
            {id: 'bottom/right', text: 'Bottom (right)'},
            {id: 'top/left', text: 'Top (left)'},
            {id: 'top/right', text: 'Top (right)'}
        ]
    },
    mobile: {
        position: [
            {id: 'top', text: 'Top'},
            {id: 'bottom', text: 'Bottom'},
        ]
    },
    background_style: {
        type: [
            'solid_background', 
            'pattern_background'
        ],
        shape: [
            {id: 1, label: 'Rectangle', value: 'rectangle', icon: 'icon-rectangle'},
            {id: 2, label: 'Round corner', value: 'round-corner', icon: 'icon-round-corner'},
        ]
    },
    text_style: {
        font: [
            { id: 'store_font', text: 'Store font' },
            { id: 'alireviews_font', text: 'Ali Reviews font' },
        ]
    },
    rating_color: {
        type: [
            'theme_setting_color', 
            'another_color'
        ]
    },
    template:[
        { 
            id: 0,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-1.png',
            },
            text_style:{
                label_color: '#FFFFFF',
                main_color: '#FFFFFF',
                value_color: '#FAFF03',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#FFD703',
            },
        },
        { 
            id: 1,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-2.png',
            },
            text_style:{
                label_color: '#FFFFFF',
                main_color: '#FFFFFF',
                value_color: '#FF6291',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#FFB303',
            },
        },
        { 
            id: 2,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-3.png',
            },
            text_style:{
                label_color: '#FFFFFF',
                main_color: '#FFFFFF',
                value_color: '#A8FF93',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#FFE769',
            },
        },
        { 
            id: 3,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-4.png',
            },
            text_style:{
                label_color: '#160026',
                main_color: '#160026',
                value_color: '#023AFF',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#F48454',
            },
        },
        { 
            id: 4,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-5.png',
            },
            text_style:{
                label_color: '#39332E',
                main_color: '#39332E',
                value_color: '#6100A8',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#6100A8',
            },
        },
        { 
            id: 5,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-6.png',
            },
            text_style:{
                label_color: '#565656',
                main_color: '#565656',
                value_color: '#000000',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#FFB303',
            },
        },
        { 
            id: 6,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-7.png',
            },
            text_style:{
                label_color: '#3A3A3A',
                main_color: '#3A3A3A',
                value_color: '#00747D',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#FF5180',
            },
        },
        { 
            id: 7,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-8.png',
            },
            text_style:{
                label_color: '#39332E',
                main_color: '#39332E',
                value_color: '#237BFF',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#237BFF',
            },
        },
        { 
            id: 8,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-9.png',
            },
            text_style:{
                label_color: '#FFFFFF',
                main_color: '#FFFFFF',
                value_color: '#FFFFFF',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#FEF400',
            },
        },
        { 
            id: 9,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-10.png',
            },
            text_style:{
                label_color: '#FFFFFF',
                main_color: '#FFFFFF',
                value_color: '#FFFFFF',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#FEF400',
            },
        },
        { 
            id: 10,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-11.png',
            },
            text_style:{
                label_color: '#FFFFFF',
                main_color: '#FFFFFF',
                value_color: '#FFBD37',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#B3E534',
            },
        },
        { 
            id: 11,
            background_style: {
                type: 'pattern_background',
                pattern_background: 'images/review-popup-page/pattern-bg-12.png',
            },
            text_style:{
                label_color: '#FFFFFF',
                main_color: '#FFFFFF',
                value_color: '#12CDCD',
            },
            rating_color: {
                type: 'another_color',
                another_color: '#EBEF21',
            },
        },
    ],
    pattern: [
        {id: 0, img_src: 'images/review-popup-page/pattern-bg-1.png'},
        {id: 1, img_src: 'images/review-popup-page/pattern-bg-2.png'},
        {id: 2, img_src: 'images/review-popup-page/pattern-bg-3.png'},
        {id: 3, img_src: 'images/review-popup-page/pattern-bg-4.png'},
        {id: 4, img_src: 'images/review-popup-page/pattern-bg-5.png'},
        {id: 5, img_src: 'images/review-popup-page/pattern-bg-6.png'},
        {id: 6, img_src: 'images/review-popup-page/pattern-bg-7.png'},
        {id: 7, img_src: 'images/review-popup-page/pattern-bg-8.png'},
        {id: 8, img_src: 'images/review-popup-page/pattern-bg-9.png'},
        {id: 9, img_src: 'images/review-popup-page/pattern-bg-10.png'},
        {id: 10, img_src: 'images/review-popup-page/pattern-bg-11.png'},
        {id: 11, img_src: 'images/review-popup-page/pattern-bg-12.png'},
    ]
}