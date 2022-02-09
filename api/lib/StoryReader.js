const matter = require("gray-matter");
const md = require("markdown-it")({
    html: true,
});
const mediaBaseUri = process.env.storage_media_uri || "https://sporosnft.io/api/v1/media/";

function getStoryScene(storyKey, sceneKey) {
    const scene = matter.read(`./stories/${storyKey}/${sceneKey}.md`, {
        excerpt: true,
    });

    scene.excerpt = md.renderInline(scene.excerpt);

    let content = scene.content;
    if (scene.excerpt) {
        content = content.substring(content.indexOf(scene.excerpt) + scene.excerpt.length + 3);
    } else delete scene.excerpt;

    scene.content = md.render(content);

    if (scene.data.image === false) delete scene.data.image;
    else if (scene.data.image && scene.data.image !== true)
        scene.data.image = `${mediaBaseUri}/stories/${storyKey}/${scene.data.image}`;
    else scene.data.image = `${mediaBaseUri}/stories/${storyKey}/${sceneKey}.png`;

    if (scene.data.audio === true) scene.data.audio = `${mediaBaseUri}/stories/${storyKey}/${sceneKey}.mp3`;
    else if (scene.data.audio) scene.data.audio = `${mediaBaseUri}/stories/${storyKey}/${scene.data.audio}`;
    else delete scene.data.audio;

    if (scene.data.video === true) scene.data.video = `${mediaBaseUri}/stories/${storyKey}/${sceneKey}.mp4`;
    else if (scene.data.video) scene.data.video = `${mediaBaseUri}/stories/${storyKey}/${scene.data.video}`;
    else delete scene.data.video;

    if (scene.data.choices == null) {
        if (scene.data.final) {
        } else {
            let id = 0;
            if (sceneKey.startsWith("scene-")) id = new Number(sceneKey.substring(6));
            id++;
            if (id != Number.NaN) {
                scene.data.choices = [
                    {
                        id: `scene-${id}`,
                        text: "Continue",
                        uri: `/stories/${storyKey}/scene-${id}`,
                    },
                ];
            }
        }
    }

    delete scene.path;
    delete scene.isEmpty;
    //ToDo: upload zip,
    // extract story content,
    // upload to AZ storage,
    // update story index
    return scene;
}

module.exports = {
    getStoryScene: getStoryScene,
};
