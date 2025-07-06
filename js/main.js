window.onload = function () {
    var resumeContent = document.getElementById("resume-content");
    var blogContent = document.getElementById("blog-content");
    var resumeButton = document.getElementById("resume-button");
    var blogButton = document.getElementById("blog-button");
    var body = document.getElementById("main");
    var loader = document.getElementById("loader");

    showContent(body);
    showContent(blogContent);
    hideContent(resumeContent);
    hideContent(loader);

    resumeButton.onclick = function () {
        if (resumeButton.checked) {
            showContent(resumeContent);
            hideContent(blogContent);
        }
    };

    blogButton.onclick = function () {
        if (blogButton.checked) {
            showContent(blogContent);
            hideContent(resumeContent);
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
