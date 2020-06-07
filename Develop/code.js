// variables
var interval;
var curDayTime = moment();
var schedule = [];
var hoursInWorkDay = 9;
var container = $('.container');

// initialize the work day 9 hours 9am-5pm
function initDay () {
    for (var i = 0; i < hoursInWorkDay; i++) {
        var dayTime = moment(9+i,"HH");
        schedule.push([dayTime,""]);

    }

    // need to pull from local storage
}

function buildContent() {
    // time-block container
    var newSection = $('<section class="container-fluid"></section>')
    container.append(newSection);
    // loop through momments in the work day
    for (var i = 0; i < schedule.length; i++) {
        // determine if momemnt is past, present, or future in order to apply the correct style
        var timeCompare = "";
        if (schedule[i][0].isBefore(curDayTime,'hour')) {
            timeCompare = "past";
        } else if (schedule[i][0].isSame(curDayTime,'hour')) {
            timeCompare = "present";
        } else if (schedule[i][0].isAfter(curDayTime,'hour')) {
            timeCompare = "future";
        }
        console.log(timeCompare);
        // build row with hour lable text area and buttons
        var newRow = $('<div class="form-group row"><label for="hour_'+ schedule[i][0].hour() +'" class="hour col-1 col-form-label text-right"><h6>'+ schedule[i][0].format('hA') +'</h6></label><div class="col-9"><textarea class="'+ timeCompare +' form-control description time-block" id="hour_'+ schedule[i][0].hour() +'" rows="3">'+ schedule[i][1] +'</textarea></div><button class="col-1 saveBtn"><i class="fas fa-save fa-lg"></i></button><button class="col-1 deleteBtn"><i class="fas fa-trash-alt fa-lg"></i></button>');
        newSection.append(newRow);
    }
}

// show current day/time
$('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
interval = setInterval( function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

initDay();
buildContent();