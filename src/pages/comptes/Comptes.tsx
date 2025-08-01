import React, { useState } from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import Depot from "./Depot";

const Comptes = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Comptes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonRow className="text-align-center">
            <IonCol size="12">
              <IonText color={"success"}>
                <h4 color="danger">Solde du compte: 1000 FCFA</h4>{" "}
              </IonText>
            </IonCol>
            <br />
            <br />
            <IonCol size="4">
              <IonButton onClick={() => setisOpen(true)}>Dépot</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton>Retrait</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton>Transfert</IonButton>
            </IonCol>
          </IonRow>
          <h1>contenu de comptes</h1>
          <IonModal isOpen={isOpen}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Effectuer un dépôt</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setisOpen(false)}>Fermer</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eveniet enim soluta id molestiae eius tempore accusamus impedit perferendis sequi corporis distinctio ex, optio, eligendi vel numquam repellat quibusdam magnam?</p>
            </IonContent>
            <Depot />
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Comptes;
