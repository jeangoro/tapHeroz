/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
import { IonButton, IonCol, IonGrid, IonImg, IonRow, IonText, useIonToast, useIonViewWillLeave } from "@ionic/react";
// import { setUserInfos, reset, incrementPoints, decrementPoints, setLastPointsSaved } from "../store/userInfosSlice.js";
import axios from "axios";
import "./Jeux.css";
import "./animations/animatePlus.css";
import "./animations/animateMinus.css";
import { setUserInfos } from "../store/userInfosSlice.js";
import { useTranslation } from "react-i18next";

const Jeux = ({ competitionIsOpen }) => {
  // const [values, setValues] = useState({});
  const values = useRef({});

  // const { state } = useContext(MyContext);
  // const { setState } = useContext(MyContext);
  //   const history = useHistory();
  const user_infos = JSON.parse(sessionStorage.getItem("user_infos")!);
  const user_infos_state = useSelector((state: any) => state.userInfos.user_infos);
  // const lastPointsSaved = useSelector((state) => state.userInfos.lastPointsSaved);
  //   const [points, setPoints] = useState(parseInt(user_infos.SOLDE_POINTS));
  const points = useRef(parseInt(user_infos?.SOLDE_POINTS));
  const lastPointsSaved = useRef(parseInt(user_infos?.SOLDE_POINTS));
  // const isSavingPoints = useRef(false);

  const [isSavingPoints, setisSavingPoints] = useState(false);

  const intervalId = useRef(null);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [present] = useIonToast();
  // Fonction pour générer un nombre aléatoire entre 0 et 4
  function getRandomNumber() {
    return Math.floor(Math.random() * 2) + 1; // Multiplier par 4 et ajouter 1 pour inclure 4
  }
  // Position of the first button, can be 1 or 2
  const [position1, setPosition1] = useState(getRandomNumber()); // Change this to 2 to switch the first button
  const [position2, setPosition2] = useState(getRandomNumber()); // Change this to 2 to switch the second button
  const [position3, setPosition3] = useState(getRandomNumber()); // Change this to 2 to switch the third button
  const [position4, setPosition4] = useState(getRandomNumber()); // Change this to 2 to switch the fourth button
  const [position5, setPosition5] = useState(getRandomNumber()); // Change this to 2 to switch the first button
  const [position6, setPosition6] = useState(getRandomNumber()); // Change this to 2 to switch the second button
  const [position7, setPosition7] = useState(getRandomNumber()); // Change this to 2 to switch the third button
  const [position8, setPosition8] = useState(getRandomNumber()); // Change this to 2 to switch the fourth button

  const [classPlus1, setClassPlus1] = useState("on"); // Change this to 2 to switch the fourth button
  const [classPlus2, setClassPlus2] = useState("on"); // Change this to 2 to switch the fourth button
  const [classPlus3, setClassPlus3] = useState("on"); // Change this to 2 to switch the fourth button
  const [classPlus4, setClassPlus4] = useState("on"); // Change this to 2 to switch the fourth button
  const [classPlus5, setClassPlus5] = useState("on"); // Change this to 2 to switch the fourth button
  const [classPlus6, setClassPlus6] = useState("on"); // Change this to 2 to switch the fourth button
  const [classPlus7, setClassPlus7] = useState("on"); // Change this to 2 to switch the fourth button
  const [classPlus8, setClassPlus8] = useState("on"); // Change this to 2 to switch the fourth button
  const [classMinus1, setClassMinus1] = useState("on"); // Change this to 2 to switch the fourth button

  const wonAudio = new Audio("/assets/audios/explosion.mp3");
  const lostAudio = new Audio("/assets/audios/bomb.mp3");

  const playWonAudio = () => {
    // let wonAudio = new Audio("./../assets/audio/explosion_small.mp3");
    // const wonAudio = document.getElementById("wonAudio") as HTMLAudioElement;
    wonAudio.play();
  };
  const playLostAudio = () => {
    lostAudio.play();
  };

  // useEffect(() => {
  //   console.log(points.current);

  //   if (Number.isNaN(points.current)) {
  //     console.log("Je suis entré...");
  //     console.log(user_infos);

  //     points.current = user_infos.SOLDE_POINTS;
  //   }
  // }, [user_infos]);

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

            points.current = parseInt(res.data.SOLDE_POINTS);
            // setState("user_infos", res.data);
            // setState("lastPointsSaved", res.data.SOLDE_POINTS);
            // setIsOpen(true);
          }
          // history.push("/play");
          // console.log(user_infos);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    // console.log(user_infos_state);

    // if (Object.keys(user_infos_state).length === 0 && user_infos !== null) {
    if (user_infos_state?.ID_JOUEUR === undefined && user_infos?.ID_JOUEUR !== undefined) {
      getUserInfos({ id_joueur: user_infos?.ID_JOUEUR });
      console.log("user_infos recuperer");
    }
  }, [getUserInfos]);

  const positiveTapButton1 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus1("plus1");
        setTimeout(() => {
          if (line === 1) {
            setClassPlus1("on");
            setPosition1(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus1}`}
    >
      + 1
    </IonButton>
  );

  const positiveTapButton2 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus2("plus1");
        setTimeout(() => {
          if (line === 2) {
            setClassPlus2("on");
            setPosition2(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus2}`}
    >
      + 1
    </IonButton>
  );

  const positiveTapButton3 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus3("plus1");
        setTimeout(() => {
          if (line === 3) {
            setClassPlus3("on");
            setPosition3(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus3}`}
    >
      + 1
    </IonButton>
  );

  const positiveTapButton4 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus4("plus1");
        setTimeout(() => {
          if (line === 4) {
            setClassPlus4("on");
            setPosition4(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus4}`}
    >
      + 1
    </IonButton>
  );
  const positiveTapButton5 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus5("plus1");
        setTimeout(() => {
          if (line === 5) {
            setClassPlus5("on");
            setPosition5(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus5}`}
    >
      + 1
    </IonButton>
  );

  const positiveTapButton6 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus6("plus1");
        setTimeout(() => {
          if (line === 6) {
            setClassPlus6("on");
            setPosition6(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus6}`}
    >
      + 1
    </IonButton>
  );

  const positiveTapButton7 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus7("plus1");
        setTimeout(() => {
          if (line === 7) {
            setClassPlus7("on");
            setPosition7(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus7}`}
    >
      + 1
    </IonButton>
  );

  const positiveTapButton8 = (line: number, id: string) => (
    <IonButton
      id={`${id}`}
      onClick={() => {
        playWonAudio();
        setClassPlus8("plus1");
        setTimeout(() => {
          if (line === 8) {
            setClassPlus8("on");
            setPosition8(getRandomNumber());
          }
        }, 100);
        points.current += 1;
      }}
      color={"success"}
      style={{ width: "100%" }}
      className={`${classPlus8}`}
    >
      + 1
    </IonButton>
  );

  const negativeTapButton1 = (line: number) => (
    <IonButton
      onClick={() => {
        playLostAudio();
        setClassMinus1("minus1");
        setTimeout(() => {
          setClassMinus1("on");
        }, 400);
        if (line === 1) setPosition1(getRandomNumber());
        if (line === 2) setPosition2(getRandomNumber());
        if (line === 3) setPosition3(getRandomNumber());
        if (line === 4) setPosition4(getRandomNumber());
        if (line === 5) setPosition5(getRandomNumber());
        if (line === 6) setPosition6(getRandomNumber());
        if (line === 7) setPosition7(getRandomNumber());
        if (line === 8) setPosition8(getRandomNumber());
        points.current -= 4;
      }}
      color={"danger"}
      style={{ width: "100%" }}
      className={`${classMinus1}`}
    >
      - 4
    </IonButton>
  );

  const presentToast = (position: "top" | "middle" | "bottom", message: string) => {
    present({
      message: message,
      duration: 5000,
      position: position,
    });
  };

  const saveProgression = async () => {
    // console.log(competitionIsOpen?.current);

    if (competitionIsOpen?.current === true) {
      if (user_infos?.id_competition !== null) {
        const newPoints = points.current;
        if (lastPointsSaved.current !== newPoints && !isSavingPoints) {
          // isSavingPoints.current = true;
          setisSavingPoints(true);
          values.current = { id_joueur: user_infos?.ID_JOUEUR, points: newPoints };

          await axios
            .post("backend/save_progression.php", values.current)
            .then((res) => {
              //   console.log(res);
              if (res.status === 200) {
                lastPointsSaved.current = newPoints;
                // isSavingPoints.current = false;
                setisSavingPoints(false);

                console.log(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        presentToast("bottom", t("This is a trial because you are not registered for the competition!"));
      }
    } else {
      presentToast("bottom", t("This is a trial because the competition has not yet started!"));
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     saveProgression();
  //   }, 30000);
  // }, []);

  useEffect(() => {
    console.log("initialisation du setInterval!");

    // Start the interval
    // const myIntervalId = setInterval(() => {
    //   saveProgression();
    // }, 30000);

    // console.log(myIntervalId);

    intervalId.current = setInterval(() => {
      // console.log("j'appele save progression!");

      saveProgression();
    }, 30000);

    // Clean up the interval when the component unmounts or dependencies change
    return () => clearInterval(intervalId.current);
  }, []); // Empty dependency array ensures the effect runs only once on mount and cleans up on unmount

  useIonViewWillLeave(() => {
    // console.log("Component is about to leave!");
    // console.log(intervalId.current);

    // Perform cleanup or save data here
    clearInterval(intervalId.current);
    if (lastPointsSaved.current !== points.current) {
      saveProgression();
    }
  });

  useEffect(() => {
    // console.log("mount game page");

    return () => {
      // console.log("unmount game page");
      if (lastPointsSaved.current !== points.current) {
        saveProgression();
      }
    };
  }, []);

  return (
    <div className="container">
      {/* <strong>{"TAP HEROZ"}</strong>
      <br /> */}
      <IonText color="primary">
        <h1 style={{ display: "inline-flex", alignItems: "center" }}>
          <IonImg className="coin-icon" src={"/assets/images/coin.png"}></IonImg>
          <strong>{points.current.toLocaleString()}</strong>
        </h1>
      </IonText>

      {/* <p>
            Explore{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">
              UI Components
            </a>
          </p> */}
      <IonGrid>
        <IonRow>
          <IonCol size="3">{position1 === 1 ? positiveTapButton1(1, "l1-1") : negativeTapButton1(1)}</IonCol>
          <IonCol size="3">{position1 === 2 ? positiveTapButton1(1, "l1-2") : negativeTapButton1(1)}</IonCol>
          <IonCol size="3">{position2 === 1 ? positiveTapButton2(2, "l1-3") : negativeTapButton1(2)}</IonCol>
          <IonCol size="3">{position2 === 2 ? positiveTapButton2(2, "l1-4") : negativeTapButton1(2)}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">{position3 === 1 ? positiveTapButton3(3, "l2-1") : negativeTapButton1(3)}</IonCol>
          <IonCol size="3">{position3 === 2 ? positiveTapButton3(3, "l2-2") : negativeTapButton1(3)}</IonCol>
          <IonCol size="3">{position4 === 1 ? positiveTapButton4(4, "l2-3") : negativeTapButton1(4)}</IonCol>
          <IonCol size="3">{position4 === 2 ? positiveTapButton4(4, "l2-4") : negativeTapButton1(4)}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">{position5 === 1 ? positiveTapButton5(5, "l3-1") : negativeTapButton1(5)}</IonCol>
          <IonCol size="3">{position5 === 2 ? positiveTapButton5(5, "l3-2") : negativeTapButton1(5)}</IonCol>
          <IonCol size="3">{position6 === 1 ? positiveTapButton6(6, "l3-3") : negativeTapButton1(6)}</IonCol>
          <IonCol size="3">{position6 === 2 ? positiveTapButton6(6, "l3-4") : negativeTapButton1(6)}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="3">{position7 === 1 ? positiveTapButton7(7, "l4-1") : negativeTapButton1(7)}</IonCol>
          <IonCol size="3">{position7 === 2 ? positiveTapButton7(7, "l4-2") : negativeTapButton1(7)}</IonCol>
          <IonCol size="3">{position8 === 1 ? positiveTapButton8(8, "l4-3") : negativeTapButton1(8)}</IonCol>
          <IonCol size="3">{position8 === 2 ? positiveTapButton8(8, "l4-4") : negativeTapButton1(8)}</IonCol>
        </IonRow>
        {!competitionIsOpen?.current && (
          <IonRow className="t-a-c">
            <IonCol>
              <IonText className="blinking-text" color={"danger"}>
                {t("Demonstration mode!")}
              </IonText>
            </IonCol>
          </IonRow>
        )}
        <IonRow>
          <IonCol>
            <IonButton className="font-small" disabled={isSavingPoints || lastPointsSaved.current === points.current} onClick={saveProgression}>
              {isSavingPoints ? t("Saving progress...") : t("Progress saved")}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Jeux;
