var clockEl = $("#clock");
var datePickerEl = $("#datepicker");
var daysLeftEl = $("#days-left");
var hourlyWageEl = $("#hourly-wage")
var estTotalEarnedEl = $("#est-total-earned");
var newProjEl = $("#new-proj");
var projectTable = $("#project-table");
$("#datepicker").datepicker();
$("#project-type").selectmenu();

var storedProjects = "";

var projectList = [];

var ProjectObj = {
    "name": "",
    "type": "",
    "wage": "",
    "due_date": "",
    "day_left": "",
    "est_total_earned": ""
}

// Clock
setInterval(function () {
    clockEl.text(moment().format("hh:mm:ss A") + " EST");
}, 1000);

// Eventlistners
datePickerEl.on("change", getDaysLeft);
newProjEl.on("submit", submitInfo);

// Calculate the number of days left till due day
function getDaysLeft(event) {
    daysLeftEl[0].value = calcDaysLeft(event.currentTarget.value);
    calcEstTotalEarned();
    return;
}

// Change Date format (year-month-day)
function changeDateFormat(date) {
    var splitDate = date.split("/");
    return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
}

// Calculate the Est. Total Earned
function calcEstTotalEarned() {
    estTotalEarnedEl[0].value = daysLeftEl[0].value * (hourlyWageEl[0].value * 8);
    return
}

// Create proj obj and add it to project list
function submitInfo(event) {
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
    printProjectData();
}

//populate date to page
function printProjectData() {

    // setup project header 
    tableHeader =`
        <tr>
            <th>Project Name</th>
            <th>Project Type</th>
            <th>Hour Wage</th>
            <th>Due Date</th>
            <th>Days left</th>
            <th>Estimated Total Earned</th>
        </tr>
    `;

    var tableRows = "";

     for (var i = 0; i < projectList.length; i++) {

        var tableRow = `
            <tr>
                <td> ${projectList[i].name}</td>
                <td> ${projectList[i].type}</td>
                <td> ${projectList[i].wage}</td>
                <td> ${projectList[i].due_date}</td>
                <td> ${calcDaysLeft(projectList[i].due_date)}</td>
                <td> $ ${projectList[i].est_total_earned}</td>
            </tr>
        `;
            tableRows += tableRow;
    }
    console.log(tableRows)
    projectTable[0].innerHTML = tableHeader + tableRows;
    saveToLocalStorage();
}

function calcDaysLeft(dueDate) {
    var formatedDate = changeDateFormat(dueDate);
    var futureDate = moment(formatedDate);
    var todaysDate = moment();
    return futureDate.diff(todaysDate, 'days') + 1;
}

function saveToLocalStorage() {
    if (projectList != []) {
        storedProjects = JSON.stringify(projectList);
        localStorage.setItem("save_projects", storedProjects)
    }
}

function loadFromLocalStorage() {
    storedProjects = localStorage.getItem("save_projects");
    if (storedProjects != null) {
        projectList = JSON.parse(storedProjects);
        printProjectData();
    }
}

loadFromLocalStorage();