
$("input").keyup(function(){
    let userField = $('#InputUser').val();
    let passField = $('#InputPassword').val();

    if(userField.length >= 6 && passField.length >= 8){
        $('#loginButton').prop('disabled', false);
    }
    else if ($('#InputUser').is(':empty') || $('#InputPassword').is(':empty')){
        $('#loginButton').prop('disabled', true);
    }
});


if ($('#InputUser').is(':empty') || $('#InputPassword').is(':empty')){
    $('#loginButton').prop('disabled', true);
}