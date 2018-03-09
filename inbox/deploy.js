const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

//Import from compile
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'mneumonic seed phrase', 'infura link'
);

const web3 = new Web3(provider);
const initMsg = "Hello World";

//deploy function
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments:[initMsg]})
  .send({from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to ', result.options.address);
};
deploy();