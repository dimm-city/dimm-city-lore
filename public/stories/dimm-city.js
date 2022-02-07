(function () {
    if (!SugarCube.Macro.has("toolbar")) {
        SugarCube.Macro.add("toolbar", {
            tags: null,
            handler: function () {
                const el = document.createElement("div");
                el.classList.add("action-toolbar");
                $(el).wiki(this.payload[0].contents);
                this.output.append(el); //, this.args);
            },
        });
    }

    if (!SugarCube.Macro.has("background")) {
        SugarCube.Macro.add("background", {
            tags: null,
            handler: function () {
                /* <video class="background" autoplay loop muted disablePictureInPicture playsinline poster="/stories/intro/index.png">
                    <source src="https://files.dimm.city/stories/intro/index.mp4" type="video/mp4"> 
                </video>*/
                const el = document.createElement("video");
                
                el.toggleAttribute("autoplay");
                el.toggleAttribute("loop");
                el.toggleAttribute("muted");
                el.toggleAttribute("disablePictureInPicture");
                el.toggleAttribute("playsinline");
                el.classList.add("background");
                el.setAttribute("poster", this.args.length >= 2 ? this.args[1] : "");
                el.append(`<source src="${this.args[0]}" type="video/mp4" />`);

                this.output.append(el);
            },
        });
    }

    if (!SugarCube.Macro.has("text-container")) {
        SugarCube.Macro.add("text-container", {
            tags: null,
            handler: function () {
                const el = document.createElement("div");
                el.classList.add("text-container");
                el.toggleAttribute("data-augmented-ui");
                $(el).wiki(this.payload[0].contents);
                this.output.append(el); //, this.args);
            },
        });
    }

    SugarCube.Config.passages.nobr = true;
    SugarCube.Config.passages.transitionOut = "opacity";
    SugarCube.Config.passages.transitionOut = 2010;
    // window.parent.Story = SugarCube.Story;
    // window.parent.UIBar = SugarCube.UIBar;
    // window.parent.UI = SugarCube.UI;
    window.parent.SugarCube = SugarCube;

    console.log("script init");
})();
