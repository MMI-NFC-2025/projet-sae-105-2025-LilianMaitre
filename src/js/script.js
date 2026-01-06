const btnArticles = document.getElementById("btnArticles");
const subListArticles = document.getElementById("menuArticles");

if (btnArticles && subListArticles) {
    btnArticles.addEventListener("click", () => {
        const isOpen = btnArticles.getAttribute("aria-expanded") === "true";
        btnArticles.setAttribute("aria-expanded", String(!isOpen));
        subListArticles.hidden = isOpen;
    });
}

const initCarousel = (root) => {
    const track = root.querySelector(".carousel__track");
    const prevBtn = root.querySelector('[data-dir="prev"]');
    const nextBtn = root.querySelector('[data-dir="next"]');

    if (!track || !prevBtn || !nextBtn) return;

    const getStep = () => {
        const firstCard = track.querySelector(".card-media");
        if (!firstCard) return track.clientWidth;
        const styles = getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || "0");
        return firstCard.getBoundingClientRect().width + gap;
    };

    const scrollByStep = (direction) => {
        track.scrollBy({ left: direction * getStep(), behavior: "smooth" });
    };

    prevBtn.addEventListener("click", () => scrollByStep(-1));
    nextBtn.addEventListener("click", () => scrollByStep(1));
};

const recosCarousel = document.querySelector(".carousel--recos");
if (recosCarousel) {
    initCarousel(recosCarousel);
}
