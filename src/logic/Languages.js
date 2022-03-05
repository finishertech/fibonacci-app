class Language {
  constructor(code, name, next = null) {
    this.code = code;
    this.name = name;
    this.next = next;
  }
}

const englishLanguage = new Language("en", "English");
const portugueseLanguage = new Language("pt", "Portuguese", englishLanguage);

englishLanguage.next = portugueseLanguage;
const languages = [englishLanguage, portugueseLanguage];
export default languages;
