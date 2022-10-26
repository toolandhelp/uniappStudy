"use strict";
function getPages() {
  return getCurrentPages();
}
function getCurrentPage() {
  const pages = getPages();
  return pages[pages.length - 1];
}
function getThisPagePath() {
  return getCurrentPage().route;
}
exports.getCurrentPage = getCurrentPage;
exports.getThisPagePath = getThisPagePath;
