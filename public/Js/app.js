
$("input").keyup(function(){
    let userField = $('#InputUser').val();
    let passField = $('#InputPassword').val();
    let loginUserField = $('#LoginInputUser').val();
    let loginPassField = $('#LoginInputPassword').val();
    let repeatpassField = $('#RepeatPassword').val();
    let emailTyped = $('#InputEmail').val();

    if(passField?.length > 0 || repeatpassField?.length > 0) {
        passField.onchange = validatePassword;
        repeatpassField.onkeyup = validatePassword;
    }

    if(userField?.length >= 6 
        && (passField?.length >= 8 || passField?.length < 30)
        && passField == repeatpassField 
        && userField?.length <= 30)
    {
        $('#RegisterButton').prop('disabled', false);
    }
    else if ($('#InputUser').is(':empty') 
    || $('#InputPassword').is(':empty') 
    || userField?.length > 30
    || passField?.length > 30)
    {
        $('#RegisterButton').prop('disabled', true);
    }

    if(loginUserField.length >= 6 && loginPassField.length >= 8 )
    {
        $('#loginButton').prop('disabled', false);
    }
    else if ($('#LoginInputUser').is(':empty') || $('#LoginInputPassword').is(':empty'))
    {
        $('#loginButton').prop('disabled', true);
    }

    if(emailTyped?.length > 0) 
    {
        ValidateEmail(emailTyped);
    }

    if(passField?.length > 0 || repeatpassField?.length > 0) 
    {
        validatePassword(passField, repeatpassField);
    }
    
    if(userField?.length > 0) 
    {
        ValidateUser(userField);
    }    
});


if ($('#LoginInputUser').is(':empty') || $('#LoginInputPassword').is(':empty'))
{
    $('#loginButton').prop('disabled', true);
}

else if ($('#InputUser').is(':empty') || $('#InputPassword').is(':empty'))
{
    $('#RegisterButton').prop('disabled', true);
}

function validatePassword(firstField, secondField){
    if(firstField.length < 8 || firstField.length > 30 ) 
    {
        $("#CheckPasswordLenght").html("Senha de ter no minimo 8 e maximo 30 caracteres!").css("color","red");
    }
    else if(firstField.length != secondField.length && firstField != secondField) 
    {
        $("#CheckPasswordMatch").html("Senha não são iguais!").css("color","red");
        $("#CheckPasswordLenght").html("");
    } 
    else 
    {
        $("#CheckPasswordMatch").html("");
        $("#CheckPasswordLenght").html("");
    }
}

function ValidateEmail(inputText)
{
    let mailformat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    
    if(inputText.length >= 128) 
    {
        $("#CheckEmail").html("Email com tamanho incorreto!").css("color","red");
    }

    if(inputText.match(mailformat))
    {
        $("#CheckEmail").html("");
    }
    else 
    {
        $("#CheckEmail").html("Email não é valido!").css("color","red");
    }
}

function ValidateUser(inputText) 
{
    if (inputText.length < 8 || inputText.length > 30) 
    {
        $("#CheckUser").html("Usuário deve ter no minimo 8 e maximo de 30 caracteres!").css("color","red");
    }
    else 
    {
        $("#CheckUser").html("");
    }
}