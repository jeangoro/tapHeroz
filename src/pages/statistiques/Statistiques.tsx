import { IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import axios from "axios";
import { arrowDown, informationCircle } from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListStatistiques } from "../../store/statistiquesSlice";

const Statistiques = () => {
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listStatistiques = useSelector((state: any) => state?.statistiques?.listStatistiques);
  const dispatch = useDispatch();

  const [totalJoueur, settotalJoueur] = useState(0);
  const [myData, setmyData] = useState(null);

  const getListStatistiques = useCallback(
    async (values: object) => {
      await axios
        .post("statistiques.php", values)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            dispatch(setListStatistiques(res.data));

            const myInfos = res.data.filter((stat) => stat.ID_JOUEUR === user_infos_state.ID_JOUEUR);
            // console.log(myData);
            settotalJoueur(res.data.length);
            setmyData(myInfos[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  // if (user_infos_state !== null) {
  //   getListStatistiques({ id_joueur: user_infos_state.ID_JOUEUR });
  // }

  useIonViewDidEnter(() => {
    // console.log("Page did enter view");
    if (user_infos_state !== null) {
      getListStatistiques({ id_joueur: user_infos_state.ID_JOUEUR });
    }
  });

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>STATISTIQUES</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonRow class="t-a-c">
            <IonCol>
              <h1> Classement et rang</h1>
              votre rang: {myData?.LOGIN} ({myData?.RANK}
              {myData?.RANK === "1" ? "er" : "ème"} / {totalJoueur})
            </IonCol>
          </IonRow>
          {listStatistiques?.map((stat, key) => {
            return (
              <IonItem key={key} lines="full">
                <i color="primary" slot="start">
                  {stat.RANK}
                </i>
                <IonLabel>
                  <IonRow>
                    <IonCol>{stat.LOGIN}</IonCol>
                    <IonCol size="2">
                      <IonImg className="coin-icon" src={"/assets/images/coin.png"}></IonImg>
                    </IonCol>
                    <IonCol>{stat.SOLDE_POINTS}</IonCol>
                  </IonRow>
                </IonLabel>
              </IonItem>
            );
          })}
          {/* <IonItem lines="full">
            <IonIcon icon={arrowDown} slot="start"></IonIcon>
            <IonLabel>
              Item Lines Full <br /> <IonIcon icon={informationCircle}></IonIcon>50000
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonIcon icon={arrowDown} slot="start"></IonIcon>
            <IonLabel>
              Item Lines Full <br /> <IonIcon icon={informationCircle}></IonIcon>50000
            </IonLabel>
          </IonItem> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Statistiques;
