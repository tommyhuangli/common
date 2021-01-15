window.setInterval(function() {
    var all_a = document.getElementsByTagName("a");    
    for (var i=0; i < all_a.length; i++ ){
        var singleElement = all_a[i];
        if (singleElement.innerHTML == 'Next') {
            singleElement.click();
        }
    }
}, 2000);
