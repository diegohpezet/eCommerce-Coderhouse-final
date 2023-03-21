// Carga el número que se muestra junto al carrito
const cartCount = document.getElementById("lblCartCount");
let productAmount = 0;

if (localStorage.getItem("productAmount")) {
  productAmount = parseInt(localStorage.getItem("productAmount"));
  cartCount.innerHTML = productAmount;
} else {
  localStorage.setItem("productAmount", 0);
}
