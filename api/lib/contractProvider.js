const { ethers } = require("ethers");
// const Web3 = require("web3");
// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const contract = require("truffle-contract");
const { config } = require("./config.js");
const CharacterContractJson = require("./DimmCityV1Base.json");

let instance = null;
let DimmCityV1Base = null;
const instances = {};

const createContractInstance = async (release) => {
    const contractAddress = process.env.contract_address
        ? process.env.contract_address
        : config.releases[release].address;

    // if (!DimmCityV1Base) {
    //     DimmCityV1Base = new ethers.Contract(process.env.contract_address, CharacterContractJson.abi, provider);

    //     //contract(CharacterContractJson);
    //     //DimmCityV1Base.setProvider(provider);
    //     // DimmCityV1Base.defaults({
    //     //     from: process.env.admin_address,
    //     // });
    // }
    const provider = getProvider();
    instance = new ethers.Contract(contractAddress, CharacterContractJson.abi, provider);
    //await DimmCityV1Base.at(contractAddress);
    instances[release] = instance;
    return instances[release];
};

//const getWeb3 = () => new Web3(getProvider());

const getProvider = () => {
    const mnemonic = process.env.provider_mnemonic;
    const httpUri = process.env.provider_uri;
    const projectId = process.env.provider_project_id;
    return ethers.getDefaultProvider(httpUri, {
        infura: {
            projectId: projectId,
            projectSecret: mnemonic,
        },
    });
    //return new HDWalletProvider(mnemonic, httpUri);
};

module.exports = {
    createContractInstance,
    // getWeb3,
};
