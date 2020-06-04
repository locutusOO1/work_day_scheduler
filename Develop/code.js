var interval;
var curDayTime = moment();
var schedule = [];
var hoursInWorkDay = 9;

function initDay () {
    for (var i = 0; i < hoursInWorkDay; i++) {
        var dayTime = moment(9+i,"HH");
        schedule.push([dayTime,""]);
    }
    // for (var i = 0; i< schedule.length; i++) {
    //     console.log("i: " + schedule[i][0].hour()%12);
    // }
}




// alert(moment().format("YYYY-MM-DD"));
$('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
interval = setInterval( function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

initDay();