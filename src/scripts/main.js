import svg4everybody from "svg4everybody";

import * as serviceWorker from "./helpers/serviceWorker";

import ready from "@/scripts/helpers/dom/ready";
import Header from "@/components/header/header";
import Modal from "@/components/modal/modal";

// Factories class based plugins
Header(".header");

// Simple functional plugins
Modal();

ready(function() {
  svg4everybody();
});

// If you want your app to work offline and load faster, you can change
// `unregister()` to `register()` below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

export { Header };
