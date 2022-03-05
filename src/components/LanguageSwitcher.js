import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import languages from "../logic/Languages";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage.code);
  }, [currentLanguage, i18n]);

  return (
    <button onClick={() => setCurrentLanguage(currentLanguage.next)}>
      {currentLanguage.next.name}
    </button>
  );
}
