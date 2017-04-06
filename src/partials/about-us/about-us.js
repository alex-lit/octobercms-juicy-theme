Vue.component('about-us', {
    delimiters: ['[[', ']]'],
    template: require('./about-us/about-us.tpl'),
    props: [
        'title',
        'description',
        'items'
    ]
});