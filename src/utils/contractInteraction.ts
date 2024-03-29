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

// const rpcProvider = new ethers.providers.JsonRpcProvider(
//   process.env.VUE_APP_ALCHEMY_API
// );
import { MetaMaskInpageProvider } from "@metamask/providers";
import axios from "axios";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | any;
  }
}

function isValidAddress(address: string) {
  return ethers.utils.isAddress(address);
}

export async function addTokenToMetamask(imgUrl: string, nftContract: string) {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC721",
        options: {
          address: nftContract, // The address that the token is at.
          symbol: "CAR", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
          image: imgUrl, // A string url of the token logo
          tokenId: "0",
        },
      },
    });

    if (wasAdded) {
      console.log("NFT added to metamask");
    } else {
      console.log("NFT coudln't be added to metamask");
    }
  } catch (error) {
    console.log(error);
  }
}
function formatAddress(address: string) {
  return ethers.utils.getAddress(address);
}

export async function pkrToEth(pkr: string) {
  const pkrEthResponse = await axios.get(
    "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
  );
  const rate = pkrEthResponse.data.data.rates["PKR"];
  const ethPrice: number = parseFloat(pkr) / rate;
  const roundedEthPrice: number = parseFloat(ethPrice.toFixed(3));

  return roundedEthPrice;
}

export async function deployOrderManagerContract(
  buyerAddress: string | undefined,
  sellerAddr: string,
  price: string
) {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    sellerAddr = sellerAddr.toLowerCase();
    console.log(accounts[0], buyerAddress, sellerAddr);
    console.log(typeof accounts[0], typeof sellerAddr);
    if (accounts[0].toString() == sellerAddr) {
      const metamask = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const account = await metamask.getSigner();
      const factory = new ContractFactory(
        orderManagerAbi,
        orderManagerByteCode,
        account
      );
      const tPrice = await ethers.utils.parseUnits(price, 18);
      console.log("deploying...");
      const contract = await factory.deploy(buyerAddress, sellerAddr, tPrice);
      console.log(contract.address);
      const orderManager = new OrderManager(contract.address, price);
      return orderManager;
    } else {
      throw Error("buyer and connect wallet address are diff");
    }
  } else {
    throw Error("no metamask provider found!");
  }
}

export class OrderManager {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  //price received will be in ETH
  constructor(public contractAddress: string, private price: string) {
    this.contract = new ethers.Contract(
      contractAddress,
      orderManagerAbi,
      rpcProvider
    );
    this.signer = new ethers.VoidSigner("0x0");
  }

  async init() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const metamask = new ethers.providers.Web3Provider(window.ethereum, "any");
    const walletAddress = accounts[0];
    this.signer = await metamask.getSigner(walletAddress);
  }

  async getBalance() {
    const balance = await this.contract.getBalance();
    return balance / 1e18; // Convert from wei to ether
  }

  async deposit() {
    await this.init();
    console.log("price is ", this.price);
    // const pkrEthResponse = await axios.get(
    //   "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
    // );
    // const rate = pkrEthResponse.data.data.rates["PKR"];
    // const ethPrice: number = parseFloat(this.price) / rate;
    // const roundedEthPrice: number = parseFloat(ethPrice.toFixed(3));
    // console.log(roundedEthPrice);
    const options = {
      value: ethers.utils.parseEther(this.price),
    };
    console.log("here we are befoire signing...");

    const signedContract = this.contract.connect(this.signer);
    console.log("here we are after signing...");
    try {
      // Send transaction to deposit funds
      const transactionResponse = await signedContract.deposit(options);
      console.log("here we are waiting for depositing funds...");
      await transactionResponse.wait();
      console.log("here we are after depositing funds...");

      console.log("Funds deposited by the buyer successfully");
    } catch (error) {
      console.error("Error depositing funds:", error);
    }
  }

  async withdraw() {
    await this.init();
    const signedContract = this.contract.connect(this.signer);
    try {
      // Send transaction to deposit funds
      const transactionResponse = await signedContract.withdraw();
      await transactionResponse.wait();
      console.log("Funds withdrawn successfully");
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  }
  async cancel() {
    await this.init();
    const signedContract = this.contract.connect(this.signer);
    try {
      // Send transaction to deposit funds
      const transactionResponse = await signedContract.cancelOrder();
      await transactionResponse.wait();
      console.log("OrderManager cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order manager :", error);
    }
  }
}

export async function deployCarNftContract(
  price: string,
  buyerAddress: string,
  sellerAddr: string
) {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts[0], buyerAddress, sellerAddr);
    console.log(isValidAddress(sellerAddr), isValidAddress(buyerAddress));
    if (accounts[0].toString() == sellerAddr.toLowerCase()) {
      const metamask = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const account = await metamask.getSigner();

      const factory = new ContractFactory(carNftABI, carNftByteCode, account);

      const tPrice = ethers.utils.parseUnits(price, 18);

      console.log(accounts[0], buyerAddress, sellerAddr);
      const contract = await factory.deploy(tPrice, buyerAddress, sellerAddr);

      const carNft = new CarNFT(contract.address, price);
      return carNft;
    } else {
      throw Error("buyer and connect wallet address are diff");
    }
  } else {
    throw Error("no metamask provider found!");
  }
}

class CarNFT {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(public contractAddress: string, private price: string) {
    this.contract = new ethers.Contract(
      contractAddress,
      carNftABI,
      rpcProvider
    );
    this.signer = new ethers.VoidSigner("0x0");
  }

  async getOwner() {
    await this.contract.getOwner();
  }

  async init() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const metamask = new ethers.providers.Web3Provider(window.ethereum, "any");
    const walletAddress = accounts[0];
    this.signer = await metamask.getSigner(walletAddress);
    this.contract = this.contract.connect(this.signer);
  }

  async resetOwner(address: string) {
    await this.init();
    const signedContract = this.contract.connect(this.signer);
    try {
      // Send transaction to deposit funds
      const transactionResponse = await signedContract.resetOwner(address);
      await transactionResponse.wait();
      console.log("Owner Reset successfully");
    } catch (error) {
      console.error("Error resetting the owner:", error);
    }
  }
  // tokenUri is the ipfs store of the details of the asset
  async mintNFT(to: string, tokenUri: string) {
    await this.init();

    const signedContract = this.contract.connect(this.signer);
    try {
      // Send transaction to deposit funds
      const transactionResponse = await signedContract.mint(to, tokenUri);
      await transactionResponse.wait();
      console.log("NFT minted successfully");
    } catch (error) {
      console.error("Error minting nft:", error);
    }
  }

  async tokenTransfer(from: string, to: string, tokenId: number) {
    await this.contract.tokenTransfer(from, to, tokenId);
  }
}
