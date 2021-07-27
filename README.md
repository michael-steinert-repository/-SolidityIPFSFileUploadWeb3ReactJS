# Solidity IPFS File Upload Web3.js ReactJS

## Application Architecture

### Application Interaction

![Interaction Smart Contract Cloud Sotrage](https://user-images.githubusercontent.com/29623199/122016354-467e5a00-cdc1-11eb-92d7-69c0b322e9c2.JPG)

### Application Business Rules

![Blockchain Cloud Storage Architecture](https://user-images.githubusercontent.com/29623199/122016430-56963980-cdc1-11eb-94da-187ba21ff75e.JPG)

## Commands

| Command | Description |
| --- | --- |
| Truffle | |
| truffle migrate | Running the Migrate Script and deploy the Smart Contract to the Blockchain |
| truffle migrate | Running the Migrate Script and deploy a new Smart Contract to the Blockchain |
| truffle console | Running a JavaScript Runtime Environment that can interact with the Blockchain |
| truffle test | Running Test to check the Smart Contract |
| truffle networks | Listing all Addresses of deployed Smart Contract |
| Truffle Console | |
| dStorage = await DStorage.deployed() | Getting the deployed Smart Contract as JavaScript Version |
| dStorage | Printing out the deployed Smart Contract as JavaScript Version |
| name = await dStorage.name() | Getting the public State Variable 'name' from the deployed Smart Contract |
| name | Printing out the public State Variable |

## Dependencies

* Node.js: It allows to install all Dependencies and run the Client-side Application
* Truffle Framework: A Framework for Creating Ethereum Smart Contracts. It allows creating, testing and deploying Smart
  Contracts on a Blockchain
* Ganache: It provides a locally Blockchain for Testing Purpose
* MetaMask: A Browser Extension to connect with the Blockchain. It contains the Wallet for Ethereum
* Web3.js: Connect the Appication (Browser with MetaMask Extension) to the Blockchain based Website

### Update Dependencies (Node.js Modules)

* npm install -g npm-check-updates: Installing the Node.js-Check-Updates Module
* ncu –u: This will update the package.json File as the latest Versions available in npm Repositories on Web
* npm install: This will update the local node_modules Repository with the Versions present in package.json
* npm install --package-lock-only: This will update the Versions present in package-lock.json

## Solidity
### Events
* Events causes the Arguments to be stored in the Log of the Transaction
* The Log of the Transaction exists as long as the Block in the Blockchain exists (in Theory forever)
* Evetns log Changes into the Blockchain and make it true forever

### Address
* Every Account and Smart Contract has an Address
* It is used to send and receive Ether from one Account to another

### Mapping
* Data Type used to store Associations that allow to get a Value for a corresponding Key

### Require
* Convenience Function that guarantees Vailidity of Conditions that cannot be detected before Execution
