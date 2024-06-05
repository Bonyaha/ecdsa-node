import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";



function Transfer({ address, setBalance,privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  console.log('address is: ',address)
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = `${address}:${recipient}:${sendAmount}`;
    const bytes = utf8ToBytes(message);
    const messageHash = keccak256(bytes);
    const sig = secp256k1.sign(messageHash, privateKey);

    console.log('sig is: ',sig)
    console.log('message is: ', messageHash);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        sig: {
          r: sig.r.toString(),
          s: sig.s.toString(),
          recovery: sig.recovery
        },
        message
      });
      setBalance(balance);
    } catch (ex) {
      //alert(ex.response.data.message);
      console.log(ex)
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
