document.addEventListener("DOMContentLoaded", () => {

    /* ================= HEADER ================= */

    const header = document.querySelector(".header");
    if (header) {
        let ticking = false;
        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    header.classList.toggle("fixed", window.scrollY > 200);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    const toggle = document.getElementById("toggle");
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggle.checked = false;
        });
    });

    /* ================= CAROUSEL INFINITE LOOP ================= */

    const carousel = document.getElementById("castCarousel");
    const btnNext = document.querySelector(".cast__btn--next");
    const btnPrev = document.querySelector(".cast__btn--prev");
    if (!carousel) return;
    let cards = carousel.querySelectorAll(".cast__card");
    const gap = 20;
    const cardWidth = cards[0].offsetWidth + gap;

    // criar clones
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, cards[0]);
    cards = carousel.querySelectorAll(".cast__card");
    carousel.scrollLeft = cardWidth;
    btnNext.addEventListener("click", () => {
        carousel.scrollBy({
            left: cardWidth,
            behavior: "smooth"
        });
    });

    btnPrev.addEventListener("click", () => {
        carousel.scrollBy({
            left: -cardWidth,
            behavior: "smooth"
        });
    });

    let isScrolling = false;

    carousel.addEventListener("scroll", () => {
        if (isScrolling) return;
        if (carousel.scrollLeft <= 0) {
            isScrolling = true;
            carousel.style.scrollBehavior = "auto";
            carousel.scrollLeft = cardWidth * (cards.length - 2);
            carousel.style.scrollBehavior = "smooth";
            isScrolling = false;
        }

        if (carousel.scrollLeft >= cardWidth * (cards.length - 1)) {
            isScrolling = true;
            carousel.style.scrollBehavior = "auto";
            carousel.scrollLeft = cardWidth;
            carousel.style.scrollBehavior = "smooth";
            isScrolling = false;
        }
    });

    /* ================= TRAILER ================= */

    const video = document.getElementById("meuVideo");
    const playButton = document.getElementById("playButton");
    const volumeButton = document.getElementById("volumeButton");
    const overlay = document.querySelector(".trailer__overlay");
    const expandBtn = document.getElementById("expandButton");
    const container = document.querySelector(".trailer__video");

    if (video && playButton && volumeButton && overlay && container) {

        /* PLAY / PAUSE */
        playButton.addEventListener("click", () => {
            if (video.paused) {
                video.play();
                video.muted = false;
                playButton.innerHTML = "❚❚";
                overlay.style.opacity = "0";
            } else {
                video.pause();
                playButton.innerHTML = "▶";
                overlay.style.opacity = "0.4";
            }
        });


        /* VOLUME ON / OFF */
        volumeButton.addEventListener("click", () => {
            video.muted = !video.muted;
            if (video.muted) {
                volumeButton.innerHTML = "🔇";
            } else {
                volumeButton.innerHTML = "🔊";
            }
        });


        /* ESCONDER BOTÕES QUANDO NÃO TEM MOUSE */
        let timeout;
        container.addEventListener("mousemove", () => {
            playButton.style.opacity = "1";
            volumeButton.style.opacity = "1";
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                playButton.style.opacity = "0";
                volumeButton.style.opacity = "0";
            }, 1000);
        });

        /* MOSTRAR BOTÕES QUANDO MOUSE ENTRA */
        container.addEventListener("mouseenter", () => {
            playButton.style.opacity = "1";
            volumeButton.style.opacity = "1";
        });

        /* ESCONDER QUANDO SAI */
        container.addEventListener("mouseleave", () => {
            playButton.style.opacity = "0";
            volumeButton.style.opacity = "0";
        });

        /* EXPANDIR */
        expandBtn.addEventListener("click", () => {
            container.classList.toggle("fullscreen");

            if (container.classList.contains("fullscreen")) {
                video.play();
                playButton.style.display = "none";
            } else {
                video.pause();
                playButton.style.display = "block";
            }
        });
    }
});
