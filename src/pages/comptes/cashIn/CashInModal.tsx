/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonList, IonModal, IonRow, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToolbar, useIonToast } from "@ionic/react";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./CashInModal.css";
// import { setUserInfos } from "../../store/userInfosSlice.js";
// import PayIframe from "./PayIframe.js";
import { useHistory } from "react-router";
import AttentePayement from "../AttentePayement/AttentePayement";

const CashInModal = ({ isOpen, setisOpen }) => {
  const [montantDepot, setmontantDepot] = useState("");
  const [isValidMontantDepot, setisValidMontantDepot] = useState(false);
  const [payer_name, setpayer_name] = useState("");
  const [payment_processor, setpayment_processor] = useState(1);
  const [telephoneDepot, settelephoneDepot] = useState<any>("");
  const [isValidTelephoneDepot, setisValidTelephoneDepot] = useState<any>("");
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

  // const errorStyle = {
  //   borderColor: "red",
  //   border: "1px solid red",
  //   borderRadius: "10px",
  //   boxShadow: "0px 0px 10px 1px red",
  // };

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
      setisOpen(false);
      history.go(0);
    });
  };

  // const listingDepot = () => {
  //   setTimeout(() => {
  //     // const forms = document.getElementsByClassName("form-control");
  //     const forms = document.getElementById("iframe-CashInModal");
  //     console.log(forms);
  //   }, 10000);
  // };

  const doDepot = async (values: any) => {
    // console.log(user_infos);
    // console.log("values: ", values);

    // "success": false,
    // "message": "Payment link PENDING",
    // "new_balance": 0,

    const newValues = {
      id_joueur: user_infos.ID_JOUEUR,
      type_transaction: "CashInModal",
      montant: montantDepot,
      motif: "Recharge du compte par le numero: " + telephoneDepot,
      description: "",
      valide: values?.success ? 1 : 0,
    };

    await axios
      .post("backend/CashInModal.php", newValues)
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
    // console.log(user_infos);
    // console.log("values:", values);
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
          doDepot(res.data);
          setpayementEncours(false);
          // setcanOpenPayIframe(true);
          // listingDepot();
          //   window.open("https://pay.glotelho.cm/collect/mhitr7pqZA");
        } else {
          presentToast("middle", res.data.message);
        }
        // history.push("https://pay.glotelho.cm/collect/mhitr7pqZA");

        // history.go(0);
        // console.log(user_infos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkPhoneNumber = (value) => {
    settelephoneDepot(value);
    // console.log(value);
    // console.log(value.length);
    if (value.length >= 9 && value.length < 13) {
      setisValidTelephoneDepot(true);
    } else {
      setisValidTelephoneDepot(false);
    }
  };

  const checkMontant = (value) => {
    setmontantDepot(value);
    // console.log(value);
    // console.log(value.length);
    if (value >= 100 && value <= 50000) {
      setisValidMontantDepot(true);
    } else {
      setisValidMontantDepot(false);
    }
  };

  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Effectuer un dépôt</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setisOpen(false)}>
                <b>X</b>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <AttentePayement isOpen={payementEncours} setisOpen={setpayementEncours} paymentProcessor={payment_processor} montant={montantDepot} phoneNumber={telephoneDepot} annuler={setpayementEncours} />
          <p className="text-center">Veuillez remplir vos informations pour recharger votre compte</p>
          {/* <CashInModal /> */}
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
                      <IonInput name="payer_name" type="text" value={payer_name} onIonChange={(e) => setpayer_name(e.detail.value)} label="Votre nom" labelPlacement="floating" fill="outline" placeholder="Votre nom"></IonInput>

                      <IonInput
                        // style={!isValidMontantDepot && errorStyle}
                        className="mt-4"
                        name="montantDepot"
                        type="number"
                        value={montantDepot}
                        onKeyUp={(e) => checkMontant(e.currentTarget.value)}
                        label="Montant du dépôt"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Montant du dépôt"
                      ></IonInput>
                      {!isValidMontantDepot && <IonText color={"danger"}>Montant invalide</IonText>}
                      <br />
                      <IonInput className="mt-2" name="telephoneDepot" type="number" value={telephoneDepot} onKeyUp={(e) => checkPhoneNumber(e.currentTarget.value)} label="Numéro de téléphone du payeur" labelPlacement="floating" fill="outline" placeholder="Numéro de téléphone du payeur"></IonInput>
                      {!isValidTelephoneDepot && <IonText color={"danger"}>Téléphone invalide</IonText>}

                      <div className="mt-3" style={{ color: "blue" }}>
                        <h5 className="fl-l">Total à payer </h5>:<h5 className="fl-r">{montantDepot} FCFA</h5>
                      </div>

                      <IonButton type="submit" expand="full" fill="solid" color="primary" className="ion-margin-top" disabled={!isValidMontantDepot || !isValidTelephoneDepot}>
                        Recharger
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
            <div>
              <IonSpinner className="center"></IonSpinner>
            </div>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default CashInModal;
