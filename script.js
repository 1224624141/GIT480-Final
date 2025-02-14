"use strict";

$(function () {
    let output = $("#musicContainer");
    $.ajax({
        url: `https://46d081d8-3853-4389-9415-a362d221ae3f.mock.pstmn.io`,
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
let interval = 3000;
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
    $("#accordion").accordion();
});

// WEATHER API
$(function () {
    let output = $("#forecast");
    let cityId = "4887398";
      let apiKey = "a232504d464b2ecbe95366d71bacddc6";
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=imperial`,
      dataType: "json",
      method: "GET"
    }) // closes ajax
  
      .done(function (data) {
      let html = "";
      let date = new Date();
      let month = date.toLocaleString('default', { month: 'long' });
      let imgUrlStart = "http://openweathermap.org/img/wn/";
  let imgUrlEnd = "@2x.png";
      for (i=0; i<5; i++){
        date.setDate(date.getDate() + 1);
        html += `<section id="dates"><h4>${month} ${date.getDate()}</h4><p>${data.list[1].weather[0].description}</p><img src="${imgUrlStart}${data.list[1].weather[0].icon}${imgUrlEnd}"><p>Low: ${Math.round(data.list[1].main.temp_min)}&deg;</p><p>High: ${Math.round(data.list[1].main.temp_max)}&deg;</p></section>`;
      }
      output.html(html);
      }); // closes success
    
  }); // closes function