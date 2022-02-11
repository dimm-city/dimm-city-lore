const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const contract = require("truffle-contract");
const { config } = require("./config.js");
const CharacterContractJson = require("./DimmCityV1Base.json");

let instance = null;
let DimmCityV1Base = null;
const instances = {};

const createContractInstance = async (release) => {
    if (!DimmCityV1Base) {
        const provider = getProvider();
        DimmCityV1Base = contract(CharacterContractJson);
        DimmCityV1Base.setProvider(provider);
        DimmCityV1Base.defaults({
            from: process.env.admin_address,
        });
    }

    const contractAddress = process.env.contract_address
        ? process.env.contract_address
        : config.releases[release].address;

    instance = await DimmCityV1Base.at(contractAddress);
    instances[release] = instance;
    return instances[release];
};

const getWeb3 = () => new Web3(getProvider());

const getProvider = () => {
    const mnemonic = process.env.provider_mnemonic;
    const httpUri = process.env.provider_uri;
    return new HDWalletProvider(mnemonic, httpUri);
};

module.exports = {
    createContractInstance,
    getWeb3
};
