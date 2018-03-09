const assert = require('assert');
const ganache = require('ganache-cli');

//Web3 constructor
const Web3 = require('web3');

//Web3 new instance
const provider = ganache.provider();
const web3 = new Web3(provider);

//Import from compile
const {interface, bytecode} = require('../compile')

let accounts;
let inbox;
const initMsg = "Hello World";

//Tests
beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //Use accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments:[initMsg]})
    .send({from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  })
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, initMsg);
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('how do you do?').send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'how do you do?');
  });
})