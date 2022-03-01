import React from "react";
import { useTranslation } from "react-i18next";

export default function PauloJeronimo({
  withLink,
  url,
  headline,
  withHeadline,
}) {
  const { t } = useTranslation();
  const pj = `Paulo Jerônimo`;
  const result = withHeadline
    ? `${headline || t("PauloJeronimo-headline")} (${pj})`
    : pj;
  return withLink ? (
    <a href={url} target="_blank" rel="noreferrer">
      {result}
    </a>
  ) : (
    result
  );
}

PauloJeronimo.defaultProps = {
  url: "https://paulojeronimo.com",
  withHeadline: false,
};
