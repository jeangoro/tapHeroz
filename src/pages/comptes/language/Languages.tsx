import React from "react";
import { IonPage, IonContent, IonRadio, IonRadioGroup } from "@ionic/react";
import "./Language.css";
// import { useHistory } from "react-router-dom";
import HeaderWithBack from "../../../components/HeaderWithBack";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
const Languages: React.FC = () => {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <IonPage>
      <IonContent>
        <HeaderWithBack title="Language" />
        <IonRadioGroup
          value={currentLanguage}
          onIonChange={(e) => {
            changeLanguage(e.detail.value);
          }}
        >
          <div className="language-list">
            <div className="language-item">
              <img src="/assets/icon/icons8_france_48px.png" alt="Danish" className="language-flag" />
              <span className="language-label">{t("French")}</span>
              <IonRadio name="language" className="language-radio" value="fr" />
            </div>

            <div className="language-item">
              <img src="/assets/icon/icons8_usa_48px.png" alt="English" className="language-flag" />
              <span className="language-label">{t("English")}</span>
              <IonRadio name="language" className="language-radio" value="en" />
            </div>

            {/* répète pour chaque langue */}
          </div>
        </IonRadioGroup>
      </IonContent>
    </IonPage>
  );
};

export default Languages;
