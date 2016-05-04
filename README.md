# gulp-gitmodified
Only process those files marked as 'Modified' by git in `gulp.src` list when watching on asset changes.

# how to use

```
...
var foo = require('gulp-foo'),
    gitmodified = require('gulp-gitmodified'),
    bar = require('gulp-bar');

gulp.task('compile-hbs', function () {
    gulp.src(path.join(projRoot, 'templates/hbs/**/*.hbs'))
    .pipe(gitmodified())
    .pipe(handlebars({
        optionsA: 'whatever options here'
    }))
    .pipe(gulp.dest(path.join(buildRoot, 'js/hbs')));
});
```

# FAQs

1. I'm using SVN, and it's not working...

  a. You can probably search for something like `gulp-svnmodified`, since this plugin is `GITmodified`.

  b. You can fork this plugin and change the line `git status --porcelain ...` to something like `svn status ...`, please take a reference to SVN documentation to find out the usage.

2. Please support "Add" and "Remove" as well.
  
  To me it's not necessary, you better restart watching the whole project if some files have been added or removed, or you'll have to dynamically modify the `gulp.src` list, which is, to me, not quite efficient, all you need to do is "press ctrl + c then the UP arrow to find your watching command then press Enter".

3. I want to put `gitmodified` after `handlebars`.
  
  I will suggest you putting `gitmodified` right after `gulp.src`, since you want to first filter out all the files that are actually modified then perform actions toward them, otherwise this plugin will lost it's meaning :)
