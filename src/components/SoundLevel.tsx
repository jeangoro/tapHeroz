/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonIcon, IonRange } from "@ionic/react";
import { volumeHigh, volumeLow } from "ionicons/icons";
import React from "react";
import "./SoundLevel.css";
import { useTranslation } from "react-i18next";

const SoundLevel = ({ soundLevel, changeSoundLevel }) => {
  const { t } = useTranslation();
  const handleVolumeChange = (value) => {
    changeSoundLevel(value);
    console.log(value);
  };
  return (
    <div className="mt-4">
      <h6>{t("Volume level")}</h6>
      <IonRange onIonChange={(e: any) => handleVolumeChange(e.currentTarget.value)} aria-label="Volume level" min={0} max={100} value={soundLevel} pin={true} ticks={true} snaps={true}>
        <IonIcon slot="start" icon={volumeLow}></IonIcon>
        <IonIcon slot="end" icon={volumeHigh}></IonIcon>
      </IonRange>
    </div>
  );
};

export default SoundLevel;
