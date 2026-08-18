/* eslint-disable @typescript-eslint/no-explicit-any */
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import IonTabsBar from "./components/IonTabsBar";
import Settings from "./pages/comptes/settings/Settings";
import AboutMe from "./pages/comptes/aboutMe/AboutMe";
import Supports from "./pages/comptes/supports/Supports";
import Admin from "./pages/comptes/admin/Admin";
import { isNumeric } from "./services/fonctions";
// import axios from "axios";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const user_infos = JSON.parse(sessionStorage.getItem("user_infos")!);

  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);

  // 1. Define a helper function that returns a Promise
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
            // console.log("actualisation effectuée!!!");

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
    [dispatch],
  );

  useEffect(() => {
    // console.log(user_infos_state?.ID_JOUEUR);

    if (!isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) && isNumeric(user_infos?.ID_JOUEUR)) {
      if (Object.keys(user_infos_state).length === 0) {
        getUserInfos({ id_joueur: user_infos?.ID_JOUEUR });
        // console.log("user_infos recuperer");
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
                {!isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Login /> : <Redirect to="/play" />}
              </Route>
              <Route exact path="/register">
                {!isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Register /> : <Redirect to="/play" />}
              </Route>
              {/* <Route exact path="/:id">
                {!isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Register /> : <Play />}
              </Route> */}
              <Route exact path="/play">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) || isNumeric(parseInt(user_infos?.ID_JOUEUR)) ? <Play /> : <Redirect to="/login" />}
              </Route>
              {/* <Route exact path="/statistiques">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR))  ? <Statistiques /> : <Redirect to="/login" />}
              </Route> */}
              <Route exact path="/stats">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Stats /> : <Redirect to="/login" />}
              </Route>
              {/* <Route exact path="/parrainage">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR))  ? <Parrainages /> : <Redirect to="/login" />}
              </Route> */}
              <Route exact path="/history">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <History /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/referrals">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Referrals /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/compte">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Comptes /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/settings">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Settings /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/aboutMe">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <AboutMe /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/supports">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Supports /> : <Supports />}
              </Route>
              <Route exact path="/language">
                {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <Languages /> : <Redirect to="/login" />}
              </Route>
              <Route exact path="/changePassword">
                {!isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) ? <ChangePassword /> : <Redirect to="/play" />}
              </Route>
              <Route exact path="/admin_tapheroz">
                <Admin />
              </Route>
              <Route exact path="/">
                <Redirect to="/play" />
              </Route>
            </IonRouterOutlet>
            {isNumeric(parseInt(user_infos_state?.ID_JOUEUR)) && <IonTabsBar />}
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default App;
// export default { App, DataContext };
