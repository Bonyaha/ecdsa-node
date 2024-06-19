import React, { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";

function ExternalSigningComponent({ message,onSignature }) {
  const [privateKey, setPrivateKey] = useState("");


  console.log('message is: ',message)

  const handleSign = () => {
    const privateKeyInput = document.getElementById('private-key-input');
    if (!privateKey) {
      privateKeyInput.setCustomValidity("Private key is required.");
      privateKeyInput.reportValidity();
      return;
    }

    //privateKeyInput.setCustomValidity(""); // Clear any previous custom error

    const bytes = utf8ToBytes(message);
    const messageHash = keccak256(bytes);
    const sig = secp256k1.sign(messageHash, privateKey);

    console.log('sig is: ',sig)
    onSignature({
      r: sig.r.toString(),
      s: sig.s.toString(),
      recovery: sig.recovery,
    });
    
  };

  return (
    <div className="container">
      <h1>External Signing Tool</h1>
     <form onSubmit={handleSign}>
        <label>
          Private Key
          <input
            type="text"
            placeholder="Type in a private key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            required
          />
        </label>
        <label>
        Message
        <input
          type="text"
          placeholder="Type in a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
        <button type="submit" className="button">Sign Message</button>
      </form>
    </div>
  );
}

export default ExternalSigningComponent;
