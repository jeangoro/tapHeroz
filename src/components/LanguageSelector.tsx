/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  function handleLanguageChange(event: CustomEvent) {
    console.log(event.detail.value);

    changeLanguage(event.detail.value);
  }

  return (
    <div className="language-selector">
      {/* <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>Français</button> */}
      <span>{t("Language")}</span>
      <IonList>
        <IonItem>
          <IonSelect onIonChange={(e: any) => handleLanguageChange(e)} aria-label="Favorite language" value={i18n.language}>
            <IonSelectOption value="fr">{t("French")}</IonSelectOption>
            <IonSelectOption value="en">{t("English")}</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </div>
  );
};

export default LanguageSelector;
