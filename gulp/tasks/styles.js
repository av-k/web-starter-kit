import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-sass";
import gcmq from "gulp-group-css-media-queries";
import prettier from "gulp-prettier";
import nodeSass from "node-sass";
import concat from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import gIf from "gulp-if";
import cssnano from "gulp-cssnano";
import autoprefixer from "gulp-autoprefixer";
import { plumberConfig } from "../config";
import bs from "../util/getBrowserSyncInstance";
import { isDevelopment } from "../util/env";

sass.compiler = nodeSass;
export const css = () =>
  gulp
    .src("src/**/*.scss")
    .pipe(plumber(plumberConfig))
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: [
          "ie >= 10",
          "ie_mob >= 10",
          "ff >= 29",
          "chrome >= 34",
          "safari >= 6",
          "opera >= 23",
          "ios >= 7",
          "android >= 4.4",
          "bb >= 10"
        ],
        cascade: true
      })
    )
    .pipe(prettier())
    .pipe(gcmq())
    .pipe(gIf(!isDevelopment ,sourcemaps.init({loadMaps: true})))
    .pipe(concat("index.css"))
    .pipe(gIf(!isDevelopment, cssnano()))
    .pipe(gIf(!isDevelopment, sourcemaps.write("../maps")))
    .pipe(gulp.dest("public/assets/stylesheets/"))
    .pipe(bs.reload({ stream: true }));
