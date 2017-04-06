Vue.component('promo', {
    delimiters: ['[[', ']]'],
    template: require('./promo/promo.tpl'),
    props: [
        'title',
        'subtitle',
        'buttonText',
        'images'
    ],
    mounted() {
        var promoSlideshow = new Swiper('.promo [data-slideshow]', {
            paginationClickable: true,
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            loop: true,
            speed: 1500,
            effect: 'fade'
        });
    }
});