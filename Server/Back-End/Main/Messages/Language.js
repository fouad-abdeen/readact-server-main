"use strict";

let LANGUAGE;

exports.init = (L) => {
  LANGUAGE = L;
};

exports.getLanguage = () => {
  return LANGUAGE;
};
