"use strict";

$(function () {
    let output = $("#musicContainer");
    $.ajax({
        url: `https://a85fa659-cfe8-4744-b38d-aadaafb270dd.mock.pstmn.io`,
        dataType: "json",
        method: "GET"
    }) // closes ajax

        .done(function (data) {
            let html = "";
            for (let i = 0; i < data.length; i++) {
                html += `<div class="cardOut"><div class="cardIn"><div class="front"><section class="artist"><img src="${data[i].image}" alt="${data[i].alt}" width="250" height="200"><div><p><span class="artist">${data[i].artist}</span><br><span class="genre">${data[i].genre}</span></p></div></section></div><div class="back"><iframe style="border-radius:12px" src="${data[i].spotify}" width="250" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div></div></div>`;
            }
            output.html(html);
        }) // closes success
        .fail(function (jqXHR) { }); // closes fail
}); // closes function

// lineup carousel
let slides = $(".slider");
let dotsContainer = $(".carousel");
let interval = 5000;
let currentIndex = 0;

// creates space for dots
for (let i = 0; i < slides.length; i++) {
    dotsContainer.append('<span class="dot" data-index="' + i + '"></span>');
}
let dots = $(".dot");

// lets only one picture show at a time
function showSlide(index) {
    slides.hide();
    slides.eq(index).show();
    dots.removeClass("active");
    dots.eq(index).addClass("active");
}
showSlide(currentIndex);

// cycles through the slides
function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}
let sliderInterval = setInterval(autoSlide, interval);

// lets the user click on a specific slide
dots.click(function () {
    let dotIndex = $(this).data("index");
    showSlide(dotIndex);
    currentIndex = dotIndex;
    clearInterval(sliderInterval);
    sliderInterval = setInterval(autoSlide, interval);
});


// ACCORDIAN FOR FAQ
$(function () {
    $("#accordion").accordion({
    
        collapsible: true,
        heightStyle: "content",
        icons: {
            header: "ui-icon-plus",
            activeHeader: "ui-icon-minus"
          }
      });
});

