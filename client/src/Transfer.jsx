import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import ExternalSigningComponent from "./ExternalSigningComponent";
import Modal from "./Modal";


  function Transfer({ address, setBalance }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [signature, setSignature] = useState(null);
    const [transactionId] = useState(Math.random().toString(36).substring(2));
    

  console.log('address is: ',address)
  console.log('recipient is: ', recipient)
  console.log('signature is: ',signature)
  //console.log('message is: ',message)


  const setValue = (setter) => (evt) => setter(evt.target.value);
  const message = `${address}:${recipient}:${sendAmount}:${transactionId}`;

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

  async function transfer(evt) {
    evt.preventDefault();

    
    if (!signature) {
      handleOpenModal();
      return;
    }

    /* const message = `${address}:${recipient}:${sendAmount}`;
    console.log('raw message is: ', message)
    const bytes = utf8ToBytes(message);
    const messageHash = keccak256(bytes);
    const sig = secp256k1.sign(messageHash, privateKey);

    console.log('sig is: ',sig)
    console.log('message is: ', messageHash);
 */
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        sig: signature,
        message
      });
      console.log('balance is: ',balance)
      setBalance(balance);

      // Clear the fields after successful transfer
      setSendAmount("");
      setRecipient("");
      setSignature(null);
    } catch (ex) {
      //alert(ex.response.data.message);
      console.log(ex)
    }
  }

  return (
    <div>
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ExternalSigningComponent
          message={message}
          onSignature={handleSignature}
          
        />
      </Modal>
    </div>
  );

}

export default Transfer;
