/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
// import Jeux from "../components/Jeux";
import { useHistory } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
// import Menu from "../components/Menu";
// import CountDown from "../components/timers/CountDown";
// import RappelParticipation from "../components/RappelParticipation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setListCompetitions, setMyCompetition } from "../../store/playSlice";
// import Menu from "../../components/Menu";
import CountDown from "../../components/timers/CountDown";
import RappelParticipation from "../../components/RappelParticipation";
import Jeux from "../../components/Jeux";
import AddParticipationModal from "./AddParticipationModal";
// import { setListCompetitions } from "../store/playSlice";

const Play: React.FC = () => {
  const userInfos = JSON.parse(sessionStorage.getItem("user_infos")!);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(userInfos);
  // const [leftTime, setLeftTime] = useState(60 * 60 * 24 * 1);
  const [leftTime, setLeftTime] = useState(0);
  const [leftTimeToEnd, setLeftTimeToEnd] = useState(0);
  const [isOpenAddParticipation, setisOpenAddParticipation] = useState(0);
  //   const [competitionIsOpen, setcompetitionIsOpen] = useState(false);

  const competitionIsOpen = useRef(false);
  const competition = useRef(null);

  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listCompetitions = useSelector((state: any) => state?.play?.listCompetitions);
  const myCompetition = useSelector((state: any) => state?.play?.myCompetition);

  useEffect(() => {
    if (user_infos_state.id_competition === null) {
      if (listCompetitions !== null) {
        competition.current = listCompetitions[0];
      }
    } else {
      competition.current = myCompetition;
    }
  }, [listCompetitions, myCompetition, user_infos_state]);

  useEffect(() => {
    if (competition.current !== null) {
      const currentDate = new Date(userInfos.current_date_time); // Example date
      const current_milliseconds = currentDate.getTime();

      const date_time_fin1 = competition.current?.DATE_FIN + " " + competition.current?.HEURE_FIN;
      const date_time_fin = new Date(date_time_fin1);
      const fin_milliseconds = date_time_fin.getTime();
      const temps_fin_restant_en_millisecondes = fin_milliseconds - current_milliseconds;
      const temps_fin_restant_seconds = Math.floor(temps_fin_restant_en_millisecondes / 1000);
      setLeftTimeToEnd(temps_fin_restant_seconds);
      // const myDate = new Date("2025-08-09T07:00:00Z"); // Example date

      const date_time_debut1 = competition.current?.DATE_DEBUT + " " + competition.current?.HEURE_DEBUT;
      //   console.log(date_time_debut1);

      const date_time_debut = new Date(date_time_debut1);
      // const myDate = new Date("2025-08-09T07:00:00Z"); // Example date
      //   const currentDate = new Date(userInfos.current_date_time); // Example date
      //   const current_milliseconds = currentDate.getTime();
      const debut_milliseconds = date_time_debut.getTime();
      //   console.log(debut_milliseconds);
      //   console.log(current_milliseconds);

      const temps_restant_en_millisecondes = debut_milliseconds - current_milliseconds;

      const temps_restant_seconds = Math.floor(temps_restant_en_millisecondes / 1000);

      //   console.log(temps_restant_en_millisecondes);
      //   console.log(temps_restant_seconds);
      if (temps_restant_seconds <= 0) {
        // setcompetitionIsOpen(true);
        competitionIsOpen.current = true;
        console.log("la compétition a commencé!");
      } else {
        console.log("la compétition n'a pas commencé!");
      }

      setLeftTime(temps_restant_seconds);
    }

    if (userInfos?.ID_JOUEUR === undefined) {
      history.push("/login");
    }
  }, [history, userInfos, listCompetitions]);

  // function handleRefresh(event: RefresherCustomEvent) {
  //   setTimeout(() => {
  //     // Any calls to load data go here
  //     console.log("Refresh in progress!");

  //     event.detail.complete();
  //   }, 2000);
  // }

  const getListCompetitions = useCallback(
    async (values: object) => {
      await axios
        .post("backend/list_competitions.php", values)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            dispatch(setListCompetitions(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .post("backend/my_competition.php", values)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            dispatch(setMyCompetition(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  // if (user_infos_state !== null) {
  //   getListCompetitions({ id_joueur: user_infos_state.ID_JOUEUR });
  // }

  useIonViewDidEnter(() => {
    // console.log("Page did enter view");
    if (user_infos_state !== null) {
      getListCompetitions({ id_joueur: user_infos_state.ID_JOUEUR });
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
            <IonTitle>TAP HEROZ</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent> */}

        <IonContent className="ion-padding" fullscreen>
          <AddParticipationModal isOpen={isOpenAddParticipation} setisOpen={setisOpenAddParticipation} />

          {user_infos_state.id_competition !== null && (
            <>
              {competitionIsOpen.current && leftTimeToEnd <= 0 && (
                <div className="alert alert-primary text-center">
                  {" "}
                  La compétition est terminée ! <br /> Vous pouvez vous inscrire au prochain tour de competition qui va commencer dans:
                </div>
              )}

              {competitionIsOpen.current && leftTimeToEnd > 0 ? (
                <div className="alert alert-success text-center">
                  Compétition en cours : elle se termine dans <b>{leftTime && <CountDown timeToWaitInSeconds={leftTimeToEnd} />}</b>
                </div>
              ) : listCompetitions?.length > 0 ? (
                <div className="alert alert-warning text-center">
                  Prochain tour de compétition commence dans :<b>{leftTime && <CountDown timeToWaitInSeconds={leftTime} />}</b>
                </div>
              ) : (
                <div className="alert alert-info text-center">Aucune competition programmé pour l'instant...</div>
              )}
            </>
          )}

          {user_infos_state.id_competition === null && (
            <div>
              <RappelParticipation setisOpenAddParticipation={setisOpenAddParticipation} />
            </div>
          )}

          <Jeux competitionIsOpen={competitionIsOpen} />
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
