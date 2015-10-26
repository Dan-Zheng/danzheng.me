$(document).ready(function() {
    console.log("windowHeight: " + $( window ).height() + "px");
    console.log("windowWidth: " + $( window ).width() + "px");

    $('#randomProject').on('click', function() {
        var projects = ["gradients",
                    "rubik-solver",
                    "floats-your-boat",
                    "flappy-bird",
                    "happy-libs",
    ];
        var project = projects[Math.floor(Math.random() * projects.length)];
        console.log(project);
        window.location = "http://danzheng.me/" + project + ".php";
    });
});
