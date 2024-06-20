const express = require("express");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes,toHex } = require("ethereum-cryptography/utils");
const app = express();
const cors = require("cors");
const port = 3042;


app.use(cors());
app.use(express.json());

const balances = {
  "039f6a8a021aa66ca6db6883f01fc6229eb8b97236b5a39b43a808e35d2e404abe": 100, //dan
  "02e90431f2dd89944d6cfdced37fa43ac034c05337540bc547383bf2ed28b74600": 50, //bob
  "0335bd54145d1a629e5d7d494c8aa68617dff0f87571018e8314d6706893e654fd": 75, //alice
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount,sig, message} = req.body;
  const { r, s, recovery } = sig;

  const bytes = utf8ToBytes(message);
  const messageHash = keccak256(bytes);
  console.log('messageHash is',messageHash)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const signature = new secp256k1.Signature(BigInt(r), BigInt(s), recovery);
    console.log(signature)

  const publicKey = signature.recoverPublicKey(messageHash).toHex();
    console.log('publicKey is',publicKey);
    console.log('sender is: ',sender)

  if (publicKey !== sender) {
    return res.status(400).send({ message: "Invalid signature!" });
  }
  
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
