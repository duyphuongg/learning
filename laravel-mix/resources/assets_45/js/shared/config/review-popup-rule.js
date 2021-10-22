export const display_rule_settings_default = {
    first_show_time: {
        type: [
            'fixed', 
            'random'
        ]
    },
    between_time: {
        type: [
            'fixed', 
            'random'
        ]
    },
    click_popup: [
        {id: 'show_popup_detail', text: 'Show popup detail'},
        {id: 'direct_product', text: 'Go to product page'},
    ],
    open_link: [
        {id: 'current_tab', text: 'in the current tab'},
        {id: 'new_tab', text: 'In a new tab'},
    ],
    number_of_popup: {
        type: [
            'limited', 
            'unlimited'
        ]
    },
}

export const page_rule_settings_default = {
    home: {
        products_type: [
            'random', 
            'specific_product'
        ]
    },
    collection: {
        products_type: [
            'random', 
            'specific_collection'
        ]
    },
    product: {
        products_type: [
            'random', 
            'specific_product'
        ]
    },
    cart: {
        products_type: [
            'random', 
            'product_in_cart'
        ]
    },
    other: {
        products_type: [
            'random', 
            'specific_product'
        ]
    }
}