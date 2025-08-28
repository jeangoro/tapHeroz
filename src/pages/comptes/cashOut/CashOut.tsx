/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonModal, IonRow, IonTitle, IonToolbar, useIonToast } from "@ionic/react";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./CashOut.css";
import PayIframe from "../PayIframe.js";
// import { setUserInfos } from "../../store/userInfosSlice.js";

const CashOut = ({ isOpen, setisOpen }) => {
  const [montantRetrait, setmontantRetrait] = useState("");
  const [nomCompteRetrait, setnomCompteRetrait] = useState<any>("");
  const [telephoneRetrait, settelephoneRetrait] = useState<any>("");
  //   const history = useHistory();

  const user_infos = useSelector((state: any) => state.userInfos.user_infos);
  //   const dispatch = useDispatch();
  const [present] = useIonToast();

  const [canOpenPayIframe, setcanOpenPayIframe] = useState(false);

  const presentToastSuccess = (position: "top" | "middle" | "bottom", message: string) => {
    present({
      message: message,
      duration: 10000,
      position: position,
    }).finally(() => {
      history.go(0);
    });
  };

  const connexion = async (values: object) => {
    console.log(user_infos);

    await axios
      .post("backend/CashOut.php", values)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          //   sessionStorage.setItem("user_infos", JSON.stringify(res.data));
          //   dispatch(setUserInfos(res.data));
          setcanOpenPayIframe(false);
          presentToastSuccess("middle", res.data.message);

          // setState("user_infos", res.data);
          // setState("lastPointsSaved", res.data.SOLDE_POINTS);
          // setIsOpen(true);
          //   setcanOpenPayIframe(true);
          //   window.open("https://pay.glotelho.cm/collect/mhitr7pqZA");
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
            <IonTitle>Demander un Retrait</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setisOpen(false)}>X</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>Veuillez remplir les informations pour demander un CashOut</p>
          {/* <Depot /> */}
          <IonCard>
            <IonCardContent>
              {!canOpenPayIframe ? (
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    connexion({
                      id_joueur: user_infos.ID_JOUEUR,
                      type_transaction: "CashOut",
                      montant: montantRetrait,
                      motif: "CashOut du compte pour le numero: " + telephoneRetrait + " (" + nomCompteRetrait + ")",
                      description: "CashOut du compte pour le numero: " + telephoneRetrait + " (" + nomCompteRetrait + ")",
                      valide: 0,
                    });
                  }}
                >
                  <IonGrid fixed={true} className="ion-padding" style={{ innerHeight: "100%" }}>
                    <IonRow className="ion-align-items-center">
                      <IonCol>
                        <>
                          <IonInput
                            name="montantRetrait"
                            type="text"
                            value={montantRetrait}
                            onIonChange={(e) => setmontantRetrait(e.detail.value)}
                            label="Montant du CashOut"
                            labelPlacement="floating"
                            fill="outline"
                            placeholder="Montant du CashOut"
                          ></IonInput>
                          <br />
                          <IonInput
                            name="telephoneRetrait"
                            type="number"
                            value={telephoneRetrait}
                            onKeyUp={(e) => settelephoneRetrait(e.currentTarget.value)}
                            label="Numéro de téléphone du payeur"
                            labelPlacement="floating"
                            fill="outline"
                            placeholder="Numéro de téléphone du payeur"
                          ></IonInput>
                          <br />
                          <IonInput
                            name="nomCompteRetrait"
                            type="text"
                            value={nomCompteRetrait}
                            onKeyUp={(e) => setnomCompteRetrait(e.currentTarget.value)}
                            label="Nom du compte recepteur"
                            labelPlacement="floating"
                            fill="outline"
                            placeholder="Nom du compte recepteur"
                          ></IonInput>

                          <IonButton type="submit" expand="full" fill="solid" color="primary" className="ion-margin-top">
                            Demander un Retrait
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
                <PayIframe />
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
    </>
  );
};

export default CashOut;
