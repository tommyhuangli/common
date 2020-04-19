var params = { "credentials": "include", "headers": { "accept": "application/json", "accept-language": "en-US,en;q=0.9,zh;q=0.8,zh-TW;q=0.7,zh-CN;q=0.6", "content-type": "application/json", "if-none-match": "W/\"6ff243751b0619d9dd00e8a933b8405d\"", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin", "x-client-identifier": "web", "x-csrf-token": "+x93a92E/LpngGyD+3dhgP1APWcu6khbgcGJGwy2XTvaQpmBKBj2LR2yXzgXcmCqvXzMRGMUfNJkVe2kfMqUBw==", "x-requested-with": "XMLHttpRequest"}, "referrer": "https://sameday.costco.com/store/costco/info?tab=delivery", "referrerPolicy": "no-referrer-when-downgrade", "body": null, "method": "GET", "mode": "cors" };
params.headers["cookie"] = document.cookie;
fetch("https://sameday.costco.com/v3/containers/costco/next_gen/retailer_information/content/delivery?source=web&cache_key=755058-171-t-6aa", 
        params
    ).then(function(response) {
        // Examine the text in the response
        response.json().then(function(data) {
            try {
                console.log(data.container.modules[0].data.title);
            } catch (error) {} 
            
            try {
                console.log(data.container.modules[0].data.service_options.tracking_params.delivery_options);           
            } catch (error) {}
        });
    });