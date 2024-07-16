### using more secure way of handling private key
####  This is a simple react front-end which will communicate with a single server. This server will be responsible for transferring balances between accounts. Since it's a single server, it is centralized, so we'll need to trust that the server operator is not malicious.
This is the Project#1. The goal of this project: ECDSA
This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate private key can create a signature that will allow them to move funds from one account to the other. Then, the server can verify the signature to move funds from one account to another.
1. We incorporating Public Key Cryptography so transfers can only be completed with a valid signature
2. We making it so the person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds
