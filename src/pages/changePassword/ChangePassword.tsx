/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonInputPasswordToggle, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import "./ChangePassword.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setMyQuestion } from "../../store/changePasswordSlice.js";
import { useTranslation } from "react-i18next";

const ChangePassword: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [present] = useIonToast();

  //   const [username, setusername] = useState("");
  //   const [nom_prenom, setnom_prenom] = useState("");
  //   const [email, setemail] = useState("");
  const [phone, setphone] = useState(null);
  const [isValidPhone, setisValidPhone] = useState(false);
  //   const [pays, setpays] = useState("");

  //   const [idQuestion, setidQuestion] = useState(1);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [isPasswordSame, setisPasswordSame] = useState(false);
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const [reponseQuestion, setreponseQuestion] = useState("");

  //   const list_questions = useSelector((state: any) => state.changePassword.listQuestions);
  const myQuestion = useSelector((state: any) => state.changePassword.myQuestion);
  const user_infos = useSelector((state: any) => state.userInfos.user_infos);

  //   const queryString = window.location.search; // Returns "?product=shirt&color=blue"
  //   const urlParams = new URLSearchParams(queryString);
  //   const referer = urlParams.get("referer");

  //   const [refererId, setrefererId] = useState(referer);
  // Returns "shirt"

  //   console.log(refererId);
  //   sessionStorage.setItem("referer", refererId);

  const presentToast = useCallback(
    (position: "top" | "middle" | "bottom", message: string) => {
      present({
        message: t(message),
        duration: 5000,
        position: position,
      });
    },
    [present, t]
  );

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

  const changePassword = useCallback(
    async (values: any) => {
      // console.log(list_questions);
      if (myQuestion !== null && isPasswordSame) {
        await axios
          .post("backend/change_password.php", values)
          .then((res) => {
            if (res.data.status === true) {
              presentToast("middle", res.data.message);
              history.push("/login");
              // dispatch(setListQuestions(res.data));
              // setState("list_questions", res.data);
            } else {
              presentToast("middle", res.data.message);
            }
            //   console.log(res);
            //   console.log(list_questions);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [history, isPasswordSame, myQuestion, presentToast]
  );

  const getMyQuestion = async (infos: object) => {
    // console.log(list_questions);

    await axios
      .post("backend/get_my_question.php", infos)
      .then((res) => {
        // console.log(res);
        if (res.data.status === true) {
          // setState("list_questions", res.data);
          dispatch(setMyQuestion(res.data.question));
          //   setIsOpen(true);
          //   history.push("/login");
        } else {
          presentToast("middle", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   useEffect(() => {
  //     if (list_questions === null) {
  //       console.log("voici la liste des question:");
  //       //   getListQuestions();
  //     }
  //   }, [ list_questions]);

  const checkPhoneNumber = (value) => {
    setphone(value);
    // console.log(value);
    // console.log(value.length);
    if (value.length >= 8 && value.length < 13) {
      setisValidPhone(true);
    } else {
      setisValidPhone(false);
    }
  };

  // useEffect(()=>{
  //   if(list_questions===null)
  // })

  return (
    <IonPage>
      {/* <IonAlert isOpen={isOpen} header="Information" subHeader="Création de compte" message={changePasswordMessage} buttons={["OK"]} onDidDismiss={() => setIsOpen(false)}></IonAlert> */}
      <IonAlert
        trigger="present-alert"
        header={t("Are you sure?")}
        className="custom-alert"
        buttons={[
          {
            text: t("No"),
            cssClass: "alert-button-cancel",
          },
          {
            text: t("Yes"),
            cssClass: "alert-button-confirm",
          },
        ]}
      ></IonAlert>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("Change Password")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true} className="ion-padding" style={{ innerHeight: "100%" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              console.log(myQuestion);

              if (myQuestion === null) {
                const values = {
                  phone: phone,
                };
                getMyQuestion(values);
              } else {
                const values = {
                  reponseQuestion: reponseQuestion,
                  phone: phone,
                  password: password,
                };
                changePassword(values);
              }
            }}
          >
            <>
              {myQuestion === null && (
                <IonRow>
                  <IonCol sizeXs="12" sizeSm="6">
                    <IonInput
                      name="phone"
                      type="number"
                      minlength={8}
                      maxlength={13}
                      // onErrorCapture={(error) => checkPhoneNumber(error)}
                      value={phone}
                      onKeyUp={(e: any) => checkPhoneNumber(e.currentTarget.value)}
                      label={t("Your phone")}
                      labelPlacement="floating"
                      fill="outline"
                      placeholder={t("Your phone")}
                    ></IonInput>
                  </IonCol>
                  <IonCol sizeXs="12" sizeSm="6"></IonCol>
                </IonRow>
              )}

              {myQuestion !== null && (
                <>
                  <IonRow>
                    {myQuestion} <br />
                    <IonCol sizeXs="12" sizeSm="6">
                      <IonInput name="reponseQuestion" type="text" value={reponseQuestion} onIonChange={(e) => setreponseQuestion(e.detail.value!)} label={t("The answer")} labelPlacement="floating" fill="outline" placeholder={t("Answer to the secret question")}></IonInput>
                    </IonCol>
                  </IonRow>
                  {/* <IonRow>
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
                    
                  </IonRow> */}
                  <br />
                  <IonInput name="password" type="password" value={password} onIonChange={(e) => setpassword(e.detail.value!)} label={t("Password")} labelPlacement="floating" fill="outline" placeholder={t("Password")}>
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>
                  <br />
                  <IonInput
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    // onIonChange={(e) => {}}
                    onKeyUp={(e: any) => {
                      checkPassword(e?.currentTarget?.value);
                    }}
                    label={t("Confirm password")}
                    labelPlacement="floating"
                    fill="outline"
                    placeholder={t("Confirm password")}
                  >
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>
                </>
              )}

              {myQuestion === null && (
                <IonButton type="submit" disabled={!isValidPhone} expand="full" fill="solid" color="primary" className="ion-margin-top">
                  {t("Next")}
                </IonButton>
              )}
              {myQuestion !== null && (
                <IonButton type="submit" disabled={!isPasswordSame} expand="full" fill="solid" color="primary" className="ion-margin-top">
                  {t("Change password")}
                </IonButton>
              )}
              <br />
              <div style={{ float: "right" }}>
                {t("I remember my password.")} <a href={"/login"}>{t("Log in")}</a>
              </div>
            </>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
