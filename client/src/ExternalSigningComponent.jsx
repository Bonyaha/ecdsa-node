import React, { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes } from "ethereum-cryptography/utils.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ExternalSigningComponent = ({ message,onSignature }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  //console.log('message is: ',message)

  const handleSign = (e) => {
    e.preventDefault();

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
           <div style={{ position: "relative" }}>
            <input
              type={showPrivateKey ? "text" : "password"}
              placeholder="Type in a private key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              required
              style={{ paddingRight: "2.5rem" }}
            />
            <FontAwesomeIcon
              icon={showPrivateKey ? faEyeSlash : faEye}
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          </div>
        </label>
        
        <div>Message: {message.slice(0,10)}...</div>
             
        <button type="submit" className="button">Sign Message</button>
      </form>
    </div>
  );
}

export default ExternalSigningComponent;
