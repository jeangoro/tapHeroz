/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast, useIonViewDidEnter } from "@ionic/react";
import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { copy, shareSocial } from "ionicons/icons";
import { setListFieuls } from "../../store/parrainagesSlice";
// import Menu from "../../components/Menu";

const Parrainages = () => {
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listFieuls = useSelector((state: any) => state?.parrainages?.listFieuls);

  const dispatch = useDispatch();

  const [present] = useIonToast();

  const presentToast = (position: "top" | "middle" | "bottom", message: string) => {
    present({
      message: message,
      duration: 2000,
      position: position,
    });
  };

  // async function shareLink(url: string, text?: string) {
  //   try {
  //     await Share.share({
  //       title: "Share Link",
  //       text: text,
  //       url: url,
  //       dialogTitle: "Share with",
  //     });
  //   } catch (error) {
  //     console.error("Sharing failed:", error);
  //   }
  // }

  async function copyLinkToClipboard(link: string) {
    // await Clipboard.write({
    //   string: link,
    // });

    navigator.clipboard
      .writeText(link)
      .then(() => {
        presentToast("middle", "Le lien a été copié!");
        // console.log("Text copied successfully!");
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
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
        .post("backend/list_fieuls.php", values)
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

  /*share */
  // const shareData = {
  //   title: "My Awesome Website",
  //   text: "Check out this cool link!",
  //   url: "https://www.example.com/your-page",
  // };

  // const handleShare = async () => {
  //   if (navigator.share) {
  //     try {
  //       await navigator.share(shareData);
  //       console.log("Content shared successfully");
  //     } catch (error) {
  //       console.error("Error sharing content:", error);
  //     }
  //   } else {
  //     alert("Web Share API is not supported in this browser. Please copy the link manually.");
  //   }
  // };

  const shareLink = async (url, text) => {
    const shareData = {
      title: "Partage de l'application!",
      text: text,
      url: url, // Replace with your desired link NB: it must be in https
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

  /* end share */

  return (
    <>
      {/* <Menu /> */}
      <IonPage>
        <IonHeader>
          <IonToolbar>
            {/* <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons> */}
            <IonTitle>Partages et Parrainages</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <div className="t-a-c">
            <h5>Partagez l'application avec vos amis et gagner de recompense en argent reel pour chaque joueur confirmé</h5>
            <p>Copiez votre lien de parrainge et envoyez à vos amis.</p>
            <a href={"/register/?referer=" + user_infos_state.ID_JOUEUR} target="_blank" rel="noopener noreferrer">
              {axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR}
            </a>{" "}
            <IonIcon style={{ marginLeft: "10px" }} title="copier le lien" icon={copy} onClick={() => copyLinkToClipboard(axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR)}></IonIcon>
            <IonButton onClick={() => shareLink(axios.defaults.baseURL + "register/?referer=" + user_infos_state.ID_JOUEUR, "Venez participez à la competition du plus rapide tapeur sur son ecran de telephone.")}>
              <IonIcon style={{ marginRight: "10px" }} icon={shareSocial}></IonIcon> Partagez l'application
            </IonButton>
          </div>
          {/* <button onClick={handleShare}>Share Link</button> */}
          {/* <IonButton expand="block" onClick={() => shareLink()}>
                Share Link
              </IonButton> */}
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
        </IonContent>
      </IonPage>
    </>
  );
};

export default Parrainages;
