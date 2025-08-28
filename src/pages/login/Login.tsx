/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonInput, IonInputPasswordToggle, IonPage, IonRow, useIonToast } from "@ionic/react";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfos } from "../../store/userInfosSlice.js";
import { setAxiosDefault } from "../../main";

const Login: React.FC = () => {
  const [login, setlogin] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();

  const user_infos = useSelector((state: any) => state.userInfos.user_infos);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (Object.keys().length !== 0) {
    if (user_infos.ID_JOUEUR !== undefined) {
      history.push("/play");
    }
  });

  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom", message: "") => {
    present({
      message: message,
      duration: 5000,
      position: position,
    });
  };

  const connexion = async (values: object) => {
    // console.log(user_infos);

    await axios
      .post("backend/identification.php", values)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          sessionStorage.setItem("user_infos", JSON.stringify(res.data));
          dispatch(setUserInfos(res.data));
          setAxiosDefault();
          // getUserInfos();

          // history.push("/play");
          // history.go(0);
        } else {
          presentToast("middle", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="t-a-c">
          <IonImg className="logo-login" src="assets/images/logo.jpg" alt="Logo" />
        </div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            connexion({ login: login, password: password });
          }}
        >
          <IonGrid fixed={true} className="ion-padding" style={{ innerHeight: "100%" }}>
            <IonRow className="ion-align-items-center">
              <IonCol>
                <>
                  <IonInput name="login" type="text" value={login} onIonChange={(e) => setlogin(e.detail.value)} label="Nom d'utilisateur" labelPlacement="floating" fill="outline" placeholder="Nom d'utilisateur"></IonInput>
                  <br />
                  <IonInput name="password" type="password" value={password} onIonChange={(e) => setpassword(e.detail.value)} label="Mot de passe" labelPlacement="floating" fill="outline" placeholder="Mot de passe">
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>

                  <IonButton type="submit" expand="full" fill="solid" color="primary" className="ion-margin-top">
                    Se connecter
                  </IonButton>
                  <br />
                  <div style={{ float: "right" }}>
                    Pas de compte ? <a href={"/register"}>Inscrivez-vous</a>
                  </div>
                  <br />
                  <br />
                  <div style={{ float: "left" }}>
                    mot de passe oublié ? <a href={"/changePassword"}>Changer</a>
                  </div>
                </>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
