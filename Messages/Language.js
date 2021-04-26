class Language {
  constructor(language) {
    this._language = language;
  }

  init(lan) {
    this._language = lan;
  }

  getLanguage() {
    return this._language;
  }
}

module.exports = new Language();
