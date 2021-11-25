var calendarOptions = [];
var changecalendarOptions = [];
var calendarEvents;

function changeSelect(option) {
    $('#roomSelect option').eq(0).prop('selected', true);
    changeLoaded();
}

function changeLoaded() {
    var selectCalendar = $('#roomSelect').find(":selected").text();
    let selectCalendarWithoutSpace = selectCalendar.replace(/\s/g, '');
    changecalendarOptions = calendarOptions;

    var index = changecalendarOptions.indexOf(selectCalendarWithoutSpace);
    if (index !== -1) {
        changecalendarOptions.splice(index, 1);
    }

    hideCalendars(changecalendarOptions, selectCalendarWithoutSpace);
    changecalendarOptions.push(selectCalendarWithoutSpace);
    let setArgs = { room: selectCalendarWithoutSpace };
    getAllEventsAfterLoaded(setArgs);
};

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-full-width",
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

if ($('#roomCreated').length) {
    toastr.success('Sala criada com sucesso!')
}

if ($('#roomEmpty').length) {
    toastr.error('Não pode salvar dado vazio!')
}

if ($('#roomExist').length) {
    toastr.success('Ja existe uma sala com esse nome! Salve com outro nome.')
}

if ($('#eventCreated').length) {
    toastr.success('Evento salvo com sucesso.')
}



function initCalendar(data) {
    calendarEvents = data;
    renderAllCalendars(calendarEvents);
}

function saveData(args) {
    $.ajax({
        url: `${BaseApiUrl()}/agenda/save`,
        type: "POST",
        data: args
    }).then(response => {
        console.log("Event saved!");
    }).catch(error => {
        console.error(error);
    });
}

function BaseApiUrl() {
    return window.location.origin;
}

function getAllEventsAfterLoaded(args) {
    $.ajax({
        url: `${BaseApiUrl()}/api/eventosagendaporsala`,
        type: "POST",
        dataType: 'json',
        data: args
    }).done(function (data) {
        return initCalendar(data);
    })
}

function renderclassRoomList(escola) {

    if (escola.length <= 0) {
        toastr.error('Não tem salas cadastradas, por favor cadastre salas para salvar eventos.')
    } else {
        let lines = "";
        for (var i = 0; i < escola.length; i++) {
            lines += `<option value="sala${i + 1}">${escola[i].Nome}</option>`;
        }

        $("#roomSelect").append(lines);
        renderCalendars();
    }
}

var eventsSaved = null;

function renderEventsList(eventos) {

    if (eventos.length <= 0) {
        toastr.error('Não tem Eventos cadastrados, por favor cadastre eventos na aba dashboard.')
    } else {
        let lines = "";
        for (var i = 0; i < eventos.length; i++) {
            lines += `<option name="event_name" value="sala${i + 1}">${eventos[i].event}</option>`;
        }

        $("#eventSelect").append(lines);
        eventsSaved = lines;
    }
}

function getAllRooms() {
    $.ajax({
        url: `${BaseApiUrl()}/api/getallrooms`,
        type: "GET",
        dataType: 'json'
    }).done(function (data) {
        return renderclassRoomList(data);
    })
}

function getAllEventsList() {
    $.ajax({
        url: `${BaseApiUrl()}/api/getallevents`,
        type: "GET",
        dataType: 'json'
    }).done(function (data) {
        return renderEventsList(data);
    })
}

getAllRooms();

$('#roomSelect').change(function () {
    var selectCalendar = $('#roomSelect').find(":selected").text();
    let selectCalendarWithoutSpace = selectCalendar.replace(/\s/g, '');
    changecalendarOptions = calendarOptions;

    var index = changecalendarOptions.indexOf(selectCalendarWithoutSpace);
    if (index !== -1) {
        changecalendarOptions.splice(index, 1);
    }

    hideCalendars(changecalendarOptions, selectCalendarWithoutSpace);
    changecalendarOptions.push(selectCalendarWithoutSpace);
    let setArgs = { room: selectCalendarWithoutSpace };
    getAllEventsAfterLoaded(setArgs);
});

function hideCalendars(array, selectedItem) {

    let isCalendarLoadedh = this.isCalendarLoaded;

    for (var x = 0; x < array.length; x++) {
        $(`#${array[x]}`).hide();
    }
    $(`#${selectedItem}`).show();
    if (isCalendarLoadedh) {
        $(".fc-dayGridMonth-button").click();
    }
}

function renderCalendars() {

    let lines = "";

    var domelts = $('#roomSelect option');
    let domeltsWithoutSpace = [];

    for (var i = 0; i < domelts.length; i++) {
        domeltsWithoutSpace.push(domelts[i].innerText.replace(/\s/g, ''));
        lines += `<div id="${domeltsWithoutSpace[i]}" class="calendar" ></div>`;
    }
    calendarOptions = domeltsWithoutSpace;

    getAllEvents();
    $("#calendars").append(lines);
}

function getAllEvents() {
    $.ajax({
        url: `${BaseApiUrl()}/api/eventosagenda`,
        type: "GET",
        dataType: 'json'
    }).done(function (data) {
        return initCalendar(data);
    })
}

function renderAllCalendars(calendarEvents) {

    for (var i = 0; i < calendarOptions.length; i++) {
        let eventFromRooms = calendarEvents;
        let lastEventId = eventFromRooms.length;

        var calendarEl = $(`#${calendarOptions[i]}`)[0];
        var calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                end: 'today prev,next',
                center: 'title',
                start: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            },
            selectable: true,
            editable: true,
            navLinks: true,
            selectMirror: true,
            locale: 'pt',
            timeZone: 'America/New_York',
            events: calendarEvents,

            // Create new event
            select: function (arg) {
                Swal.fire({
                    html: `<div class="mb-7">Agendar novo evento?</div><div class="fw-bolder mb-5">Nome do evento:</div><select id="eventSelect">${eventsSaved}</select>`,
                    icon: "info",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Sim, criar!",
                    cancelButtonText: "Não, voltar",
                    customClass: {
                        confirmButton: "btn btn-primary save-agenda-data",
                        cancelButton: "btn btn-active-light"
                    }
                }).then(function (result) {

                    if (result.value) {
                        var title = $('#eventSelect').find(":selected").text();
                        let calendarData = {
                            idCheck: lastEventId + 1,
                            title: title,
                            start: arg.start,
                            startStr: arg.startStr,
                            end: arg.end,
                            endStr: arg.endStr,
                            allDay: arg.allDay,
                            room: $('#roomSelect').find(":selected").text().replace(/\s/g, '')
                        };
                        lastEventId++;
                        saveData(calendarData);
                        if (title) {
                            calendar.addEvent({
                                id: lastEventId,
                                title: title,
                                start: arg.start,
                                startStr: arg.startStr,
                                end: arg.end,
                                endStr: arg.endStr,
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
                    text: "Deseja deletar esse evento?",
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
                        deleteEvent(arg.event._def.publicId);
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
    }

    getAllEventsList();
    let isCalendarLoadedz = this.isCalendarLoaded;
    if (!isCalendarLoadedz) {
        hideCalendars(calendarOptions, calendarOptions[0]);
    }

    isCalendarLoaded = true;
}

function setSelector(option) {    
    changeSelect(option)
}

function deleteEvent(args) {
    let obj = { room: args }
    $.ajax({
        url: `${BaseApiUrl()}/api/deleteEventById`,
        type: "POST",
        dataType: 'json',
        data: obj
    }).done(function (data) {
        console.log("Event deleted");
    })
}

var isCalendarLoaded = false;

jQuery(document).ready(function() {
    setTimeout(function() {
        if (isCalendarLoaded) {
            console.log(calendarOptions[1]);
            setSelector(calendarOptions[1]);
        }
    }, 750);
});