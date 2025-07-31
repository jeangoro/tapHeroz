import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Parrainages = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Partages et Parrainages</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {/* <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">Tab 2</IonTitle>
                </IonToolbar>
              </IonHeader> */}
          <h1>contenu de Parrainages</h1>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Parrainages;
