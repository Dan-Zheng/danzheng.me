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
    registerNavButtons();
});

function registerNavButtons() {
  var sections = ['home', 'contact'];

  sections.forEach(function(section) {
    clickAndScroll('#nav-' + section, '#' + section);
  });
}

function clickAndScroll(link, section) {
  var delay = 700;

  $(link).click(function() {
    $('html, body').animate({
      scrollTop: $(section).offset().top - 50
    }, delay);

    return false;
  });
}
