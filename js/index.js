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

$(function () {
    $('.tlt').textillate({
	    minDisplayTime: 1000,
	    in: { effect: 'fadeInDown', sync: true },
	    out :{  delay: 3, effect: 'fadeOutDown', sync: true},
	    loop: true
	});
})

function registerNavButtons() {
  var sections = ['home', 'contact'];

  sections.forEach(function(section) {
    clickAndScroll('#nav-' + section, '#' + section);
  });
  clickAndScroll('#name', '#contact');
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
