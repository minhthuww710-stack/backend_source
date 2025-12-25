const { ethers, JsonRpcProvider } = require('ethers');
const abiHackathon = require('../abi/hackathon');
const { endpoint } = require('../constants/endpoint.constant');
const { requestAPI } = require('../utils/requestAPI.util');
const { METHOD } = require('../constants/method.constant');

// READ CONTRACT
const readContract = async ({ name, data }) => {
  try {
    const signer = new ethers.Wallet(
      process.env.PRIVATE_KEY_WALLET,
      new JsonRpcProvider(process.env.PZO_NODE_URL)
    );
    const contract = new ethers.Contract(process.env.CONTRACT, abiHackathon, signer);
    const result = await contract[name](...data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: error?.reason || error };
  }
};

// WRITE CONTRACT
const writeContract = async ({ name, data }) => {
  try {
    const signer = new ethers.Wallet(
      process.env.PRIVATE_KEY_WALLET,
      new JsonRpcProvider(process.env.PZO_NODE_URL)
    );
    const contract = new ethers.Contract(process.env.CONTRACT, abiHackathon, signer);
    const tx = await contract[name](...data);
    const receipt = await tx.wait();
    return { success: true, data: receipt };
  } catch (error) {
    console.error(error);
    return { success: false, error: error?.reason || error };
  }
};

const verifyTransaction = async ({ hash, wallet }) => {
  try {
    const contract = process.env.CONTRACT;
    const url = endpoint.getTransaction(hash);
    const tx = await requestAPI(url, {}, METHOD.GET);
    if (!tx) return false;

    const isFromWallet = tx.from.hash.toLowerCase() === wallet.toLowerCase();
    const isCorrectContract = tx.to.hash.toLowerCase() === contract.toLowerCase();

    return isFromWallet && isCorrectContract;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  readContract,
  writeContract,
  verifyTransaction,
};
