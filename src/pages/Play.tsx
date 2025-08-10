// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
// import "./Play.css";
// import Jeux from "../components/Jeux";
// import { useHistory } from "react-router";
// import { useCallback, useEffect, useState } from "react";
// import Menu from "../components/Menu";
// import CountDown from "../components/timers/CountDown";
// import RappelParticipation from "../components/RappelParticipation";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setListCompetitions } from "../store/playSlice";

// const Play: React.FC = () => {
//   const userInfos = JSON.parse(sessionStorage.getItem("user_infos")!);
//   const history = useHistory();
//   const dispatch = useDispatch();
//   // console.log(userInfos);
//   // const [leftTime, setLeftTime] = useState(60 * 60 * 24 * 1);
//   const [leftTime, setLeftTime] = useState(0);

//   const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
//   const listCompetitions = useSelector((state: any) => state?.play?.listCompetitions);

//   useEffect(() => {
//     console.log(userInfos?.ID_JOUEUR);
//     console.log(userInfos?.current_date_time);
//     // const myDate = new Date("2025-08-09T07:00:00Z"); // Example date
//     const myDate = new Date(userInfos.current_date_time); // Example date
//     const milliseconds = myDate.getTime();
//     const seconds = Math.floor(milliseconds / 1000);

//     console.log(seconds);

//     setLeftTime(seconds);

//     if (userInfos?.ID_JOUEUR === undefined) {
//       history.push("/login");
//     }
//   }, [history, userInfos]);

//   // function handleRefresh(event: RefresherCustomEvent) {
//   //   setTimeout(() => {
//   //     // Any calls to load data go here
//   //     console.log("Refresh in progress!");

//   //     event.detail.complete();
//   //   }, 2000);
//   // }

//   const getListCompetitions = useCallback(
//     async (values: object) => {
//       await axios
//         .post("backend/list_competitions.php", values)
//         .then((res) => {
//           // console.log(res);
//           if (res.status === 200) {
//             dispatch(setListCompetitions(res.data));

//             // const myInfos = res.data.filter((stat) => stat.ID_JOUEUR === user_infos_state.ID_JOUEUR);
//             // console.log(myData);
//             // settotalJoueur(res.data.length);
//             // setmyData(myInfos[0]);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     },
//     [dispatch]
//   );

//   // if (user_infos_state !== null) {
//   //   getListCompetitions({ id_joueur: user_infos_state.ID_JOUEUR });
//   // }

//   useIonViewDidEnter(() => {
//     // console.log("Page did enter view");
//     if (user_infos_state !== null) {
//       getListCompetitions({ id_joueur: user_infos_state.ID_JOUEUR });
//     }
//   });

//   return (
//     <>
//       <Menu />
//       <IonPage id="main-content">
//         <IonHeader>
//           <IonToolbar>
//             <IonButtons slot="start">
//               <IonMenuButton></IonMenuButton>
//             </IonButtons>
//             <IonTitle>TAP HEROZ</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         {/* <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent> */}

//         <IonContent className="ion-padding" fullscreen>
//           {/* Temps restant: {leftTime} */}
//           <div style={{ color: "red", textAlign: "center" }}>
//             Prochain tour de compétition dans : <br />
//             <h4>{leftTime && <CountDown timeToWaitInSeconds={leftTime} />}</h4>
//           </div>
//           <RappelParticipation />
//           <Jeux />
//           {/* <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
//             <IonRefresherContent>

//             </IonRefresherContent>
//           </IonRefresher> */}
//         </IonContent>
//       </IonPage>
//     </>
//   );
// };

// export default Play;
