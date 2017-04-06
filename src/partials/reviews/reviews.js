Vue.component('reviews', {
    delimiters: ['[[', ']]'],
    template: require('./reviews/reviews.tpl'),
    props: [
        'title',
        'items',
        'color'
    ],
    mounted() {
        var vm = this;

        var revievsSlideshow = new Swiper('.reviews [data-slideshow]', {
            pagination: '.reviews [data-pagination]',
            paginationClickable: true,
            autoplay: 4000,
            loop: true,
            speed: 1500,
            autoplayDisableOnInteraction: false,
            grabCursor: true
        });

    }
});