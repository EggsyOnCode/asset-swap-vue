import { ethers, ContractFactory } from "ethers";
import {
  orderManagerAbi,
  orderManagerByteCode,
  carNftABI,
  carNftByteCode,
} from "./contracts";
//using the anvil json rpc provider and local testnet ethereum fork
const rpcProvider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:8545"
);
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | any;
  }
}
export async function deployOrderManagerContract(
  buyerAddress: string,
  sellerAddr: string,
  price: string
) {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    const metamask = new ethers.providers.Web3Provider(window.ethereum, "any");
    const account = metamask.getSigner();
    const factory = new ContractFactory(
      orderManagerAbi,
      orderManagerByteCode,
      account
    );
    const contract = await factory.deploy(buyerAddress, sellerAddr, price);
    const contractRef = new ethers.Contract(
      contract.address,
      orderManagerAbi,
      rpcProvider
    );
    const orderManager = new OrderManager(contract.address, contractRef, price);
    return orderManager;
  } else {
    throw Error("no metamask provider found!");
  }
}

class OrderManager {
  constructor(
    public contractAddress: string,
    private contractRef: ethers.Contract,
    private price: string
  ) {}

  async getBalance() {
    const balance = this.contractRef.getBalance();
    return balance / 1e18;
  }

  async deposit() {
    const options = { value: ethers.utils.parseEther(this.price) };
    await this.contractRef.deposit(options);
  }

  async withdraw() {
    await this.contractRef.withdraw();
  }
}

export async function deployCarNftContract(
  buyerAddress: string,
  sellerAddr: string,
  price: string
) {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    const metamask = new ethers.providers.Web3Provider(window.ethereum, "any");
    const account = metamask.getSigner();
    const factory = new ContractFactory(carNftABI, carNftByteCode);
    const contract = await factory.deploy(
      price,
      buyerAddress,
      sellerAddr,
      account
    );
    const contractRef = new ethers.Contract(
      contract.address,
      carNftABI,
      rpcProvider
    );
    const carNft = new CarNFT(contract.address, contractRef, price);
    return carNft;
  } else {
    throw Error("metamask provider not connected!");
  }
}

class CarNFT {
  constructor(
    public contractAddress: string,
    private contractRef: ethers.Contract,
    private price: string
  ) {}

  async getOwner() {
    await this.contractRef.getOwner();
  }

  async resetOwner(address: string) {
    await this.contractRef.resetOwner(address);
  }
  // tokenUri is the ipfs store of the details of the asset
  async mint(to: string, tokenUri: string) {
    await this.contractRef.mint(to, tokenUri);
  }

  async tokenTransfer(from: string, to: string, tokenId: number) {
    await this.contractRef.tokenTransfer(from, to, tokenId);
  }
}
