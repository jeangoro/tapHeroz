import { IonSpinner } from "@ionic/react";
import React from "react";

const Loader = () => {
  return (
    <div className="t-a-c">
      <IonSpinner
        name="crescent"
        style={{
          width: "24px",
          height: "24px",
          color: "#0D65D9",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
};

export default Loader;
