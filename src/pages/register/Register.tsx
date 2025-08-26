/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonInputPasswordToggle, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import "./Register.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { setListLeagues } from "../../store/registerSlice.js";
import { setListQuestions } from "../../store/changePasswordSlice";

const Register: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setusername] = useState("");
  const [nom_prenom, setnom_prenom] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [pays, setpays] = useState("");
  const [reponseQuestion, setreponseQuestion] = useState("");
  const [idLeague, setidLeague] = useState(1);
  const [idQuestion, setidQuestion] = useState(1);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [isPasswordSame, setisPasswordSame] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const list_questions = useSelector((state: any) => state.changePassword.listQuestions);

  const list_leagues = useSelector((state: any) => state.register.listLeagues);
  const user_infos = useSelector((state: any) => state.userInfos.user_infos);

  const queryString = window.location.search; // Returns "?product=shirt&color=blue"
  const urlParams = new URLSearchParams(queryString);
  const referer = urlParams.get("referer");

  const [refererId, setrefererId] = useState(referer);
  // Returns "shirt"

  console.log(refererId);
  sessionStorage.setItem("referer", refererId);

  const checkPassword = (value) => {
    if (password === value) {
      setconfirmPassword(value);
      setisPasswordSame(true);
    } else {
      setconfirmPassword(value);
      setisPasswordSame(false);
    }
  };

  // useEffect(() => {
  //   if (Object.keys(user_infos).length !== 0) {
  //     history.push("/play");
  //   }
  // });

  useEffect(() => {
    // console.log(user_infos.ID_JOUEUR);

    if (user_infos.ID_JOUEUR !== undefined) {
      history.push("/play");
    }
  });

  // const getListLeagues = useCallback(async () => {
  //   // console.log(list_leagues);
  //   if (list_leagues === undefined) {
  //     await axios
  //       .get("backend/list_leagues.php")
  //       .then((res) => {
  //         if (res.status === 200) {
  //           dispatch(setListLeagues(res.data));
  //           // setState("list_leagues", res.data);
  //         }
  //         console.log(res);
  //         console.log(list_leagues);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [dispatch, list_leagues]);

  const getListQuestions = useCallback(async () => {
    // console.log(list_questions);
    if (list_questions === null) {
      await axios
        .get("backend/list_questions.php")
        .then((res) => {
          if (res.status === 200) {
            dispatch(setListQuestions(res.data));
            // setState("list_questions", res.data);
          }
          console.log(res);
          console.log(list_questions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, list_questions]);

  const registration = async (infos: object) => {
    console.log(list_leagues);

    await axios
      .post("backend/inscription.php", infos)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          // setState("list_leagues", res.data);
          setRegisterMessage(res.data.message);
          setIsOpen(true);
          history.push("/login");
        } else {
          setRegisterMessage(res.data.message);
          setIsOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("voici la liste des question:");

    if (list_questions === null) {
      getListQuestions();
    }
  }, [getListQuestions, list_questions]);

  // useEffect(() => {
  //   console.log("voici la liste des league:");

  //   if (list_leagues === null) {
  //     getListLeagues();
  //   }
  // }, [getListLeagues, list_leagues]);

  // useEffect(()=>{
  //   if(list_leagues===null)
  // })

  return (
    <IonPage>
      <IonAlert isOpen={isOpen} header="Information" subHeader="Création de compte" message={registerMessage} buttons={["OK"]} onDidDismiss={() => setIsOpen(false)}></IonAlert>
      <IonAlert
        trigger="present-alert"
        header="Are you sure?"
        className="custom-alert"
        buttons={[
          {
            text: "No",
            cssClass: "alert-button-cancel",
          },
          {
            text: "Yes",
            cssClass: "alert-button-confirm",
          },
        ]}
      ></IonAlert>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inscription</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true} className="ion-padding" style={{ innerHeight: "100%" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              const values = {
                username: username,
                nom_prenom: nom_prenom,
                email: email,
                phone: phone,
                pays: pays,
                referer_id: refererId,
                id_league: idLeague,
                id_question: idQuestion,
                reponse_question: reponseQuestion,
                password: password,
              };
              // console.log("Form submitted :", values);
              registration(values);
            }}
          >
            <>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput name="username" type="text" value={username} onIonChange={(e) => setusername(e.detail.value!)} label="Nom d'utilisateur" labelPlacement="floating" fill="outline" placeholder="Nom d'utilisateur"></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput name="nom_prenom" type="text" value={nom_prenom} onIonChange={(e) => setnom_prenom(e.detail.value!)} label="Nom et prénom" labelPlacement="floating" fill="outline" placeholder="Nom et prénom"></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput name="email" type="email" value={email} onIonChange={(e) => setemail(e.detail.value!)} label="Email" labelPlacement="floating" fill="outline" placeholder="Email"></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput name="phone" type="tel" value={phone} onIonChange={(e) => setphone(e.detail.value!)} label="Téléphone" labelPlacement="floating" fill="outline" placeholder="Téléphone"></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput name="pays" type="text" value={pays} onIonChange={(e) => setpays(e.detail.value!)} label="Pays" labelPlacement="floating" fill="outline" placeholder="Pays"></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput name="password" type="password" value={password} onIonChange={(e) => setpassword(e.detail.value!)} label="Mot de passe" labelPlacement="floating" fill="outline" placeholder="Mot de passe">
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    // onIonChange={(e) => {}}
                    onKeyUp={(e: any) => {
                      checkPassword(e?.currentTarget?.value);
                    }}
                    label="Confirmer le mot de passe"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Confirmer le mot de passe"
                  >
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonList>
                    <IonItem>
                      {list_questions !== undefined && (
                        <IonSelect label="Question sécrète" value={idQuestion} labelPlacement="floating" onIonChange={(e) => setidQuestion(e.detail.value)}>
                          {list_questions?.map((question: any, key: number) => (
                            <IonSelectOption key={key} value={question?.id_question}>
                              {question?.question}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      )}
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput name="reponseQuestion" type="text" value={reponseQuestion} onIonChange={(e) => setreponseQuestion(e.detail.value!)} label="Reponse à la question sécrète" labelPlacement="floating" fill="outline" placeholder="Reponse à la question sécrète"></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput disabled name="refererId" type="text" value={refererId} onIonChange={(e) => setrefererId(e.detail.value!)} label="Referer" labelPlacement="floating" fill="outline" placeholder="Pays"></IonInput>
                </IonCol>
              </IonRow>

              <br />
              {/* <IonList>
                    <IonItem>
                      {list_leagues !== undefined && (
                        <IonSelect label="Coût de participation" value={idLeague} labelPlacement="floating" onIonChange={(e) => setidLeague(e.detail.value)}>
                          {list_leagues?.map((league: any, key: number) => (
                            <IonSelectOption key={key} value={league?.ID_LEAGUE}>
                              {league?.NOM_LEAGUE + " (" + league?.COUT_PARTICIPATION + " FCFA)"}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      )}
                    </IonItem>
                  </IonList>
                  <br /> */}
              <IonButton type="submit" disabled={!isPasswordSame} expand="full" fill="solid" color="primary" className="ion-margin-top">
                S'inscrire
              </IonButton>
              <br />
              <div style={{ float: "right" }}>
                Vous avez déjà un compte? <a href={"/login"}>Connectez-vous</a>
              </div>
              <br />
            </>
          </form>
        </IonGrid>
        {/* <IonCard style={{ overflow: "auto" }}>
          <IonCardContent>
            
          </IonCardContent>
        </IonCard> */}
      </IonContent>
    </IonPage>
  );
};

export default Register;
