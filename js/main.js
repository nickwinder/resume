for (var i = 0; i < document.links.length; i++) {
    var link = document.links[i];
    if (window.location.pathname.indexOf(link.getAttribute('href')) > -1) {
        link.parentNode.classList.add('navigation-item-highlighted');

        highlightElements(link);
    }
}

function highlightElements(element) {
    for (var j = 0; j < element.childNodes.length; j++) {
        var child = element.childNodes[j];
        if (child.nodeType === 1) {
            child.classList.add('navigation-highlighted');
            highlightElements(child);
        }
    }
}
