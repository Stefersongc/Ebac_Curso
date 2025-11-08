// gulpfile.mjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { deleteAsync } from "del";
import { series, parallel, watch, src, dest } from "gulp";

const sassCompiler = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const terser = require("gulp-terser");

// ✅ Importações modernas do imagemin e plugins separados
const imagemin = (await import("gulp-imagemin")).default;
const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;
const imageminOptipng = (await import("imagemin-optipng")).default;
const imageminSvgo = (await import("imagemin-svgo")).default;

// =======================================
// Caminhos
// =======================================
const path = {
  scss: "src/scss/**/*.scss",
  js: "src/js/**/*.js",
  images: "src/images/**/*.{jpg,jpeg,png,svg,gif,webp}",
  dist: {
    css: "build/css",
    js: "build/js",
    images: "build/images",
  },
};

// =======================================
// Limpa a pasta build
// =======================================
function clean() {
  return deleteAsync(["build/**", "!build"]);
}

// =======================================
// Compila SASS -> CSS (minificado + autoprefixer + sourcemaps)
// =======================================
function styles() {
  return src("src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sassCompiler({ outputStyle: "compressed" }).on(
        "error",
        sassCompiler.logError
      )
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.dist.css));
}

// =======================================
// Minifica e copia JS
// =======================================
function scripts() {
  return src(path.js)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.dist.js));
}

// =======================================
// Otimiza imagens (versão moderna)
// =======================================
function images() {
  return src(path.images)
    .pipe(
      imagemin([
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
        imageminSvgo(),
      ])
    )
    .pipe(dest(path.dist.images));
}

// =======================================
// Watch (modo desenvolvimento)
// =======================================
function devWatch() {
  watch(path.scss, styles);
  watch(path.js, scripts);
  watch(path.images, images);
}

// =======================================
// Exports ESM
// =======================================
export { clean, styles, scripts, images, devWatch as watch };
export const build = series(clean, parallel(styles, scripts, images));
export default series(clean, parallel(styles, scripts, images), devWatch);