Vue.component('site-footer', {
    delimiters: ['[[', ']]'],
    template: require('./site-footer/site-footer.tpl'),
    props: [
        'company'
    ],
    computed: {
        year: function () {
            currentYear = new Date().getFullYear();
            return currentYear;
        }
    }
});