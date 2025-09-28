/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonContent, IonHeader, IonPage, useIonViewDidEnter } from "@ionic/react";
import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setListStatistiques } from "../../store/statistiquesSlice";
// import Loader from "../../components/Loader";
import "./Settings.css";
// import { bowlingBall, hourglass, hourglassOutline, timeOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
// import { setListStatistiques } from "../../../store/statistiquesSlice";
// import Loader from "../../../components/Loader";
import HeaderWithBack from "../../../components/HeaderWithBack";
import SoundOnOff from "../../../components/SoundOnOff";
import SoundLevel from "../../../components/SoundLevel";
import { setSoundLevel, setSoundStatus } from "../../../store/userInfosSlice";

const Settings = () => {
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  //   const listStatistiques = useSelector((state: any) => state?.statistiques?.listStatistiques);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //   const [totalJoueur, settotalJoueur] = useState(0);
  //   const [myData, setmyData] = useState<any>(null);
  //   const [getStatLoading, setgetStatLoading] = useState(false);
  const getUserInfos = useCallback(
    async (values: object) => {
      // console.log(user_infos);

      await axios
        .post("backend/get_user_infos.php", values)
        .then((res) => {
          //   console.log(res);
          if (res.data.status === true) {
            // sessionStorage.setItem("user_infos", JSON.stringify(res.data));
            dispatch(setSoundStatus(res.data.params_sound));
            // console.log(res.data);
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

  const enableOrDisableSound = async () => {
    const newValues = { id_joueur: user_infos_state.ID_JOUEUR, valeur: user_infos_state.params_sound === "1" ? "0" : "1" };

    //   setgetStatLoading(true);
    await axios
      .post("backend/enable_disable_sound.php", newValues)
      .then((res) => {
        //   setgetStatLoading(false);
        if (res.data.status === true) {
          getUserInfos({ id_joueur: user_infos_state.ID_JOUEUR });
        }
      })
      .catch((err) => {
        //   setgetStatLoading(false);
        console.log(err);
      });
  };

  const doSetSoundLevel = useCallback(
    async (value: any) => {
      const newValues = { id_joueur: user_infos_state.ID_JOUEUR, volume_level: value };

      //   setgetStatLoading(true);
      await axios
        .post("backend/set_sound_level.php", newValues)
        .then((res) => {
          //   setgetStatLoading(false);
          if (res.data.status === true) {
            dispatch(setSoundLevel(value));
            // getUserInfos({ id_joueur: user_infos_state.ID_JOUEUR });
          }
        })
        .catch((err) => {
          //   setgetStatLoading(false);
          console.log(err);
        });
    },
    [user_infos_state, dispatch]
  );

  useIonViewDidEnter(() => {
    if (user_infos_state !== null) {
      //   getListStatistiques({ id_joueur: user_infos_state.ID_JOUEUR });
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <HeaderWithBack title={t("Settings")} />
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <SoundOnOff onToggle={enableOrDisableSound} />
        <SoundLevel soundLevel={user_infos_state.params_sound_level} changeSoundLevel={doSetSoundLevel} />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
