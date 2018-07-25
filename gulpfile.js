var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require("gulp-rename"),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['watch']);

gulp.task('concat', ['js-vendors', 'css-vendors']);

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/css/**/*.css', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.+(scss|sass)')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('js-vendors', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/jquery-modal/jquery.modal.js'
	])
	.pipe(concat('vendors.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
})

gulp.task('css-vendors', ['sass'], function() {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
		'node_modules/slick-carousel/slick/slick.css',
		'node_modules/jquery-modal/jquery.modal.css',
		'app/css/normalize.css',
	])
	.pipe(concat('vendors.css'))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
})

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{remobeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
})

gulp.task('build', ['clean', 'sass'], function() {
	var buildCss = gulp.src([
			'app/css/main.css',
			'app/css/vendors.min.css',
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildImgs = gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));

	var buildHtml = gulp.src('app/index.html')
	.pipe(gulp.dest('dist'));
})