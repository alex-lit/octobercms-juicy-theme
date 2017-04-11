'use strict';

/*
|--------------------------------------------------------------------------
| INIT PLUGINS
|--------------------------------------------------------------------------
|
| Инициализация плагинов node.js
|
*/

const babel      = require('gulp-babel');
const changed    = require('gulp-changed');
const concat     = require('gulp-concat');
const cssBase64  = require('gulp-css-base64');
const del        = require('del');
const flatten    = require('gulp-flatten');
const gulp       = require('gulp');
const imagemin   = require('gulp-imagemin');
const livereload = require('gulp-livereload');
const postcss    = require('gulp-postcss');
const rename     = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const uglify     = require('gulp-uglify');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');

/*
|--------------------------------------------------------------------------
| PROJECT CONFIG
|--------------------------------------------------------------------------
|
| Конфигурация рабочего места, платформы, проекта.
|
*/

// подключение ресурсов проекта
var project = {
    src: 'juicy',
    workstation: 'office', // home, office
    platform: 'october',
    homePath: 'd:/YandexDisk/local.server/OpenServer 5.2.4/domains/',
    officePath: '/Applications/MAMP/htdocs/OctoberCMS/',
    path: function () {
        switch (true) {
            case this.workstation == 'office' && this.platform == 'october':
                return this.officePath + '/themes/' + this.src;
                break;
            case this.workstation == 'home' && this.platform == 'october':
                return this.homePath + this.src + '/themes/' + this.src;
                break;
            default:
                return false;
        }
    },
    images: function () {
        var allImages = [
            'src/assets/app/images/*.*',
            'src/assets/forms/images/*.*',
            'src/assets/global/images/*.*',
            'src/assets/grid/images/*.*',
            'src/assets/images/*.*',
            'src/assets/typography/images/*.*',
            'src/partials/**/images/*.*',
        ];
        return allImages;
    },
    video: function () {
        var allVideos = [
            'src/partials/**/video/*.*',
        ];
        return allVideos;
    },
    files: function () {
        var allFiles = [
            'src/partials/**/files/*.*',
        ];
        return allFiles;
    },
    vendorCSS: function () {
        let vendorCSS = [

            // Базовые библиотеки
            'bower_components/normalize-css/normalize.css',
            'bower_components/animate.css/animate.min.css',

            // Дополнительные библиотеки и плагины
            'bower_components/animsition/dist/css/animsition.min.css',
            'bower_components/lightcase/src/css/lightcase.css',
            'bower_components/remodal/dist/remodal.css',
            'bower_components/remodal/dist/remodal-default-theme.css',
            'bower_components/tipso/src/tipso.min.css',
            'bower_components/Swiper/dist/css/swiper.min.css',
            //'bower_components/fluidbox/dist/css/fluidbox.min.css',
            //'bower_components/colorifyjs/styles/colorify.css',
            'bower_components/legitripple/dist/ripple.min.css',
            'bower_components/flickity/dist/flickity.min.css',
            'bower_components/jquery-selectric/public/selectric.css',

        ];
        return vendorCSS;
    },
    appCSS: function () {
        let appCSS = [

            // Стили шаблона
            // Стили шаблона
            'src/assets/app/**/*.css',
            'src/assets/grid/**/*.css',
            'src/assets/typography/**/*.css',
            'src/assets/forms/**/*.css',
            'src/partials/**/*.css',
            'src/assets/fonts/**/*.css',
            '!src/**/*example*/*.css',

        ];
        return appCSS;
    },
    vendorJS: function () {
        let vendorJS = [

            // Базовые библиотеки
            'node_modules/vue/dist/vue.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery.bem/jquery.bem.js',
            'bower_components/velocity/velocity.min.js',
            //'bower_components/jquery.ba-throttle-debounce.min/index.js',

            // Дополнительные библиотеки и плагины
            'bower_components/bowser/bowser.min.js',
            'bower_components/Swiper/dist/js/swiper.jquery.min.js',
            'bower_components/animsition/dist/js/animsition.min.js',
            //'bower_components/colorifyjs/scripts/colorify.min.js',
            //'bower_components/fluidbox/dist/js/jquery.fluidbox.min.js',
            //'bower_components/jquery-ias.min/index.js',
            'bower_components/jquery.maskedinput/dist/jquery.maskedinput.min.js',
            //'bower_components/jquery_lazyload/jquery.lazyload.js',
            'bower_components/lightcase/src/js/lightcase.js',
            //'bower_components/packery/dist/packery.pkgd.min.js',
            'bower_components/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
            'bower_components/remodal/dist/remodal.min.js',
            //'bower_components/theia-sticky-sidebar/js/theia-sticky-sidebar.js',
            'bower_components/tabtab.js/dist/tabtab.min.js',
            'bower_components/tipso/src/tipso.min.js',
            'bower_components/wow/dist/wow.min.js',
            'bower_components/legitripple/dist/ripple.min.js',
            'bower_components/superplaceholder/dist/superplaceholder.min.js',
            //'bower_components/isotope/dist/isotope.pkgd.min.js',
            'bower_components/jquery.accordion/index.js',
            'bower_components/parallax.js/parallax.min.js',
            'bower_components/flickity/dist/flickity.pkgd.min.js',
            'bower_components/jquery-selectric/public/jquery.selectric.min.js',

            // Плагины для разработки
            'src/assets/dev/jquery.pixlayout.0.9.7.js',
            'src/assets/dev/jquery.pixlayout.config.js',

        ];
        return vendorJS;
    },
    appJS: function () {
        let appJS = [

            // Скрипты шаблона
            'src/assets/grid/**/*.js',
            'src/assets/fonts/**/*.js',
            'src/assets/typography/**/*.js',
            'src/assets/forms/**/*.js',
            'src/partials/**/*.js',
            'src/assets/app/**/*.js',
            '!src/partials/app.js',
            '!src/**/*example*/*.js',

        ];
        return appJS;
    }
}

// конфигурация плагинов проекта
let config = {
    del: {
        force: true
    },
    postcss: [
        require('postcss-cssnext')({
            browsers: ['> 2%']
        }),
    ],
    postcssBuild: [
        require('postcss-cssnext')({
            browsers: ['> 2%']
        }),
        require('cssnano')({
            discardComments: {
                removeAll: true
            },
            safe:         true,
            autoprefixer: false,
            zindex:       false,
        }),
    ],
    cssBase64: {
        maxWeightResource: 50000
    },
    babel: {
        "presets": [
            ["latest", {
                "es2015": {
                    "modules": false
                }
            }]
        ],
        compact: false
    },
    uglify: {
        compress: {
            drop_console: true
        }
    }

}

// наборы gulp тасков
if (project.path()) {
    gulp.task('default', [
        'htm',
        'css--vendor',
        'css--app',
        'js--vendor',
        'js--webpack',
        'fonts',
        'icons',
        'images',
        'video',
        'files',
        'root',
        'watch'
    ]);
    gulp.task('build', [
        'htm',
        'css--base64',
        'js--build--vendor',
        'js--build--webpack',
        'fonts',
        'icons',
        'video',
        'files',
        'root'
    ]);
} else {
    console.error('Ошибка конфигурации проекта! Смотри файл gulpfile.js | project.path() возвращает: ' + project.path());
}



/*
|--------------------------------------------------------------------------
| DEL
|--------------------------------------------------------------------------
|
| Удаление файлов из директории сборки.
|
*/

gulp.task('del', function () {
    return del([
        project.path() + '/**/*',
        'dist/**/*'
    ], config.del).then(paths => {
        console.log('Удалены файлы и папки:\n', paths.join('\n'));
    });
});

/*
|--------------------------------------------------------------------------
| CSS
|--------------------------------------------------------------------------
|
| Сбор всех CSS файлов в 1
|
| !!! Плагин sourcemaps не работает в связке с csscomb
|
*/

// собираем все стили в 1 файл
gulp.task('css--vendor', function () {

    let srcPath  = project.vendorCSS();
    let distPath = 'dist/assets/styles/';
    let projectPath = project.path() + '/assets/styles/';

    return gulp.src(srcPath)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        .pipe(postcss(config.postcss))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());

});

gulp.task('css--app', function () {

    let srcPath  = project.appCSS();
    let distPath = 'dist/assets/styles/';
    let projectPath = project.path() + '/assets/styles/';

    return gulp.src(srcPath)
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(postcss(config.postcss))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());

});

// собираем все стили в 1 файл (после отработки таска по минификации изображений)
gulp.task('css--build--vendor', function () {

    let srcPath  = project.vendorCSS();
    let distPath = 'dist/assets/styles/';
    let projectPath = project.path() + '/assets/styles/';

    return gulp.src(srcPath)
        .pipe(concat('vendor.css'))
        .pipe(postcss(config.postcssBuild))
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath));

});
gulp.task('css--build--app'/*, ['images--build']*/, function () {

    let srcPath  = project.appCSS();
    let distPath = 'dist/assets/styles/';
    let projectPath = project.path() + '/assets/styles/';

    return gulp.src(srcPath)
        .pipe(concat('app.css'))
        .pipe(postcss(config.postcssBuild))
        .pipe(gulp.dest(projectPath))
        .pipe(gulp.dest(distPath));

});

// base64 кодирование изображений, использующихся в стилях (после отработки таска по сборке стилей)
gulp.task('css--base64', ['css--build--vendor','css--build--app', 'images--build'], function () {

    let distPath = 'dist/assets/styles/';
    let projectPath = project.path() + '/assets/styles/';

    return gulp.src(distPath + 'app.css')
        .pipe(cssBase64(config.cssBase64))
        .pipe(gulp.dest(projectPath))
        .pipe(gulp.dest(distPath));
});

/*
|--------------------------------------------------------------------------
| HTM
|--------------------------------------------------------------------------
|
| Сборка .htm файлов.
|
*/

// собираем элементы шаблонизатора в .html страницы
gulp.task('htm', function () {

    var srcPath = [
        'src/**/*.htm',
        '!src/**/*example*/*.htm'
    ];
    var distPath = 'dist/';
    var projectPath = project.path();

    // подставляем данные в шаблонизатор и рендерим
    return gulp.src(srcPath)
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());

});

/*
|--------------------------------------------------------------------------
| JS
|--------------------------------------------------------------------------
|
| Сбор всех JS файлов в 1
|
*/

// собираем все скрипты в 1 файл
gulp.task('js--vendor', function () {

    let srcPath  = project.vendorJS();
    var distPath = 'dist/assets/scripts/';
    var projectPath = project.path() + '/assets/scripts/';

    return gulp.src(srcPath)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(projectPath))
        .pipe(gulp.dest(distPath))
        .pipe(livereload());

});

// собираем все скрипты в 1 файл, прогоняем через транспайнер и
// минифицируем
gulp.task('js--app', function () {

    let srcPath  = project.appJS();
    let tempPath = 'src/partials/';

    gulp.src(srcPath)
        .pipe(concat('app.js'))
        .pipe(babel(config.babel))
        .pipe(gulp.dest(tempPath));

});

gulp.task('js--webpack', ['js--app'], function () {

    setTimeout(function() {

        let srcPath  = project.appJS();
        let tempPath = 'src/partials/';
        let distPath = 'dist/assets/scripts/';
        let projectPath = project.path() + '/assets/scripts/';

        return gulp.src(tempPath + 'app.js')
            .pipe(sourcemaps.init())
            .pipe(webpackStream(require('./webpack.config.js') , webpack))
            .pipe(sourcemaps.write('./'))
            .pipe(rename("app.js"))
            .pipe(gulp.dest(distPath))
            .pipe(gulp.dest(projectPath))
            .pipe(livereload());

    }, 1000);

});

// собираем все скрипты в 1 файл и минифицируем
gulp.task('js--build--vendor', function () {

    let srcPath  = project.vendorJS();
    let distPath = 'dist/assets/scripts/';
    let projectPath = project.path() + '/assets/scripts/';

     gulp.src(srcPath)
        .pipe(concat('vendor.js'))
        .pipe(uglify(config.uglify))
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath));

});
gulp.task('js--build--webpack', ['js--app'], function () {

    setTimeout(function() {

        let srcPath  = project.appJS();
        let tempPath = 'src/partials/';
        let distPath = 'dist/assets/scripts/';
        let projectPath = project.path() + '/assets/scripts/';

        return gulp.src(tempPath + 'app.js')
            .pipe(webpackStream(require('./webpack.config.js') , webpack))
            .pipe(rename("app.js"))
            .pipe(uglify(config.uglify))
            .pipe(gulp.dest(distPath))
            .pipe(gulp.dest(projectPath))
            .pipe(livereload());

    }, 1000);

});

/*
|--------------------------------------------------------------------------
| FONTS
|--------------------------------------------------------------------------
|
| Работа с шрифтами.
|
*/

// перебрасываем все шрифты в директорию сборки
gulp.task('fonts', function () {

    var srcPath = [
        'src/assets/fonts/**/*.*',
        '!src/assets/fonts/*.css'
    ];
    var distPath = 'dist/assets/fonts/';
    var projectPath = project.path() + '/assets/fonts/'

    gulp.src(srcPath)
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());
});

/*
|--------------------------------------------------------------------------
| ICONS
|--------------------------------------------------------------------------
|
| Работа с иконками.
|
*/

// перебрасываем все иконки приложения в директорию сборки
gulp.task('icons', function () {

    var srcPath = 'src/assets/icons/*.*';
    var distPath = 'dist/assets/icons/';
    var projectPath = project.path() + '/assets/icons/'

    gulp.src(srcPath)
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());
});

/*
|--------------------------------------------------------------------------
| IMAGES
|--------------------------------------------------------------------------
|
| Работа с изображениями.
|
*/

// перебрасываем все изображения в директорию сборки
gulp.task('images', function () {

    let srcPath = project.images();
    let distPath = 'dist/assets/images/';
    var projectPath = project.path() + '/assets/images/'

    return gulp.src(srcPath)
        .pipe(flatten())
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());

});

// минифицируем изображения и перебрасываем в директорию сборки
gulp.task('images--build', function () {

    var srcPath = project.images();
    var distPath = 'dist/assets/images/';
    var projectPath = project.path() + '/assets/images/'

    return gulp.src(srcPath)
        .pipe(flatten())
        .pipe(imagemin())
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath));

});

/*
|--------------------------------------------------------------------------
| VIDEO
|--------------------------------------------------------------------------
|
| Перенос видео.
|
*/

// перебрасываем все видео в директорию сборки
gulp.task('video', function () {

    let srcPath = project.video();
    let distPath = 'dist/assets/video/';
    var projectPath = project.path() + '/assets/video/'

    return gulp.src(srcPath)
        .pipe(flatten())
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());

});

/*
|--------------------------------------------------------------------------
| FILES
|--------------------------------------------------------------------------
|
| Перенос с файлами, такими как документы, архивы и прочее.
|
*/

// перебрасываем все видео в директорию сборки
gulp.task('files', function () {

    let srcPath = project.files();
    let distPath = 'dist/assets/files/';
    var projectPath = project.path() + '/assets/files/'

    return gulp.src(srcPath)
        .pipe(flatten())
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());

});

/*
|--------------------------------------------------------------------------
| ROOT
|--------------------------------------------------------------------------
|
| Работа с корневыми файлами темы.
|
*/

// все файлы из корня и .php скрипты (кроме инстументов разработки)
// перебрасываем в директорию сборки
gulp.task('root', function () {

    let srcPath = [
        '!src/assets/dev/**.*',
        'src/**/*.php',
        'src/*.*'
    ];
    var distPath = 'dist/';
    var projectPath = project.path() + '/';

    return gulp.src(srcPath)
        .pipe(gulp.dest(distPath))
        .pipe(gulp.dest(projectPath))
        .pipe(livereload());

});

/*
|--------------------------------------------------------------------------
| WATCH
|--------------------------------------------------------------------------
|
| Отслеживание изменений во всех файлах проекта.
|
*/

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(project.appCSS(), ['css--app']);
    gulp.watch(['src/**/*.htm'], ['htm']);
    gulp.watch(['src/**/*.tpl'], ['js--webpack']);
    gulp.watch(project.appJS(), ['js--webpack']);
    gulp.watch(project.images(), ['images']);
    gulp.watch(project.video(), ['video']);
    gulp.watch(project.files(), ['files']);
    gulp.watch('src/*.*', ['root']);
});