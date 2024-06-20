import { useState } from "react";
import server from "./server";


const Wallet = ({ address,setAddress,balance,setBalance}) => {  
  const [publicKey, setPublicKey] = useState("");

  const onChange = async (evt) => {
    const publicKey = evt.target.value;
    setPublicKey(publicKey);    
    
    if (publicKey) {
      setAddress(publicKey);
      const {data:{balance}} = await server.get(`balance/${publicKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  const clearFields = () => {
    setPublicKey("");
    setAddress("");
    setBalance(0);
  }

  return (
    <div className="container wallet">
      <div>
      <h1>Your Wallet</h1>

      <label>
        Public key
        <input placeholder="Type in a public key" value={publicKey} onChange={onChange}></input>
      </label>
      <label>
        Address: {address.slice(0,10)}...
      </label>

      <div className="balance">Balance: {balance}</div>
      <button className="button-small" onClick={clearFields}>Clear</button>      
      </div>
    </div>
  );
}

export default Wallet;
