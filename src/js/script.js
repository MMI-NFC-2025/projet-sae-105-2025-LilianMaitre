const menuBtn = document.querySelector(".header__menu-btn");
const mainNav = document.getElementById("mainNav");
const btnArticles = document.getElementById("btnArticles");
const subListArticles = document.getElementById("menuArticles");
let menuLogo = mainNav ? mainNav.querySelector(".menu__logo") : null;

const ensureMenuLogo = () => {
    if (!mainNav || menuLogo) return;
    const link = document.createElement("a");
    link.className = "menu__logo";
    link.href = "/";
    link.setAttribute("aria-label", "Retour à l'accueil");

    const img = document.createElement("img");
    img.src = "/assets/icons/logo-etoiles.svg";
    img.alt = "Logo Étoiles oubliées";

    link.append(img);
    const brand = mainNav.querySelector(".menu__brand");
    if (brand) {
        mainNav.insertBefore(link, brand);
    } else {
        mainNav.prepend(link);
    }
    menuLogo = link;
};

const toggleMenu = (open) => {
    if (!menuBtn || !mainNav) return;
    if (open) ensureMenuLogo();
    menuBtn.classList.toggle("menu-btn--open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    mainNav.classList.toggle("menu--open", open);
    mainNav.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    if (!open && btnArticles && subListArticles) {
        btnArticles.setAttribute("aria-expanded", "false");
        subListArticles.hidden = true;
        subListArticles.classList.remove("is-open");
    }
};

if (menuBtn && mainNav) {
    mainNav.hidden = false;
    mainNav.setAttribute("aria-hidden", "true");
    menuBtn.addEventListener("click", () => {
        const willOpen = !mainNav.classList.contains("menu--open");
        toggleMenu(willOpen);
    });

    mainNav.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.closest("a")) {
            toggleMenu(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            toggleMenu(false);
        }
    });
}

if (btnArticles && subListArticles) {
    btnArticles.addEventListener("click", () => {
        const isOpen = btnArticles.getAttribute("aria-expanded") === "true";
        const next = !isOpen;
        btnArticles.setAttribute("aria-expanded", String(next));
        subListArticles.hidden = !next;
        subListArticles.classList.toggle("is-open", next);
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
