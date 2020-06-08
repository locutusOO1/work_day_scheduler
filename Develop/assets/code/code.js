$(document).ready(function() {
    // global variables
    var interval;
    var curDayTime = moment();
    var schedule = [];
    var hoursInWorkDay = 9;
    var dayStart = 9;
    var container = $('.container');
    
    // initialize the work day to 9 hours 9am-5pm
    // initialize the local storage and the schedule array
    function initDay () {
        // pull schedule from local storage
        if (localStorage.getItem("schedule")) {
            var tmpSchedule = JSON.parse(localStorage.getItem("schedule"));
            // refresh moments to ensure current day
            for (var i = 0; i < tmpSchedule.length; i++) {
                schedule.push([moment(dayStart+i,"HH"),tmpSchedule[i][1]]);
            }
        // or create a new default schedule
        } else {
            for (var i = 0; i < hoursInWorkDay; i++) {
                // starts the work day at 9am
                var dayTime = moment(dayStart+i,"HH");
                schedule.push([dayTime,""]);
            }
            // store default schedule
            localStorage.setItem("schedule",JSON.stringify(schedule));
        }
    }
    
    // build and display the schedule
    function buildContent() {
        // time-block container
        var newSection = $('<section class="container-fluid"></section>')
        container.append(newSection);
        // loop through momments in the work day
        for (var i = 0; i < schedule.length; i++) {
            // determine if moment is past, present, or future in order to apply the correct style
            var timeCompare = "";
            console.log()
            if (schedule[i][0].isBefore(curDayTime,'hour')) {
                timeCompare = "past";
            } else if (schedule[i][0].isSame(curDayTime,'hour')) {
                timeCompare = "present";
            } else if (schedule[i][0].isAfter(curDayTime,'hour')) {
                timeCompare = "future";
            }
            // build row with hour lable text area and buttons
            var newRow = $('<div class="form-group row"><label for="hour_'+ schedule[i][0].hour() +'" class="hour col-1 col-form-label text-right"><h6>'+ schedule[i][0].format('hA') +'</h6></label><div class="input_cont col-9"><textarea class="'+ timeCompare +' form-control description time-block" id="hour_'+ schedule[i][0].hour() +'" rows="3">'+ schedule[i][1] +'</textarea></div><button class="col-1 saveBtn" value="hour_'+ schedule[i][0].hour() +'"><i class="fas fa-save fa-lg"></i></button><button class="col-1 deleteBtn" value="hour_'+ schedule[i][0].hour() +'"><i class="fas fa-trash-alt fa-lg"></i></button>');
            newSection.append(newRow);
        }
    }
    
    // show current day/time
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    interval = setInterval( function() {
        $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    }, 1000);
    
    // start the program
    initDay();
    buildContent();
    
    // action listeners
    // save buttons
    $('.saveBtn').on("click",function() {
        // get index
        var tmpArray = $(this).val().split('_');
        var index = parseInt(tmpArray[1])-dayStart;
        // get text content to save
        var text = $('#'+$(this).val()).val();
        schedule[index][1] = text;
        localStorage.setItem("schedule",JSON.stringify(schedule));
    });
    
    // delete buttons
    $('.deleteBtn').on("click",function() {
        var tmpArray = $(this).val().split('_');
        var index = parseInt(tmpArray[1])-dayStart;
        // clear text content
        schedule[index][1] = "";
        localStorage.setItem("schedule",JSON.stringify(schedule));
    });

    // change column classes for smaller windows on resize
    $(window).on('resize',function() {
        if ($(this).width() < 768) {
            $('.input_cont').addClass('col-8');
            $('.input_cont').removeClass('col-9');
            $('.hour').addClass('col-2');
            $('.hour').removeClass('col-1');
        } else {
            $('.input_cont').addClass('col-9');
            $('.input_cont').removeClass('col-8');
            $('.hour').addClass('col-1');
            $('.hour').removeClass('col-2');
        }
    })
    
});