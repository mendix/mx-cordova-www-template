(function() {
    var url = appConfig.url + "/",
        head = document.getElementsByTagName("head")[0];

    function appendToHead(elements, createElement) {
        elements.forEach(function(element){
            head.appendChild(createElement(url + element));
        });
    }

    window.dojoConfig = {
        appbase: url,
        baseUrl: url + "mxclientsystem/dojo/"
    };

    appendToHead(appConfig.css, function(href) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;

        return link;
    });

    appendToHead(appConfig.js, function(href) {
        var script = document.createElement("script");
        script.src = href;

        return script;
    });
})();