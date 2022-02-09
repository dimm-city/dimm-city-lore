document.addEventListener("story.selected", (e: CustomEvent) => {
    console.log("story.selected", e);
    if (e.detail > "" && e.detail != "stories/none.html") {
        document.querySelector("body").classList.remove("bottom");
    } else {
        document.querySelector("body").classList.add("bottom");
    }
});

function loadStory(story) {
    if (!story) story = "none";
    frames[0].location = `/stories/${story}.html`;
}

function selectStory(story) {
    loadStory(story);
    document.dispatchEvent(
        new CustomEvent("story.selected", {
            detail: story,
        })
    );
}

function exitStory() {
    selectStory(null);
}

function storyLoaded() {
    console.log("story loaded");
}
