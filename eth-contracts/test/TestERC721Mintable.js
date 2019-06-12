//var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var CustomERC721Token = artifacts.require('CustomERC721Token');
 
contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];    
    var tokenName = "RealEstate";
    var tokenSymbol = "RRC";
    var baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
    var tokenID = 1;

    describe('match erc721 spec', function () {
        beforeEach(async function () {

            //this.contract = await CustomERC721Token.new(account_one,tokenName,tokenSymbol,baseTokenURI, {from: account_one});
            this.contract = await CustomERC721Token.new(tokenName,tokenSymbol,baseTokenURI, {from: account_one});
            //this.contract = await CustomERC721Token.new();//tokenName,tokenSymbol,baseTokenURI, {from: account_one});
            //xTODO: mint multiple tokens

            token1MintStatus = await this.contract.mint(account_one,tokenID,{from: account_one});
            //console.log("Status of ",tokenID," minting",token1MintStatus);
            let ownerID1 = await this.contract.ownerOf(tokenID);
            console.log("tokenID: ",tokenID," ownerID: ",ownerID1);

            tokenID = tokenID + 1;
            token2MintStatus = await this.contract.mint(account_two,tokenID,{from: account_one});
            //console.log("Status of ",tokenID," minting",token2MintStatus);
            let ownerID2 = await this.contract.ownerOf(tokenID);
            console.log("tokenID: ",tokenID," ownerID: ",ownerID2);

            tokenID = tokenID + 1;
            token3MintStatus = await this.contract.mint(account_two,tokenID,{from: account_one});
            let ownerID3 = await this.contract.ownerOf(tokenID);
            console.log("tokenID: ",tokenID," ownerID: ",ownerID3);
             
        })
        
        it('should return total supply', async function () { 
            let totalTokenSupply = await this.contract.totalSupply();
            console.log("Total supply: ",totalTokenSupply);
            assert.equal(tokenID, totalTokenSupply, "TC1: Total Token Supply shall be equal to minted count");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            console.log("Balance: ",balance.toNumber());
            assert.equal(balance.toNumber(), 2, "TC2:Balance shall match");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
            let baseTokenURI = await this.contract.getbaseTokenURI();
            console.log("baseTokenURI: ",baseTokenURI);
            assert.equal(tokenURI, baseTokenURI, "TC3:URI Shall be complete");
        })
        
        it('should transfer token from one owner to another', async function () { 
            let tokenID1 = tokenID - 2;
            let ownerID1 = await this.contract.ownerOf(tokenID1);
            console.log("tokenID: ",tokenID1," ownerID1: ",ownerID1);
            await this.contract.approve(account_three, tokenID1),{from: account_one};
            await this.contract.transferFrom(account_one,account_three,tokenID1,{from: account_one} );
            let ownerID2 = await this.contract.ownerOf(tokenID1); 
            console.log("tokenID: ",tokenID1," ownerID2: ",ownerID2);
            assert.equal(ownerID2, account_three, "TC4:Ownership must match");

        }) /**/
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new(tokenName,tokenSymbol,baseTokenURI, {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let successFlag = false;
            try{
            token1MintStatus = await this.contract.mint(account_one,tokenID,{from: account_two});
        } catch(e){
            successFlag = true;
        }
        assert.equal(successFlag, true, "TC5:Only owner can mint");

        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(owner, account_one, "TC5:get owner of contract");

        })
/**/

});
})