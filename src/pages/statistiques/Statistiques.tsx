/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonButtons, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListStatistiques } from "../../store/statistiquesSlice";
// import Menu from "../../components/Menu";

const Statistiques = () => {
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listStatistiques = useSelector((state: any) => state?.statistiques?.listStatistiques);
  const dispatch = useDispatch();

  const [totalJoueur, settotalJoueur] = useState(0);
  const [myData, setmyData] = useState(null);

  const getListStatistiques = useCallback(
    async (values: object) => {
      await axios
        .post("backend/statistiques.php", values)
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
    [dispatch, user_infos_state]
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
      {/* <Menu /> */}
      <IonPage>
        <IonHeader>
          <IonToolbar>
            {/* <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons> */}
            <IonTitle>STATISTIQUES</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
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
                    <IonCol size="6">
                      <IonRow className="align-item-center">
                        <span>
                          <IonImg className="coin-icon" src={"/assets/images/coin.png"}></IonImg>
                          {/* TJK */}
                        </span>
                        <span>
                          <IonCol>{stat.SOLDE_POINTS}</IonCol>
                        </span>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Statistiques;
