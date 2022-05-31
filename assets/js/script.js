var clock = $("#clock");
var datePicker = $("#datepicker");
var daysLeft = $("#days-left");
$( "#datepicker" ).datepicker();
$( "#project-type" ).selectmenu();

setInterval(function() {
    clock.text(moment().format("hh:mm:ss a"));
}, 1000);

// Eventlistners
datePicker.on("change", getDaysLeft )

// calc the number of days left till due day
function getDaysLeft(){
    var formatedDate = changeDateFormat(datePicker[0].value);
    console.log(formatedDate);
    var futureDate = moment(formatedDate);
    var todaysDate = moment();
    daysLeft.text(`Days until due: ${futureDate.diff(todaysDate, 'days') +2 }`); 
}

// Change Date format (year-month-day)
function changeDateFormat(date){
    var splitDate = date.split("/");
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
}