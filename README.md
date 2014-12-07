# gulp-ng-boba
> gulp.js plugin for ngBoba

## Usage

First, install `gulp-replace` as a development dependency:

```shell
npm install --save-dev macro1/gulp-ng-boba
```

Then, add it to your `gulpfile.js`:

```javascript
var ngBoba = require('gulp-ng-boba');

gulp.task('app-boba', function(){
  gulp.src(['js/**/*.js'])
    .pipe(ngBoba("app.boba.json", {
      verbose: true,
      dependencies: [
       'lib/angular-1.3.0.js'
      ],
      modules: ['app']
    }))
    .pipe(gulp.dest('build/'));
});
```

## API

gulp-ng-boba should be called with a destination file and configuration.

### ngBoba(file, options)

#### file
Type: `String`

The file to save the ngBoba source configuration to.

#### options
Type: `Object`

Configuration to pass to ngBoba. `options.file` is configured by the
gulp.js stream, do not configure it when using this gulp plugin.
