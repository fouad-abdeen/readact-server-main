let LANGUAGE = "EN";

exports.init = (L) => {
  LANGUAGE = L;
};

exports.getLanguage = () => LANGUAGE;
