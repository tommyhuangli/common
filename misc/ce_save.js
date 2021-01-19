console.save = function (data, filename) {
    if (!data) {
        console.error('Console.save: No data')
        return;
    }
    if (!filename) filename = 'story.json'
    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {
            type: 'text/json'
        }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}
var title = $('.mod_content h1').text();
var filename = title.replaceAll(' ', '_').replaceAll('?,','') + '.html';
var data = "";

window.setInterval(function() {
    var ok_btn = $('#alertify-ok');
    if (ok_btn) {
        ok_btn.click();
    }
    data += $('.mod_content').html();
    var all_a = document.getElementsByTagName("a");    
    for (var i=0; i < all_a.length; i++ ){
        var singleElement = all_a[i];
        if (singleElement.innerHTML == 'Next') {
            var index = $('.mod_totalindex').text().split("/"); 
            if (index[0] == index[1]) {
                console.save(data, filename);
            }
        }
    }
}, 1000);
