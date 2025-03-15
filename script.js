// Fungsi untuk mengambil data item dan menampilkannya di DOM
async function fetchItems() {
    try {
        const response = await fetch('data.json'); // Mengambil data dari file data.json
        const data = await response.json();
        const items = data.items;

        // Menambahkan setiap item ke DOM
        items.forEach(item => addItemToDOM(item));

        // Mengurutkan item berdasarkan rating
        sortItemsByRating();
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Fungsi untuk mengambil data item carousel dan menampilkannya di carousel
async function fetchCarouselItems() {
    try {
        const response = await fetch('spesial-data.json'); // Mengambil data dari file data.json
        const data = await response.json();
        const specialItems = data.specialItems;
        const items = specialItems.length > 0 ? specialItems : data.items;

        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = ''; // Mengosongkan carousel sebelum menambahkan item baru

        // Menambahkan setiap item ke carousel
        items.forEach(item => addCarouselItemToDOM(item));

        // Memulai carousel
        startCarousel();
    } catch (error) {
        console.error('Error fetching carousel items:', error);
    }
}

// Fungsi untuk mencari item berdasarkan input pengguna
function searchItem() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.getElementsByClassName('item-card');

    // Menyembunyikan atau menampilkan item berdasarkan pencarian
    for (let i = 0; i < cards.length; i++) {
        const title = cards[i].getElementsByClassName('item-title')[0].innerText.toLowerCase();
        if (title.includes(input)) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

// Fungsi untuk menambahkan item ke DOM
function addItemToDOM(item) {
    const itemList = document.getElementById('itemList');

    // Membuat elemen card untuk item
    const card = document.createElement('div');
    card.className = 'item-card bg-gray-800 rounded-lg overflow-hidden fade-in';

    // Konten card
    const cardContent = `
        <div class="relative">
            <img alt="Image of ${item.title}" class="w-full h-48 object-cover" src="${item.imageUrl}"/>
            <div class="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded item-category">${item.category}</div>
            <div class="absolute top-2 right-2 bg-black bg-opacity-50 text-yellow-400 text-xs font-bold px-2 py-1 rounded item-rating">${item.rating}</div>
        </div>
        <div class="p-4">
            <div class="flex items-center text-gray-400 text-xs mb-2">
                <span class="mr-1">Rp</span>
                ${item.views}
            </div>
            <p class="item-title text-sm font-bold">${item.title}</p>
        </div>
    `;

    // Menambahkan konten ke card
    card.innerHTML = cardContent;
    itemList.appendChild(card);
}

// Fungsi untuk menambahkan item ke carousel
function addCarouselItemToDOM(item) {
    const carouselInner = document.querySelector('.carousel-inner');

    // Membuat elemen carousel item
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';

    // Konten carousel item
    const carouselContent = `
        <img src="${item.imageUrl}" alt="${item.title}">
        <div class="carousel-caption">
            <h3>${item.title}</h3>
        </div>
        <div class="carousel-rating">
            ${item.rating}
        </div>
    `;

    // Menambahkan konten ke carousel item
    carouselItem.innerHTML = carouselContent;
    carouselInner.appendChild(carouselItem);
}

// Fungsi untuk memfilter item berdasarkan kategori
function filterCategory(category) {
    const cards = document.getElementsByClassName('item-card');

    // Menyembunyikan atau menampilkan item berdasarkan kategori
    for (let i = 0; i < cards.length; i++) {
        const itemCategory = cards[i].getElementsByClassName('item-category')[0].innerText.toLowerCase();
        if (category === 'all' || itemCategory.includes(category)) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

// Fungsi untuk mengurutkan item berdasarkan rating
function sortItemsByRating() {
    const itemList = document.getElementById('itemList');
    const cards = Array.from(itemList.getElementsByClassName('item-card'));

    // Mengurutkan item berdasarkan rating (dari tertinggi ke terendah)
    cards.sort((a, b) => {
        const ratingA = parseFloat(a.getElementsByClassName('item-rating')[0].innerText);
        const ratingB = parseFloat(b.getElementsByClassName('item-rating')[0].innerText);
        return ratingB - ratingA;
    });

    // Menambahkan item yang sudah diurutkan kembali ke DOM
    cards.forEach(card => itemList.appendChild(card));
}

// Fungsi untuk memulai carousel
function startCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let index = 0;

    // Mengatur interval untuk mengganti gambar setiap 3 detik
    setInterval(() => {
        index = (index + 1) % items.length; // Pindah ke item berikutnya
        carouselInner.style.transform = `translateX(-${index * 100}%)`; // Geser carousel
    }, 3000);
}

// Event listener untuk memuat fungsi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
    fetchCarouselItems();
});