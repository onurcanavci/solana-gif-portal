import React from "react";
import "../../App.css";

const ConnectWalletButton = () => {
  const connectWallet = async () => {};

  return (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
};

export default ConnectWalletButton;
