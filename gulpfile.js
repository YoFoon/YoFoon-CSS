var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    sourcemaps = require('gulp-sourcemap');


//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css
gulp.task('sassmin', function (done) {
    return gulp.src('./sass/**/*') //匹配文件
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({               //进行浏览器兼容
            browsers: ['last 10 versions']
        }))
        .pipe(concat('style.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist'));    //输出压缩好的新css文件
});

gulp.task('sassmin-dev', function() {
    return gulp.src('./sass/**/*') //匹配文件
        //.pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({               //进行浏览器兼容
            browsers: ['last 10 versions']
        }))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));    //输出压缩好的新css文件
});


gulp.task('watch', function (done) {

    gulp.watch('sass/**/*', ['sassmin-dev']).on('change', reload);
    
    gulp.watch("view/**/*").on('change', reload);
        
});


// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

//开发
gulp.task('default', ['browser-sync','sassmin-dev','watch']);