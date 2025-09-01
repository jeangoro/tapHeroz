import React, { useCallback, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, useIonToast, useIonViewDidEnter, IonRow, IonCol, IonImg } from "@ionic/react";
import { mailOutline, logoFacebook, copyOutline, logoX } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Referrals.css";
import { setListFieuls } from "../../../store/parrainagesSlice";
import Loader from "../../../components/Loader";
import HeaderWithBack from "../../../components/HeaderWithBack";


const Referrals: React.FC = () => {
     const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
    const listFieuls = useSelector((state: any) => state?.Referrals?.listFieuls);

    const dispatch = useDispatch();

    const [present] = useIonToast();

    const [getDataLoading, setgetDataLoading] = useState(false);

    const presentToast = (position: "top" | "middle" | "bottom", message: string) => {
      present({
        message: message,
        duration: 2000,
        position: position,
      });
    };

    async function copyLinkToClipboard(link: string) {


      navigator.clipboard
        .writeText(link)
        .then(() => {
          presentToast("middle", "Le lien a été copié!");
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
        });

    }

    const getListFieuls = useCallback(
      async (values: object) => {
        setgetDataLoading(true);
        await axios
          .post("backend/list_fieuls.php", values)
          .then((res) => {
            setgetDataLoading(false);
            // console.log(res);
            if (res.status === 200) {
              dispatch(setListFieuls(res.data));
            }
          })
          .catch((err) => {
            setgetDataLoading(false);
            console.log(err);
          });
      },
      [dispatch]
    );

    useIonViewDidEnter(() => {
      if (user_infos_state !== null) {
        getListFieuls({ id_joueur: user_infos_state.ID_JOUEUR });
      }
    });

    const shareLink = async (url, text) => {
      const shareData = {
        title: "Partage de l'application!",
        text: text,
        url: url, 
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          console.log("Link shared successfully");
        } catch (error) {
          console.error("Error sharing link:", error);
        }
      } else {
        alert("Web Share API is not supported in this browser.");
      }
    };


  return (
    <IonPage>
      <HeaderWithBack title="Referral" />


      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Your shareable link</IonLabel>
          <a href={"/register/?referer=" + user_infos_state.ID_JOUEUR} target="_blank" rel="noopener noreferrer">
            {axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR}
          </a>
          <IonButton fill="clear" slot="end" onClick={() => copyLinkToClipboard(axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR)}>
            <IonIcon icon={copyOutline} />
          </IonButton>
        </IonItem>

        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <IonButton color="medium" onClick={() => shareLink(axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR, "")}>
            <IonIcon icon={mailOutline} />
          </IonButton>
          <IonButton color="danger" onClick={() => shareLink(axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR, "")}>
            <IonIcon icon={logoFacebook} />
          </IonButton>
          <IonButton color="primary" onClick={() => shareLink(axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR, "")}>
            <IonIcon icon={logoX} />
          </IonButton>
        </div>
        <h6 className="separator mt-4">My Referrals</h6>
        {getDataLoading ? (
          <Loader />
        ) : (
          <>
            {listFieuls?.map((fieul: any, key: number) => {
              return (
                <IonItem key={key} lines="full">
                  <i color="primary" slot="start">
                    {fieul.RANK}
                  </i>
                  <IonLabel className="my-0">
                    <IonRow>
                      <IonCol className="py-0">{fieul.LOGIN}</IonCol>
                      <IonCol className="py-0" size="2">
                        <IonImg className="coin-icon" src={"/assets/images/coin.png"}></IonImg>
                      </IonCol>
                      <IonCol className="py-0">{fieul.SOLDE_POINTS}</IonCol>
                    </IonRow>
                  </IonLabel>
                </IonItem>
              );
            })}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Referrals;
