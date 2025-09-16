import React, { useState } from "react";
import { IonPage, IonContent, IonRadio, IonRadioGroup, IonButtons } from "@ionic/react";
import "./Language.css";
import { useHistory } from "react-router-dom";
import HeaderWithBack from "../../../components/HeaderWithBack";
const Languages: React.FC = () => {
  const [selected, setSelected] = useState("en");
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <HeaderWithBack title="Language" />
        <IonRadioGroup value={selected} onIonChange={(e) => setSelected(e.detail.value)}>
          <div className="language-list">
            <div className="language-item">
              <img src="/assets/icon/icons8_france_48px.png" alt="Danish" className="language-flag" />
              <span className="language-label">French</span>
              <IonRadio className="language-radio" value="fr" />
            </div>

            <div className="language-item">
              <img src="/assets/icon/icons8_usa_48px.png" alt="English" className="language-flag" />
              <span className="language-label">English</span>
              <IonRadio className="language-radio" value="en" />
            </div>

            {/* répète pour chaque langue */}
          </div>
        </IonRadioGroup>
      </IonContent>
    </IonPage>
  );
};

export default Languages;
