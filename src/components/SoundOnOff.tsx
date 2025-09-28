/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonToggle } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function SoundOnOff({ onToggle }) {
  const { t } = useTranslation();
  const params_sound = useSelector((state: any) => state?.userInfos?.user_infos?.params_sound);

  return (
    <div>
      {/* <button onClick={props.onToggle}>{props.isSoundOn ? t("Sound On") : t("Sound Off")}</button> */}
      <IonToggle checked={params_sound === "0" ? false : true} onIonChange={onToggle} enableOnOffLabels={true}>
        {t("Enable Sound / Disable Sound")}
      </IonToggle>
    </div>
  );
}

export default SoundOnOff;
