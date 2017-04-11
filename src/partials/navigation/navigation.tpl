<nav class="navigation" id="navigation" data-scroll-offset>
    <div class="navigation__content-wrap">

        <a
            href   = "/"
            class  = "navigation__logo"
            :style = "'background-image: url(' + logo + ');'"
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