(function($) {

    $("#submit-button").prop("disabled",!validateInputs() );
    //collect access points
    var p = $.ajax({
        url: '/access-points',
        method: 'GET'
    });

    p.then(function(response) {
        var result = '<option selected disabled hidden value=""></option>';

        response.forEach(function(ap) {
            result += '<option value=\'' + JSON.stringify(ap) + '\'>' + ap.ssid + '</option>';
        });

        $('#wifi-selector').html(result);
    }, function(error) {
        console.error(error);
    });

    $('#wifi-selector').on('change', function (e) {
      $("#submit-button").prop("disabled",!validateInputs() );
    });

    $('#submit-button').click( function(e) {

        ap = $('#wifi-selector option:selected').val();
        $.ajax({
            url: '/access-point',
            method: 'POST',
            contentType: 'text/plain',
            data: ap
        })
    });

    $('#apPassword').on('input', function(e){
      $("#submit-button").prop("disabled",!validateInputs() );
    });

    function validateInputs(){
        ap = $('#wifi-selector option:selected').val();

        if( ap == null || ap.length === 0 )
        {
          return false;
        }

        return validatePassword( ap );
    }

    function validatePassword( ap ){
      password = $('#apPassword').val();
      console.log( "Pass: " + password );

      //TODO check encryption type and validate
      if( password.length > 0 )
      {
        return true;
      }
      return false;
    }
})(jQuery)
