<nav class="navigation" id="navigation" data-scroll-offset>
    <div class="navigation__content-wrap">

        <a
            v-if   = "logo !== '/storage/app/media/'"
            href   = "/"
            class  = "navigation__logo"
            :style = "'background-image: url(' + logo + ');'"
        ></a>

        <a
            v-else
            href   = "/"
            class  = "navigation__logo"
        ></a>

        <ul class="navigation__items-wrap">
            <li
                class  = "navigation__item"
                v-for  ="item in enabledComponents"
            >
                <a
                    :href = "item.link"
                    class = "navigation__lnk"
                    data-ripple
                >[[ item.title ]]</a>
            </li>
        </ul>
    </div>

</nav>