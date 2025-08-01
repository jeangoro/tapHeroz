/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";

import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfos } from "../../store/userInfosSlice.js";
import PayIframe from "./PayIframe.js";

const Depot = () => {
  const [montantDepot, setmontantDepot] = useState("");
  const [telephoneDepot, settelephoneDepot] = useState<any>("");
  //   const history = useHistory();

  const user_infos = useSelector((state: any) => state.userInfos.user_infos);
  const dispatch = useDispatch();

  const [canOpenPayIframe, setcanOpenPayIframe] = useState(false);

  const connexion = async (values: object) => {
    console.log(user_infos);

    await axios
      .post("depot.php", values)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          sessionStorage.setItem("user_infos", JSON.stringify(res.data));
          dispatch(setUserInfos(res.data));
          // setState("user_infos", res.data);
          // setState("lastPointsSaved", res.data.SOLDE_POINTS);
          // setIsOpen(true);
          setcanOpenPayIframe(true);
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
      <IonCard style={{ height: "-webkit-fill-available" }}>
        <IonCardContent>
          {!canOpenPayIframe ? (
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                connexion({ id_joueur: user_infos.ID_JOUEUR, type: "depot", montant: montantDepot, motif: "Recharge du compte par le numero: " + telephoneDepot, description: "" });
              }}
            >
              <IonGrid fixed={true} className="ion-padding" style={{ innerHeight: "100%" }}>
                <IonRow className="ion-align-items-center">
                  <IonCol>
                    <>
                      <IonInput name="montantDepot" type="text" value={montantDepot} onIonChange={(e) => setmontantDepot(e.detail.value)} label="Montant du dépôt" labelPlacement="floating" fill="outline" placeholder="Montant du dépôt"></IonInput>
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
            <PayIframe />
          )}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Depot;
