let modalOpen = false;
let menuOpen = false;
let currentMode = ``;

let triggers = document.querySelectorAll(`#js-triggers li a`);
let menuTrigger = triggers[0];
let modalTrigger = triggers[1];

let modal = document.querySelector(`.modal-panel`);

let modalOverlay = document.createElement(`div`);
modalOverlay.id = `js-modal-overlay`;
document.body.appendChild(modalOverlay);

let navList = document.querySelector(`nav > ul`);

let dropdown = document.createElement(`div`);
dropdown.id = `js-dropdown`;
dropdown.appendChild(navList.cloneNode(true));
document.body.appendChild(dropdown);

let sideTray = document.createElement(`div`);
sideTray.id = `js-side-tray`;
sideTray.appendChild(navList.cloneNode(true));
document.body.appendChild(sideTray);

let getMode = () => {
    return window.innerWidth > 736 ? `desktop` : `mobile`;
};

let setMode = () => {
    currentMode = getMode();
};

let openModal = () => {
    closeMenu();

    modal.classList.add(`open`);
    modalOverlay.classList.add(`open`);

    modalOpen = true;
};

let closeModal = () => {
    modal.classList.remove(`open`);
    modalOverlay.classList.remove(`open`);

    modalOpen = false;
};

let openMenu = () => {
    if (currentMode === `desktop`) {
        dropdown.classList.add(`open`);
    } else {
        sideTray.classList.add(`open`);
    }

    menuOpen = true;
};

let closeMenu = () => {
    dropdown.classList.remove(`open`);
    sideTray.classList.remove(`open`);

    menuOpen = false;
};

let toggleMenu = () => {
    if (menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
};

let resetUI = () => {
    closeModal();
    closeMenu();
};

let bindEvents = () => {
    if (!menuTrigger || !modalTrigger) {
        console.error(`Triggers not found`);
        return;
    }

    menuTrigger.addEventListener(`click`, (e) => {
        e.preventDefault();
        toggleMenu();
    });

    modalTrigger.addEventListener(`click`, (e) => {
        e.preventDefault();
        openModal();
    });

    modalOverlay.addEventListener(`click`, closeModal);

    document.addEventListener(`keydown`, (e) => {
        if (e.key === `Escape` && modalOpen) {
            closeModal();
        }
    });

    window.addEventListener(`resize`, () => {
        let newMode = getMode();

        if (newMode !== currentMode) {
            setMode();
            resetUI();
        }
    });
};

let init = () => {
    setMode();
    bindEvents();
};

document.addEventListener(`DOMContentLoaded`, () => {
    init();
});
