const data = [
  {
    id: 1,
    title: "Bicycle Supreme",
    price: 400,
    img: "https://cdn.shopify.com/s/files/1/0414/8435/3702/products/STEEL_ACESSORIOS-Baralho-supreme-2_800x.png?v=1648562368",
    inCart: 0,
  },
  {
    id: 2,
    title: "Bicycle Emotions",
    price: 800,
    img: "https://lepetitmagicien.com/6962-home_default/1st-run-bicycle-emotions-deck-playing-card-.jpg",
    inCart: 0,
  },
  {
    id: 3,
    title: "Memento Mori Playing Cards",
    price: 1200,
    img: "http://cdn.shopify.com/s/files/1/1804/8251/products/MomentoMori_1_600x600.png?v=1656924348",
    inCart: 0,
  },
  {
    id: 4,
    title: "NOC Originals: Red",
    price: 1200,
    img: "http://cdn.shopify.com/s/files/1/1804/8251/products/nocred_Site_1_600x600.png?v=1600610682",
    inCart: 0,
  },
  {
    id: 5,
    title: "NOC Summer Edition",
    price: 1500,
    img: "http://cdn.shopify.com/s/files/1/0901/8716/products/noc-summer-light-blue_1d3393a7-d41c-46ad-82b3-10897bf05819_600x.png?v=1497138144",
    inCart: 0,
  },
  {
    id: 6,
    title: "Aviator Deck",
    price: 700,
    img: "https://cdn.shopify.com/s/files/1/1804/8251/products/aviatorblue_Site_3_1024x1024.png?v=1597344331",
    inCart: 0,
  },
];

let shoppingCart = [];
if (localStorage.getItem("shoppingCart")) {
  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
}

// Carga el número que se muestra al lado del carrito
productAmount = 0;
if (localStorage.getItem("productAmount")) {
  var productAmount = parseInt(localStorage.getItem("productAmount"));
} else {
  localStorage.setItem("productAmount", 0);
}

window.onload = function loadContent() {
  cartCount = document.getElementById("lblCartCount");
  cartCount.innerHTML = productAmount;

  // Product List
  data.forEach((element) => {
    const productList = document.getElementById("display");
    const productCard = document.createElement("li");
    productCard.className = "card-item";
    productCard.innerHTML = `<div class="card">
    <div class="card-img">
      <img
        src= ${element.img}
        alt="product image"
      />
    </div>
    <h3 class="card-title">${element.title}</h3>
    <p class="card-text">$${element.price}</p>
    <button id="btn${element.id}" class="card-btn">Add to cart</button>
    </div>
    `;
    productList.appendChild(productCard);
    const btn = document.getElementById(`btn${element.id}`);
    btn.addEventListener("click", () => {
      addToCart(element.id);
    });
  });
};

const addToCart = (id) => {
  const productInCart = shoppingCart.find((element) => element.id === id);
  if (productInCart) {
    // Añade 1 la propiedad 'inCart' del elemento al array
    productInCart.inCart++;
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  
    localStorage.setItem("productAmount", productAmount + 1);
    cartCount.innerHTML = productAmount += 1;
  } else {
    // Ingresa el elemento al array
    const product = data.find((element) => element.id === id);

    shoppingCart.push(product);
    shoppingCart[shoppingCart.length - 1].inCart = 1;

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    console.log(shoppingCart);

    localStorage.setItem("productAmount", productAmount + 1);
    cartCount.innerHTML = productAmount += 1;
  }
  // Mostrar notificación
  Toastify({
    text: "Added to cart!",
    duration: 1500,
    newWindow: true,
    close: false,
    gravity: "bottom", 
    position: "right", 
    destination: 'views/shoppingcart.html'
  }).showToast();
};