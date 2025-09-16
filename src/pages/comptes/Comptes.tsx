import React, { useState } from "react";
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonButton, IonFooter, IonTabBar, IonTabButton, IonIcon } from "@ionic/react";
import { list, gift, menu, personOutline, settingsOutline, languageOutline, helpCircleOutline, peopleOutline, trophyOutline, refreshOutline, timeOutline, informationCircleOutline, cashOutline, arrowDownCircleOutline } from "ionicons/icons";
import "./Comptes.css";
import StableButton from "../../components/StableButton";
import CashInModal from "./cashIn/CashInModal";
import CashOut from "./cashOut/CashOut";

const RewardsPage: React.FC = () => {
  const [isOpenDepot, setisOpenDepot] = useState(false);
  const [isOpenRetrait, setisOpenRetrait] = useState(false);
  return (
    <IonPage>
      <IonContent className="list-contener">
        {/* User Info */}
        <div className="user-containt">
          {" "}
          <div className="acount-start">
            <a className="top">
              <div className="name">
                <img className="flag" src="/assets/images/cm.svg" alt="" />
                <div>Hi, Cartel!</div>
              </div>
              <div className="user-id" onClick={() => setisOpenDepot(true)}>
                <span>CASH</span>
                <span>
                  <img src="/assets/icon/icons8_add_48px.png" alt="asset icon" className="btn-add-icon" /> $21
                </span>
                <CashInModal isOpen={isOpenDepot} setisOpen={setisOpenDepot} />
              </div>
            </a>
          </div>
          {/* Menu Sections */}
          <IonList className="menu-section">
            <h6 className="separator">My account</h6>
            <StableButton label="Cash Out" icon={cashOutline} onClick={() => setisOpenRetrait(true)} />
            <StableButton label="Cash In" icon={cashOutline} onClick={() => setisOpenDepot(true)} />
            <CashOut isOpen={isOpenRetrait} setisOpen={setisOpenRetrait} />
            <StableButton label="About Me" icon={personOutline} onClick={() => console.log("Profile clicked")} />
            <StableButton label="Leagues" icon={trophyOutline} assetIcon="/assets/icon/icons8_wonder_woman_40px.png" onClick={() => console.log("Profile clicked")} />
            <StableButton label="Referrals" icon={peopleOutline} routerLink="/referrals" />
            <StableButton label="History" icon={timeOutline} routerLink="/history" />
            {/* <StableButton label="FAQ" icon={informationCircleOutline} onClick={() => console.log("Profile clicked")} /> */}
          </IonList>
          <IonList className="menu-section">
            <h6 className="separator">Others</h6>
            <StableButton label="Settings" icon={settingsOutline} onClick={() => console.log("Profile clicked")} />
            <StableButton label="Language" icon={languageOutline} routerLink="/language" assetIcon="/assets/icon/icons8_usa_48px.png" />
            <StableButton label="Support" icon={helpCircleOutline} onClick={() => console.log("Profile clicked")} />
          </IonList>
          {/* Sign Out */}
          <div className="signout-section">
            <IonButton>Sign out</IonButton>
            <p className="version-text">Version 3.5.75</p>
          </div>
        </div>
      </IonContent>

      {/* Bottom Navigation */}
      <IonFooter>
        <IonTabBar slot="bottom" className="tab-bar">
          <IonTabButton tab="surveys" href="/surveys">
            <IonIcon icon={list} />
            <IonLabel>Surveys</IonLabel>
          </IonTabButton>
          <IonTabButton tab="rewards" href="/rewards" selected>
            <IonIcon icon={gift} />
            <IonLabel>Rewards</IonLabel>
          </IonTabButton>
          <IonTabButton tab="menu" href="/menu">
            <IonIcon icon={menu} />
            <IonLabel>Menu</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default RewardsPage;
