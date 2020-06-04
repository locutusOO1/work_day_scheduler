var interval;
var dayTime = moment(9,"HH").format("YYYY-MM-DD");
var curDayTime = moment();
var schedule = [[]];
var block = {
    mom: moment().format("YYYY-MM-DD"),
    ev: ""
}
var hoursInWorkDay = 9;

function initDay () {
    // dayTime.hour(9);
    for (var i = 0; i < hoursInWorkDay; i++) {
        dayTime.add(i,'h');
        schedule[i].push(dayTime);
    }
    for (var i = 0; i< schedule.length; i++) {
        console.log("i: " + schedule[i][0]);
    }

}




alert(moment().format("YYYY-MM-DD"));
$('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
interval = setInterval( function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);

initDay();