// Deprecated but left here for now; use the gulp tasks in the Gruntfile.
var gulp = require('gulp');
var concat = require('gulp-concat');
var cConcat = require('gulp-continuous-concat');
var insert = require('gulp-insert');
var watch = require('gulp-watch');

var tradingViewWrap = {
	pre: 
		'var install = function(jQuery, window) {',
	post:
		'	return window.TradingView;' +
		'};' +
		'if (typeof module !== "undefined" && module["exports"]) {' +
		'	var $ = require("jquery");' +
		'	module["exports"] = function(datafeed) {' +
		'		return install($, Object.assign(window, { Datafeed: datafeed }));' +
		'	};' +
		'} else if(typeof window !== "undefined") {' +
		'	window.lm = install(window.jQuery, window);' +
		'}'
}

var dataFeedWrap = {
	pre:
		'var getDataFeeds = function() {',
	post:
		'	return Datafeeds;' +
		'};' +
		'if (typeof module !== "undefined" && module["exports"]) {' +
		'	module["exports"] = getDataFeeds;' +
		'} else if(typeof window !== "undefined") {' +
		'	window.getDataFeeds = getDataFeeds;' +
		'}'
}

gulp.task( 'build-data-feed', function() {
	return gulp
	.src([
		'./datafeed/datafeed.js'
	])
	.pipe(concat('datafeed.js'))
	.pipe(insert.wrap(dataFeedWrap.pre, dataFeedWrap.post))
	.pipe(gulp.dest('./'));
});

gulp.task( 'build-trading-view', function() {
	return gulp
	.src([
		'./charting_library.min.js'
	])
	.pipe(concat('trading-view.js'))
	.pipe(insert.wrap(tradingViewWrap.pre, tradingViewWrap.post))
	.pipe(gulp.dest('./'));
});

gulp.task( 'dev', ['build-data-feed', 'build-trading-view']);



