jQuery(document).ready(function ($) {

    // stickySidebar = function () {
    //     if ($([data - sticky]).length) {
    //         $('[data-sticky]').theiaStickySidebar({
    //             additionalMarginTop: 16
    //         });
    //     };
    // };
    // if ($(document).width() >= 1120) {
    //     setTimeout(stickySidebar, 0);
    // };
    // $(window).resize(function () {
    //     setTimeout(stickySidebar, 0);
    // });

});
jQuery(document).ready(function ($) {

    //images padding
    $('.typography img').each(function () {
        if ($(this).css('float') == 'left') {
            $(this).css({
                marginRight: '1em'
            });
        } else if ($(this).css('float') == 'right') {
            $(this).css({
                marginLeft: '1em'
            });
        }
    });

    //remove empty <p> tags
    $('.typography p').filter(function () {
        return $.trim($(this).text()) === '' && $(this).children().length == 0;
    }).remove();

    //srcollable tables
    function srcollableTables() {
        $('.typography table').each(function () {
            if ($(this).width() >= $(window).width() - $('.js-sticky-sidebar').width()) {
                $(this).css({
                    display: 'block'
                });
            } else {
                $(this).css({
                    display: 'table'
                });
            }
        });
    }
    srcollableTables();
    $(window).resize(function () {
        srcollableTables();
    });
});
jQuery(document).ready(function ($) {

    /*
    |--------------------------------------------------------------------------
    | SEND FORM
    |--------------------------------------------------------------------------
    |
    | Валидация полей и отправка формы
    |
    */

    // устанока маски на поля
    $('[data-form-phone-field]').mask("+7 (999) 999-99-99");
    $('[data-form-time-field]').mask("99:99");

    $('[data-form-btn]').click(function () {

        var $b = $(this);
        var $f = $(this).parents('[data-form]');
        var $s = $f.find('[data-form-status]');
        var data = {};
        var bVal = $b.text();

        var templateName = $f.attr('data-form-template');
        var mailAddr = $f.attr('data-form-recipient');
        var reachGoal = $f.attr('data-reachGoal');

        var status = ['Пожалуйста, укажите номер телефона', 'Спасибо, сообщение отправлено', 'При отправке сообщения возникли проблемы. Пожалуйста, отправьте письмо на ящик ' + mailAddr];

        // тряска формы если не проходим валидацию при отправке
        $f.find('*[required]').each(function () {
            $(this).removeAttr('data-form-field-invalid');
            if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
                $(this).attr('data-form-field-invalid', '');
                $f.find('input[data-form-field-invalid], textarea[data-form-field-invalid]').addClass('shake animated');
                setTimeout(function () {
                    $f.find('input[data-form-field-invalid], textarea[data-form-field-invalid]').removeClass('shake animated');
                }, 1000);
            }
        });

        // если есть поля с ошибками то сообщаем об этом пользователю
        if ($f.find('[data-form-field-invalid]').length) {
            $s.html(status[0]).slideDown(500);
            return false;
        }

        // собираем содержимое полей
        $f.find('input, textarea, select').each(function (i) {
            var name = $(this).attr('name');
            var label = $(this).attr('placeholder') || $(this).prev().html();
            label = $.trim(label.replace(/[:*]/g, ''));
            data[name] = {
                label: label,
                value: $(this).val()
            };
        });

        // отправка формы
        $.ajax({
            url: '/themes/' + templateName + '/assets/forms/send-form.php',
            type: 'POST',
            data: {
                send: 'do',
                to: mailAddr,
                subj: $f.attr('title'),
                data: data
            },
            beforeSend: function beforeSend() {
                $b.text('Отправка...');
            },
            success: function success(response) {
                var r = parseInt(response);

                $b.text(bVal);
                $s.html(status[r]).slideUp(500);

                if (r == 1) {
                    $f.attr('data-form-success', '');
                    $f.find('input, textarea, select').val('');

                    // $('[data-form-success-placeholder]').css({
                    //     opacity: '1',
                    //     zIndex: '1000',
                    //     transform: 'scale(1)'
                    // });
                    // setTimeout(function() {
                    //     $s.slideUp(500);
                    // }, 5000);
                }

                yaCounter39444945.reachGoal(reachGoal);return true;
            },
            error: function error(jqXHR, textStatus, ex) {
                alert(textStatus + "," + ex + "," + jqXHR.responseText);
            }
        });
        return false;
    });
});
Vue.component('about-us', {
    delimiters: ['[[', ']]'],
    template: require('./about-us/about-us.tpl'),
    props: ['title', 'description', 'items']
});
Vue.component('contacts', {
    delimiters: ['[[', ']]'],
    template: require('./contacts/contacts.tpl'),
    props: ['title', 'subtitle', 'items', 'backgroundColor', 'contentBackgroundColor']
});
jQuery(document).ready(function ($) {

    // comment_text (VENDOR: vendor_name)

});
Vue.component('form-footer', {
    delimiters: ['[[', ']]'],
    template: require('./form-footer/form-footer.tpl'),
    props: []
});
Vue.component('navigation', {
    delimiters: ['[[', ']]'],
    template: require('./navigation/navigation.tpl'),
    methods: {
        fixMenu: function fixMenu() {
            if ($(document).scrollTop() != 0) {
                $('#menu').addClass('menu--fixed');
            } else {
                $('#menu').removeClass('menu--fixed');
            }
        }
    },
    mounted: function mounted() {

        var vm = this;

        vm.fixMenu();
        $(window).scroll(function () {
            vm.fixMenu();
        });
    }
});
Vue.component('portfolio', {
    delimiters: ['[[', ']]'],
    template: require('./portfolio/portfolio.tpl'),
    props: ['title', 'description', 'images', 'color']
});
Vue.component('promo', {
    delimiters: ['[[', ']]'],
    template: require('./promo/promo.tpl'),
    props: ['title', 'subtitle', 'buttonText', 'images'],
    mounted: function mounted() {
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
Vue.component('reviews', {
    delimiters: ['[[', ']]'],
    template: require('./reviews/reviews.tpl'),
    props: ['title', 'items', 'color'],
    mounted: function mounted() {
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
Vue.component('site-footer', {
    delimiters: ['[[', ']]'],
    template: require('./site-footer/site-footer.tpl')
});
Vue.component('map-widget', {
    delimiters: ['[[', ']]'],
    template: require('./map-widget/map-widget.tpl')
});
var App = new Vue({
    delimiters: ['[[', ']]'],
    el: '#app',
    name: 'App',
    data: {
        animateAnchors: true,
        animationsOnScholl: false,
        customFileInput: false,
        customSelect: false,
        detectBrowser: true,
        disableUserSelect: false,
        galleryLightbox: true,
        infiniteAjaxScroll: false,
        pagePreloader: true,
        pixelPerfect: false,
        rippleEffect: true,
        tooltips: false
    },
    methods: {
        pixlayout: function pixlayout() {
            $.pixlayout({
                src: "/assets/images/theme-about.png",
                show: false,
                top: 0,
                left: -135,
                opacity: 0.2
            });
        },
        bowser: function (_bowser) {
            function bowser() {
                return _bowser.apply(this, arguments);
            }

            bowser.toString = function () {
                return _bowser.toString();
            };

            return bowser;
        }(function () {
            $('html').attr('data-browser', bowser.name.toLowerCase().replace(/\s/g, '-'));
            $('html').attr('data-browser-version', Math.floor(bowser.version));
        }),
        mPageScroll2id: function mPageScroll2id() {
            $("a[href*='#'], button[href*='#']").mPageScroll2id({
                offset: 40,
                scrollSpeed: 1000,
                scrollEasing: 'easeInOutCubic'
            });
        },
        animsition: function animsition() {
            if ($("[data-page-preloader]").length) {
                $("[data-page-preloader]").animsition({
                    inClass: 'fade-in',
                    outClass: 'fade-out',
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: 'a:not([data-remodal-target]):not([target="_blank"]):not([href*="#"]):not([href*=":"])',
                    loading: true,
                    loadingParentElement: 'html',
                    loadingClass: 'animsition-loading',
                    loadingInner: '',
                    timeout: false,
                    timeoutCountdown: 5000,
                    onLoadEvent: true,
                    browser: ['animation-duration', '-webkit-animation-duration'],
                    overlay: false,
                    overlayClass: 'animsition-overlay-slide',
                    overlayParentElement: 'body',
                    transition: function transition(url) {
                        window.location.href = url;
                    }
                });
            }
        },
        lightcase: function lightcase() {
            $('[data-rel^=lightcase]').lightcase({
                liveResize: true,
                fullScreenModeForMobile: true,
                showSequenceInfo: false,
                maxWidth: 1200,
                maxHeight: 1000,
                navigateEndless: true,
                overlayOpacity: 1,
                speedIn: 500,
                speedOut: 500,
                swipe: true
            });
        },
        wow: function wow() {
            new WOW().init();
        },
        tipso: function tipso() {
            if ($("[data-tooltip-text]").length) {
                $('[data-tooltip-text]').each(function () {
                    $(this).tipso({
                        speed: 400,
                        background: '#ededed',
                        titleBackground: '#0f69a8',
                        color: '#33373d',
                        titleColor: '#F0F0F0',
                        titleContent: $(this).attr('data-tooltip-title'),
                        showArrow: true,
                        position: 'top',
                        width: 'auto',
                        maxWidth: '',
                        delay: 500,
                        hideDelay: 0,
                        animationIn: 'fadeIn',
                        animationOut: 'fadeOut',
                        offsetX: 0,
                        offsetY: 0,
                        tooltipHover: false,
                        content: $(this).attr('data-tooltip-text'),
                        ajaxContentUrl: null,
                        contentElementId: null,
                        useTitle: true,
                        templateEngineFunc: null,
                        onBeforeShow: null,
                        onShow: null,
                        onHide: null,
                        size: 'medium'
                    });
                });
            }
        },
        ias: function ias() {
            var ias = $.ias({
                container: '.layout-wrap',
                item: '.items-row',
                pagination: '.pagination',
                next: '.pagination-next a'
            });
            ias.extension(new IASSpinnerExtension({
                src: ''
            }));
            ias.extension(new IASTriggerExtension({
                offset: 2,
                text: 'Load more items'
            }));
            ias.extension(new IASNoneLeftExtension({
                text: "You reached the end"
            }));
        },
        ripple: function ripple() {
            $('[data-ripple]').ripple();
        },
        selectric: function selectric() {
            $('select').selectric();
        },
        nicefileinput: function nicefileinput() {
            $('input[type=file]').nicefileinput({
                label: 'Обзор'
            });
        },
        disableSelect: function disableSelect() {
            document.ondragstart = noselect;
            document.onselectstart = noselect;
            document.oncontextmenu = noselect;

            function noselect() {
                return false;
            };
        },
        fixBrowsersBugs: function fixBrowsersBugs() {
            if ($('html[data-browser=internet-explorer]').length || $('html[data-browser=microsoft-edge]').length) {
                $('img[data-fix--ie--object-fit]').each(function () {
                    $(this).css({
                        'backgroundImage': 'url(' + $(this).attr('src') + ')',
                        'backgroundPosition': 'center center',
                        'backgroundRepeat': 'no-repeat',
                        'backgroundSize': 'cover',
                        'display': 'block'
                    }).removeAttr('src');
                    console.log($(this).css('objectPosition'));
                    console.log($(this).css('objectFit'));
                });
            };
        }
    },
    mounted: function mounted() {

        var vm = this;

        if (vm.pixelPerfect === true) {
            vm.pixlayout();
            console.info('Подключен плагин pixel-perfect верстки.');
        }
        if (vm.detectBrowser === true) {
            vm.bowser();
            console.info('Подключен плагин определения версии браузера.');
        }
        if (vm.animateAnchors === true) {
            vm.mPageScroll2id();
            console.info('Подключен плагин плавного скролла до анкоров.');
        }
        if (vm.pagePreloader === true) {
            vm.animsition();
            console.info('Подключен плагин прелоадера страницы.');
        }
        if (vm.galleryLightbox === true) {
            vm.lightcase();
            console.info('Подключен плагин лайтбокса для изображений.');
        }
        if (vm.animationsOnScholl === true) {
            vm.wow();
            console.info('Подключен плагин анимации при прокрутке страницы.');
        }
        if (vm.tooltips === true) {
            vm.tipso();
            console.info('Подключен плагин тултипов.');
        }
        if (vm.infiniteAjaxScroll === true) {
            vm.ias();
            console.info('Подключен плагин AJAX подгрузки элементов пагинации.');
        }
        if (vm.rippleEffect === true) {
            vm.ripple();
            console.info('Подключен плагин material эффекта для кнопок.');
        }
        if (vm.customSelect === true) {
            vm.selectric();
            console.info('Подключен плагин кастомного селекта.');
        }
        if (vm.customFileInput === true) {
            vm.nicefileinput();
            console.info('Подключен плагин кастомно инпута загрузки файлов.');
        }
        if (vm.disableUserSelect === true) {
            vm.disableSelect();
            console.info('Отключена возможность копирования контента пользователями.');
        }

        vm.fixBrowsersBugs();
    }
});