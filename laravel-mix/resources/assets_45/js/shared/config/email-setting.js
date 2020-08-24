export const email_custom_setting = {
    title: 'UNTITLED',
    subject: 'A gift to say thank you for purchasing!',
    banner: `${cdnUrl}/images/email-request/banner-default.png`,
    content: 'Dear [#!buyer_first_name!#], <div><br></div><div>Thanks for your order! While your purchase is on its way to you, in the meantime we wanted to treat you to 20% off anything else you might have had your eyes on… </div><div><br></div><div>Use code XXXXX at checkout to get 20% off only until YYYY/MM/DD.</div>',
    review_box: 'Write your review below',
    button_text: 'GET SALE NOW',
    button_color: '#242539',
    button_link: ''
};

export const email_target = {
    id: null,
    country: [],
    times: {
        value: 3,
        type: 'day'
    }
};

export const schedule_email_custom_default = {
    id: null,
    value: 3,
    type: 'day',
    email_custom: 0
};

export const choose_email_template_default = [
    {
        id: 1,
        name_template: 'Next order coupon',
        title: 'UNTITLED',
        subject: 'A gift to say thank you for purchasing!',
        banner: `${cdnUrl}/images/email-request/banner-default.png`,
        content: 'Dear [#!buyer_first_name!#], <div><br></div><div>Thanks for your order! While your purchase is on its way to you, in the meantime we wanted to treat you to 20% off anything else you might have had your eyes on… </div><div><br></div><div>Use code XXXXX at checkout to get 20% off only until YYYY/MM/DD.</div>',
        button_text: 'SHOP NOW',
        button_color: '#242539',
        button_link: ''
    },
    {
        id: 2,
        name_template: 'Refer a friend',
        title: 'UNTITLED',
        subject: 'Get 10% off for referring a friend!',
        banner: `${cdnUrl}/images/email-request/banner-default.png`,
        content: 'Everything’s better with friends. <div><br></div><div>We wanted our most valued shoppers to be the first to know: Now, when you refer a friend to [#!shop_name!#], you’ll get 10% off your next purchase once they’ve placed their first order - and they’ll get 10% off, too!</div><div><br></div><div>Use code XXXXX together at checkout to get 10% off only until YYYY/MM/DD.</div>',
        button_text: 'REFER A FRIEND',
        button_color: '#242539',
        button_link: ''
    },
    {
        id: 3,
        name_template: 'Free shipping code',
        title: 'UNTITLED',
        subject: 'Free shipping on your next orders',
        banner: `${cdnUrl}/images/email-request/banner-default.png`,
        content: 'Hi [#!buyer_first_name!#], <div><br></div><div>Our sales are often limited, and we don’t want you to miss put on these awesome picks. Enter the code XXXXX at checkout and your next order will ship free of charge. Offer expires YYYY/MM/DD.</div>',
        button_text: 'SHOP NOW',
        button_color: '#242539',
        button_link: ''
    },
    {
        id: 4,
        name_template: '-- New blank email',
        title: 'UNTITLED',
        subject: '',
        banner: '',
        content: '',
        button_text: 'GET SALE',
        button_color: '#242539',
        button_link: ''
    }
]