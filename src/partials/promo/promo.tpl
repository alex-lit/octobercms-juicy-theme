<section class="promo" id="promo">
    <header class="promo__title">
        <h1 class="promo__title-accent">[[ title ]]</h1>
        <span  class="promo__title-desc">[[ subtitle ]]</span>
        <button
            class = "promo__btn"
            type  = "button"
            href  = "#portfolio"
            data-ripple
        >[[ buttonText ]]</button>
    </header>
    <div class="promo__slideshow / swiper-container" data-slideshow>
        <div class="promo__slideshow-items-wrap / swiper-wrapper">

            <figure v-for ="item in images"
                class  = "promo__slideshow-item / swiper-slide"
                :style = "'background-image: url(' + item + ');'"
            ></figure>

        </div>
    </div>
</section>