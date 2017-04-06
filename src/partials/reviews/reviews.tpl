<section
    class="reviews"
    id="reviews"
    :style="'background-color: ' + color + ';'"
>
    <div class="reviews__content-wrap">

        <header class="reviews__title">[[ title ]]</header>

        <div class="reviews__slideshow / swiper-container" data-slideshow>
            <div class="reviews__slideshow-items-wrap / swiper-wrapper">

                <figure
                    v-for="item in items"
                    class="reviews__slideshow-item / swiper-slide"
                >
                    <div
                        class = "reviews__slideshow-item-img"
                        :style = "'background-image: url(' + item.avatar + '); box-shadow: inset 0 0 0 3px ' + color + ', 0 0 0 10px rgba(255, 255, 255, 0.6);'"
                    ></div>
                    <strong class="reviews__slideshow-item-name">[[ item.name ]]</strong>
                    <span class="reviews__slideshow-item-desc">[[ item.info ]]</span>
                    <figcaption class="reviews__slideshow-item-caption" v-html="item.text"></figcaption>
                </figure>

            </div>

            <div class="reviews__slideshow-pagination / swiper-pagination" data-pagination></div>

        </div>
    </div>
</section>