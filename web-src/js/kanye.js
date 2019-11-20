$('#carousel-body .slick').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3, 
    // prevArrow:"<img class='a-left control-c prev slick-prev' src='css/images/knob.png'>",
    // nextArrow:"<img class='a-right control-c next slick-next' src='css/images/knob.png'>",
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
});