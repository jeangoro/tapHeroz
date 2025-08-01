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
import Play from "./pages/Play";
import { useDispatch, useSelector } from "react-redux";
// import { store } from "./store/store.js";
import axios from "axios";
import { setUserInfos } from "./store/userInfosSlice.js";
import { useCallback, useEffect } from "react";
import Statistiques from "./pages/statistiques/Statistiques";
import Parrainages from "./pages/parrainages/Parrainages.jsx";
import Comptes from "./pages/comptes/Comptes";
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
        .post("get_user_infos.php", values)
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
    console.log(user_infos);

    if (user_infos !== null) {
      if (Object.keys(user_infos_state).length === 0) {
        getUserInfos({ id_joueur: user_infos?.ID_JOUEUR });
        console.log("user_infos recuperer");
      }
    }
  }, [getUserInfos]);

  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/play">
                <Play />
              </Route>
              <Route exact path="/statistiques">
                <Statistiques />
              </Route>
              <Route exact path="/parrainage">
                <Parrainages />
              </Route>
              <Route exact path="/compte">
                <Comptes />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="Play" href="/play">
                <IonIcon aria-hidden="true" icon={play} />
                <IonLabel>Jouer</IonLabel>
              </IonTabButton>
              <IonTabButton tab="statistiques" href="/statistiques">
                <IonIcon aria-hidden="true" icon={statsChart} />
                <IonLabel>Stats</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Fieuls" href="/parrainage">
                <IonIcon aria-hidden="true" icon={people} />
                <IonLabel>Fieuls</IonLabel>
              </IonTabButton>
              <IonTabButton tab="compte" href="/compte">
                <IonIcon aria-hidden="true" icon={people} />
                <IonLabel>Compte</IonLabel>
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
