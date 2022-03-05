import React, { useEffect } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Numbers from "./pages/Numbers";
import PauloJeronimo from "./components/PauloJeronimo";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const { t } = useTranslation();
  const appTitle = t("title");

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
          <LanguageSwitcher/> |{" "}
          <ThemeSwitcher/>
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
