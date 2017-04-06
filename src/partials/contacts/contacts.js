Vue.component('contacts', {
    delimiters: ['[[', ']]'],
    template: require('./contacts/contacts.tpl'),
    props: [
        'title',
        'subtitle',
        'items',
        'backgroundColor',
        'contentBackgroundColor',
    ]
});