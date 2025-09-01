import React, { useCallback, useEffect, useState } from "react";
import { IonPage, IonContent, IonRadio, IonRadioGroup, IonButtons, IonItem, IonIcon, IonLabel, useIonViewDidEnter } from "@ionic/react";
// import "./Language.css";
import { useHistory } from "react-router-dom";
import HeaderWithBack from "../../../components/HeaderWithBack";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { alertCircle, arrowDown, arrowUp, checkmarkCircle, swapHorizontal } from "ionicons/icons";
import axios from "axios";
import { setListTransactions } from "../../../store/comptesSlice";
const History: React.FC = () => {
  const dispatch = useDispatch();
  const [getDataLoading, setgetDataLoading] = useState(false);
  const user_infos_state = useSelector((state: any) => state?.userInfos?.user_infos);
  const listTransactions = useSelector((state: any) => state?.comptes?.listTransactions);

  const [selected, setSelected] = useState("en");
  const history = useHistory();
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
    <IonPage>
      <IonContent>
        <HeaderWithBack title="History" />
        <h6 className="separator mt-4 ">Transactions history</h6>
        {getDataLoading ? (
          <Loader />
        ) : (
          <>
            {listTransactions?.map((transaction, key) => {
              return (
                <IonItem key={key} lines="full">
                  <IonIcon
                    icon={transaction.TYPE === "depot" ? arrowDown : transaction.TYPE === "retrait" ? arrowUp : swapHorizontal}
                    color={transaction.TYPE === "depot" ? "success" : transaction.TYPE === "retrait" ? "danger" : "warning"}
                    slot="start"
                  ></IonIcon>
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
  );
};

export default History;
