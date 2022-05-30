var clock = $("#clock")

var time = setInterval(() => {
    clock.text(moment().format("hh:mm:ss a"));
}, 1000);
