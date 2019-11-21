$('#carousel-body .slick').slick({
    centerMode: true,
    slidesToShow: 3,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: true,
                centerMode: true,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: true,
                slidesToShow: 1
            }
        }
    ]
});