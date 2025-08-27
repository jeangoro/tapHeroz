/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import Depot from "./Depot";
import "./Comptes.css";
import Retrait from "./Retrait";
import { useDispatch, useSelector } from "react-redux";
import { alertCircle, arrowDown, arrowUp, checkmarkCircle, close, swapHorizontal } from "ionicons/icons";
import axios from "axios";
import { setListTransactions } from "../../store/comptesSlice";
import Menu from "../../components/Menu";
import Loader from "../../components/Loader";

const Comptes = () => {
  const dispatch = useDispatch();
  const [isOpenDepot, setisOpenDepot] = useState(false);
  const [isOpenRetrait, setisOpenRetrait] = useState(false);
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listTransactions = useSelector((state: any) => state?.comptes?.listTransactions);

  const [getDataLoading, setgetDataLoading] = useState(false);

  const getListTransaction = useCallback(
    async (values: object) => {
      setgetDataLoading(true);
      await axios
        .post("backend/list_transactions.php", values)
        .then((res) => {
          setgetDataLoading(false);
          // console.log(res);
          if (res.status === 200) {
            dispatch(setListTransactions(res.data));
          }
        })
        .catch((err) => {
          setgetDataLoading(false);
          console.log(err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (user_infos_state !== null) {
      getListTransaction({ id_joueur: user_infos_state.ID_JOUEUR });
    }
  }, [user_infos_state, getListTransaction]);

  useIonViewDidEnter(() => {
    // console.log("Page did enter view");
    if (user_infos_state !== null) {
      getListTransaction({ id_joueur: user_infos_state.ID_JOUEUR });
    }
  });

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Comptes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding font-small">
          <IonRow>
            <IonCol size="6">Nom d'utilisateur: </IonCol>
            <IonCol size="6">{user_infos_state.LOGIN}</IonCol>
          </IonRow>
          <IonRow className="t-a-l">
            <IonCol size="6">Nom et prénom: </IonCol>
            <IonCol size="6">{user_infos_state.NOM_PRENOM}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">Téléphone: </IonCol>
            <IonCol size="6">{user_infos_state.TELEPHONE}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">Pays: </IonCol>
            <IonCol size="6">{user_infos_state.PAYS}</IonCol>
          </IonRow>
          <IonRow className="text-align-center fz-10">
            <IonCol size="12" className="alert alert-success py-1">
              <h6 className="mb-0" color="danger">
                Solde du compte: {parseFloat(user_infos_state.SOLDE_ARGENT).toLocaleString()} FCFA
              </h6>
            </IonCol>
            <IonCol size="12" className="alert alert-warning py-1">
              <h6 className="mb-0" color="danger">
                Recompense de parrainage en attente: {parseFloat(user_infos_state.total_recompense_en_attente).toLocaleString()} FCFA
              </h6>
            </IonCol>
            <br />
            <br />
            <IonCol size="4">
              <IonButton onClick={() => setisOpenDepot(true)}>Recharger</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton onClick={() => setisOpenRetrait(true)}>Retirer</IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton>Transfert</IonButton>
            </IonCol>
          </IonRow>
          <Depot isOpen={isOpenDepot} setisOpen={setisOpenDepot} />
          <Retrait isOpen={isOpenRetrait} setisOpen={setisOpenRetrait} />
          <h1>Liste des transactions</h1>
          {getDataLoading ? (
            <Loader />
          ) : (
            <>
              {listTransactions?.map((transaction, key) => {
                return (
                  <IonItem key={key} lines="full">
                    <IonIcon icon={transaction.TYPE === "depot" ? arrowDown : transaction.TYPE === "retrait" ? arrowUp : swapHorizontal} color={transaction.TYPE === "depot" ? "success" : transaction.TYPE === "retrait" ? "danger" : "warning"} slot="start"></IonIcon>
                    <IonLabel className="py-0">
                      {transaction.TYPE} de {transaction.MONTANT} FCFA
                    </IonLabel>
                    <IonIcon
                      icon={transaction?.ETAT === "Valide" ? checkmarkCircle : transaction?.ETAT === "En attente de confirmation" ? alertCircle : close}
                      color={transaction?.ETAT === "Valide" ? "success" : transaction?.ETAT === "En attente de confirmation" ? "warning" : "danger"}
                      slot="end"
                    ></IonIcon>
                  </IonItem>
                );
              })}
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Comptes;
