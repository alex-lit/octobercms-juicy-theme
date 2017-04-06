Vue.component('portfolio', {
    delimiters: ['[[', ']]'],
    template: require('./portfolio/portfolio.tpl'),
    props: [
        'title',
        'description',
        'images',
        'color'
    ]
});