import Wallet from "./Wallet";
import Transfer from "./Transfer";
import ExternalSigningComponent from "./ExternalSigningComponent";
import Modal from "./Modal";
import Notification from "./Notification";
import "./App.scss";

import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

 
  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
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
      
     <Transfer
        address={address}
        setBalance={setBalance}        
        setNotification={handleNotification}
    />      
    </div>
    <Notification message={notification.message} type={notification.type} />
    </>
  );
}

export default App;
