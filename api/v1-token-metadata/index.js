const { getCharacterMetadata } = require("../lib/CharacterData");


module.exports = async function (context, req) {
    const releaseKey = context.bindingData.release;
    const typeKey = context.bindingData.type;
    const id = context.bindingData.id;
    try {
        let output = await getCharacterMetadata(typeKey, releaseKey, id);
        context.res.set("content-type", "application/json");
        context.res.body = output;
    } catch (error) {
        if (error.message.indexOf("reverted: 404") > -1) {
            context.res = {
                status: 404,
                body: "Token not found",
            };
        } else {
            context.log("err", error);
            context.res = {
                status: 500,
                body: "Failure in dimm city",
            };
        }
    }
    context.done();
};


