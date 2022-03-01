import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    document.title = appTitle;
  }, [appTitle]);

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
        </nav>
      </header>
      <div className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <div className="App-Footer">
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
