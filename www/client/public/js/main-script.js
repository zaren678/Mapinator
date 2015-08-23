(function($) {

  getEarthImage();
  setInterval( getEarthImage, 120000 );

  function getEarthImage(){
    var p = $.ajax({
        url: '/planetImage',
        method: 'GET'
    });

    p.then(function(response) {
        $( "#img_earth" ).attr( "src", response );
    }, function(error) {
        console.error(error);
    });
  }

})(jQuery)
