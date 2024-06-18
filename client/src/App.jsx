import Wallet from "./Wallet";
import Transfer from "./Transfer";
import ExternalSigningComponent from "./ExternalSigningComponent";
import Modal from "./Modal";
import "./App.scss";

import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSignature = (sig) => {
    setSignature(sig);
    handleCloseModal();
  };

  return (
    <>
    <div className="app">
      <Wallet
        balance={balance}        
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ExternalSigningComponent onSignature={handleSignature} />
      </Modal>
      <Transfer setBalance={setBalance} address={address} signature={signature}/>
      
    </div>
    <button className="signing-button" onClick={handleOpenModal}>Make Signing</button>
    </>
  );
}

export default App;
