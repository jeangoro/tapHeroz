/* eslint-disable @typescript-eslint/no-explicit-any */
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { people, play, statsChart } from "ionicons/icons";
// import Tab2 from "./pages/Tab2";
// import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
// import Play from "./pages/Play";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserInfos } from "./store/userInfosSlice.js";
import { useCallback, useEffect } from "react";
// import Statistiques from "./pages/statistiques/Statistiques";
import Comptes from "./pages/comptes/Comptes";
import Play from "./pages/play/Play";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Referrals from "./pages/comptes/referrals/Referrals";
import Stats from "./pages/statistiques/Stats";
import Languages from "./pages/comptes/language/Languages";
import History from "./pages/comptes/history/History";
// import axios from "axios";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const user_infos = JSON.parse(sessionStorage.getItem("user_infos")!);

  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);

  const getUserInfos = useCallback(
    async (values: object) => {
      // console.log(user_infos);

      await axios
        .post("backend/get_user_infos.php", values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            sessionStorage.setItem("user_infos", JSON.stringify(res.data));
            dispatch(setUserInfos(res.data));
            console.log("actualisation effectuée!!!");

            // points.current = parseInt(res.data.SOLDE_POINTS);
            // setState("user_infos", res.data);
            // setState("lastPointsSaved", res.data.SOLDE_POINTS);
            // setIsOpen(true);
          }
          // history.replace("/play");
          // console.log(user_infos);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    console.log(user_infos_state?.ID_JOUEUR);

    if (user_infos_state?.ID_JOUEUR === undefined && user_infos?.ID_JOUEUR !== undefined) {
      if (Object.keys(user_infos_state).length === 0) {
        getUserInfos({ id_joueur: user_infos?.ID_JOUEUR });
        console.log("user_infos recuperer");
      }
    }
  }, [getUserInfos, user_infos, user_infos_state]);

  // useIonViewWillEnter(() => {
  //   console.log("Page will enter view");
  // });

  // useIonViewDidEnter(() => {
  //   console.log("Page did enter view");
  // });

  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/login">
                {user_infos_state?.ID_JOUEUR === undefined ? <Login /> : <Redirect to="/play" />}
              </Route>
              <Route exact path="/register">
                {user_infos_state?.ID_JOUEUR === undefined ? <Register /> : <Redirect to="/play" />}
              </Route>
              {/* <Route exact path="/:id">
                {user_infos_state?.ID_JOUEUR === undefined ? <Register /> : <Play />}
              </Route> */}
              <Route exact path="/play">
                {user_infos_state?.ID_JOUEUR !== undefined ? <Play /> : <Redirect to="/login" />}
              </Route>
              {/* <Route exact path="/statistiques">
                {user_infos_state?.ID_JOUEUR !== undefined ? <Statistiques /> : <Redirect to="/login" />}
              </Route> */}
              <Route exact path="/stats">
                {user_infos_state?.ID_JOUEUR !== undefined ? <Stats /> : <Redirect to="/login" />}
              </Route>
              {/* <Route exact path="/parrainage">
                {user_infos_state?.ID_JOUEUR !== undefined ? <Parrainages /> : <Redirect to="/login" />}
              </Route> */}
              <Route exact path="/history">
                {user_infos_state?.ID_JOUEUR !== undefined ? <History /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/referrals">
                {user_infos_state?.ID_JOUEUR !== undefined ? <Referrals /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/compte">
                {user_infos_state?.ID_JOUEUR !== undefined ? <Comptes /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/language">
                {user_infos_state?.ID_JOUEUR !== undefined ? <Languages /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/changePassword">
                {user_infos_state?.ID_JOUEUR === undefined ? <ChangePassword /> : <Redirect to="/play" />}
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar className="tab-bar" slot="bottom">
              <IonTabButton tab="Play" href="/play">
                <IonIcon aria-hidden="true" icon={play} />
                <IonLabel>Play</IonLabel>
              </IonTabButton>
              {/* <IonTabButton tab="statistiques" href="/statistiques">
                <IonIcon aria-hidden="true" icon={statsChart} />
                <IonLabel>Stats</IonLabel>
              </IonTabButton> */}
              <IonTabButton tab="stats" href="/stats">
                <IonIcon aria-hidden="true" icon={statsChart} />
                <IonLabel>Stats</IonLabel>
              </IonTabButton>
              {/* <IonTabButton tab="Fieuls" href="/parrainage">
                <IonIcon aria-hidden="true" icon={people} />
                <IonLabel>Fieuls</IonLabel>
              </IonTabButton> */}
              <IonTabButton tab="compte" href="/compte">
                <IonIcon aria-hidden="true" icon={people} />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default App;
// export default { App, DataContext };
