const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloEthereum.sol/HelloEthereum.json");

// Node Provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// Signer of Transactions
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract instance
// Signer (specific Pirvate Key) interacts with contract.
const helloEthereumContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


async function main() {
    // 'message' variable in smart contract is public - has automatically a getter-function.
    let message = await helloEthereumContract.message();
    console.log(`The message is: ${message}`);

    console.log("Updating the message.");
    let tx = await helloEthereumContract.update("This is the new message!")
    // Waiting until Transaction gets mined.
    await tx.wait();

    let newMessage = await helloEthereumContract.message();
    console.log(`The new message is: ${newMessage}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })