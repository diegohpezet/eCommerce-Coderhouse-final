// Seteamos el carrito de compras
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

// Se recogen los datos de mi API
cartCount = document.getElementById("lblCartCount");
cartCount.innerHTML = productAmount;

fetch("../products.json")
  .then((response) => response.json())
  .then((data) => {
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

    // Se implementa la función para añadir al carrito
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
        destination: "../views/shoppingcart.html",
      }).showToast();
    };
  });



