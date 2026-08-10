// ============================================================
// GTM TEST LAB
// Este arquivo simula um site real e envia eventos para o dataLayer.
// Quando instalarmos o Google Tag Manager, ele poderá capturar esses eventos.
// ============================================================

// O dataLayer precisa existir antes do GTM.
window.dataLayer = window.dataLayer || [];

// Evento inicial para indicar que nosso site foi carregado.
window.dataLayer.push({
  event: "site_loaded",
  page_type: document.title
});

// ------------------------------------------------------------
// Função auxiliar para enviar eventos ao dataLayer
// ------------------------------------------------------------
function pushEvent(eventName, parameters = {}) {
  window.dataLayer.push({
    event: eventName,
    ...parameters
  });

  console.log("GTM Test Lab | dataLayer:", {
    event: eventName,
    ...parameters
  });
}

// ------------------------------------------------------------
// Tracking de navegação e cliques
// ------------------------------------------------------------
document.querySelectorAll("[data-gtm-click]").forEach((element) => {
  element.addEventListener("click", () => {
    pushEvent("custom_click", {
      click_name: element.dataset.gtmClick,
      click_text: element.textContent.trim()
    });
  });
});

// ------------------------------------------------------------
// Tracking de produtos
// ------------------------------------------------------------
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    pushEvent("add_to_cart", {
      ecommerce: {
        currency: "BRL",
        value: Number(button.dataset.productPrice),
        items: [
          {
            item_id: button.dataset.productId,
            item_name: button.dataset.productName,
            price: Number(button.dataset.productPrice),
            quantity: 1
          }
        ]
      }
    });

    alert(`${button.dataset.productName} adicionado ao carrinho!`);
  });
});

// Botões de adicionar presentes na página inicial.
document.querySelectorAll(".card button[data-product-id]").forEach((button) => {
  if (!button.classList.contains("add-cart")) {
    button.addEventListener("click", () => {
      pushEvent("add_to_cart", {
        ecommerce: {
          currency: "BRL",
          value: Number(button.dataset.productPrice),
          items: [
            {
              item_id: button.dataset.productId,
              item_name: button.dataset.productName,
              price: Number(button.dataset.productPrice),
              quantity: 1
            }
          ]
        }
      });

      alert(`${button.dataset.productName} adicionado ao carrinho!`);
    });
  }
});

// ------------------------------------------------------------
// Comprar agora
// ------------------------------------------------------------
document.querySelectorAll(".buy-now").forEach((button) => {
  button.addEventListener("click", () => {
    pushEvent("begin_checkout", {
      ecommerce: {
        currency: "BRL",
        value: Number(button.dataset.productPrice),
        items: [
          {
            item_id: button.dataset.productId,
            item_name: button.dataset.productName,
            price: Number(button.dataset.productPrice),
            quantity: 1
          }
        ]
      }
    });

    alert("Checkout iniciado! (Simulação)");
  });
});

// ------------------------------------------------------------
// Checkout geral
// ------------------------------------------------------------
const checkoutButton = document.getElementById("checkoutButton");

if (checkoutButton) {
  checkoutButton.addEventListener("click", () => {
    pushEvent("begin_checkout", {
      ecommerce: {
        currency: "BRL",
        value: 89.90,
        items: [
          {
            item_id: "001",
            item_name: "Camiseta GTM",
            price: 89.90,
            quantity: 1
          }
        ]
      }
    });

    alert("Checkout iniciado! (Simulação)");
  });
}

// ------------------------------------------------------------
// Formulário
// ------------------------------------------------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  let formStarted = false;

  contactForm.addEventListener("focusin", () => {
    if (!formStarted) {
      formStarted = true;

      pushEvent("form_start", {
        form_id: "contactForm",
        form_name: "Contato"
      });
    }
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const subject = document.getElementById("subject").value;

    pushEvent("form_submit", {
      form_id: "contactForm",
      form_name: "Contato",
      form_subject: subject
    });

    document.getElementById("formMessage").classList.remove("hidden");
    contactForm.reset();
    formStarted = false;
  });
}

// ------------------------------------------------------------
// Scroll tracking simples
// ------------------------------------------------------------
let scroll25 = false;
let scroll50 = false;
let scroll75 = false;
let scroll90 = false;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const percentage = (scrollPosition / pageHeight) * 100;

  if (percentage >= 25 && !scroll25) {
    scroll25 = true;
    pushEvent("scroll_depth", { percent_scrolled: 25 });
  }

  if (percentage >= 50 && !scroll50) {
    scroll50 = true;
    pushEvent("scroll_depth", { percent_scrolled: 50 });
  }

  if (percentage >= 75 && !scroll75) {
    scroll75 = true;
    pushEvent("scroll_depth", { percent_scrolled: 75 });
  }

  if (percentage >= 90 && !scroll90) {
    scroll90 = true;
    pushEvent("scroll_depth", { percent_scrolled: 90 });
  }
});
