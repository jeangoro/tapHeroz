import React from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonModal, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";

const AttentePayement = ({ isOpen, setisOpen, paymentProcessor, montant, phoneNumber, annuler }) => {
  const { t } = useTranslation();

  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{t("Mobile payment")}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setisOpen(false)}>{t("Close")}</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ fontSize: "small" }} className="ion-padding text-center">
          {/* <Depot isOpen={isOpenDepot} setisOpen={setisOpenDepot} /> */}
          <div>
            <div className="fl-l">{paymentProcessor === 1 ? <IonImg className="img-logo-paiement" src="/assets/images/momo.jpg"></IonImg> : <IonImg className="img-logo-paiement" src="/assets/images/om.jpg"></IonImg>}</div>
            <span className="fl-r">
              <h1>{t("Mobile payment")}</h1>
              <br />
              <span>{t("Waiting for validation...")}</span>
            </span>
          </div>
          <br />
          <br />
          <div></div>
          <div className="text-center">
            <IonSpinner style={{ height: "50px", width: "50px" }}></IonSpinner>
          </div>
          <p className="mb-0">{t("Amount to pay")}</p>
          <h4 style={{ fontWeight: 800, fontSize: "30px" }}>{montant} FCFA</h4>
          <p>
            {t("A confirmation notification has been sent to the payer's number")} <b>{phoneNumber}</b>. {t("Please enter your secret code to authorize the payment.")} <br />
            {t("If you have not received the notification within 1 minute, please dial")} <b>{paymentProcessor === 1 ? "*126#" : "#150*50#"}</b> {t("to confirm the ongoing transaction")}
          </p>
          <div className="alert alert-info">
            {t("For security reasons, please ensure that the name of the initiator of this transaction is indeed")} <b>{paymentProcessor === 1 ? "GLOTELHO" : "HACHTHER SARL"}</b>
          </div>
          <IonButton color={"danger"} onClick={() => annuler(false)}>
            {t("Cancel")}
          </IonButton>
          <p>
            {t("The transaction will be automatically canceled in")}
            <h3 style={{ fontWeight: 800, fontSize: "30px" }}>
              {5} {t("min")}
            </h3>
          </p>
        </IonContent>
      </IonModal>
    </>
  );
};

export default AttentePayement;
