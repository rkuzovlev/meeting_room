const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buff = require('vinyl-buffer');
const watchify = require('watchify');
const copy = require('gulp-copy');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gzip = require('gulp-gzip');

const assetsFolder = './dist/assets';

function compile(watch, prod) {
	var browserifyConf = {}
	if (!prod){
		browserifyConf.debug = true
	}

	var bundler, bf = browserify('src/js/client/app.jsx', browserifyConf);
	// ['react', 'react-dom', 'react-router'].forEach(m => bf.ignore(m));


	if (watch) {
		bundler = watchify(bf).transform(babelify);
		bundler.on('update', function() {
			process.stdout.write('-> bundling...');
			rebundle();
			process.stdout.write('  done\n');
		});
	} else {
		bundler = bf.transform(babelify);
	}

	function rebundle() {
		var p = bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('app.js'))
			.pipe(buff());
		
			if (prod){
				p = p.pipe(uglify())
			} else {
				p = p.pipe(sourcemaps.init({ loadMaps: true }))
				.pipe(sourcemaps.write('./'));
			}

			p.pipe(gulp.dest(assetsFolder))
			 .pipe(gzip())
			 .pipe(gulp.dest(assetsFolder));
	}


	rebundle();
}

gulp.task('js', function (cb) {
	compile(false, true);
});

gulp.task('js:watch', function (cb) {
	compile(true, false);
});




gulp.task('sass', () => {
	return gulp.src('src/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gzip())
		.pipe(gulp.dest(assetsFolder));
});

gulp.task('sass:watch', function () {
	// gulp.watch('src/sass/**/*.scss', ['sass']);
	watch('src/sass/**/*.scss', (events, done) => {
        gulp.start('sass');
    });
});




gulp.task('assets', () => {
	return gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('./dist/assets'));
});

gulp.task('assets:watch', function () {
	// gulp.watch('src/sass/**/*.scss', ['sass']);
	watch('src/assets/**/*.*', (events, done) => {
        gulp.start('assets');
    });
});

gulp.task('build', ['js', 'sass', 'assets'])
gulp.task('default', ['sass', 'assets', 'sass:watch', 'js:watch', 'assets:watch'])