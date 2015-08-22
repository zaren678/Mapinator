(function($) {

    var p = $.ajax({
        url: '/planetImage',
        method: 'GET'
    });

    p.then(function(response) {
        console.log( "Response " + response );
        $( "#img_earth" ).attr( "src", response );
    }, function(error) {
        console.error(error);
    });

})(jQuery)
