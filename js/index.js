$(document).ready(function() {
    $('#randomProject').on('click', function() {
        var projects = ["gradients",
                    "rubik-solver",
                    "floats-your-boat",
                    "flappy-bird",
                    "happy-libs",
    ];
        var project = projects[Math.floor(Math.random() * projects.length)];
        console.log(project);
        window.location = project + ".php";
    });
    console.log($('#text1').width());
    var width = $('#text1').width();
    $('#textScroll').width(width);
    setInterval(function() {
        console.log($('#textScroll').width());
    }, 100);
});
