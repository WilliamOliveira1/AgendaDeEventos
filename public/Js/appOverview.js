

getAllEvents();

function initCalendar(data) {
    calendarEvents = data;
    loadCalendar(calendarEvents);    
}

function BaseApiUrl() {
    return window.location.origin;        
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


function loadCalendar(calendarEvents) {
    $(document).ready(function () {
        console.log(calendarEvents);
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
            events: calendarEvents,
            dateClick: function (arg) {
                console.log(arg.date.toUTCString()); // use *UTC* methods on the native Date Object
                // will output something like 'Sat, 01 Sep 2018 00:00:00 GMT'
            },
            editable: false,
            dayMaxEvents: true, // allow "more" link when too many events
        });
        calendar.render();
        $(".fc-listMonth-button").click();
    });    
}