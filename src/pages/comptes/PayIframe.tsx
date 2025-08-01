import React from "react";

const PayIframe = () => {
  return (
    <div>
      <h2>Embedded Content</h2>
      <iframe
        src="https://pay.glotelho.cm/collect/mhitr7pqZA"
        title="Payement"
        width="340"
        height="600"
        frameBorder="0" // Optional: remove border
      ></iframe>
    </div>
  );
};

export default PayIframe;
