// Seletores de links de navegação
const menuLinks = document.querySelectorAll('nav ul li a');

// Função para renderizar as categorias dinamicamente
function renderCategories(categories) {
    return categories.map(category => {
        const div = document.createElement('div');
        div.classList.add('category');

        const img = document.createElement('img');
        img.src = category.img;
        img.alt = category.alt;
        img.classList.add('category-img');

        const h3 = document.createElement('h3');
        h3.textContent = category.name;

        div.appendChild(img);
        div.appendChild(h3);
        return div;
    });
}

// Função para carregar conteúdo baseado no item clicado
function loadContent(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Limpar conteúdo anterior

    let headingText = '';
    let descriptionText = '';
    let categories = [];

    if (page === 'jogos') {
        headingText = "Jogos de Terror";
        descriptionText = "Aqui você encontrará uma lista dos melhores jogos de terror como Resident Evil, Silent Hill e outros!";
        categories = [
            { name: "Resident Evil 4", img: "imagens/jogos/resident4.jpg", alt: "Resident Evil 4 Remake" },
            { name: "Silent Hill", img: "imagens/jogos/silenthill2.jpg", alt: "Silent Hill" }
        ];
    } else if (page === 'filmes') {
        headingText = "Filmes de Terror";
        descriptionText = "Assista aos filmes mais aterrorizantes como O Exorcista, Invocação do Mal e outros!";
        categories = [
            { name: "Pânico", img: "imagens/filmes/panico.jpg", alt: "Pânico" },
            { name: "O Exorcista", img: "imagens/filmes/exorcista.jpg", alt: "O Exorcista" }
        ];
    } else if (page === 'livros') {
        headingText = "Livros de Terror";
        descriptionText = "Explore os livros que vão te deixar acordado à noite, como O Iluminado e Drácula.";
        categories = [
            { name: "It - A Coisa", img: "imagens/livros/it.jpg", alt: "It - A Coisa" },
            { name: "Drácula", img: "imagens/livros/dracula.jpg", alt: "Drácula" }
        ];
    }

    const heading = document.createElement('h2');
    heading.textContent = headingText;
    contentDiv.appendChild(heading);

    const description = document.createElement('p');
    description.textContent = descriptionText;
    contentDiv.appendChild(description);

    renderCategories(categories).forEach(category => contentDiv.appendChild(category));
}

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        loadContent(page);
    });
});

function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');

    if (name === "" || email === "") {
        errorMessage.textContent = "Todos os campos são obrigatórios!";
        errorMessage.style.color = "red";
    } else {
        errorMessage.textContent = "Formulário enviado com sucesso!";
        errorMessage.style.color = "green";
    }
}

document.getElementById('contactForm')?.addEventListener('submit', validateForm);

function addItem() {
    alert("Função de adicionar item ainda não foi implementada.");
}

function removeItem() {
    alert("Função de remover item ainda não foi implementada.");
}

document.getElementById('addItemButton')?.addEventListener('click', addItem);
document.getElementById('removeItemButton')?.addEventListener('click', removeItem);

const itemData = {
    jogos: ["Resident Evil 4 Remake", "Silent Hill 2", "Outlast", "Amnesia: The Dark Descent", "Until Dawn", "Dead By Daylight"],
    filmes: ["O Exorcista", "Invocação do Mal", "Pânico", "A Freira", "It, A Coisa", "Halloween", "Um Lugar Silencioso", "A Hora do Pesadelo", "Jogos Mortais X"],
    livros: ["O Iluminado", "Drácula", "Frankenstein", "A Assombração de Hill House"]
};

function searchContent(event) {
    const query = event.target.value.toLowerCase();
    const results = [];

    ['jogos', 'filmes', 'livros'].forEach(category => {
        itemData[category].forEach(item => {
            if (item.toLowerCase().includes(query)) {
                results.push(`${item} (${category})`);
            }
        });
    });

    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        resultsDiv.appendChild(li);
    });
}

document.getElementById('searchInput')?.addEventListener('input', searchContent);

function suggestRandom() {
    const categories = ['jogos', 'filmes', 'livros'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomItem = itemData[randomCategory][Math.floor(Math.random() * itemData[randomCategory].length)];

    const suggestionDiv = document.getElementById('randomSuggestion');
    suggestionDiv.innerHTML = `<h3>Sugestão Aleatória:</h3><p>${randomItem} (${randomCategory})</p>`;
}

document.getElementById('randomButton')?.addEventListener('click', suggestRandom);

let currentIndex = 0;
let carouselItems = [];

function setupCarousel(selector) {
    carouselItems = Array.from(document.querySelectorAll(selector));
    if (window.innerWidth <= 768 && carouselItems.length > 0) {
        carouselItems.forEach(el => el.classList.remove("item-visible"));
        carouselItems[0].classList.add("item-visible");
    }
}

function showNext() {
    if (carouselItems.length === 0) return;
    carouselItems[currentIndex].classList.remove("item-visible");
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add("item-visible");
}

function showPrev() {
    if (carouselItems.length === 0) return;
    carouselItems[currentIndex].classList.remove("item-visible");
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentIndex].classList.add("item-visible");
}

window.addEventListener("load", () => {
    const introElement = document.querySelector('.filmes-intro');
    if (introElement) {
        introElement.classList.add('filmes-intro');
    }

    if (document.querySelector(".movie-item")) {
        setupCarousel(".movie-item");
    } else if (document.querySelector(".book-item")) {
        setupCarousel(".book-item");
    } else if (document.querySelector(".game-review")) {
        setupCarousel(".game-review");
    }
});

let movieIndex = 0;
let bookIndex = 0;
let gameIndex = 0;

const movies = document.querySelectorAll('.movie-item');
const books = document.querySelectorAll('.book-item');
const games = document.querySelectorAll('.game-review');

function showNextItem(type) {
  if (type === 'movie') {
    movies[movieIndex].classList.remove('item-visible');
    movieIndex = (movieIndex + 1) % movies.length; // Circular navigation
    movies[movieIndex].classList.add('item-visible');
  } else if (type === 'book') {
    books[bookIndex].classList.remove('item-visible');
    bookIndex = (bookIndex + 1) % books.length;
    books[bookIndex].classList.add('item-visible');
  } else if (type === 'game') {
    games[gameIndex].classList.remove('item-visible');
    gameIndex = (gameIndex + 1) % games.length;
    games[gameIndex].classList.add('item-visible');
  }
}