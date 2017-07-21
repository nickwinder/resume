for (var i = 0; i < document.links.length; i++) {
    var link = document.links[i];
    if (window.location.pathname.indexOf(link.getAttribute('href')) > -1) {
        link.parentNode.className = "navigation-item-highlighted";
        var pathToSvg = document.links[i].firstElementChild.getAttribute("data");
        pathToSvg = pathToSvg.substring(0, pathToSvg.length - 4);
        pathToSvg = pathToSvg + "-highlighted.svg";
        link.firstElementChild.setAttribute("data", pathToSvg);

        for (var j = 0; j < link.childNodes.length; j++) {
            var child = link.childNodes[j];
            if (child.nodeType === 1 && (link.childNodes[j].getAttribute("class").indexOf("navigation-text") > -1)) {
                link.childNodes[j].className = "navigation-text-highlighted";
            }
        }
    }
}
