document.addEventListener("story.selected", (e: CustomEvent) => {
    console.log("story.selected", e);
    if (e.detail > "" && e.detail != "stories/none.html") {
        document.querySelector(".vertical-acordion").classList.remove("bottom");
    } else {
        document.querySelector(".vertical-acordion").classList.add("bottom");
    }
});
