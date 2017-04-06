<address
    class  = "contacts"
    id     = "contacts"
    :style = "'background-color: ' + backgroundColor + ';'"
>
    <div class="contacts__content-wrap">
        <header class="contacts__title">[[ title ]]</header>
        <p class="contacts__subtitle">[[ subtitle ]]</p>
        <div
            class  = "contacts__items-wrap"
            :style = "'background-color: ' + contentBackgroundColor + ';'"
        >

            <figure
                v-for  = "item in items"
                class  = "contacts__item"
                :style = "'background-image: url(' + item.icon + ');'"
            >
                <p class="contacts__item-title">[[ item.title ]]</p>
                <figcaption class="contacts__caption" v-html="65"></figcaption>
            </figure>

        </div>
    </div>
</address>