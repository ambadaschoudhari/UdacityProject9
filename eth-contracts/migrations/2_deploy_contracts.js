// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var Verifier = artifacts.require("./Verifier");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier");
var tokenName = "RealEstate";
var tokenSymbol = "RRC";
//var baseTokenURI = "https://thawing-refuge-73730.herokuapp.com/api/token/";
var baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
//var firstAccount = "0xbd8Be1884f5b7bccCf567c37e2844B82499CCE65";
//var firstAccount = "0xbd8Be1884f5b7bccCf567c37e2844B82499CCE65";

module.exports = function(deployer) {
//  deployer.deploy(SquareVerifier);
  deployer.deploy(Verifier).then((verifierInstance) => {
    //deployer.deploy(SolnSquareVerifier(verifierInstace.address,tokenName,tokenSymbol,baseTokenURI,{from:firstAccount})
    //console.log("verifierInstance :", JSON.stringify(verifierInstance));
     return deployer.deploy(SolnSquareVerifier,
                            tokenName,tokenSymbol,baseTokenURI);
  });
};

