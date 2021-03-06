CV = {
    contact: {
        name: "Dan Zheng",
        cv: "cv.js",
        links: [{
            name: "Mail",
            icon: "img/social/email.svg",
            color: "#0C9688",
            href: "mailto:zheng321@purdue.edu",
            size: 56
        }, {
            name: "Facebook",
            icon: "img/social/facebook.svg",
            size: 28,
            href: "https://www.facebook.com/VoidQuery",
            color: "#3B5999"
        }, {
            name: "Github",
            icon: "img/social/github.svg",
            size: 28,
            href: "https://github.com/Dan-Zheng",
            color: "#0A0F19"
        }, {
            name: "Quora",
            icon: "img/social/quora.svg",
            size: 28,
            href: "https://www.quora.com/profile/Dan-Zheng-2",
            color: "#b72d2c"
        }, {
            name: "Pocket",
            icon: "img/social/pocket.svg",
            href: "http://sharedli.st/danzheng",
            size: 28,
            color: "#EE4056"
        }, {
            name: "Snapchat",
            icon: "../img/social/snapchat.svg",
            href: "http://d141gh7844fsr5.cloudfront.net/snapcode.png",
            size: 28,
            color: "#fffb37"
        }
        ],
        passiveLinks: []
    }
}
Contact = function() {
    function a() {
        l.start(), p = p.data(h.links, function(a) {
            return a.source.index + "-" + a.target.index
        }), p.enter().append("line").attr("class", function(a) {
            return 0 == a.source.index ? "link parent-link" : "link children-link"
        }), p.exit().remove(), q = q.data(h.nodes, function(a) {
            return a.index
        }), g = q.enter().append("g").attr("class", "gnode").attr("transform", function(a) {
            return "translate(" + a.x + "," + a.y + ")"
        }).call(l.drag), q.exit().remove(), g.append("circle").attr("class", "node").attr("r", function(a) {
            return a.size
        }).style("fill", function(a) {
            return a.color
        }).style("stroke", function(a) {
            return d3.rgb(a.color).darker(1.2)
        }).attr("title", function(a) {
            return a.name
        }), g.append("svg:a").attr("xlink:href", function(a) {
            return a.href
        }).attr("target", "_blank").append("image").attr("xlink:href", function(a) {
            return a.icon
        }).attr("x", function(a) {
            return - a.size
        }).attr("y", function(a) {
            return - a.size
        }).attr("width", function(a) {
            return 2 * a.size
        }).attr("height", function(a) {
            return 2 * a.size
        })
    }
    function b() {
        p.attr("x1", function(a) {
            return a.source.x
        }).attr("y1", function(a) {
            return a.source.y
        }).attr("x2", function(a) {
            return a.target.x
        }).attr("y2", function(a) {
            return a.target.y
        }), q.attr("transform", function(a) {
            return "translate(" + a.x + "," + a.y + ")"
        })
    }
    var c = CV.contact, d = c.links, e = c.passiveLinks, f = [{
        source: 1,
        target: d.length - 1
    }
    ];
    d.forEach(function(a, b) {
        0 != b && f.push({
            source: 0,
            target: b
        }), 0 != b && b < d.length - 1 && f.push({
            source: b,
            target: b + 1
        })
    }), d = d.concat(e);
    var h = {
        nodes: [],
        links: []
    };
    $("#contact-cv").attr("href", c.cv);
    var i = $("#contact-svg-container").width(), j = 400/*j = $("#contact-svg-container").height()*/, k = 480 > i ? 120: 250;
    d.forEach(function(a, b) {
        if (0 == b)
            a.x = i / 2, a.y = j / 2;
        else {
            var c = 2 * Math.PI * (b - 1) / (d.length - 1);
            a.x = i / 2 + k * Math.cos(c), a.y = j / 2 + k * Math.sin(c)
        }
    });
    var l = d3.layout.force().nodes(h.nodes).links(h.links).gravity(.1).size([i, j]).linkDistance(function(a) {
        var b = 0 == a.source ? 300: 150;
        return 480 > i ? b / 2 : b
    }).linkStrength(function(a) {
        return 0 == a.source ? 0 : .9
    }).charge(function(a, b) {
        return 0 == b ? 0 : - 1e3
    }).on("tick", b), m = d3.select("#contact-svg-container")
                            .append("svg")
                            .attr("id", "contact-svg")
                            .attr("width", i)
                            .attr("height", j)
                            .attr("viewBox", "0 0 " + i + " " + j)
                            .attr("perserveAspectRatio", "xMinYMid meet")
                            .attr("style", "outline: thin solid #222;"); // add border
    m.attr({
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xmlns:xlink": "http://www.w3.org/1999/xlink",
        version: "1.1"
    });
    var n = m.append("g").attr("class", "g-link"), o = m.append("g").attr("class", "g-node"), p = n.selectAll(".link"), q = o.selectAll(".node");
    a();
    var r = d.length, s = 0, t = setInterval(function() {
        var b = d.shift();
        h.nodes.push(b);
        var c = f.filter(function(a) {
            return a.target == s
        });
        c.forEach(function(a) {
            h.links.push(a)
        }), a(), ++s == r && clearInterval(t)
    }, 300)
}, d3.selection.prototype.animate = function(a) {
    !a && (a = {});
    var b = a.duration ? a.duration: 1500, c = a.ease ? a.ease: d3.ease("exp-out"), d = a.delay ? a.delay: 0;
    delete a.duration;
    var e = this.transition().ease(c).duration(b).delay(d);
    return e
},
$(document).ready(function() {
    Contact();
});
/*
var contact = $("#contact-svg"),
    aspect = contact.width() / contact.height(),
    container = contact.parent();
$(window).on("resize", function() {
    var targetWidth = container.width();
    contact.attr("width", targetWidth);
    contact.attr("height", Math.round(targetWidth / aspect));
}).trigger("resize");*/
