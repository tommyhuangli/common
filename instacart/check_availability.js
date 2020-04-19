window.setInterval(function(){
    if (Notification.permission !== 'granted')
        Notification.requestPermission();
    var params = { "credentials": "include", "headers": { "accept": "application/json", "accept-language": "en-US,en;q=0.9,zh;q=0.8,zh-TW;q=0.7,zh-CN;q=0.6", "content-type": "application/json", "if-none-match": "W/\"6ff243751b0619d9dd00e8a933b8405d\"", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin", "x-client-identifier": "web", "x-csrf-token": "+x93a92E/LpngGyD+3dhgP1APWcu6khbgcGJGwy2XTvaQpmBKBj2LR2yXzgXcmCqvXzMRGMUfNJkVe2kfMqUBw==", "x-requested-with": "XMLHttpRequest"}, "referrer": "https://sameday.costco.com/store/costco/info?tab=delivery", "referrerPolicy": "no-referrer-when-downgrade", "body": null, "method": "GET", "mode": "cors" };
    params.headers["cookie"] = document.cookie;
    fetch("https://sameday.costco.com/v3/containers/costco/next_gen/retailer_information/content/delivery?source=web&cache_key=755058-171-t-6aa", 
        params
    ).then(function(response) {
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
            var result = data.container.modules[0].data.title;
            console.log("result: " + result);
            if (result !== "No delivery times available") {
                var notification = new Notification('Costco Sameday', {
                    icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                    body: 'There could be delivery available for Costco Sameday!',
                });
                notification.onclick = function() {
                    window.open('https://sameday.costco.com/');
                };
            }
        });
    });  
}, 30000);