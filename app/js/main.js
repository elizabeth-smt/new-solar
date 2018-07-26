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
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
    });

$('[data-fancybox="gallery"]').fancybox({
	// Options will go here
});


$('.menu-btn').on('click', function(){
    $(this).toggleClass('is-open');
    $(this).siblings('.nav').slideToggle();
});

});
