# Custom Core-JS Builder

Builds multiple custom core-js based on a provided `.browserslistrc`. Creates separate builds for browsers that support es6 modules and older browsers. Uses `core-js-builder`, `core-js-compat` and `browserslist` to achieve that. Projects can use the `<script nomodule>` technique to take advantage of fewer polyfills for newer browsers.

## Caution

This polyfills **all** browser features, not just the ones needed by the client project. This might not be ideal.

_Note:_ Safari 10.1 supports es6 modules, but does not support the `nomodule` attribute without a polyfill. This project excludes Safari 10.1 from browsers supporting es6 modules for simplicity.

_Note:_ `es.promise.*` is excluded because `next.js` already comes with a Promise polyfill.

## Usage

Execute `npm run build`, the output will be placed in the folder `build`.

Three core-js builds are created:

-   `new-core-js-bundle.js`: polyfills for browsers that _do_ support es6 modules
-   `old-core-js-bundle.js`: all polyfills for browsers that _do not_ support es6 modules
-   `old-without-new-core-js-bundle.js`: only the polyfills for old browsers that are _not_ also required by new browsers. This might be wanted in case `new-core-js-bundle.js` are _always_ loaded, and `old-without-new-core-js-bundle.js` is only loaded on top of this for old browsers using `<script nomodule>`.
