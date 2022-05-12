import { ethers, run } from "hardhat";

async function main() {

  await run("compile");

  // We get the contract to deploy
  const TransactionContract = await ethers.getContractFactory("Transaction");
  const transaction = await TransactionContract.deploy();

  await transaction.deployed();

  console.log("TransactionContract deployed to:", transaction.address);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();