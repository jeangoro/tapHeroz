import { IonButton, IonCol, IonRow } from "@ionic/react";
import React from "react";
import "./Components.css";

const RappelParticipation = () => {
  return (
    <div>
      <p>
        <span className="blinking-text">Veuillez vous enregistrer pour la prochaine compétition:</span>
      </p>
      <IonRow className="competition-rowTJK" style={{ textAlign: "center" }}>
        <IonCol>
          <IonButton color={"warning"}>Je participe à la compétition</IonButton>
        </IonCol>
        {/* <IonCol size="2">
          L 1 <br /> 1 jour{" "}
        </IonCol>
        <IonCol size="2">
          L 2 <br /> 2 jours{" "}
        </IonCol>
        <IonCol size="2">
          L 3 <br /> 3 jours{" "}
        </IonCol>
        <IonCol size="2">
          L 4 <br /> 4 jours{" "}
        </IonCol>
        <IonCol size="2">
          L 5 <br /> 5 jours{" "}
        </IonCol> */}
      </IonRow>
    </div>
  );
};

export default RappelParticipation;
