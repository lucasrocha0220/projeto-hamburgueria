// =====================
// VERCEL WEB ANALYTICS
// =====================
import { inject } from '@vercel/analytics';
inject();

// =====================
// CONTADOR DE PEDIDOS
// =====================
let contador = 0;

function incrementarContador() {
    contador++;
    document.getElementById("contador").innerText = contador;
}

// =====================
// FORMULÁRIO
// =====================
function enviar(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem").value;
    let msg = document.getElementById("msg");

    if (!nome.trim() || !email.includes("@") || !mensagem.trim()) {
        msg.innerText = "Preencha todos os campos corretamente!";
        msg.style.color = "red";
        return;
    }

    msg.innerText = "Mensagem enviada com sucesso!";
    msg.style.color = "green";

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensagem").value = "";
}

// =====================
// SLIDESHOW
// =====================
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";

    if (dots.length > 0) {
        dots[slideIndex - 1].classList.add("active");
    }

    setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", showSlides);

// =====================
// CARRINHO
// =====================
let carrinho = [];

// UI do carrinho
const cartUI = document.createElement("div");
cartUI.id = "cart";
cartUI.style.position = "fixed";
cartUI.style.right = "20px";
cartUI.style.bottom = "20px";
cartUI.style.width = "300px";
cartUI.style.maxHeight = "400px";
cartUI.style.overflowY = "auto";
cartUI.style.background = "#111";
cartUI.style.color = "#fff";
cartUI.style.padding = "15px";
cartUI.style.borderRadius = "10px";
cartUI.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";

cartUI.innerHTML = `
<h3>🛒 Carrinho</h3>
<div id="cart-items"></div>
<p id="total"></p>
<button onclick="finalizarPedido()" 
style="width:100%; padding:10px; margin-top:10px; background:green; color:white; border:none; border-radius:5px; cursor:pointer;">
Finalizar Pedido
</button>
`;

document.body.appendChild(cartUI);

// adicionar item
function adicionar(event) {
    const el = event.target;
    const card = el.closest(".card");

    if (!card) return;

    const nome = card.querySelector("h3").innerText;
    const precoTexto = card.querySelector("span").innerText;
    const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

    carrinho.push({ nome, preco });

    atualizarCarrinho();
}

// remover item
function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// atualizar carrinho
function atualizarCarrinho() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    container.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;

        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginBottom = "8px";

        div.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <button onclick="remover(${index})">X</button>
        `;

        container.appendChild(div);
    });

    totalEl.innerText = "Total: R$ " + total.toFixed(2);
}

// =====================
// FINALIZAR PEDIDO
// =====================
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // salva o carrinho
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    // vai para outra página
    window.location.href = "index1.html";
}
