let moment_current = moment();

export const CIRCLE = 'circle';
export const STYLE_GRID = 5;
export const STYLE_LIST = 2;
export const STYLE_CAROUSEL = 8;

export const theme_settings_default = {
    rating_star: [
        {id: 1, label: '', value: 1, icon: 'alr-icon-star'},
        {id: 2, label: '', value: 2, icon: 'alr-icon-favorite'},
        {id: 3, label: '', value: 3, icon: 'alr-icon-dollar'},
        {id: 4, label: '', value: 4, icon: 'alr-icon-notifications'},
        {id: 5, label: '', value: 5, icon: 'alr-icon-like'},
        {id: 6, label: '', value: 6, icon: 'alr-icon-laugh'}
    ],
    customer_avatar: [
        {id: 1, label: 'Square', value: 'square', icon: 'icon-square'},
        {id: 2, label: 'Round', value: 'circle', icon: 'icon-round'}
    ],
    customer_name: [
        {id: 'full_full', text: 'John Doe'},
        {id: 'first_first', text: 'J.D'},
        {id: 'full_first', text: 'John D'},
        {id: 'first_hide', text: 'J*******'}
    ],
    country_flag: [
        {id: 1, label: 'Rectangle', value: 'rectangle', icon: 'icon-rectangle'},
        {id: 2, label: 'Round', value: 'circle', icon: 'icon-round'}
    ],
    average_rating: [
        {id: 1, label: 'Square', value: 'square', icon: 'icon-square'},
        {id: 2, label: 'Round', value: 'circle', icon: 'icon-round'}
    ],
    review_button: [
        {id: 1, label: 'Square', value: 'square', icon: 'icon-square'},
        {id: 2, label: 'Round', value: 'circle', icon: 'icon-round'}
    ],
    summary_type: [
        {id: 'vertical', text: 'Vertical'},
        {id: 'horizontal', text: 'Horizontal'}
    ],
    format_write_review: [
        {id: 1, label: 'Basic format', value: 'basic'},
        {id: 2, label: 'Popup modal', value: 'popup'}
    ],
    reaction: [
        {id: 1, label: '', value: 1, icon: 'alr-icon-reaction-1 alr-icon-non-reaction-1 active'},
        {id: 2, label: '', value: 2, icon: 'alr-icon-reaction-2 alr-icon-non-reaction-2 active'},
        {id: 3, label: '', value: 3, icon: 'alr-icon-reaction-3 alr-icon-non-reaction-3 active'},
        {id: 4, label: '', value: 4, icon: 'alr-icon-reaction-4 alr-icon-non-reaction-4 active'},
    ],
    class_name_reaction: [
        {id: 1, value: 1, like: 'alr-icon-reaction-1', unlike: 'alr-icon-non-reaction-1'},
        {id: 2, value: 2, like: 'alr-icon-reaction-2', unlike: 'alr-icon-non-reaction-2'},
        {id: 3, value: 3, like: 'alr-icon-reaction-3', unlike: 'alr-icon-non-reaction-3'},
        {id: 4, value: 4, like: 'alr-icon-reaction-4', unlike: 'alr-icon-non-reaction-4'},
    ],
    date_format: [
        { id: 'd-m-Y', text: moment_current.format('DD-MM-Y') },
        { id: 'Y-m-d', text: moment_current.format('Y-MM-DD') },
        { id: 'Y-M-d', text: moment_current.format('Y-MMM-DD') },
        { id: 'm-d-Y', text: moment_current.format('MM-DD-Y') },
        { id: 'M-d-Y', text: moment_current.format('MMM-DD-Y') },
        { id: 'd/m/Y', text: moment_current.format('DD/MM/Y') },
        { id: 'Y/m/d', text: moment_current.format('Y/MM/DD') },
        { id: 'Y/M/d', text: moment_current.format('Y/MMM/DD') },
        { id: 'm/d/Y', text: moment_current.format('MM/DD/Y') },
        { id: 'M/d/Y', text: moment_current.format('MMM/DD/Y') },
    ],
    content_align: [
        { id: 'left', text: 'Left' },
        { id: 'right', text: 'Right' },
        { id: 'center', text: 'Center' },
        { id: 'justify', text: 'Justify' }
    ],
    font: [
        { id: 1, text: 'Store font' },
        { id: 2, text: 'Ali Reviews font' },
    ],
    load_more: [
        {
            id: 1,
            label: 'Infinite scroll',
            value: 'scroll'
        },
        {
            id: 2,
            label: 'Show more button',
            value: 'load_more'
        },
        {
            id: 3,
            label: 'Pagination',
            value: 'pagination'
        }
    ],
    mobile_column: [
        {
            id: 1,
            label: 'One column',
            value: 1
        },
        {
            id: 2,
            label: 'Two columns',
            value: 2
        }
    ],
    sort: [
        { id: 1, value: 'date', label: 'By date' },
        { id: 2, value: 'pictures', label: 'By photo' },
        { id: 3, value: 'stars', label: 'By rating' },
    ],
    style: [
        {
            id: 1,
            label: 'Grid',
            value: STYLE_GRID
        },
        {
            id: 2,
            label: 'List',
            value: STYLE_LIST
        },
        {
            id: 3,
            label: 'Carousel',
            value: STYLE_CAROUSEL
        }
    ],
    theme_style: [
        {
            id: 1,
            label: 'Light',
            value: 'light'
        },
        {
            id: 2,
            label: 'Dark',
            value: 'dark'
        }
    ],
    theme_template: [
        { id: 'light', text: 'Ali Reviews Theme' },
        { id: 'dark', text: 'Dark Theme' },
        { id: 'loox', text: 'Loox Theme' },
        { id: 'judge', text: 'Judge.me Theme' },
        { id: 'yotpo', text: 'Yotpo Theme' },
        { id: 'facebook', text: 'Facebook Theme' },
        { id: 'twitter', text: 'Twitter Theme' },
        
    ],

    theme_template_color: {
        light: {
            primary_text_color : '#39332E',
            secondary_text_color : '#bcbcbc',
            box_background_color : '#ffffff',
            card_background_color : '#ffffff',
            average_rating_color: '#ffb303',
            review_button_color : '#39332e',
            rating_star_color: '#ffb303',
            verify_color : '#00c35c',
            reaction_color : '#ff881b',
        },

        dark: {
            primary_text_color : '#ffffff',
            secondary_text_color : '#bcbcbc',
            box_background_color : '#1e1e1e',
            card_background_color : '#2c2c30',
            average_rating_color: '#ffb303',
            review_button_color : '#ffffff',
            rating_star_color: '#ffb303',
            verify_color : '#00c35c',
            reaction_color : '#ff881b',
        },

        loox: {
            primary_text_color : '#000000',
            secondary_text_color : '#A3A3A3',
            box_background_color : '#ffffff',
            card_background_color : '#ffffff',
            average_rating_color: '#FA4F56',
            review_button_color : '#FA4F56',
            rating_star_color: '#FA4F56',
            verify_color : '#000000',
            reaction_color : '#FA4F56',
        },

        judge: {
            primary_text_color : '#333333',
            secondary_text_color : '#99A3AC',
            box_background_color : '#ffffff',
            card_background_color : '#ffffff',
            average_rating_color: '#339999',
            review_button_color : '#339999',
            rating_star_color: '#339999',
            verify_color : '#333333',
            reaction_color : '#339999',
            
        },
    
        yotpo: {
            primary_text_color : '#333333',
            secondary_text_color : '#888888',
            box_background_color : '#ffffff',
            card_background_color : '#ffffff',
            average_rating_color: '#2F84ED',
            review_button_color : '#2F84ED',
            rating_star_color: '#FEC600',
            verify_color : '#2BC188',
            reaction_color : '#888888',
            
        },
    
        facebook: {
            primary_text_color : '#1C1E21',
            secondary_text_color : '#616770',
            box_background_color : '#ffffff',
            card_background_color : '#ffffff',
            average_rating_color: '#3578E5',
            review_button_color : '#3578E5',
            rating_star_color: '#3578E5',
            verify_color : '#42B72A',
            reaction_color : '#3578E5',
            
        },
    
        twitter: {
            primary_text_color : '#FFFFFF',
            secondary_text_color : '#8899A6',
            box_background_color : '#15202B',
            card_background_color : '#38444D',
            average_rating_color: '#1DA0F2',
            review_button_color : '#1DA0F2',
            rating_star_color: '#1DA0F2',
            verify_color : '#38444D',
            reaction_color : '#1DA0F2',
            
        },
    }


};

export const data_preview = {
    grid: [
        {
            id: 1,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Adams Leyine',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-6.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 2,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Greg Cooper',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-7.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 3,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Cameron Hawkins',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 4,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Sara Duncan',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        }
    ],
    list: [
        {
            id: 1,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Adams Leyine',
            count_img: 3,
            img: [],
            content: 'Lorem Ipsum',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 2,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Greg Cooper',
            count_img: 3,
            img: [
                '/images/theme-setting-page/theme-setting-4.5-1.png',
                '/images/theme-setting-page/theme-setting-4.5-2.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 3,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Cameron Hawkins',
            count_img: 3,
            img: [
                '/images/theme-setting-page/theme-setting-4.5-1.png',
                '/images/theme-setting-page/theme-setting-4.5-2.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        }
    ],
    carousel: [
        {
            id: 1,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Adams Leyine',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-6.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 2,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Greg Cooper',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-7.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        }
    ]
};

export const data_preview_on_devices = {
    grid: [
        {
            id: 1,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Adams Leyine',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-6.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 2,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Greg Cooper',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-7.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 3,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Cameron Hawkins',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-3.svg',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 4,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Sara Duncan',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-9.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 5,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Beth Edwards',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-10.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 6,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Greg Cooper',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 7,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Jennifer Nguyen',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 8,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Jenny Mckinney',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 9,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Beth Edwards',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 10,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Rita Wu',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 11,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Sara Duncan',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 12,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Linda D',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        }
    ],
    list: [
        {
            id: 1,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Adams Leyine',
            count_img: 3,
            img: [],
            content: 'Lorem Ipsum',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 2,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Greg Cooper',
            count_img: 3,
            img: [
                '/images/theme-setting-page/theme-setting-4.5-1.png',
                '/images/theme-setting-page/theme-setting-4.5-2.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 3,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Cameron Hawkins',
            count_img: 3,
            img: [
                '/images/theme-setting-page/theme-setting-4.5-1.png',
                '/images/theme-setting-page/theme-setting-4.5-2.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 4,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Jenny Mckinney',
            count_img: 3,
            img: [
                '/images/theme-setting-page/theme-setting-4.5-1.png',
                '/images/theme-setting-page/theme-setting-4.5-2.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 5,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Beth Edwards',
            count_img: 3,
            img: [
                '/images/theme-setting-page/theme-setting-4.5-1.png',
                '/images/theme-setting-page/theme-setting-4.5-2.png'
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor. Ut enim ad minim veniam, quis nostrud.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        }
    ],
    carousel: [
        {
            id: 1,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Adams Leyine',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-6.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 2,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Greg Cooper',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-7.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 3,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'uk',
            author: 'Jenny Mckinney',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-8.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 4,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Beth Edwards',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-9.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 5,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Beth Edwards',
            count_img: 3,
            img: [
                '/images/theme-setting-page/img-review-10.png',
            ],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 6,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Greg Cooper',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 7,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Jennifer Nguyen',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 8,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Jenny Mckinney',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 9,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Beth Edwards',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 10,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Rita Wu',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 11,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Sara Duncan',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        },
        {
            id: 12,
            icon_rating: {
                '1': '\f005',
                '2': '\f004',
                '3': '\f2dc',
                '4': '\f0f3',
                '5': '\f164'
            },
            star: 5,
            avatar: '/images/theme-setting-page/thumb-1.jpg',
            country: 'gg',
            author: 'Linda D',
            count_img: 3,
            img: [],
            content: 'Lorem ipsum dolor sit amet, consectetur idesiu. Fusce id purus eu elit mattis congue nec id tortor.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            icon_reaction: {
                '1': 'alr-icon-update-favorite',
                '2': ''
            },
            like: 7,
            unlike: 0,
            created_at: '05/08/2019'
        }
    ]
}