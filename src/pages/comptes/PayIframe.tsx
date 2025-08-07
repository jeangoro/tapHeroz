import React from "react";

const PayIframe = () => {
  return (
    <div>
      {/* <h2>Embedded Content</h2> */}
      <iframe
        id="iframe-depot"
        src="https://pay.glotelho.cm/collect/yASRDtENBU"
        title="Payement"
        loading="lazy"
        width="340"
        height="600"
        //frameBorder="0" // Optional: remove border
      ></iframe>
    </div>
  );
};

export default PayIframe;
