/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IonPage, IonContent, IonList, IonLabel, IonButton, IonFooter, IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { list, gift, menu, personOutline, settingsOutline, languageOutline, helpCircleOutline, peopleOutline, trophyOutline, timeOutline, cashOutline } from "ionicons/icons";
import "./Comptes.css";
import StableButton from "../../components/StableButton";
import CashInModal from "./cashIn/CashInModal";
import CashOut from "./cashOut/CashOut";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/userInfosSlice";
import i18n from "../../i18n";

import usa from "./../../../public/assets/icon/icons8_usa_48px.png";
// import usa from "assets/icon/icons8_usa_48px.png";
import france from "./../../../public/assets/icon/icons8_france_48px.png";
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";

const RewardsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isOpenDepot, setisOpenDepot] = useState(false);
  const [isOpenRetrait, setisOpenRetrait] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const currentLanguage = i18n.language;

  const userInfos = useSelector((state: any) => state.userInfos.user_infos);

  const deconnexion = () => {
    sessionStorage.clear();
    dispatch(reset());
    history.push("/login");
    history.go(0);
  };

  return (
    <IonPage>
      <IonContent className="list-contener">
        {/* User Info */}
        <CashInModal isOpen={isOpenDepot} setisOpen={setisOpenDepot} />
        <div className="user-containt">
          <div className="acount-start">
            <a className="top">
              <div className="name">
                <img className="flag" src="/assets/images/cm.svg" alt="" />
                <div>
                  {t("Hi")}, {userInfos.LOGIN}
                </div>
              </div>
              <div className="user-id" onClick={() => setisOpenDepot(true)}>
                <span>{t("CASH")}</span>
                <span>
                  <img src="/assets/icon/icons8_add_48px.png" alt="asset icon" className="btn-add-icon" /> {userInfos.SOLDE_ARGENT.toLocaleString()} FCFA
                </span>
              </div>
            </a>
          </div>
          {/* Menu Sections */}
          <IonList className="menu-section">
            <h6 className="separator">{t("My account")}</h6>
            <StableButton label={t("Cash Out")} icon={cashOutline} onClick={() => setisOpenRetrait(true)} />
            <StableButton label={t("Cash In")} icon={cashOutline} onClick={() => setisOpenDepot(true)} />
            <CashOut isOpen={isOpenRetrait} setisOpen={setisOpenRetrait} />
            <StableButton label={t("About Me")} icon={personOutline} onClick={() => console.log("Profile clicked")} />
            <StableButton label={t("Leagues")} icon={trophyOutline} assetIcon="/assets/icon/icons8_wonder_woman_40px.png" onClick={() => console.log("Profile clicked")} />
            <StableButton label={t("Referrals")} icon={peopleOutline} routerLink="/referrals" />
            <StableButton label={t("History")} icon={timeOutline} routerLink="/history" />
            {/* <StableButton label="FAQ" icon={informationCircleOutline} onClick={() => console.log("Profile clicked")} /> */}
          </IonList>
          <IonList className="menu-section">
            <h6 className="separator">{t("Others")}</h6>
            <StableButton label={t("Settings")} icon={settingsOutline} onClick={() => console.log("Profile clicked")} />
            {/* <StableButton label="Language" icon={languageOutline} routerLink="/language" assetIcon="/assets/icon/icons8_usa_48px.png" /> */}
            <StableButton label={t("Language")} icon={languageOutline} routerLink="/language" assetIcon={currentLanguage === "en" ? usa : france} />
            <StableButton label={t("Support")} icon={helpCircleOutline} onClick={() => console.log("Profile clicked")} />
          </IonList>
          {/* Sign Out */}
          <div className="signout-section">
            <IonButton onClick={deconnexion}>{t("Sign out")}</IonButton>
            <p className="version-text">{t("Version 3.5.75")}</p>
          </div>
        </div>
      </IonContent>

      {/* Bottom Navigation */}
      <IonFooter>
        <IonTabBar slot="bottom" className="tab-bar">
          <IonTabButton tab="surveys" href="/surveys">
            <IonIcon icon={list} />
            <IonLabel>{t("Surveys")}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="rewards" href="/rewards" selected>
            <IonIcon icon={gift} />
            <IonLabel>{t("Rewards")}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="menu" href="/menu">
            <IonIcon icon={menu} />
            <IonLabel>{t("Menu")}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RewardsPage;
