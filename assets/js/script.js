var clockEl = $("#clock");
var datePickerEl = $("#datepicker");
var daysLeftEl = $("#days-left");
var hourlyWageEl = $("#hourly-wage")
var estTotalEarnedEl = $("#est-total-earned");
var newProjEl = $("#new-proj");
$("#datepicker").datepicker();
$("#project-type").selectmenu();

var projectList = [];

var ProjectObj = {
    "name" : "",
    "type" : "",
    "wage" : "",
    "due_date" : "",
    "day_left" : "",
    "est_total_earned":""
}

// Clock
setInterval(function() {
    clockEl.text(moment().format("hh:mm:ss a"));
}, 1000);

// Eventlistners
datePickerEl.on("change", getDaysLeft );
newProjEl.on("submit", submitInfo);

// Calculate the number of days left till due day
function getDaysLeft(event){
    var formatedDate = changeDateFormat(event.currentTarget.value);
    var futureDate = moment(formatedDate);
    var todaysDate = moment();
    daysLeftEl[0].value = futureDate.diff(todaysDate, 'days') + 1; 
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
    estTotalEarnedEl[0].value = daysLeftEl[0].value * (hourlyWageEl[0].value * 8);
    return
}

function submitInfo(event){
    // Create new ProjObj and push to projectList array
    event.stopPropagation();
    var newProj = new Object(ProjectObj);
    newProj.name = event.currentTarget[1].value;
    newProj.type = event.currentTarget[2].value;
    newProj.wage = event.currentTarget[3].value;
    newProj.due_date = event.currentTarget[4].value;
    newProj.day_left = event.currentTarget[5].value;
    newProj.est_total_earned = event.currentTarget[6].value;
    projectList.push(newProj);
    console.log(projectList);
}