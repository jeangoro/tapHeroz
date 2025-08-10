/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonList, IonModal, IonRow, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToolbar, useIonToast } from "@ionic/react";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import { setUserInfos } from "../../store/userInfosSlice.js";
// import PayIframe from "./PayIframe.js";
import { useHistory } from "react-router";

const Depot = ({ isOpen, setisOpen }) => {
  const [montantDepot, setmontantDepot] = useState("");
  const [payer_name, setpayer_name] = useState("");
  const [payment_processor, setpayment_processor] = useState(1);
  const [telephoneDepot, settelephoneDepot] = useState<any>("");
  const history = useHistory();

  const user_infos = useSelector((state: any) => state.userInfos.user_infos);
  // const dispatch = useDispatch();

  // const [canOpenPayIframe, setcanOpenPayIframe] = useState(false);
  const [payementEncours, setpayementEncours] = useState(false);

  const [present] = useIonToast();

  const list_mobile_money = [
    { value: 1, label: "MOMO (MTN Mobile Money)" },
    { value: 2, label: "OM (Orange Money)" },
  ];

  const presentToast = (position: "top" | "middle" | "bottom", message: string) => {
    present({
      message: message,
      duration: 5000,
      position: position,
    });
  };

  const presentToastSuccess = (position: "top" | "middle" | "bottom", message: string) => {
    present({
      message: message,
      duration: 10000,
      position: position,
    }).finally(() => {
      history.go(0);
    });
  };

  // const listingDepot = () => {
  //   setTimeout(() => {
  //     // const forms = document.getElementsByClassName("form-control");
  //     const forms = document.getElementById("iframe-depot");
  //     console.log(forms);
  //   }, 10000);
  // };

  const doDepot = async (values: any) => {
    console.log(user_infos);
    console.log("values: ", values);

    // "success": false,
    // "message": "Payment link PENDING",
    // "new_balance": 0,

    const newValues = {
      id_joueur: user_infos.ID_JOUEUR,
      type_transaction: "depot",
      montant: montantDepot,
      motif: "Recharge du compte par le numero: " + telephoneDepot,
      description: "",
      valide: values?.success ? 1 : 0,
    };

    await axios
      .post("backend/depot.php", newValues)
      .then((res) => {
        // console.log(res);
        if (res.data.status === true) {
          // sessionStorage.setItem("user_infos", JSON.stringify(res.data));
          // dispatch(setUserInfos(res.data));
          // setState("user_infos", res.data);
          // setState("lastPointsSaved", res.data.SOLDE_POINTS);
          // setIsOpen(true);
          // setcanOpenPayIframe(true);
          // listingDepot();
          presentToastSuccess("middle", res.data.message);
          //   window.open("https://pay.glotelho.cm/collect/mhitr7pqZA");
        } else {
          setpayementEncours(false);
          presentToast("middle", res.data.message + " " + values.message);
        }
        // history.push("https://pay.glotelho.cm/collect/mhitr7pqZA");

        // history.go(0);
        console.log(user_infos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doPaymentDepot = async (values: object) => {
    console.log(user_infos);
    console.log("values:", values);
    setpayementEncours(true);
    await axios
      .post("https://paybackend.glotelho.cm/api/v2/payment-links/pay-with-link", values)
      .then((res) => {
        // console.log(res);
        if (res.data.success === true) {
          // sessionStorage.setItem("user_infos", JSON.stringify(res.data));
          // dispatch(setUserInfos(res.data));
          // setState("user_infos", res.data);
          // setState("lastPointsSaved", res.data.SOLDE_POINTS);
          // setIsOpen(true);
          setpayementEncours(false);
          doDepot(res.data);
          // setcanOpenPayIframe(true);
          // listingDepot();
          //   window.open("https://pay.glotelho.cm/collect/mhitr7pqZA");
        } else {
          presentToast("middle", res.data.message);
        }
        // history.push("https://pay.glotelho.cm/collect/mhitr7pqZA");

        // history.go(0);
        console.log(user_infos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
          <p>Veuillez remplir vos informations pour recharger votre compte</p>
          {/* <Depot /> */}
          <IonCard>
            <IonCardContent>
              {!payementEncours ? (
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    doPaymentDepot({ payer_name: payer_name, amount: montantDepot, payment_processor: payment_processor, payer_number: telephoneDepot, type: "TOPUP", link: "yASRDtENBU" });
                  }}
                >
                  <IonGrid fixed={true} className="ion-padding" style={{ innerHeight: "100%" }}>
                    <IonRow className="ion-align-items-center">
                      <IonCol>
                        <>
                          <IonInput name="payer_name" type="text" value={payer_name} onIonChange={(e) => setpayer_name(e.detail.value)} label="Votre nom" labelPlacement="floating" fill="outline" placeholder="Votre nom"></IonInput>
                          <br />
                          <IonRow>
                            <IonCol size="2">{payment_processor === 1 ? <IonImg src="/assets/images/momo.jpg"></IonImg> : <IonImg src="/assets/images/om.jpg"></IonImg>}</IonCol>
                            <IonCol size="10">
                              <IonList>
                                <IonItem>
                                  {list_mobile_money !== undefined && (
                                    <IonSelect label="Moyen de payement" value={payment_processor} labelPlacement="floating" onIonChange={(e) => setpayment_processor(e.detail.value)}>
                                      {list_mobile_money?.map((mobile_money: any, key: number) => (
                                        <IonSelectOption key={key} value={mobile_money?.value}>
                                          {mobile_money?.label}
                                        </IonSelectOption>
                                      ))}
                                    </IonSelect>
                                  )}
                                </IonItem>
                              </IonList>
                            </IonCol>
                          </IonRow>

                          <br />
                          <IonInput name="montantDepot" type="number" value={montantDepot} onIonChange={(e) => setmontantDepot(e.detail.value)} label="Montant du dépôt" labelPlacement="floating" fill="outline" placeholder="Montant du dépôt"></IonInput>
                          <br />
                          <IonInput name="telephoneDepot" type="number" value={telephoneDepot} onKeyUp={(e) => settelephoneDepot(e.currentTarget.value)} label="Numéro de téléphone du payeur" labelPlacement="floating" fill="outline" placeholder="Numéro de téléphone du payeur"></IonInput>

                          <IonButton type="submit" expand="full" fill="solid" color="primary" className="ion-margin-top">
                            Effectuer le dépôt
                          </IonButton>
                          {/* <br /> */}
                          {/* <div style={{ float: "right" }}>
                      Pas de compte? <a href={"/register"}>Inscrivez-vous</a>
                    </div> */}
                        </>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </form>
              ) : (
                <IonSpinner></IonSpinner>
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Depot;
