import { ethers, ContractFactory } from "ethers";
import {
  orderManagerAbi,
  orderManagerByteCode,
  carNftABI,
  carNftByteCode,
} from "./contracts";
const rpcProvider;

export async function deployOrderManagerContract(
  buyerAddress: string,
  sellerAddr: string,
  price: string
) {
  const factory = new ContractFactory(orderManagerAbi, orderManagerByteCode);
  const contract = await factory.deploy(buyerAddress, sellerAddr, price);
  const contractRef = new ethers.Contract(
    contract.address,
    orderManagerAbi,
    rpcProvider
  );
  const orderManager = new OrderManager(contract.address, contractRef);
  return orderManager;
}

class OrderManager {
  constructor(
    public contractAddress: string,
    private contractRef: ethers.Contract
  ) {}
  
}

export async function deployCarNftContract(
  buyerAddress: string,
  sellerAddr: string,
  price: string
) {
  const factory = new ContractFactory(carNftABI, carNftByteCode);
  const contract = await factory.deploy(price, buyerAddress, sellerAddr);
  const contractRef = new ethers.Contract(
    contract.address,
    carNftABI,
    rpcProvider
  );
  const carNft = new CarNFT(contract.address, contractRef);
  return carNft;
}

class CarNFT {
  constructor(
    public contractAddress: string,
    private contractRef: ethers.Contract
  ) {}
}
