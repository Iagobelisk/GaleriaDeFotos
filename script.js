const gallery = document.getElementById("gallery");  // Obtém a galeria onde as fotos serão exibidas
let photos = [];  // Armazena as fotos carregadas
const UNSPLASH_ACCESS_KEY = "NeTVqk0K-bcvke9RPZ_d_tAVDK2_l3wvS5EMUWWbdHM";  // Chave de acesso à API do Unsplash

// Função assíncrona para carregar as fotos da API
async function loadPhotos() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}&per_page=22`);
        if (!response.ok) {
            throw new Error("Erro ao carregar fotos da Unsplash API.");
        }
        const data = await response.json();
        photos = data.map(photo => ({
            id: photo.id,
            title: photo.alt_description || "Foto sem título",
            src: photo.urls.thumb,
            fullSrc: photo.urls.full // URL da imagem em alta resolução
        }));
        displayPhotos(photos);  // Exibe as fotos na galeria
    } catch (error) {
        console.error(error);
        gallery.innerHTML = `<p class="no-results">Erro ao carregar as fotos. Tente novamente mais tarde.</p>`;
    }
}

// Função para exibir as fotos na galeria
function displayPhotos(photosToDisplay) {
    if (photosToDisplay.length > 0) {
        gallery.innerHTML = photosToDisplay.map(photo => `
            <div class="photo" onclick="openModal('${photo.fullSrc}', '${photo.title}')">
                <img src="${photo.src}" alt="${photo.title}">
                <p>${photo.title}</p>
            </div>
        `).join("");
    } else {
        gallery.innerHTML = `<p class="no-results">Nenhuma foto encontrada</p>`;
    }
}

// Função para abrir o modal ao clicar na imagem
function openModal(src, title) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");

    modal.style.display = "block";  // Exibe o modal
    modalImg.src = src;  // Define o src da imagem no modal
    modalCaption.innerHTML = title;  // Exibe o título no modal

    // Fechar o modal ao clicar no "X"
    const closeBtn = document.getElementById("close-modal");
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    // Fechar o modal ao clicar fora da imagem
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Função para filtrar as fotos com base na pesquisa do usuário
function filterPhotos() {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredPhotos = photos.filter(photo => photo.title.toLowerCase().includes(query));
    displayPhotos(filteredPhotos);  // Exibe as fotos filtradas
}

// Chama a função para carregar as fotos ao inicializar a página
loadPhotos();
