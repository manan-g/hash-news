## hashNews

We developed this project for our college capstone project program. We aimed to create a decentralised platform which enables journalist to post articles and related media on the blockchain and ipfs respectively.

### Tech Stack used
 - **Solidity**: To create smart contract for the application logic.
 - **React**: To create the front-end application for the user to interact with the blockchain
 - **Truffle and Ganache**: for contract local development and testing
 - **IPFS**: To store the media files
 - **Django**: As an API which processes client side data and fetches results from the blockchain.
 - **Chrome Extension**: Built to create a one click solution to bust any suspected fake news.
 - **Third Party APIs used**: ALGOLIA, OCR_SPACE, TwitterAPI, etc.

## Screen Shots:
![chrome-ext](https://github.com/manan-g/hash-news/blob/main/images/extension_ss_1.png "hash news button") ![chrome-ext](https://github.com/manan-g/hash-news/blob/main/images/extension_ss_2.png "hashnews right click")

#### To run the project locally
 - install [truffle](https://trufflesuite.com/docs/truffle/getting-started/installation) and [ganache](https://trufflesuite.com/ganache/)
 - clone the project and run `npm install`
 - install metamask browser extension
 - run ganache and [connect the metamask to local ganache blockchain](https://steemit.com/ganache/@matbest/setting-up-ganache-and-metamask-on-my-windows-10-home-laptop)
 - now in the vs code terminal run `truffle migrate --reset`
 - set up the env file acc to the template given file named env_template
 - and after deploying the contract on local blockchain, run `npm start` to start the react app locally
 - in the metamask choose the local network set up earlier while connecting to the ganache and import one of the account provided in the ganache window
 - Go to the **python API** folder and start a Django project, create your personal Algolia, and twitter developer tokens, run the app.
 - for the **chrome extension**, go to the extensions tab in chrome and load the local extension from the chrome extension folder.

 As the contract logic gives article posting rights acc to the vote count of the user so initially contract owner acc has rights to post articles etc but if upvoting and downvoting happens then the rights will be restored acc to the voting criteria.

