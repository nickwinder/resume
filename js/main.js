window.onload = function () {
    var resumeContent = document.getElementById("resume-content");
    var portfolioContent = document.getElementById("portfolio-content");
    var resumeButton = document.getElementById("resume-button");
    var portfolioButton = document.getElementById("portfolio-button");

    enableDisplay(resumeContent);
    enableDisplay(portfolioContent);

    showContent(resumeContent);

    resumeButton.onclick = function () {
        if (resumeButton.checked) {
            showContent(resumeContent);
            hideContent(portfolioContent);
        } else {
            hideContent(resumeContent);
            showContent(portfolioContent);
        }
    };

    portfolioButton.onclick = function () {
        if (portfolioButton.checked) {
            showContent(portfolioContent);
            hideContent(resumeContent);
        } else {
            hideContent(portfolioContent);
            showContent(resumeContent);
        }
    };
};

function enableDisplay(content) {
    content.style.display = 'block';
}

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
