const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');


/* Two variables:
    1) account mnemonic
    2) link to network
    */
const provider = new HDWalletProvider(
    `${process.env.SEED_KEY}`,
    'https://rinkeby.infura.io/v3/ad66eb1337e043b2b50abe1323fff5f0'
);

const web3 = new Web3(provider);

const deploy = async () => {
    // Get account to deploy from
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    // deploy code
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });


    console.log('result address', result.options.address)
};

deploy();

// current rinkeby contract address: 0xCB6f4049507C5f211AeBaf8F1314ADAF3397c357
