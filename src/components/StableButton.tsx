import React from "react";
import { IonButton, IonIcon } from "@ionic/react";

interface StableButtonProps {
  label: string;
  icon?: string; 
  assetIcon?: string; 
  onClick?: () => void;
}

const StableButton: React.FC<StableButtonProps> = ({ label, icon, assetIcon, onClick }) => {
  return (
    <IonButton expand="block" fill="outline" className="btn-stable" onClick={onClick}>
      <div className="btn-content">
        <div className="btn-left">
          {icon && <IonIcon icon={icon} />}
          <span className="btn-label">{label}</span>
        </div>
        {assetIcon && <img src={assetIcon} alt="asset icon" className="btn-asset-icon" />}
      </div>
    </IonButton>
  );
};

export default StableButton;
