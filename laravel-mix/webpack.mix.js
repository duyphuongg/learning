let mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.sass(
  "resources/assets/scss/vendor_fe_shop.scss",
  "public/css/frontend/vendor.css"
);

mix
  .sass(
    "resources/assets/sass/rating-demo-style2.scss",
    "public/css/frontend/list.css"
  )
  .sass(
    "resources/assets/sass/rating-demo-style5.scss",
    "public/css/frontend/grid.css"
  );

mix
  .js(
    ["resources/assets/js/frontend/comment.js"],
    "public/js/frontend/comment.js"
  )
  .version()
  .setPublicPath("./public");

mix
  .sass(
    "resources/assets_45/sass/rating-demo-style8.scss",
    "public/css/frontend/45/carousel.css"
  )
  .sass(
    "resources/assets_45/sass/rating-demo-style2.scss",
    "public/css/frontend/45/list.css"
  )
  .sass(
    "resources/assets_45/sass/rating-demo-style5.scss",
    "public/css/frontend/45/grid.css"
  )
  .sass(
    "resources/assets_45/sass/popup-reviews.scss",
    "public/css/frontend/45/popup-reviews.css"
);
  
mix
  .js(
    ["resources/assets_45/libs/owl-carousel/js/alireview-owl.carousel.min.js"],
    "public/js/frontend/45/alireview-owl.carousel.min.js"
  )
  .version()
  .setPublicPath("./public");
  

mix
  .js(
    ["resources/assets_45/js/frontend/popup-reviews.js"],
    "public/js/frontend/45/popup-reviews.min.js"
  )
  .version()
  .setPublicPath("./public");

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.ts(src, output); <-- Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
