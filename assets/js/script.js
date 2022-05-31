var clock = $("#clock");
var datePicker = $("#datepicker");
var daysLeft = $("#days-left");
var hourlyWage = $("#hourly-wage")
var estTotalEarned = $("#est-total-earned");
$("#datepicker").datepicker();
$("#project-type").selectmenu();

// Clock
setInterval(function() {
    clock.text(moment().format("hh:mm:ss a"));
}, 1000);

// Eventlistners
datePicker.on("change", getDaysLeft )

// Calculate the number of days left till due day
function getDaysLeft(event){
    var formatedDate = changeDateFormat(event.currentTarget.value);
    var futureDate = moment(formatedDate);
    var todaysDate = moment();
    daysLeft.text(futureDate.diff(todaysDate, 'days') + 1); 
    calcEstTotalEarned();
    return;
}

// Change Date format (year-month-day)
function changeDateFormat(date){
    var splitDate = date.split("/");
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
}

// Calculate the Est. Total Earned
function calcEstTotalEarned (){
   console.log(estTotalEarned[0].innerHTML = daysLeft[0].innerHTML * (hourlyWage[0].value * 8));
    return
}

