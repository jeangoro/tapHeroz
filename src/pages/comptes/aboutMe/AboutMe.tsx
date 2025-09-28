/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import React from "react";
import HeaderWithBack from "../../../components/HeaderWithBack";
import { useTranslation } from "react-i18next";
import { arrowForwardCircle, calendar, earth, logIn, phonePortrait, star, time } from "ionicons/icons";
import { useSelector } from "react-redux";

const AboutMe = () => {
  const { t } = useTranslation();
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);

  return (
    <IonPage>
      <IonHeader className="bg-light">
        <HeaderWithBack title={t("About me")} />
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h5>{t("My profile")}</h5>
        <IonList>
          <IonItem>
            <IonIcon aria-hidden="true" icon={logIn} slot="start"></IonIcon>
            <IonLabel>
              {t("Username")} : <span className="text-primary">{user_infos_state?.LOGIN}</span>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon aria-hidden="true" icon={arrowForwardCircle} slot="start"></IonIcon>
            <IonLabel>
              {t("Player id")} : <span className="text-primary">{user_infos_state?.ID_JOUEUR}</span>
            </IonLabel>
          </IonItem>
          {/* <IonItem>
            <IonIcon aria-hidden="true" icon={arrowForwardCircle} slot="start"></IonIcon>
            <IonLabel>
              {t("League id")} : <span className="text-primary">{user_infos_state?.ID_LEAGUE}</span>
            </IonLabel>
          </IonItem> */}
          <IonItem>
            <IonIcon aria-hidden="true" icon={arrowForwardCircle} slot="start"></IonIcon>
            <IonLabel>
              {t("League name")} : <span className="text-primary">{user_infos_state?.NOM_LEAGUE}</span>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon aria-hidden="true" icon={arrowForwardCircle} slot="start"></IonIcon>
            <IonLabel>
              {t("Participation cost")} : <span className="text-primary">{user_infos_state?.COUT_PARTICIPATION}</span>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon aria-hidden="true" icon={star} slot="start"></IonIcon>
            <IonLabel>
              {t("Complete name")} : <span className="text-primary">{user_infos_state?.NOM_PRENOM}</span>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon aria-hidden="true" icon={phonePortrait} slot="start"></IonIcon>
            <IonLabel>
              {t("Phone number")} : <span className="text-primary">{user_infos_state?.TELEPHONE}</span>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon aria-hidden="true" icon={earth} slot="start"></IonIcon>
            <IonLabel>
              {t("Country")} : <span className="text-primary">{user_infos_state?.PAYS}</span>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon aria-hidden="true" icon={calendar} slot="start"></IonIcon>
            <IonLabel>
              {t("Register date")} : <span className="text-primary">{user_infos_state?.DATE_INSCRIPTION}</span>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon aria-hidden="true" icon={arrowForwardCircle} slot="start"></IonIcon>
            <IonLabel>
              {t("Referer id")} : <span className="text-primary">{user_infos_state?.ID_PARRAIN}</span>
            </IonLabel>
          </IonItem>

          {/* <IonItem>
            <IonIcon aria-hidden="true" icon={arrowForwardCircle} slot="start"></IonIcon>
            <IonLabel>
              {t("Competition id")} : <span className="text-primary">{user_infos_state?.id_competition}</span>
            </IonLabel>
          </IonItem> */}
          <IonItem>
            <IonIcon aria-hidden="true" icon={arrowForwardCircle} slot="start"></IonIcon>
            <IonLabel>
              {t("Competition name")} : <span className="text-primary">{user_infos_state?.nom_competition}</span>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon aria-hidden="true" icon={time} slot="start"></IonIcon>
            <IonLabel>
              {t("Server current date and time")} : <span className="text-primary">{user_infos_state?.current_date_time}</span>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AboutMe;
