import React, { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes } from "ethereum-cryptography/utils.js";

const ExternalSigningComponent = ({ message,onSignature }) => {
  const [privateKey, setPrivateKey] = useState("");


  //console.log('message is: ',message)

  const handleSign = () => {
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
    <div className="container signing">
      <h1>Signing Tool</h1>
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
