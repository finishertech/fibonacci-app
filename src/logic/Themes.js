class Theme {
  constructor(
    name,
    appBackgroundColor,
    appColor,
    appHeaderFooterBackgroundColor,
    navButtonBackgroundColor,
    aColor,
    next = null
  ) {
    this.name = name;
    this.appBackgroundColor = appBackgroundColor;
    this.appColor = appColor;
    this.appHeaderFooterBackgroundColor = appHeaderFooterBackgroundColor;
    this.navButtonBackgroundColor = navButtonBackgroundColor;
    this.aColor = aColor;
    this.next = next;
  }
}

const darkTheme = new Theme(
  "Dark",
  "black",
  "white",
  "dimgray",
  "inherit",
  "white"
);
const lightTheme = new Theme(
  "Light",
  "#dfdfdf",
  "inherit",
  "white",
  "transparent",
  "inherit",
  darkTheme
);

darkTheme.next = lightTheme;
const themes = [darkTheme, lightTheme];

export default themes;
