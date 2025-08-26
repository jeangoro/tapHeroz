import React from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonModal, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";

const AttentePayement = ({ isOpen, setisOpen, paymentProcessor, montant, phoneNumber, annuler }) => {
  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Paiement mobile</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setisOpen(false)}>Fermer</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ fontSize: "small" }} className="ion-padding text-center">
          {/* <Depot isOpen={isOpenDepot} setisOpen={setisOpenDepot} /> */}
          <div>
            <div className="fl-l">{paymentProcessor === 1 ? <IonImg className="img-logo-paiement" src="/assets/images/momo.jpg"></IonImg> : <IonImg className="img-logo-paiement" src="/assets/images/om.jpg"></IonImg>}</div>
            <span className="fl-r">
              <h1>Paiement mobile</h1>
              <br />
              <span>En attente de validation...</span>
            </span>
          </div>
          <br />
          <br />
          <div></div>
          <div className="text-center">
            <IonSpinner style={{ height: "50px", width: "50px" }}></IonSpinner>
          </div>
          <p className="mb-0">Montant à payer</p>
          <h4 style={{ fontWeight: 800, fontSize: "30px" }}>{montant} FCFA</h4>
          <p>
            Une notification de confirmation a été envoyé au numéro du payeur <b>{phoneNumber}</b>. Veuillez entrer votre code secret pour autoriser le paiement. <br />
            Si vous n'avez pas recu la notification dans 1 min, veuillez SVP composer le <b>{paymentProcessor === 1 ? "*126#" : "#150*50#"}</b> pour confirmer la transaction en cours{" "}
          </p>
          <div className="alert alert-info">
            Pour des raisons de sécurité, rassurez-vous bien que le nom de l'initiateur de cette transaction soit bel et bien <b>{paymentProcessor === 1 ? "GLOTELHO" : "HACHTHER SARL"}</b>
          </div>
          <IonButton color={"danger"} onClick={() => annuler(false)}>
            Annuler
          </IonButton>
          <p>
            La transaction sera automatiquement annulée dans
            <h3 style={{ fontWeight: 800, fontSize: "30px" }}>5 min</h3>
          </p>
        </IonContent>
      </IonModal>
    </>
  );
};

export default AttentePayement;
