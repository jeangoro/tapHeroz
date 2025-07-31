import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
import { airplane, bluetooth, call, wifi } from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { reset, setUserInfos } from "../store/userInfosSlice";

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const deconnexion = () => {
    sessionStorage.clear();
    dispatch(reset());
    history.push("/login");
  };

  return (
    <div>
      <IonMenu swipeGesture={true} type="push" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonMenuToggle>
              <IonItem>
                <IonIcon aria-hidden="true" icon={airplane} slot="start"></IonIcon>
                <IonLabel>Airplane Mode</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon aria-hidden="true" icon={wifi} slot="start"></IonIcon>
                <IonLabel>Wi-Fi</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon aria-hidden="true" icon={bluetooth} slot="start"></IonIcon>
                <IonLabel>Bluetooth</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon aria-hidden="true" icon={call} slot="start"></IonIcon>
                <IonLabel>Cellular</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
          <IonButton onClick={deconnexion} color={"danger"}>
            Deconnexion
          </IonButton>
        </IonContent>
      </IonMenu>
    </div>
  );
};

export default Menu;
