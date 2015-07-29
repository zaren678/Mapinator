(function($) {
    var p = $.ajax({
        url: '/access-points',
        method: 'GET'
    });

    p.then(function(response) {
        var result = '';

        response.forEach(function(ap) {
            result += '<li data-ap-name="' + ap.name + '">' + ap.name + '</li>';
        });

        $('.wifi-selector').html(result);
    }, function(error) {
        console.error(error);
    });

    $('.wifi-selector').on('click', '[data-ap-name]', function (e) {
        var $target = $(e.target),
            ap = $target.attr('data-ap-name');

        $.ajax({
            url: '/access-point',
            method: 'POST',
            contentType: 'text/plain',
            data: ap
        })
    });
})(jQuery)
