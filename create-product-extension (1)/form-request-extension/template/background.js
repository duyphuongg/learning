chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(data) {
        console.log('INPUT: ', data);
        let counter = 0;
        let url = `https://${data.store_name}.myshopify.com/admin/products.json?access_token=${data.token}`;
        var request = setInterval(function(){
            let product = {
                'product':{
                    'title': 'Product-' + Math.random().toString(36).substring(2, 15),
                    'body_html' : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    'variants' : [
                        {
                            'price': getRndInteger(100000, 900000),
                            'sku' : getRndInteger(1000, 9000),
                            'inventory_management': 'shopify',
                            'inventory_quantity': getRndInteger(10000, 90000),
                        }
                    ]
                }
            };
            if(counter < data.run_number){
                counter++;
                if(counter%3 == 0){
                    sleep(1000).then(() => {
                        postData(url, product).then(res => {
                            console.log(`RESULT: `, res);
                        });
                    });
                }else{
                    postData(url, product).then(res => {
                        console.log(`RESULT: `, res);
                    });
                }
            }else{
                clearInterval(request);
                console.log('END REQUEST');
            }
        }, 500)
    });
})

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return await response.json();
}

async function requestAPIGet(url) {
    try {
        const response = await window.fetch(url, {
            method: "GET",
            credentials: "include",
            redirect: "follow"
        });

        if(response.status != 200){
            return;
        }
        return response;
    } catch (error) {
                
        return error;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}