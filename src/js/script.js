let posts = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://cdn.meutimao.com.br/fotos-do-corinthians/w614/2025/07/03/andressa_alves_em_treino_do_corinthians_p40y.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://cdn.meutimao.com.br/fotos-do-corinthians/w614/2025/01/15/dayana_rodriguez_no_treino_da_pre-temporada_vqbo.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://cdn.meutimao.com.br/_upload/jogador/mariza-nascimento-silva-no-corinthians_l_corinthians.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://cdn.meutimao.com.br/_upload/jogador/thais-regina-da-silva-no-corinthians_x_corinthians.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://cdn.meutimao.com.br/_upload/jogador/leticia-teles-da-silva-no-corinthians_4_corinthians.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];

// Carregar posts do localStorage se existir
let dados = localStorage.getItem("posts");

if (dados) {
    posts = JSON.parse(dados);
} else {
    localStorage.setItem("posts", JSON.stringify(posts));
}

window.onload = function(){
    mostrarPosts();
    document.querySelector("#form-adicionar").addEventListener("submit", addPost);
    document.querySelector("#form-editar").addEventListener("submit", atualizarPost);
};

// ---- Função para renderizar os cards ----
function mostrarPosts() {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; 

    posts.forEach((post, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${post.foto}" alt="${post.nome}" class="card-img">
            <div class="card-body">
                <div class="card-header">
                    <h3>${post.nome}</h3>
                    <i class="fa-star fas ${post.favorita ? 'favorita' : ''}" data-index="${index}"></i>
                </div>
                <div class="card-info">
                    <p><strong>Posição:</strong> ${post.posicao}</p>
                    <p><strong>Clube:</strong> ${post.clube}</p>
                </div>
                <div class="card-stats">
                    <div class="stat"><span>${post.gols}</span> Gols</div>
                    <div class="stat"><span>${post.assistencias}</span> Assist.</div>
                    <div class="stat"><span>${post.jogos}</span> Jogos</div>
                </div>
            </div>
            <div class="card-actions">
                <button class="action-btn edit" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;

        container.appendChild(card);

        // Deletar
        const btnDelete = card.querySelector(".delete");
        btnDelete.addEventListener("click", () => apagarPost(index));
        // Favorito
        const estrela = card.querySelector(".fa-star");
        estrela.addEventListener("click", () => {
            posts[index].favorita = !posts[index].favorita;
            salvarPosts();
            mostrarPosts();
        });
        // Editar
        const btnEdit = card.querySelector(".edit");
        btnEdit.addEventListener("click", () => abrirModalEditar(index));
    });
}

// ----Adicionar Card ----
const btnAdicionar = document.getElementById("btnAdicionar");
const modalAdicionar = document.getElementById("modal-adicionar");
const closeAdicionar = document.getElementById("adicionar");

btnAdicionar.addEventListener("click", () => {
    modalAdicionar.style.display = "block";
});

closeAdicionar.addEventListener("click", () => {
    modalAdicionar.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modalAdicionar) modalAdicionar.style.display = "none";
});

function addPost(event) {
    event.preventDefault(); 
    const novo = {
        nome: document.getElementById("add-nome").value,
        posicao: document.getElementById("add-posicao").value,
        clube: document.getElementById("add-clube").value,
        foto: document.getElementById("add-foto").value,
        gols: parseInt(document.getElementById("add-gols").value) || 0,
        assistencias: parseInt(document.getElementById("add-assistencias").value) || 0,
        jogos: parseInt(document.getElementById("add-jogos").value) || 0,
        favorita: false
    };

    posts.push(novo);
    salvarPosts();
    mostrarPosts();
    modalAdicionar.style.display = "none";
    event.target.reset();
    alert("Jogadora adicionada com sucesso!!");
}

// ---- Deletar Card ----
function apagarPost(index){
    const confirmar = confirm("Você realmente deseja excluir essa jogadora?");
    if(confirmar){
        posts.splice(index,1);
        salvarPosts();
        mostrarPosts();
    }
}

// ---- Editar ----
const modalEditar = document.getElementById("modal-editar");
const closeEditar = document.getElementById("editar");

function abrirModalEditar(index){
    const post = posts[index];

    document.getElementById("edit-index").value = index;
    document.getElementById("edit-nome").value = post.nome;
    document.getElementById("edit-posicao").value = post.posicao;
    document.getElementById("edit-clube").value = post.clube;
    document.getElementById("edit-foto").value = post.foto;
    document.getElementById("edit-gols").value = post.gols;
    document.getElementById("edit-assistencias").value = post.assistencias;
    document.getElementById("edit-jogos").value = post.jogos;

    modalEditar.style.display = "block";
}

closeEditar.addEventListener("click", () => {
    modalEditar.style.display = "none";
});

window.addEventListener("click", (event) => {
    if(event.target === modalEditar) modalEditar.style.display = "none";
});

// ---- Atualizar Post ----
function atualizarPost(e){
    e.preventDefault();
    const index = parseInt(document.getElementById("edit-index").value);

    posts[index] = {
        ...posts[index], 
        nome: document.getElementById("edit-nome").value,
        posicao: document.getElementById("edit-posicao").value,
        clube: document.getElementById("edit-clube").value,
        foto: document.getElementById("edit-foto").value,
        gols: parseInt(document.getElementById("edit-gols").value) || 0,
        assistencias: parseInt(document.getElementById("edit-assistencias").value) || 0,
        jogos: parseInt(document.getElementById("edit-jogos").value) || 0
    };

    salvarPosts();
    mostrarPosts();
    modalEditar.style.display = "none";
}

// ---- Salvar no localStorage ----
function salvarPosts(){
    localStorage.setItem("posts", JSON.stringify(posts));
}
