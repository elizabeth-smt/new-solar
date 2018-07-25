$(document).ready(function(){

$('.review-carousel')
    .on('init', function(){
        $(this).show();
    })
    .slick({
        arrows: false,
        asNavFor: '.person-carousel',
        swipe: false
    });

$('.person-carousel')
    .on('init', function(){
        $(this).show();
    })
    .slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.review-carousel',
        // dots: true,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
    });

$('[data-fancybox="gallery"]').fancybox({
	// Options will go here
});

$(function() {
    var pull 	= $('.nav__menu');
    menu 		= $('.nav__link');
    menuHeight	= menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });

    $(window).resize(function(){
        var w = $(window).width();
        if(w > 320 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });
});

$('.menu-btn').on('click', function(){
    $(this).toggleClass('is-open');
    $(this).siblings('.nav').slideToggle();
});

});
