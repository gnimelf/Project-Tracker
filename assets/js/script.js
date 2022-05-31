var clock = $("#clock")
$( "#datepicker" ).datepicker();
$( "#project-type" ).selectmenu();

setInterval(function() {
    clock.text(moment().format("hh:mm:ss a"));
}, 1000);


