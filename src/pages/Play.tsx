import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
// import Game from "../components/Game";
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
    console.log(userInfos);

    if (userInfos === null) {
      history.push("/login");
    }
  }, [history, userInfos]);

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
            <CountDown timeToWaitInSeconds={leftTime} />
          </div>
          <RappelParticipation />
          <Jeux />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Play;
