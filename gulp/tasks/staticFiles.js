import gulp from "gulp";
import plumber from "gulp-plumber";
import gulpIf from "gulp-if";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import filter from "gulp-filter";

import { plumberConfig, imageminConfig } from "../config";
import { isDevelopment } from "../util/env";

export const staticFiles = () => {
  const filterImages = filter("**/*.{png,jpg,jpeg,gif,svg,webp}", {
    restore: true
  });

  return gulp
    .src("**/{*,.*}", { cwd: "src/public" })
    .pipe(plumber(plumberConfig))
    .pipe(changed("public"))
    .pipe(filterImages)
    .pipe(gulpIf(!isDevelopment, imagemin(imageminConfig.images)))
    .pipe(filterImages.restore)
    .pipe(gulp.dest("public"));
};
