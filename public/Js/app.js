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

    if(loginUserField?.length >= 6 && loginPassField?.length >= 8 )
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

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": true,
    "showDuration": "90000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

if ($('#userExist').length) {
    toastr.error('Usuário ja existe tente outro!')
}

if ($('#userOrPass').length) {
    toastr.error('Usuário ou senha errados por favor tente novamente!')
}

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            end: 'today prev,next',
            center: 'title',
            start: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true,
        navLinks: true,
        selectMirror: true,
        locale: 'pt',
        timeZone: 'America/New_York',
        events: [
            { start: '2018-09-01T12:30:00Z' }, // will be parsed in UTC, as-is
            { start: '2018-09-01T12:30:00+XX:XX' }, // will be parsed in UTC as '2018-09-01T12:30:00Z'
            { start: '2018-09-01T12:30:00' } // will be parsed in UTC as '2018-09-01T12:30:00Z'
        ],
        dateClick: function (arg) {
            console.log(arg.date.toUTCString()); // use *UTC* methods on the native Date Object
            // will output something like 'Sat, 01 Sep 2018 00:00:00 GMT'
        },

        // Create new event
    select: function (arg) {
        Swal.fire({
            html: '<div class="mb-7">Agendar novo evento?</div><div class="fw-bolder mb-5">Nome do evento:</div><input type="text" class="form-control" name="event_name" />',
            icon: "info",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Sim, criar!",
            cancelButtonText: "Não, voltar",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light"
            }
        }).then(function (result) {
            if (result.value) {
                var title = document.querySelector('input[name="event_name"]').value;
                if (title) {
                    calendar.addEvent({
                        title: title,
                        start: arg.start,
                        end: arg.end,
                        allDay: arg.allDay
                    })
                }
                calendar.unselect()
            } else if (result.dismiss === "cancel") {
                Swal.fire({
                    text: "Evento de agendamento não realizado!.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    }
                });
            }
        });
    },

    // Delete event
    eventClick: function (arg) {
        Swal.fire({
            text: "Tem certeza que quer deletar esse evento?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Sim, delete!",
            cancelButtonText: "Não, voltar",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light"
            }
        }).then(function (result) {
            if (result.value) {
                arg.event.remove()
            } else if (result.dismiss === "cancel") {
                Swal.fire({
                    text: "Evento não foi deletado!.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                    }
                });
            }
        });
    },
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    });
    calendar.render();
});