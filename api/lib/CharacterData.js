//const fs = require("fs");
//const Handlebars = require("handlebars");
const { createContractInstance } = require("./contractProvider.js");
const { streamToBuffer } = require("./streams.js");
const { CharcaterStates } = require("./constants.js");
const { BlobServiceClient } = require("@azure/storage-blob");
const NodeCache = require("node-cache");
const currentCache = new NodeCache();

const fetch = require("node-fetch");

const connStr = process.env.storage_connection;
const container = process.env.metadata_storage_container || "metadata";
const mediaBaseUri = process.env.storage_media_uri || "https://sporosnft.io/api/v1/media";
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

// function getAttributeValue(data, attribKey) {
//     let result = data.attributes.find((a) => a.trait_type == attribKey);
//     return result ? result.value : "";
// }

// function getHasWings(data) {
//     let hasWings =
//         Array.isArray(data.attributes) &&
//         data.attributes.filter(
//             (a) => a.trait_type == "Behind" && (a.value.indexOf("BIRD") > -1 || a.value.indexOf("WINGS") > -1)
//         ).length > 0;
//     return hasWings;
// }

// async function getCharacterSheet(context) {
//     const html = fs.readFileSync(context.executionContext.functionDirectory + "/character-sheet.html");
//     const template = Handlebars.compile(html.toString());
//     const releaseKey = context.bindingData.release;
//     const typeKey = context.bindingData.type;
//     const id = context.bindingData.id;

//     const data = await getCharacterMetadata(typeKey, releaseKey, id);

//     data.clothing = getAttributeValue(data, "Clothing");
//     data.hasWings = getHasWings(data);

//     const output = template(data);

//     return output;
// }

async function getCharacterMetadata(typeKey, releaseKey, id) {
    const releaseMediaUri = `${mediaBaseUri}/${typeKey}/${releaseKey}`;
    const contract = await createContractInstance(releaseKey);
    const state = await contract.getState(id);

    const baseMetadata = require("../v1-token-metadata/base.json");
    let output = baseMetadata;
    if (currentCache.has(`${typeKey}-${releaseKey}-${id}`)) return currentCache.get(`${typeKey}-${releaseKey}-${id}`);
    switch (state) {
        case CharcaterStates.Alive:
            let tokenMetadata = await getCurrentMetadata(typeKey, releaseKey, id);
            tokenMetadata.image = `${releaseMediaUri}/${id}.png`;
            tokenMetadata.thumbnail_uri = `${releaseMediaUri}_thumbnails/${id}.png`;
            if (tokenMetadata.animation_url) {
                tokenMetadata.animation_url = `${releaseMediaUri}/${id}.mp4`;
            }
            output = Object.assign(output, tokenMetadata);
            break;
        case CharcaterStates.Annihilated:
            Object.assign(output, {
                description: "You dead",
                image: `${releaseMediaUri}/dead.png`,
                attributes: [],
            });
            break;
        case CharcaterStates.Ethereal:
            const etheralProps = require("../v1-token-metadata/etheral.json");
            etheralProps.image = `${releaseMediaUri}/etheral.png`;
            Object.assign(output, etheralProps);
            break;
        case CharcaterStates.Lost:
            Object.assign(output, {
                description: "Has been lost in the ether...",
                image: `${releaseMediaUri}/lost.png`,
                attributes: [],
            });
            break;
        case CharcaterStates.Unminted:
            json = {};
            break;
        case CharcaterStates.Unopened:
            const pack = require("../v1-token-metadata/pack.json");
            pack.image = `${releaseMediaUri}/pack.png`;
            pack.animation_url = `${releaseMediaUri}/pack.mp4`;
            pack.thumbnail_uri = `${releaseMediaUri}/pack.png`;
            output._id = output.edition;
            output.edition = null;
            output.date = null;
            Object.assign(output, pack);
            output.attributes = [
                {
                    trait_type: "Status",
                    value: "Unopened",
                },
            ];
            break;
        default:
            json = {};
            break;
    }

    output.attributes = output.attributes ? output.attributes.filter((a) => a.trait_type != "Outline") : [];

    output.state = state; //.toNumber();
    output.compiler = "Daemon";
    return output;
}
async function getCurrentMetadata(typeKey, releaseKey, id) {
    let result = {};
    const containerClient = blobServiceClient.getContainerClient(`${container}`);
    let blobResponse;

    result = currentCache.get(`${typeKey}-${releaseKey}-${id}`);

    if (!result) {
        try {
            const modClient = containerClient.getBlobClient(`${typeKey}/${releaseKey}/mods/${id}.json`);
            blobResponse = await modClient.download();
        } catch (error) {
            //HACK: exists seems to always return true, so using a catch
            const blobClient = containerClient.getBlobClient(`${typeKey}/${releaseKey}/${id}.json`);
            blobResponse = await blobClient.download();
        }
        const data = (await streamToBuffer(blobResponse.readableStreamBody)).toString();
        result = JSON.parse(data);
        currentCache.set(`${typeKey}-${releaseKey}-${id}`, result);
    }

    return result;
}

async function setCharacterMetadata(typeKey, releaseKey, id, data) {
    const currentData = await getCharacterMetadata(typeKey, releaseKey, id);
    if (currentData.state != CharcaterStates.Alive) {
        throw new Error("Cannot update a Sporo unless they are alive.");
    }
    const containerClient = blobServiceClient.getContainerClient(`${container}`);
    const path = `${typeKey}/${releaseKey}/mods/${id}.json`;
    const blobClient = containerClient.getBlockBlobClient(path);
    currentData.id = id;
    currentData.edition = id;
    currentData.compiler = "Daemon";
    const mergedData = JSON.stringify(Object.assign(currentData, data));
    const response = await blobClient.upload(mergedData, mergedData.length);
    currentCache.set(`${typeKey}-${releaseKey}-${id}`, mergedData);

    const contractAddress = process.env.contract_address
        ? process.env.contract_address
        : config.releases[release].address;

    fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${id}/?force_update=true`)
        .then((r) => console.log("OS refresh succeeded"))
        .catch((e) => console.log("OS refresh failed", e));

    return { id, path, container, mergedData, response };
}

module.exports = {
    getCharacterMetadata,
};
