/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, useIonViewDidEnter } from "@ionic/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListStatistiques } from "../../store/statistiquesSlice";
import Loader from "../../components/Loader";
import "./Stats.css";
import { timeOutline } from "ionicons/icons";

const Stats = () => {
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listStatistiques = useSelector((state: any) => state?.statistiques?.listStatistiques);
  const dispatch = useDispatch();

  const [totalJoueur, settotalJoueur] = useState(0);
  const [myData, setmyData] = useState<any>(null);
  const [getStatLoading, setgetStatLoading] = useState(false);

  const getListStatistiques = useCallback(
    async (values: object) => {
      setgetStatLoading(true);
      await axios
        .post("backend/statistiques.php", values)
        .then((res) => {
          setgetStatLoading(false);
          if (res.status === 200) {
            dispatch(setListStatistiques(res.data));
            const myInfos = res.data.filter((stat: any) => stat.ID_JOUEUR === user_infos_state.ID_JOUEUR);
            settotalJoueur(res.data.length);
            setmyData(myInfos[0]);
          }
        })
        .catch((err) => {
          setgetStatLoading(false);
          console.log(err);
        });
    },
    [dispatch, user_infos_state]
  );

  useIonViewDidEnter(() => {
    if (user_infos_state !== null) {
      getListStatistiques({ id_joueur: user_infos_state.ID_JOUEUR });
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <div className="page-header">
          {!getStatLoading ? (
            <>
              <div className="leadbord">
                <strong className="ranking">
                  {myData?.RANK} <img src="/assets/icon/icons8_combo_chart_30px.png" alt="asset icon" className="rank-icon" />
                </strong>
                <strong className="ranking">0 🗝️</strong>
              </div>
              <div className="reward-banner">
                {myData?.SOLDE_POINTS} 🪙 = XAF {myData?.SOLDE_POINTS / 8.5}
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {!getStatLoading ? (
          <>
            <div className="prize-pool">
              <img src="/assets/icon/icons8_wonder_woman_40px.png" alt="asset icon" />
              <p>
                <span>125,000</span> 🪙
              </p>
            </div>
            <div className="timer">
              <IonIcon icon={timeOutline} />
              <p>Ends in 4d 05h 49m 30s</p>
            </div>
            <div className="info-text">
              <span>
                You have {myData?.SOLDE_POINTS} , and are ranked {myData?.RANK} out of {totalJoueur}.
              </span>
            </div>
            {/* <IonRow class="t-a-c">
              <IonCol>
                <h1>Classement et rang</h1>
                votre rang: {myData?.LOGIN} ({myData?.RANK}
                {myData?.RANK === "1" ? "er" : "ème"} / {totalJoueur})
              </IonCol>
            </IonRow> */}

            {/* Tableau des stats */}
            <div className="ranking-container">
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Earnings</th>
                    <th>Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {listStatistiques?.map((stat, key) => {
                    return (
                      <tr key={key}>
                        <td className="rank-td">{stat.RANK}</td>
                        <td>{stat.LOGIN.charAt(0).toUpperCase() + stat.LOGIN.slice(1).toLowerCase()}</td>
                        <td>{Number(stat.SOLDE_POINTS).toLocaleString()}</td>

                        <td>
                          {/* <img src="/assets/images/coin.png" alt="coin" className="coin-icon" /> */}
                          {stat.PRIZE ?? 0}🪙
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Stats;
