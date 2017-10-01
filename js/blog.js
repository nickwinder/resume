window.onload = function () {
    var blogContent = document.getElementById("blog-content");
    var body = document.getElementById("main");
    var loader = document.getElementById("loader");

    showContent(body);
    showContent(blogContent);
    hideContent(loader);
};

function showContent(content) {
    content.style.visibility = 'visible';
    content.style.height = 'auto';
    content.style.opacity = 1;
}

function hideContent(content) {
    content.style.visibility = 'hidden';
    content.style.height = '0';
    content.style.opacity = 0;
}
