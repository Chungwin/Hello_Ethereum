async function main() {
    
    // Access ABI (artifacts/contracts/HelloEtehreum.sol/HelloEthereum.json), create instance
    const HelloEthereum = await ethers.getContractFactory("HelloEthereum");

    // When deploy smart contract, provide argument for constructor function: Hello Ethereum!
    const hello_ethereum = await HelloEthereum.deploy("Hello Ethereum!")
    console.log(`Contract was deployed to address ${hello_ethereum.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })