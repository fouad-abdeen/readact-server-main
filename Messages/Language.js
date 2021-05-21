const { DEFAULT_LANGUAGE } = require("../Config/client");

class Language {
  constructor() {
    this.language = DEFAULT_LANGUAGE;
  }

  init(lan) {
    this.language = lan;
  }

  getLanguage() {
    return this.language;
  }
}

module.exports = new Language();
