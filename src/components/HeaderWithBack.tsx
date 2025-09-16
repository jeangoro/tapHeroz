import { IonButtons } from "@ionic/react";
import { useHistory } from "react-router-dom";

const HeaderWithBack = ({ title }) => {
  const history = useHistory();

  return (
    <div className="mt-4" style={{ position: "relative", padding: "0 12px", height: "40px" }}>
      <IonButtons slot="start">
        <img
          src="/assets/icon/icons8_left_16px_1.png"
          alt="Back"
          onClick={() => history.goBack()}
          style={{
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
      </IonButtons>

      <span
        style={{
          fontSize: "16px",
          fontWeight: 400,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {title}
      </span>
    </div>
  );
};

export default HeaderWithBack;
