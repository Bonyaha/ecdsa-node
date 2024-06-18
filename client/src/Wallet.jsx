import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { useState } from "react";

function Wallet({ address,setAddress,balance, setBalance}) {  
  const [publicKey, setPublicKey] = useState("");

  async function onChange(evt) {
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

  function clearFields() {
    setPublicKey("");
    setAddress("");
    setBalance(0);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public key
        <input placeholder="Type in a public key" value={publicKey} onChange={onChange}></input>
      </label>
      <div>
        Address: {address.slice(0,10)}...
      </div>

      <div className="balance">Balance: {balance}</div>
      <button className="button" onClick={clearFields}>Clear</button>
    </div>
  );
}

export default Wallet;
