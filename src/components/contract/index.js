import { ethers } from "ethers";
import contracts from "./contracts.json";

// const testnetRPC = 'https://rpc.testnet.fantom.network';
const localRPC = "http://localhost:7545";

const provider = new ethers.providers.JsonRpcProvider(localRPC);

const AtariToken = new ethers.Contract(
  contracts.atariToken.address,
  contracts.atariToken.abi,
  provider
);

export { AtariToken };
