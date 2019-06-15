# Udacity Blockchain Capstone

The capstone will build upon the knowledge that was gained in the course in order to build a decentralized housing product. 

Properties can be listed using ERC721 Tokens. Before tokens can be minted, those shall be verified and approved. For verififcation, Zokrates framework has been used for zero knowledge proof. For each of the token a new proof needs to be generated and then only verification can happen.

Post verification the property is listed on open sea market place. Metadata of properties is coming from baseToken URI that has been given as part of requirements 
"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"

I have also implemented Heroku app for base token URI https://thawing-refuge-73730.herokuapp.com/api/token/<token ID>. But did not use that because images that I found in capstone link were much more creating and names more catchy that what I had put in Heroku


##Smart Contracts Following are the Smart Contracts files in this project-

ERC721Mintable.sol --> CustomERC721Token inheris from ERC721Metadata [to set up symbols tokens etc] which is inherited from ERC721Enumerable [for token management], usingOraclize [for communication 
with outside world]. ERC721Enumerable inheris from ERC721 [Token management contract] which has been created as a pausable contract. 

This has been tested using TestERC721Mintable.js script and test results are present as part of TestResults\ContractTestResults.txt

verifier.sol --> This is created by Zokrates framework. 8 Proof files have been generated and kept in zokrates/code/square folder. proof1.json is to test negative test case and other proofnnn.json are for positive test cases. 
This has been tested using TestSquareVerifier.js script, by uncommenting assignment of proofJSON with the proof that needs to be used. Test results are present as part of TestResults\ContractTestResults.txt

SolnSquareVerifier.sol --> Is wrapper contract inheriting Verifier and CustomERC721Token and is main contract that gets deployed. 
This has been tested using TestSolnSquareVerifier.js script and test results are present as part of TestResults\ContractTestResults.txt

#Stepwise Status

Use npm install for installation, if python is not installed, installation might give issues

#Stepwise Status
    ## Clone the project repository - Done
    ## Explore the code base - Done 
    ## Fill out ERC721 Mintable Contract in ERC721Mintable.sol
    ## Write test cases TestERC721Mintable.js
    ## Compile and pass test cases in TestERC721Mintable.js
    ## Implement Zokrates
        ## Using Docker to install and instantiate a Zokrates zkSnarks development environment
        ## Completes the Zokrates proof in square.code by adding the variable names in square.code
        ## Compile program
        ## Trusted setup
        ## Compute witness
        ## Generate Proof
        ## Export Verifier.sol
    ## Write a test script to verify the solidity contract generated by Zokrates executed successfully - TestSquareVerifier.js - Done
    ## Write test contract for ZK and ERC721 integration - SolnSquareVerifier.sol  - Done
    ## Compile and pass with TestSolnSquareVerifier.js  - Done
    ## Deploy latest contracts generated by Zokrates (a.k.a verifier.sol)  - Done
    ## Deploy SolnSquareVerifier contract to Rinkeby network    - Done
        ==> Results can be found in TestResults/RinkebyMigrationResults.txt 
    ## Mint tokens - Done
        ==> Results can be found in MiningResults.Txt
            6 tokens have been minted but since token URL returns 5, metadata for one is not coming. 
    ## Generate OpenSea marketplace - done 
    ## Test and Verify OpenSea with your SolnSquareVerifier tokens - Done
    ## List 5 of your tokens on the marketplace - Done
        ==> Contract V53_OpenSea.pdf
    ## Purchase those 5 tokens using a different address - done
        ==> OpenSea Transferred to second account.pdf
    ## Complete required documentation and submit! - done

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
