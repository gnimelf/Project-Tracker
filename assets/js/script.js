var clock = $("#clock")

setInterval(function() {
    clock.text(moment().format("hh:mm:ss a"));
}, 1000);
