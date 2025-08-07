import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "./Play.css";
import Jeux from "../components/Jeux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import CountDown from "../components/timers/CountDown";
import RappelParticipation from "../components/RappelParticipation";

const Play: React.FC = () => {
  const userInfos = JSON.parse(sessionStorage.getItem("user_infos")!);
  const history = useHistory();
  // console.log(userInfos);
  const [leftTime, setLeftTime] = useState(60 * 60 * 24 * 2);

  useEffect(() => {
    console.log(userInfos?.ID_JOUEUR);

    if (userInfos?.ID_JOUEUR === undefined) {
      history.push("/login");
    }
  }, [history, userInfos]);

  // function handleRefresh(event: RefresherCustomEvent) {
  //   setTimeout(() => {
  //     // Any calls to load data go here
  //     console.log("Refresh in progress!");

  //     event.detail.complete();
  //   }, 2000);
  // }

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>TAP HEROZ</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent> */}

        <IonContent className="ion-padding" fullscreen>
          {/* Temps restant: {leftTime} */}
          <div style={{ color: "red", textAlign: "center" }}>
            Prochain tour de compétition dans : <br />
            <h4>
              <CountDown timeToWaitInSeconds={leftTime} />
            </h4>
          </div>
          <RappelParticipation />
          <Jeux />
          {/* <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent>
              
            </IonRefresherContent>
          </IonRefresher> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Play;
