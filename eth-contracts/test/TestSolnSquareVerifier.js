// Test if a new solution can be added for contract - SolnSquareVerifier



//var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var proofJSON = require('../../zokrates/code/square/proof');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    var tokenName = "RealEstate";
    var tokenSymbol = "RRC";
    var baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
    var tokenID = 1;

    describe('match erc721 spec', function () {
        beforeEach(async function () {

            this.contract = await SolnSquareVerifier.new(tokenName,tokenSymbol,baseTokenURI, {from: account_one});

        })
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier        
        it('Should mint tokens post verification', async function () { 
            token1MintStatus = await this.contract.mintNewNFT.call(proofJSON.proof.a,proofJSON.proof.b,proofJSON.proof.c,proofJSON.inputs,account_one,tokenID,{from: account_one});
            assert.equal(token1MintStatus, true, "TC1: Minting status shall be success");
        })
    });
})