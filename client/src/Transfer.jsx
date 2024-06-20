import { useState } from "react";
import server from "./server";
import ExternalSigningComponent from "./ExternalSigningComponent";
import Modal from "./Modal";


  const Transfer = ({ address, setBalance, setNotification }) => {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");    
    const [signature, setSignature] = useState(null);
    const [transactionId] = useState(Math.random().toString(36).substring(2));
    const [isModalOpen, setIsModalOpen] = useState(false);

  //console.log('address is: ',address)
  //console.log('recipient is: ', recipient)
  //console.log('signature is: ',signature)
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

 const transfer =  async (evt) => {
    evt.preventDefault();
    
    if (!signature && address) {
      handleOpenModal();
      return;
    }
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
      //console.log('balance is: ',balance)
      setBalance(balance);

      // Clear the fields after successful transfer
      setSendAmount("");
      setRecipient("");
      setSignature(null);

      setNotification("Transfer successful!", "success");
    } catch (ex) {      
      console.log(ex)
      const errorMessage = address ? "Transfer failed. Please try again." : "Please, fill in public key field in your wallet";
      setNotification(errorMessage, "error");
    }
  }
  const clearFields = () => {
    setSendAmount("");
    setRecipient("");
    setSignature(null);  
  }

  return (
    <div className="container transfer">
      <form  onSubmit={transfer}>
        <h1>Send Transaction</h1>
        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
            required
          ></input>
        </label>
        <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
            required
          ></input>
        </label>
        <input type="submit" className="button" value={signature ? "Transfer" :"Make a signing"}/>
        <button className="button-small" onClick={clearFields}>Clear</button> 
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
