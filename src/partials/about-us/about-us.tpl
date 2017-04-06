<article class="about-us" id="about-us">
    <div class="about-us__content-wrap">
        <header class="about-us__tile">[[ title ]]</header>
        <div class="about-us__subtitle" v-html="description"></div>
        <div class="about-us__items-wrap">

            <figure
                v-for ="item in items"
                class="about-us__item"
            >
                <div
                    class="about-us__item-img"
                    :style="'background-image: url(' + item.icon + ');'"
                ></div>
                <p class="about-us__item-title">[[ item.title ]]</p>
                <figcaption class="about-us__item-desc" v-html="item.text"></figcaption>
            </figure>

        </div>
    </div>
</article>