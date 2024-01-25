# NFT Marketplace
## Steps to replicate
- git clone
- ```cd Market```
- ```npm install```
- ```npx hardhat test`` to test the contract
- ```npm run node``` to run the hardhat node
- ```npx hardhat run scripts/deploy.js --network localhost``` to deploy the contract on local hardhat chain
- Add any address to metamask for the hardhat network. for more info visit https://medium.com/@kaishinaw/connecting-metamask-with-a-local-hardhat-network-7d8cea604dc6
- create and populate the .env file with necessary info, refer pinata for more details.
- ```npm run dev``` to run
- Enjoy 😄

## Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
