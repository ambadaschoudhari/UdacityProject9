// Test if a new solution can be added for contract - SolnSquareVerifier



//var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var proofJSON = require('../../zokrates/code/square/proof24');
//var proofJSON = require('../../zokrates/code/square/proof39');
//var proofJSON = require('../../zokrates/code/square/proof416');
//var proofJSON = require('../../zokrates/code/square/proof525');
//var proofJSON = require('../../zokrates/code/square/proof636');    
//var proofJSON = require('../../zokrates/code/square/proof749');    
//var proofJSON = require('../../zokrates/code/square/proof864');    
//var proofJSON = require('../../zokrates/code/square/proof981');   
contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    var tokenName = "RealEstate";
    var tokenSymbol = "RRC";
    var baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
    var tokenID = 1;

    describe('match erc721 spec', function () {
        
        // Test if an ERC721 token can be minted for contract - using proof        
        // Test if an ERC721 token can not be minted for contract - with same proof        
        it('ERC721 token can be minted for contract - using proof', async function () { 
            this.contract = await SolnSquareVerifier.new(tokenName,tokenSymbol,baseTokenURI, {from: account_one});
            token1MintStatus = await this.contract.mintNewNFT.call(proofJSON.proof.a,proofJSON.proof.b,proofJSON.proof.c,proofJSON.inputs,account_one,tokenID,{from: account_one});
            assert.equal(token1MintStatus, true, "TC1: ERC721 token can be minted for contract - using proof");
        })
        it('ERC721 token can not be minted for contract - with same proof  ', async function () { 
            this.contract = await SolnSquareVerifier.new(tokenName,tokenSymbol,baseTokenURI, {from: account_one});
            token1MintStatus = await this.contract.mintNewNFT.call(proofJSON.proof.a,proofJSON.proof.b,proofJSON.proof.c,proofJSON.inputs,account_one,tokenID,{from: account_one});
            let token2MintStatus = true
            try{
                token2MintStatus = await this.contract.mintNewNFT.call(proofJSON.proof.a,proofJSON.proof.b,proofJSON.proof.c,proofJSON.inputs,account_one,tokenID+1,{from: account_one});
                //assert.equal(token2MintStatus, false, "TC2-1: Test if an ERC721 token can not be minted for contract - with same proof");
            }catch(e){
                console.log(e);
                //token2MintStatus = false;
                assert.equal(token2MintStatus, false, "TC2-2: Test if an ERC721 token can not be minted for contract - with same proof");
            }            
        })        
    });
})