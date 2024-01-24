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
  const orderManager = new OrderManager(contract.address, contractRef, price);
  return orderManager;
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
  const factory = new ContractFactory(carNftABI, carNftByteCode);
  const contract = await factory.deploy(price, buyerAddress, sellerAddr);
  const contractRef = new ethers.Contract(
    contract.address,
    carNftABI,
    rpcProvider
  );
  const carNft = new CarNFT(contract.address, contractRef, price);
  return carNft;
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
