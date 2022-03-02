import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Numbers from "./pages/Numbers";
import PauloJeronimo from "./components/PauloJeronimo";

function App() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const nextLanguage = { en: "Português", pt: "English" };
  const appTitle = t("title");

  const [currentTheme, setCurrentTheme] = useState("Dark");
  const themes = useMemo(
    () => [
      {
        name: "Dark",
        attributes: {
          appBackgroundColor: "black",
          appColor: "white",
          appHeaderFooterBackgroundColor: "dimgray",
          navButtonBackgroundColor: "inherit",
          aColor: "white",
        },
      },
      {
        name: "Light",
        attributes: {
          appBackgroundColor: "#dfdfdf",
          appColor: "inherit",
          appHeaderFooterBackgroundColor: "white",
          navButtonBackgroundColor: "transparent",
          aColor: "inherit",
        },
      },
    ],
    []
  );

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);

  useEffect(() => {
    const attributes = themes.find((t) => t.name === currentTheme).attributes;
    document.documentElement.style.setProperty(
      "--app-background-color",
      attributes.appBackgroundColor
    );
    document.documentElement.style.setProperty(
      "--app-color",
      attributes.appColor
    );
    document.documentElement.style.setProperty(
      "--app-header-footer-background-color",
      attributes.appHeaderFooterBackgroundColor
    );
    document.documentElement.style.setProperty(
      "--nav-button-background-color",
      attributes.navButtonBackgroundColor
    );
    document.documentElement.style.setProperty("--a-color", attributes.aColor);
  }, [themes, currentTheme]);

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <NavLink to="/">{t("home")}</NavLink> |{" "}
          <NavLink to="/numbers">{t("numbers")}</NavLink> |{" "}
          <NavLink to="/about">{t("about")}</NavLink> |{" "}
          <button
            onClick={() =>
              setCurrentLanguage(currentLanguage === "en" ? "pt" : "en")
            }
          >
            {nextLanguage[currentLanguage]}
          </button>
          {" | "}
          <button
            onClick={() =>
              setCurrentTheme(currentTheme === "Dark" ? "Light" : "Dark")
            }
          >
            {themes[themes.findIndex((t) => t.name === currentTheme)].name}
          </button>
        </nav>
      </header>
      <div className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <div className="App-footer">
        <div className="title">
          {t("developed-by")}{" "}
          <Link to="/about">
            <PauloJeronimo />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
