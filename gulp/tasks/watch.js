import gulp from "gulp";

import { reload } from "./server";
import { pages, html } from "./templates";
import { css } from "./styles";
import { scripts } from "./scripts";
import { icons } from "./icons";
import { sprite } from "./sprite";
import { moduleImages } from "./moduleImages";
import { staticFiles } from "./staticFiles";

export const watch = () => {
  global.watch = true;
  const testsPatterns = [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)"
  ];

  // Modules, pages
  gulp
    .watch("src/**/*.pug", gulp.series(pages, reload))
    .on("all", (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      };
    });

  // Modules data
  gulp.watch("src/components/**/*.yml", gulp.series(html, reload));

  // Styles
  gulp.watch("src/**/*.scss", gulp.series(css));

  // Scripts
  gulp.watch(
    "src/**/*.js",
    { ignored: testsPatterns },
    gulp.series(scripts, reload)
  );

  // Modules images
  gulp.watch(
    "src/components/*/images/**/*.{png,jpg,jpeg,gif,svg,webp}",
    gulp.series(moduleImages, reload)
  );

  // Svg icons
  gulp.watch("src/icons/**/*.svg", gulp.series(icons, css, reload));

  // Png sprites
  gulp.watch("src/sprite/**/*.png", gulp.series(sprite, reload));

  // Static files and assets
  gulp.watch("src/public/**/{*,.*}", gulp.series(staticFiles, reload));
};
