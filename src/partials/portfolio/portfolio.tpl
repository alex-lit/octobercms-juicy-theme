<section class="portfolio" id="portfolio">
    <div class="portfolio__content-wrap">

        <header class="portfolio__tile">[[ title ]]</header>
        <div class="portfolio__subtitle" v-html="description"></div>

    </div>
    <div
        class  = "portfolio__items-wrap"
        :style = "'background-color: '+ color + ';'"
    >

        <figure
            v-for     = "image in images"
            class     = "portfolio__item"
            :style    = "'background-image: url(' + image + ');'"
            :href     = "image"
            data-rel  = "lightcase:portfolio"
            data-portfolio-item
            data-ripple
        ></figure>

    </div>
</section>