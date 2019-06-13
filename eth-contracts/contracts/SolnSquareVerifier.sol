pragma solidity >=0.4.21 <0.6.0;
import "./Verifier.sol";
import "./ERC721Mintable.sol";

//?TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract SquareVerifier is Verifier {

   function sqVerifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) public returns (bool r){
            return verifyTx(a,b,c,input);
        }
}


//xTODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721Token, SquareVerifier

//contract CustomERC721Token is ERC721Metadata
    //(string memory name,
    // string memory symbol,
    // string memory baseTokenURI)
    {
  //string private custombaseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
  constructor(string memory name, string memory symbol, string memory baseTokenURI)
  CustomERC721Token(name, symbol, baseTokenURI) public {
  }

//xTODO define a solutions struct that can hold an index & an address

struct solutions{
    uint256 index;
    address solAddress;
}
//xTODO define an array of the above struct
solutions[]  solAddressArray;

//xTODO define a mapping to store unique solutions submitted
mapping (bytes32 => bool) submittedSolutions;

//xTODO Create an event to emit when a solution is added
event evntAddSol(uint256 index, address solAddress);

//xTODO Create a function to add the solutions to the array and emit the event
function addSolution(uint256 index, address solAddress, bytes32 solutionKey ) public {
   solutions memory sol;
   sol.index = index;
   sol.solAddress = solAddress;
   solAddressArray.push(sol);
   submittedSolutions[solutionKey] = true;
   emit evntAddSol(index, solAddress);
}

// TODO Create a function to mint new NFT only after the solution has been verified
//x - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
   function mintNewNFT(
            uint[2] memory a,       //Parameter for Verify.VerifyTx
            uint[2][2] memory b,      //Parameter for Verify.VerifyTx
            uint[2] memory c,         //Parameter for Verify.VerifyTx
            uint[2] memory input,     //Parameter for Verify.VerifyTx
            address to,               //CustomERC721Token
            uint256 tokenId           //CustomERC721Token
            //,string memory name,      //Constructor param initialize while deployment
            //string memory symbol      //Constructor param initialize while deployment
            ) public returns(bool successFlag){
        successFlag = false;
        bool VerificationResult = sqVerifyTx(a,b,c,input);
        require(VerificationResult == true, "Result shall be verified");
        bytes32 solutionKey = keccak256(abi.encodePacked(a,b,c,input));

        require(submittedSolutions[solutionKey] != true, "submitted can not be resubmitted");
        addSolution(tokenId, to,solutionKey);
        successFlag = mint(to, tokenId);
        return (successFlag);
   }
  }


























