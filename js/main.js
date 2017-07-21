for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].href == document.URL) {
        document.links[i].parentElement.className = 'navigation-item-highlighted';
        var pathToSvg = document.links[i].firstElementChild.getAttribute("data");
        pathToSvg = pathToSvg.substring(0, pathToSvg.length - 4);
        pathToSvg = pathToSvg + "-highlighted.svg";
        document.links[i].firstElementChild.setAttribute("data", pathToSvg);

        for (var j = 0; j < document.links[i].childNodes.length; j++) {
            if (document.links[i].childNodes[j].className == "navigation-text") {
                document.links[i].childNodes[j].className = "navigation-text-highlighted";
            }
        }
    }
}
