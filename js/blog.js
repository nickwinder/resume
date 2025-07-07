window.onload = function () {
    var blogContent = document.getElementById("blog-content");
    var resumeButton = document.getElementById("resume-button");
    var blogButton = document.getElementById("blog-button");
    var body = document.getElementById("main");
    var loader = document.getElementById("loader");

    showContent(body);
    showContent(blogContent);
    hideContent(loader);

    resumeButton.onclick = function () {
        if (resumeButton.checked) {
            window.location.href = '../index.html';
        }
    };

    blogButton.onclick = function () {
        if (blogButton.checked) {
            window.location.href = '../index.html#blog';
        }
    };
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
