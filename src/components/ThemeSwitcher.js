import React, { useState, useEffect } from "react";
import themes from "../logic/Themes";

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-background-color",
      currentTheme.appBackgroundColor
    );
    document.documentElement.style.setProperty(
      "--app-color",
      currentTheme.appColor
    );
    document.documentElement.style.setProperty(
      "--app-header-footer-background-color",
      currentTheme.appHeaderFooterBackgroundColor
    );
    document.documentElement.style.setProperty(
      "--nav-button-background-color",
      currentTheme.navButtonBackgroundColor
    );
    document.documentElement.style.setProperty(
      "--a-color",
      currentTheme.aColor
    );
  }, [currentTheme]);

  return (
    <button onClick={() => setCurrentTheme(currentTheme.next)}>
      {currentTheme.next.name}
    </button>
  );
}
