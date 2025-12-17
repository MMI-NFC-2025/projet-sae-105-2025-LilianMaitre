const btnArticles = document.getElementById("btnArticles");
const subListArticles = document.getElementById("menuArticles");

if (btnArticles && subListArticles) {
    btnArticles.addEventListener("click", () => {
        const isOpen = btnArticles.getAttribute("aria-expanded") === "true";
        btnArticles.setAttribute("aria-expanded", String(!isOpen));
        subListArticles.hidden = isOpen;
    });
}
