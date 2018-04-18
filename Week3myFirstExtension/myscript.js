$("body").css({"webkit-filter": "blur(5px)", "filter": "blur(4px)"});

$("p").each(function (i, p) {
var degree = Math.round(360 * Math.random());
$(p).css({"transform":"rotate("+ degree.toString() +"deg)"});
});


$("li").each(function (i, li) {
var numbers = Math.round(360 * Math.random());
$(li).css({"transform": "translate(" + numbers.toString() +"px, " + numbers + "%)"});
});

$("h1").css({"opacity": "0.15"});





