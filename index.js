Array.prototype.diff = function(otherArray) {
    return this.filter(x => !otherArray.includes(x))
}
Array.prototype.intersect = function(otherArray) {
    return this.filter(x => otherArray.includes(x))
}

const allSupportedBrowsers = require('browserslist')()

// we ignore safari 10.1 which would support modules, but need a workaround to correctly support nomodule
const moduleSupportingBrowsersQuery = 'edge>=16, firefox>=60, chrome>=61, safari>=11, opera>=48, ios_saf>=11, android>=67, and_chr>=70, and_ff>=63'
const moduleSupportingBrowsers = require('browserslist')(moduleSupportingBrowsersQuery)
// filter module supporting browsers that are not included by our browserslistrc
const filteredModuleSupportingBrowsers = allSupportedBrowsers.intersect(moduleSupportingBrowsers)

const moduleFilter = /^es\.|^web\./
const compatOld = require('core-js-compat')({ targets: allSupportedBrowsers, filter: moduleFilter }).list
const compatNew = require('core-js-compat')({ targets: filteredModuleSupportingBrowsers, filter: moduleFilter }).list
const compatOldButNotNew = compatOld.diff(compatNew)

// next.js already comes with a promise polyfill
const blacklist = ['es.promise', 'es.promise.finally']

require('core-js-builder')({
    modules: compatOldButNotNew,
    blacklist: blacklist,
    filename: 'build/old-without-new-core-js-bundle.js',
})

require('core-js-builder')({
    modules: compatOld,
    blacklist: blacklist,
    filename: 'build/old-core-js-bundle.js',
})

require('core-js-builder')({
    modules: compatNew,
    blacklist: blacklist,
    filename: 'build/new-core-js-bundle.js',
})
