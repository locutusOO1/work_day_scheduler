var interval;
var curDayTime = moment();
var schedule = [];
var hoursInWorkDay = 9;
var container = $('.container');

function initDay () {
    for (var i = 0; i < hoursInWorkDay; i++) {
        var dayTime = moment(9+i,"HH");
        schedule.push([dayTime,""]);

    }
    // for (var i = 0; i< schedule.length; i++) {
    //     console.log("i: " + schedule[i][0].hour()%12);
    // }

    // need to pull from local storage
}

function buildContent() {
    for (var i = 0; i < schedule.length; i++) {
        var timeCompare = "";
        if (schedule[i][0].isBefore(curDayTime,'hour')) {
            timeCompare = "past";
        } else if (schedule[i][0].isSame(curDayTime,'hour')) {
            timeCompare = "present";
        } else if (schedule[i][0].isAfter(curDayTime,'hour')) {
            timeCompare = "future";
        } else {
            timeCompare = "error";
        }
        console.log(timeCompare);
        var newRow = $('<div class="form-group row"><label for="hour_'+ schedule[i][0].hour() +'" class="hour col-sm-1 col-form-label text-right">'+ schedule[i][0].hour() +'</label><div class="col-sm-9"><textarea class="'+ timeCompare +' form-control" id="hour_'+ schedule[i][0].hour() +'" rows="3">'+ schedule[i][1] +'</textarea></div><button class="col-sm-1">S</button><button class="col-sm-1">D</button>');
        container.append(newRow);
    }
}




// alert(moment().format("YYYY-MM-DD"));
$('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
interval = setInterval( function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

initDay();
buildContent();