import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { people, play, statsChart } from "ionicons/icons";
import React from "react";

const IonTabsBar = () => {
  return (
    <IonTabBar className="tab-bar" slot="bottom">
      <IonTabButton tab="Play" href="/play">
        <IonIcon aria-hidden="true" icon={play} />
        <IonLabel>Play</IonLabel>
      </IonTabButton>
      <IonTabButton tab="stats" href="/stats">
        <IonIcon aria-hidden="true" icon={statsChart} />
        <IonLabel>Stats</IonLabel>
      </IonTabButton>
      <IonTabButton tab="compte" href="/compte">
        <IonIcon aria-hidden="true" icon={people} />
        <IonLabel>Account</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default IonTabsBar;
