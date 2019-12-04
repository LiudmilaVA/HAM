/*--------------------------------------------TABS SERVICES----------------------------------------------------------*/
const servicesTabs = document.querySelector('.services__tabs');
const servicesTabsContent = document.querySelector('.services__tabs-content');

servicesTabs.addEventListener('click', (event) => {
    servicesTabs.querySelector('.active').classList.remove('active');
    servicesTabsContent.querySelector('.active').classList.remove('active');

    document.getElementById(event.target.textContent).classList.add('active');
    event.target.classList.add('active');

});

/*----------------------------------------------SORTING--------------------------------------------------------------*/
const tabsWrapper = document.querySelector('.projects__sorting');
const contentItem = document.querySelectorAll('.projects__item');
const buttonMoreContent = document.querySelector('.projects__btn');
const loadAnimation = document.querySelector('.loader');

let quantitySlides = 12;
showContent(quantitySlides);

tabsWrapper.addEventListener('click', (event) => {
    sortContent(event, quantitySlides);
});

buttonMoreContent.addEventListener('click', (event) => {
    buttonMoreContent.hidden = true;
    loadAnimation.classList.add('show');
    event.preventDefault();

    setTimeout(() => {
        addContent(event);
        loadAnimation.classList.remove('show');

        (quantitySlides === 36) ? buttonMoreContent.hidden = true : buttonMoreContent.hidden = false;
    }, 2000);
});

function showContent(counterSlides) {
    for (let i = 0; i < counterSlides; i++) {
        contentItem[i].classList.add('show');
    }
}

function sortContent(event, counterSlides) {
    let nameGroup = event.target.dataset.group;
    const title = event.target;

    tabsWrapper.querySelector('.active').classList.remove('active');
    title.classList.add('active');

    if(nameGroup === 'all') {
        showContent(counterSlides);
    } else {
        for (let i = 0; i < counterSlides; i++) {
            if(contentItem[i].dataset.content.indexOf(nameGroup) > -1) {
                contentItem[i].classList.add('show');
                addFlipAnimation(counterSlides);
            } else {
                contentItem[i].classList.remove('show');
            }
        }
    }
}

function addContent(event) {
    quantitySlides += 12;
    event.preventDefault();

    tabsWrapper.querySelector('.active').classList.remove('active');
    tabsWrapper.querySelector("[data-group='all']").classList.add('active');
    showContent(quantitySlides);
    addFlipAnimation(quantitySlides);
}

function addFlipAnimation(counter) {
    for (let i = 0; i < counter; i++) {
        contentItem[i].classList.add('flipInX');
    }
}

/*-------------------------------------------------GALLERY-----------------------------------------------------*/
const listThumbnails = document.querySelector('.references__thumbnail');
const fullSlide = document.querySelectorAll('.references__item');
const thumbnails = listThumbnails.querySelectorAll('.references__thumbnail-img');

const buttonPrevious = listThumbnails.querySelector('.btn-prev');
const buttonNext = listThumbnails.querySelector('.btn-next');

let slideIndex = 3;

listThumbnails.addEventListener('click', (event) => {
    if(event.target === buttonPrevious) {
        showSlide(--slideIndex);
    } else if (event.target === buttonNext) {
        showSlide(++slideIndex);
    } else if (!isNaN(event.target.dataset.number)) {
        slideIndex = event.target.dataset.number;
        showSlide(slideIndex);
    }
});

function showSlide(index) {
    if (index > fullSlide.length) { slideIndex = 1; }
    if (index < 1) { slideIndex = fullSlide.length; }

    for (let i = 0; i < fullSlide.length; i++) {
        fullSlide[i].classList.remove('active');
        thumbnails[i].classList.remove('active');
    }
    fullSlide[slideIndex - 1].classList.add('active');
    thumbnails[slideIndex - 1].classList.add('active');
}

// /*------------------------MASONRY GALLERY----------------------------*/
document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        const grid = document.querySelector('.grid');

        let msnry = new Masonry( grid, {
            percentPosition: true,
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            // gutter: 10,
            horizontalOrder: true
        });
    }
};

