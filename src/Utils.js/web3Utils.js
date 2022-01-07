import DNN from '../abis/DNN.json';
import Web3 from 'web3';

export async function loadWeb3() {
  let browser_compatibility = false;
  //Setting up Web3
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    browser_compatibility = true;
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    browser_compatibility = true;
  }
  return browser_compatibility;
}
