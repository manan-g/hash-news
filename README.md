## hashNews

We developed this project for our college capstone project program. We aimed to create a decentralised platform which enables journalist to post articles and related media on the blockchain and ipfs respectively.

### Tech Stack used
 - **Solidity**: To create smart contract for the application logic.
 - **React**: To create the front-end application for the user to interact with the blockchain
 - **Truffle and Ganache**: for contract local development and testing
 - **IPFS**: To store the media files

#### To run the project locally
 - install [truffle](https://trufflesuite.com/docs/truffle/getting-started/installation) and [ganache](https://trufflesuite.com/ganache/)
 - clone the project and run `npm install`
 - install metamask browser extension
 - run ganache and [connect the metamask to local ganache blockchain](https://steemit.com/ganache/@matbest/setting-up-ganache-and-metamask-on-my-windows-10-home-laptop)
 - now in the vs code terminal run `truffle migrate --reset`
 - set up the env file acc to the template given file named env_template
 - and after deploying the contract on local blockchain, run `npm start` to start the react app locally
 - in the metamask choose the local network set up earlier while connecting to the ganache and import one of the account provided in the ganache window

 As the contract logic gives article posting rights acc to the vote count of the user so initially contract owner acc has rights to post articles etc but if upvoting and downvoting happens then the rights will be restored acc to the voting criteria.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
