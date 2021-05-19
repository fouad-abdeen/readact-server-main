class Language {
  constructor() {
    this._language = "EN";
  }

  init(lan) {
    this._language = lan;
  }

  getLanguage() {
    return this._language;
  }
}

module.exports = new Language();
