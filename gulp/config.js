import path from "path";

import imagemin from "gulp-imagemin";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import imageminPngquant from "imagemin-pngquant";
import posthtmlAttrsSorter from "posthtml-attrs-sorter";

import errorHandler from "./util/errorHandler";

const CWD = process.cwd();

export const delConfig = ["public", "tmp"];

export const plumberConfig = {
  errorHandler
};

export const browserSyncConfig = {
  server: "./public",
  notify: false,
  reloadOnRestart: true,
  snippetOptions: {
    rule: {
      match: /<\/body>/i
    }
  }
};

export const htmlPrettifyConfig = {
  unformatted: ["pre", "code", "textarea", "script"],
  indent_char: " ",
  indent_size: 2,
  preserve_newlines: true,
  brace_style: "expand",
  end_with_newline: true
};

export const svgSymbolsConfig = {
  id: "%f",
  templates: [
    // path.join(CWD, "gulp/templates/icons-template.scss"),
    path.join(CWD, "gulp/templates/icons-template.svg")
  ],
  slug: function(name) {
    return name;
  },
  svgAttrs: {
    class: "icons-sprite",
    xmlns: "http://www.w3.org/2000/svg"
  }
};

export const spritesmithConfig = {
  retinaSrcFilter: "**/*@2x.png",
  imgName: "sprite.png",
  retinaImgName: "sprite@2x.png",
  cssName: "sprite.styl",
  algorithm: "binary-tree",
  padding: 8,
  cssTemplate: path.join(CWD, "gulp/templates/sprite-template.mustache")
};

export const imageminConfig = {
  images: [
    // https://github.com/imagemin/imagemin-gifsicle#api
    imagemin.gifsicle({
      interlaced: true,
      optimizationLevel: 3
    }),

    // https://github.com/imagemin/imagemin-jpeg-recompress#api
    imageminJpegRecompress({
      max: 90,
      min: 70
    }),

    // https://github.com/imagemin/imagemin-pngquant#api
    imageminPngquant({ quality: [0.7, 0.9] }),

    // https://github.com/svg/svgo#what-it-can-do
    imagemin.svgo({
      plugins: [{ removeViewBox: false }]
    })
  ],

  icons: [
    // https://github.com/svg/svgo#what-it-can-do
    imagemin.svgo({
      plugins: [
        { removeViewBox: false },
        { removeTitle: true },
        { removeStyleElement: true },
        {
          removeAttrs: {
            attrs: ["id", "class", "data-name", "fill", "fill-rule"]
          }
        },
        { removeEmptyContainers: true },
        { sortAttrs: true },
        { removeUselessDefs: true },
        { removeEmptyText: true },
        { removeEditorsNSData: true },
        { removeEmptyAttrs: true },
        { removeHiddenElems: true },
        { transformsWithOnePath: true }
      ]
    })
  ]
};

export const posthtmlConfig = {
  plugins: [
    posthtmlAttrsSorter({
      order: [
        "class",
        "id",
        "name",
        "data",
        "ng",
        "src",
        "for",
        "type",
        "href",
        "values",
        "title",
        "alt",
        "role",
        "aria"
      ]
    })
  ],
  options: {}
};

export const ghPagesConfig = {
  branch: "gh-pages"
};
