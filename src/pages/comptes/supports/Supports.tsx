import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import React from "react";
import HeaderWithBack from "../../../components/HeaderWithBack";
import { useTranslation } from "react-i18next";
import { logoWhatsapp, phonePortrait } from "ionicons/icons";

const Supports = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonHeader className="bg-light">
        <HeaderWithBack title={t("Supports")} />
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonList>
          <IonItem>
            <IonIcon aria-hidden="true" icon={phonePortrait} slot="start"></IonIcon>
            <IonLabel>
              {t("Phone")} :{" "}
              <span className="text-primary">
                <a href="tel:+237679628124">{"+237679628124"}</a>
              </span>{" "}
              /{" "}
              <span className="text-primary">
                <a href="tel:+237699030871">{"+237699030871"}</a>
              </span>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon aria-hidden="true" icon={logoWhatsapp} slot="start"></IonIcon>
            <IonLabel>
              {t("Whatsapp")} :{" "}
              <span className="text-primary">
                <a href="https://wa.me/237679628124">{"+237679628124"}</a>
              </span>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Supports;
