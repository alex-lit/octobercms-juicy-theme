Vue.component('navigation', {
    delimiters: ['[[', ']]'],
    template: require('./navigation/navigation.tpl'),
    props: [
        'logo',
        'enabledComponents'
    ],
    methods: {
        fixMenu() {
            if ($(document).scrollTop() != 0) {
                $('#navigation').addClass('navigation--fixed');
            } else {
                $('#navigation').removeClass('navigation--fixed');
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