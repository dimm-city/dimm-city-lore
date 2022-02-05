(function () {
    
    SugarCube.Macro.add("toolbar1", {
        tags: null,
        handler: function () {
            const el = document.createElement("div");
            el.classList.add("action-toolbar");
            //el.toggleAttribute("data-augmented-ui");
            $(el).wiki(this.payload[0].contents);
            this.output.append(el); //, this.args);
        },
    });
    console.log('script init');
})();
