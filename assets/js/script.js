class Manga {
  constructor(title, author, category, description, image) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.description = description;
    this.image = image;
  }
}

// Initialize the mangas array from localStorage or as an empty array if there’s no data
let mangas = JSON.parse(localStorage.getItem('mangas')) || [];
let editIndex = null;

function addOrUpdateManga(event) {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').value;

  if (editIndex !== null) {
      mangas[editIndex] = new Manga(title, author, category, description, image);
      editIndex = null;
  } else {
      const newManga = new Manga(title, author, category, description, image);
      mangas.push(newManga);
  }

  saveMangas();
  displayMangas();
  showSection('list');
  document.getElementById('manga-form').reset();
}

function showSection(section) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(section).style.display = 'block';
}

// Function to save mangas array to localStorage
function saveMangas() {
  localStorage.setItem('mangas', JSON.stringify(mangas));
}

// Function to display mangas based on category filter
function displayMangas(filteredCategory = 'all') {
  const mangaList = document.getElementById('manga-list');
  mangaList.innerHTML = '';

  const filteredMangas = mangas.filter(manga => filteredCategory === 'all' || manga.category === filteredCategory);

  // Se não houver mangás após o filtro, exibe a mensagem de "Nenhum mangá cadastrado"
  if (filteredMangas.length === 0) {
      mangaList.innerHTML = '<p class="no-manga-message">Nenhum mangá cadastrado.</p>';
      return;
  }

  filteredMangas.forEach((manga, index) => {
      const mangaDiv = document.createElement('div');
      mangaDiv.className = 'manga-item';
      mangaDiv.innerHTML = `
          <img src="${manga.image}" alt="${manga.title}">
          <h3>${manga.title}</h3>
          <p>${manga.category}</p>
      `;
      mangaDiv.onclick = () => showMangaDetails(index);
      mangaList.appendChild(mangaDiv);
  });
}


function filterByCategory() {
  const category = document.getElementById('filter-category').value;
  displayMangas(category);
}

function showMangaDetails(index) {
  const manga = mangas[index];
  document.getElementById('details-title').textContent = manga.title;
  document.getElementById('details-author').textContent = manga.author;
  document.getElementById('details-category').textContent = manga.category;
  document.getElementById('details-description').textContent = manga.description;
  document.getElementById('details-image').src = manga.image;
  document.getElementById('edit-button').onclick = () => editManga(index);
  document.getElementById('delete-button').onclick = () => deleteManga(index);
  showSection('manga-details');
}

function deleteManga(index) {
  if (confirm(`tem certeza que deseja deletar "${mangas[index].title}"?`)) {
    mangas.splice(index, 1);
    saveMangas();
    displayMangas();
    showSection('list');
  }
}

function editManga(index) {
  const manga = mangas[index];
  editIndex = index;

  document.getElementById('title').value = manga.title;
  document.getElementById('author').value = manga.author;
  document.getElementById('category').value = manga.category;
  document.getElementById('description').value = manga.description;
  document.getElementById('image').value = manga.image;

  showSection('register');
}

document.getElementById('manga-form').onsubmit = addOrUpdateManga;

window.onload = () => {
  displayMangas();
  showSection('home');
};

// Initial display of mangas on page load
displayMangas();



  
  
  