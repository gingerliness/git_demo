//1.less编译 压缩 合并
//2.Js合并 压缩 混淆
// 3.image复制
// 4.html压缩

// 在gulpflie中先载入gulp的包

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

//1.less编译 压缩 合并没有必要一般导包
gulp.task('style',function(){
	//这里是在执行style任务
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
			stream:true
		}));

});

//2.Js合并 压缩 混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({
			stream:true
		}));

});

// 3.image复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream:true
		}));
});

// 4.html压缩
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream:true
		}));
});

gulp.task('serve',function(){
	browserSync({
		server: {
			baseDir:'dist/'
		}
	}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});
























