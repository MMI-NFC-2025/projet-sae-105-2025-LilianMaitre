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
        const firstCard = track.querySelector(".card-media, .card-menu");
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

const articleCarousels = document.querySelectorAll(".carousel");
articleCarousels.forEach((carousel) => initCarousel(carousel));

const ARTICLE_CARDS = {
    fr: [
        {
            id: "article1",
            title: "Vera Rubin",
            desc: "Le parcours de l’astronome qui a révélé la matière noire.",
            img: "/assets/img/veralabo.webp",
            alt: "Portrait de Vera Rubin dans un laboratoire",
            href: "/fr/article1.html",
        },
        {
            id: "article2",
            title: "Femmes & littérature",
            desc: "Comment les héroïnes scientifiques gagnent en visibilité dans les livres.",
            img: "/assets/img/femmesdescience.webp",
            alt: "Couverture colorée représentant des femmes de science",
            href: "/fr/article2.html",
        },
        {
            id: "article3",
            title: "Vulgarisation",
            desc: "Expliquer simplement la théorie de la matière noire de Vera Rubin.",
            img: "/assets/img/galaxie.webp",
            alt: "Schéma simplifié de galaxies pour expliquer la matière noire",
            href: "/fr/article3.html",
        },
        {
            id: "article4",
            title: "Interstellar",
            desc: "Femmes scientifiques au cœur du film culte de Christopher Nolan.",
            img: "/assets/img/interstellar.webp",
            alt: "Scène du film Interstellar",
            href: "/fr/article4.html",
        },
        {
            id: "article5",
            title: "Le livre d’Hubert Reeves",
            desc: "Un récit poétique pour comprendre l’histoire de la matière et du cosmos.",
            img: "/assets/img/livrehubert.webp",
            alt: "Illustration de galaxie inspirée du livre d’Hubert Reeves",
            href: "/fr/article5.html",
        },
    ],
    en: [
        {
            id: "article1",
            title: "Vera Rubin",
            desc: "The journey of the astronomer who revealed dark matter.",
            img: "/assets/img/veralabo.webp",
            alt: "Portrait of Vera Rubin in a laboratory",
            href: "/en/article1.html",
        },
        {
            id: "article2",
            title: "Women & literature",
            desc: "How women scientists gain visibility in books.",
            img: "/assets/img/femmesdescience.webp",
            alt: "Colorful cover showing women of science",
            href: "/en/article2.html",
        },
        {
            id: "article3",
            title: "Popularising theory",
            desc: "Explaining Vera Rubin’s dark matter theory in simple terms.",
            img: "/assets/img/galaxie.webp",
            alt: "Simplified galaxy diagram to explain dark matter",
            href: "/en/article3.html",
        },
        {
            id: "article4",
            title: "Interstellar",
            desc: "Women scientists at the heart of Christopher Nolan’s cult film.",
            img: "/assets/img/interstellar.webp",
            alt: "Scene from the movie Interstellar",
            href: "/en/article4.html",
        },
        {
            id: "article5",
            title: "Hubert Reeves’ book",
            desc: "A poetic read to understand the story of matter and the cosmos.",
            img: "/assets/img/livrehubert.webp",
            alt: "Galaxy illustration inspired by Hubert Reeves’ book",
            href: "/en/article5.html",
        },
    ],
};

const buildArticleRecommendations = () => {
    const match = window.location.pathname.match(/\/(fr|en)\/(article[1-5])(?:\.html)?\/?$/);
    if (!match) return;

    const lang = match[1];
    const currentId = match[2];
    const cards = ARTICLE_CARDS[lang];
    if (!cards) return;

    const LABELS = {
        fr: {
            heading: "Continuer la lecture",
            prev: "Précédent",
            next: "Suivant",
            cta: "Lire l’article",
        },
        en: {
            heading: "Keep reading",
            prev: "Previous",
            next: "Next",
            cta: "Read the article",
        },
    };
    const texts = LABELS[lang] || LABELS.fr;

    const candidates = cards.filter((card) => card.id !== currentId).slice(0, 4);
    if (!candidates.length) return;

    const main = document.querySelector("main.wrapper--article");
    if (!main) return;

    const section = document.createElement("section");
    section.className = "section section--article carousel carousel--articles";
    section.setAttribute("aria-labelledby", "moreArticlesTitle");

    section.innerHTML = `
        <header class="section__header">
            <h2 class="section__title" id="moreArticlesTitle">${texts.heading}</h2>
        </header>
        <div class="carousel__controls" aria-label="Navigation du carrousel">
            <button class="carousel__btn" type="button" data-dir="prev">${texts.prev}</button>
            <button class="carousel__btn" type="button" data-dir="next">${texts.next}</button>
        </div>
        <div class="carousel__track" role="list"></div>
    `;

    const track = section.querySelector(".carousel__track");
    candidates.forEach((card) => {
        const item = document.createElement("article");
        item.className = "card-menu";
        item.setAttribute("role", "listitem");
        item.innerHTML = `
            <div class="card-menu__media">
                <img src="${card.img}" alt="${card.alt}">
            </div>
            <div class="card-menu__body">
                <h3 class="card-menu__title">${card.title}</h3>
                <p class="card-menu__text">${card.desc}</p>
                <div class="card-menu__cta">
                    <a class="card-menu__btn" href="${card.href}">${texts.cta}</a>
                </div>
            </div>
        `;
        track.append(item);
    });

    const deco = main.querySelector(".hero__deco1");
    if (deco) {
        main.insertBefore(section, deco);
    } else {
        main.append(section);
    }

    initCarousel(section);
};

buildArticleRecommendations();
