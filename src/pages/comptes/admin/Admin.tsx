/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonInputPasswordToggle, IonItem, IonList, IonPage, IonPopover, IonRow } from "@ionic/react";
import "./Admin.css";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../../components/LanguageSelector";

const Admin: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const adminUsername = useRef("");
  const password = useRef("");

  const NOM = useRef("");
  const DATE_DEBUT = useRef("");
  const HEURE_DEBUT = useRef("");
  const DATE_FIN = useRef("");
  const HEURE_FIN = useRef("");
  const ETAT = useRef("");
  const cagnotte = useRef(0);
  const coin_value = useRef(0);

  const confirmPassword = useRef<string>("");
  const isPasswordSame = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [createMessage, setCreateMessage] = useState("");
  const list_questions = useSelector((state: any) => state.changePassword.listQuestions);

  const list_leagues = useSelector((state: any) => state.register.listLeagues);
  const user_infos = useSelector((state: any) => state.userInfos.user_infos);

  const queryString = window.location.search; // Returns "?product=shirt&color=blue"
  const urlParams = new URLSearchParams(queryString);
  const referer = urlParams.get("referer");

  const [refererId, setrefererId] = useState(referer);
  const [listCompetitions, setListCompetitions] = useState(null);
  // Returns "shirt"

  // console.log(refererId);
  sessionStorage.setItem("referer", refererId);

  const checkPassword = (value: any) => {
    if (password === value) {
      confirmPassword.current = value;
      isPasswordSame.current = true;
    } else {
      confirmPassword.current = value;
      isPasswordSame.current = false;
    }
  };

  // useEffect(() => {
  //   if (Object.keys(user_infos).length !== 0) {
  //     history.push("/play");
  //   }
  // });

  // useEffect(() => {
  //   // console.log(user_infos.ID_JOUEUR);

  //   if (user_infos.ID_JOUEUR !== undefined) {
  //     history.push("/play");
  //   }
  // });

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

  const getListCompetitions = useCallback(async () => {
    // console.log(list_questions);
    if (listCompetitions === null) {
      await axios
        .get("backend/list_all_competitions.php")
        .then((res) => {
          if (res.status === 200) {
            // dispatch(setListQuestions(res.data));
            setListCompetitions(res.data);
          }
          // console.log(res);
          // console.log(list_questions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [listCompetitions]);

  const deleteCompetition = useCallback(
    async (id: number) => {
      // console.log("deleting competition with ID:", id);

      if (listCompetitions !== null) {
        await axios
          .post("backend/delete_competition.php", { ID_COMPETITION: id })
          .then((res) => {
            if (res.status === 200) {
              // dispatch(setListQuestions(res.data));
              alert(t("Competition deleted successfully"));
              getListCompetitions();
            }
            // console.log(res);
            // console.log(list_questions);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [listCompetitions, t, getListCompetitions]
  );

  const createCompetition = async (infos: object) => {
    // console.log(list_leagues);

    await axios
      .post("backend/create_competition.php", infos)
      .then((res) => {
        // console.log(res);
        if (res.data.status === true) {
          // setState("list_leagues", res.data);
          setCreateMessage(res.data.message);
          setIsOpen(true);
          history.push("/login");
        } else {
          setCreateMessage(res.data.message);
          setIsOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log("voici la liste des question:");

    if (listCompetitions === null) {
      getListCompetitions();
    }
  }, [getListCompetitions, listCompetitions]);

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
      <IonAlert isOpen={isOpen} header={t("Information")} subHeader={t("Competition creation")} message={createMessage} buttons={["OK"]} onDidDismiss={() => setIsOpen(false)}></IonAlert>
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
        <div className="custom-header">
          <span>
            <h5>{t("Registration")}</h5>
          </span>
          <LanguageSelector />
        </div>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCol sizeXs="12" sizeSm="6">
          <IonInput name="password" type="password" value={password.current} onIonChange={(e) => (password.current = e.detail.value!)} label={t("Password")} labelPlacement="floating" fill="outline" placeholder={t("Password")}>
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </IonCol>

        <IonGrid fixed={true} className="ion-padding" style={{ innerHeight: "100%" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              const values = {
                NOM: NOM.current,
                DATE_DEBUT: DATE_DEBUT.current,
                HEURE_DEBUT: HEURE_DEBUT.current,
                DATE_FIN: DATE_FIN.current,
                HEURE_FIN: HEURE_FIN.current,
                // referer_id: refererId,
                ETAT: ETAT.current,
                cagnotte: cagnotte.current,
                coin_value: coin_value.current,
                // password: password.current,
              };
              // console.log("Form submitted :", values);
              createCompetition(values);
            }}
          >
            <>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="12">
                  <IonInput required name="NOM" type="text" value={NOM.current} onIonChange={(e) => (NOM.current = e.detail.value!)} label={t("Competition name")} labelPlacement="floating" fill="outline" placeholder={t("Competition name")}></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput required name="DATE_DEBUT" type="date" value={DATE_DEBUT.current} onIonChange={(e) => (DATE_DEBUT.current = e.detail.value!)} label={t("Begin date")} labelPlacement="floating" fill="outline" placeholder={t("Begin date")}></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput required name="HEURE_DEBUT" type="time" value={HEURE_DEBUT.current} onIonChange={(e) => (HEURE_DEBUT.current = e.detail.value!)} label={t("Begin time")} labelPlacement="floating" fill="outline" placeholder={t("Begin time")}></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput required name="DATE_FIN" type="date" value={DATE_FIN.current} onIonChange={(e) => (DATE_FIN.current = e.detail.value!)} label={t("End date")} labelPlacement="floating" fill="outline" placeholder={t("End date")}></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput required name="HEURE_FIN" type="time" value={HEURE_FIN.current} onIonChange={(e) => (HEURE_FIN.current = e.detail.value!)} label={t("End time")} labelPlacement="floating" fill="outline" placeholder={t("End time")}></IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="12">
                  <IonInput required name="ETAT" type="text" value={ETAT.current} onIonChange={(e) => (ETAT.current = e.detail.value!)} label={t("Status")} labelPlacement="floating" fill="outline" placeholder={t("Status")}></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="12">
                  <IonInput name="cagnotte" type="number" value={cagnotte.current} onIonChange={(e) => (cagnotte.current = parseInt(e.detail.value!))} label={t("Pool")} labelPlacement="floating" fill="outline" placeholder={t("Pool")}></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="12">
                  <IonInput name="coin_value" type="number" value={coin_value.current} onIonChange={(e) => (coin_value.current = parseInt(e.detail.value!))} label={t("Coin value")} labelPlacement="floating" fill="outline" placeholder={t("Coin value")}></IonInput>
                </IonCol>
              </IonRow>
              {/* <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword.current}
                    // onIonChange={(e) => {}}
                    onKeyUp={(e: any) => {
                      checkPassword(e?.currentTarget?.value);
                    }}
                    label={t("Confirm Password")}
                    labelPlacement="floating"
                    fill="outline"
                    placeholder={t("Confirm Password")}
                  >
                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                  </IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonList>
                    <IonItem>
                      {list_questions !== undefined && (
                        <IonSelect label={t("Secret Question")} value={idQuestion} labelPlacement="floating" onIonChange={(e) => (idQuestion.current = e.detail.value)}>
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
                  <IonInput
                    name="reponseQuestion"
                    type="text"
                    value={reponseQuestion.current}
                    onIonChange={(e) => (reponseQuestion.current = e.detail.value!)}
                    label={t("Answer to the secret question")}
                    labelPlacement="floating"
                    fill="outline"
                    placeholder={t("Answer to the secret question")}
                  ></IonInput>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonInput disabled name="refererId" type="text" value={refererId} onIonChange={(e) => setrefererId(e.detail.value!)} label={t("Referer")} labelPlacement="floating" fill="outline" placeholder={t("Referer")}></IonInput>
                </IonCol>
              </IonRow> */}

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
              <IonButton type="submit" expand="full" fill="solid" color="primary" className="ion-margin-top">
                {t("Create")}
              </IonButton>
              <br />
              {/* <div style={{ float: "right" }}>
                {t("You already have an account?")} <a href={"/login"}>{t("Log in")}</a>
              </div>
              <br /> */}
            </>
          </form>
        </IonGrid>
        <div>
          <h3>{t("List of Competitions")}</h3>
          <IonGrid>
            <IonRow className="header-list-competition">
              <IonCol size="12" size-sm="1">
                ID
              </IonCol>
              <IonCol size="12" size-sm="3">
                NOM
              </IonCol>
              <IonCol size="12" size-sm="1">
                DATE DEBUT
              </IonCol>
              <IonCol size="12" size-sm="1">
                HEURE DEBUT
              </IonCol>
              <IonCol size="12" size-sm="1">
                DATE FIN
              </IonCol>
              <IonCol size="12" size-sm="1">
                HEURE FIN
              </IonCol>
              <IonCol size="12" size-sm="2">
                ETAT
              </IonCol>
              <IonCol size="12" size-sm="2">
                ACTIONS
              </IonCol>
            </IonRow>
            {listCompetitions?.map((competition: any, key: number) => (
              <IonRow key={key}>
                <IonCol size="12" size-sm="1">
                  {competition.ID_COMPETITION}
                </IonCol>
                <IonCol size="12" size-sm="3">
                  {competition.NOM}
                </IonCol>
                <IonCol size="12" size-sm="1">
                  {competition.DATE_DEBUT}
                </IonCol>
                <IonCol size="12" size-sm="1">
                  {competition.HEURE_DEBUT}
                </IonCol>
                <IonCol size="12" size-sm="1">
                  {competition.DATE_FIN}
                </IonCol>
                <IonCol size="12" size-sm="1">
                  {competition.HEURE_FIN}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  {competition.ETAT}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  <>
                    <IonButton id={`popover-button-${key}`}>Options...</IonButton>
                    <IonPopover trigger={`popover-button-${key}`} dismissOnSelect={true}>
                      <IonContent>
                        <IonList>
                          <IonItem button={true} detail={false}>
                            {t("Update")}
                          </IonItem>
                          <IonItem button={true} detail={false} onClick={() => deleteCompetition(competition.ID_COMPETITION)}>
                            {t("Delete")}
                          </IonItem>
                        </IonList>
                      </IonContent>
                    </IonPopover>
                  </>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
