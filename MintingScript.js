var SolnSquareVerifier = require('./eth-contracts/build/contracts/SolnSquareVerifier');
const mnemonic = 'agree into sausage panel gauge bean blind relief surround night skirt soccer';
const infuraKey = "6a623622c9044e87b2bc5cc073dc25cd";
const TokenContractAddress = "0x386a45c26ea1891b9a7f7e0393c854c098ef9cde"
const currentOwner = "0x66Fc100dD6b011C050F1E17625184a5983523E4F"

var Ethers = require('ethers');

var proofJSON = require('./zokrates/code/square/proof');
var tokenID = 1;
var networkProvider ;
async function main() {
  //console.log("NFT ABI : ", SolnSquareVerifier.abi);
  try{
  networkProvider =  Ethers.providers.getDefaultProvider('rinkeby');
  //console.log("networkProvider : ", networkProvider);
  //let contractObj =  await new Ethers.Contract.
  let contractObj =  await new Ethers.Contract(TokenContractAddress, SolnSquareVerifier.abi, networkProvider);
  //console.log("contractObj : ", contractObj);

    let temp = new Ethers.Wallet.fromMnemonic(mnemonic);
    let wallet = new Ethers.Wallet(temp.privateKey,networkProvider);
    let walletConnection = contractObj.connect(wallet);
    //console.log("walletConnection : ", walletConnection);

    let token1MintTransaction = await walletConnection.mintNewNFT(proofJSON.proof.a,
                                                                 proofJSON.proof.b,
                                                                 proofJSON.proof.c,
                                                                 proofJSON.inputs,
                                                                 currentOwner,
                                                                 tokenID,
                                                                 {gasLimit:1500000});
    console.log(token1MintTransaction.hash);
    await token1MintTransaction.wait();      
    console.log("total Supply: ",  await contractObj.totalSupply.call());
  }catch(e)
  {
    console.log("Exception thrown : ", e);
  }
  }

main()
