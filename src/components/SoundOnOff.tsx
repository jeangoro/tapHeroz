import { IonToggle } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";

function SoundOnOff() {
  const { t } = useTranslation();
  return (
    <div>
      {/* <button onClick={props.onToggle}>{props.isSoundOn ? t("Sound On") : t("Sound Off")}</button> */}
      <IonToggle enableOnOffLabels={true}>{t("Enable Sound")}</IonToggle>
    </div>
  );
}

export default SoundOnOff;
