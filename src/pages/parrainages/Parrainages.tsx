import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Share } from "@capacitor/share";
import { Clipboard } from "@capacitor/clipboard";
import { copy, shareSocial } from "ionicons/icons";
import { setListFieuls } from "../../store/parrainagesSlice";

const Parrainages = () => {
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listFieuls = useSelector((state: any) => state?.parrainages?.listFieuls);

  const dispatch = useDispatch();

  async function shareLink(url: string, text?: string) {
    try {
      await Share.share({
        title: "Share Link",
        text: text,
        url: url,
        dialogTitle: "Share with",
      });
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  }

  async function copyLinkToClipboard(link: string) {
    await Clipboard.write({
      string: link,
    });
    // Optionally, add a toast or alert to confirm the copy operation
    // For example, using Ionic's ToastController:
    // const toast = await this.toastController.create({
    //   message: 'Link copied to clipboard!',
    //   duration: 2000
    // });
    // toast.present();
  }

  const getListFieuls = useCallback(
    async (values: object) => {
      await axios
        .post("list_fieuls.php", values)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            dispatch(setListFieuls(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  useIonViewDidEnter(() => {
    // console.log("Page did enter view");
    if (user_infos_state !== null) {
      getListFieuls({ id_joueur: user_infos_state.ID_JOUEUR });
    }
  });

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Partages et Parrainages</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {/* <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">Tab 2</IonTitle>
                </IonToolbar>
              </IonHeader> */}
          <IonCard>
            <IonCardContent>
              <h1>Partagez l'application avec vos amis et gagner de recompense en argent reel pour chaque joueur confirmé</h1>
              <br />
              <p>Copiez votre lien de parrainge et envoyez à vos amis.</p>
              <br />
              <a href={"/register/?referer=" + user_infos_state.ID_JOUEUR} target="_blank" rel="noopener noreferrer">
                {"http://tapcompetition.reunioncfy.com/register/?referer=" + user_infos_state.ID_JOUEUR}
              </a>{" "}
              <IonIcon title="copier le lien" icon={copy} onClick={() => copyLinkToClipboard("http://tapcompetition.reunioncfy.com/register/?referer=" + user_infos_state.ID_JOUEUR)}></IonIcon>
              <br />
              <br />
              <IonButton onClick={() => shareLink("http://tapcompetition.reunioncfy.com/register/?referer=" + user_infos_state.ID_JOUEUR, "Venez participez à la competition du plus rapide tapeur sur son ecran de telephone.")}>
                <IonIcon icon={shareSocial}></IonIcon> Partagez l'application
              </IonButton>
              <hr />
              <h2>Mes fieuls</h2>
              {listFieuls?.map((fieul, key) => {
                return (
                  <IonItem key={key} lines="full">
                    <i color="primary" slot="start">
                      {fieul.RANK}
                    </i>
                    <IonLabel>
                      <IonRow>
                        <IonCol>{fieul.LOGIN}</IonCol>
                        <IonCol size="2">
                          <IonImg className="coin-icon" src={"/assets/images/coin.png"}></IonImg>
                        </IonCol>
                        <IonCol>{fieul.SOLDE_POINTS}</IonCol>
                      </IonRow>
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Parrainages;
