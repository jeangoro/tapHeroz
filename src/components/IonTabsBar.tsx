import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { people, play, statsChart } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

const IonTabsBar = () => {
  const { t } = useTranslation();
  return (
    <IonTabBar className="tab-bar" slot="bottom">
      <IonTabButton tab="Play" href="/play">
        <IonIcon aria-hidden="true" icon={play} />
        <IonLabel>{t("Play")}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="stats" href="/stats">
        <IonIcon aria-hidden="true" icon={statsChart} />
        <IonLabel>{t("Stats")}</IonLabel>
      </IonTabButton>
      <IonTabButton tab="compte" href="/compte">
        <IonIcon aria-hidden="true" icon={people} />
        <IonLabel>{t("Account")}</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default IonTabsBar;
