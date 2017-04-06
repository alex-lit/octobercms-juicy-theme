Vue.component('navigation', {
    delimiters: ['[[', ']]'],
    template: require('./navigation/navigation.tpl'),
    methods: {
        fixMenu() {
            if ($(document).scrollTop() != 0) {
                $('#menu').addClass('menu--fixed');
            } else {
                $('#menu').removeClass('menu--fixed');
            }
        }
    },
    mounted() {

        const vm = this;

        vm.fixMenu();
        $(window).scroll(function () {
            vm.fixMenu();
        });
    }
});