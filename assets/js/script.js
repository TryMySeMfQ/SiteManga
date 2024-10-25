class Manga {
    constructor(title, author, category, description, image) {
      this.title = title;
      this.author = author;
      this.category = category;
      this.description = description;
      this.image = image;
    }
  }
  
  let mangas = JSON.parse(localStorage.getItem('mangas')) || [];
  
  document.getElementById('manga-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
  
    const newManga = new Manga(title, author, category, description, image);
    mangas.push(newManga);
    saveMangas();
    displayMangas();
    this.reset();
    showSection('list');
  });
  
  function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
  }
  
  function saveMangas() {
    localStorage.setItem('mangas', JSON.stringify(mangas));
  }
  
  function displayMangas(filteredCategory = 'all') {
    const mangaList = document.getElementById('manga-list');
    mangaList.innerHTML = '';
    const filteredMangas = mangas.filter(manga => filteredCategory === 'all' || manga.category === filteredCategory);
  
    filteredMangas.forEach(manga => {
      const mangaDiv = document.createElement('div');
      mangaDiv.className = 'manga-item';
      mangaDiv.innerHTML = `
        <img src="${manga.image}" alt="${manga.title}">
        <h3>${manga.title}</h3>
        <p>${manga.category}</p>
      `;
      mangaList.appendChild(mangaDiv);
    });
  }
  
  function filterByCategory() {
    const category = document.getElementById('filter-category').value;
    displayMangas(category);
  }

  function displayMangas(filteredCategory = 'all') {
    const mangaList = document.getElementById('manga-list');
    mangaList.innerHTML = '';
    const filteredMangas = mangas.filter(manga => filteredCategory === 'all' || manga.category === filteredCategory);
  
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
  
  function showMangaDetails(index) {
    const manga = mangas[index];
    document.getElementById('details-title').textContent = manga.title;
    document.getElementById('details-author').textContent = manga.author;
    document.getElementById('details-category').textContent = manga.category;
    document.getElementById('details-description').textContent = manga.description;
    document.getElementById('details-image').src = manga.image;
  
    showSection('manga-details');
  }
  
  
  displayMangas();
  
  
  