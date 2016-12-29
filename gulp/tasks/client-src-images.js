'use strict';
var fs = require('mz/fs'),
	path = require('path'),
	Spritesmith = require('gulp.spritesmith'),
	Buffer = require('vinyl-buffer'),
	Merge = require('merge-stream');

module.exports = function(C$, gulp, gutil, $, runSequence, _) {
	var imgSrc = C$.client.images.src,
		imgDev = C$.client.images.dev,
		spritesSrc = C$.client.sprites.src,
		cssSrc = C$.client.css.src;

	function Sprites() {
		return fs.readdir(spritesSrc)
			.then(function(files) {
				return files.filter(function(file) {
					file = C$.Join(spritesSrc, file);
					return fs.statSync(file).isDirectory()
				});
			})
			.catch(function(reason) {
				console.log(reason);
			});
	}

	function SpritesMake(dir, callback) {
		var baseName = 'sprite-' + dir,
			cssName = '_' + baseName + '.' + C$.CSS.type,
			imgName = baseName + '.png',
			baseDir = C$.Join(spritesSrc, dir);
		// Generate our spritesheet
		var spriteData = gulp.src(C$.GlobAll(baseDir))
			.pipe($.plumber())
			.pipe($.debug({
				title: 'sprites'
			}))
			.pipe(Spritesmith({
				imgName: imgName,
				cssName: cssName,
				// cssFormat: C$.CSS.type
			}));
		// Pipe image stream through image optimizer and onto disk
		spriteData.img
			.pipe(Buffer())
			.pipe($.imagemin())
			.pipe(gulp.dest(imgSrc));
		// Pipe CSS stream onto disk
		spriteData.css
			.pipe(gulp.dest(cssSrc))
			// .on('end', callback)
		;
		return Merge(spriteData.img, spriteData.css)
	}

	gulp.task('src-images-sprites', function(callback) {
		Sprites()
			.then(function(data) {
				return data.map(function(v) {
					SpritesMake(v, callback);
				});
			})
	});

	gulp.task('dev-images-clean', function(callback) {
		C$.del(C$.GlobAll([imgDev]))
			.then(function(pathes) {
				callback()
			});
	});

	gulp.task('src-images-copy', ['dev-images-clean'], function() {
		return gulp.src(C$.GlobAll(imgSrc), {
				base: imgSrc
			})
			.pipe($.plumber())
			.pipe($.debug({
				title: 'src-images-copy'
			}))
			.pipe(gulp.dest(imgDev));
	});

	gulp.task('src-images-watch', function(callback) {
		C$.watch('src-images-copy', imgSrc);
		// C$.watch('src-images-sprites', spritesSrc);
		$.watch('**/*.*', {
			cwd: spritesSrc,
			usePolling: true
		}, function(events) {
			var dir = events.dirname.split(path.sep).pop();
			SpritesMake(dir)
		});
	});

	gulp.task('src-images', function(callback) {
		runSequence(
			// 'src-images-sprites',
			'src-images-copy',
			callback
		);
	});
};