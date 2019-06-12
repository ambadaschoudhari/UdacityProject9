// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var tokenName = "RealEstate";
var tokenSymbol = "RRC";
var baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
var firstAccount = "0xbd8Be1884f5b7bccCf567c37e2844B82499CCE65";

module.exports = function(deployer) {
//  deployer.deploy(SquareVerifier);
  deployer.deploy(Verifier).then(function(verifierInstace) {
    //deployer.deploy(SolnSquareVerifier(verifierInstace.address,tokenName,tokenSymbol,baseTokenURI,{from:firstAccount})
    deployer.deploy(SolnSquareVerifier(firstAccount,tokenName,tokenSymbol,baseTokenURI,{from:firstAccount})
                   );
  });
};

