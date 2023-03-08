const cartCount = document.getElementById("lblCartCount");
const container = document.querySelector(".main");

let cartProducts = localStorage.getItem("shoppingCart");
cartProducts = JSON.parse(cartProducts);

let productAmount = parseInt(localStorage.getItem("productAmount"));
cartCount.innerHTML = productAmount;

if (cartProducts) {
  // Construye la estructura de la tabla
  container.innerHTML = `
  <table>
    <thead>
      <tr>
        <th scope="col" style="width: 5rem"></th>
        <th scope="col">Product</th>
        <th scope="col">Amount</th>
        <th scope="col">Price</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody id="products-display"></tbody>
  </table>  
  `
  // Selecciona el lugar donde construir los objetos en la tabla
  const productContainer = document.querySelector("#products-display");

  cartProducts.forEach(element => {
    productContainer.innerHTML += `<tr>
    <td><img src="${element.img}"></td>
    <td>${element.title}</td>
    <td><a onclick="decrease(${element.id})">-</a> ${element.inCart} <a onclick="increase(${element.id})">+</a></td>
    <td>$${element.price}</td>
    <td><b>$${element.price * element.inCart}</b></td>
    </tr>`;
  })

  // Funciones de los botones de más y menos
  function increase(id) {
    const productInCart = cartProducts.find(element => element.id = id)
    productInCart.inCart++;

    localStorage.setItem("shoppingCart", JSON.stringify(cartProducts));
    localStorage.setItem("productAmount", productAmount + 1);

    location.reload()
  }

  function decrease(id) {
    const productInCart = cartProducts.find(element => element.id = id)
    if (productInCart.inCart > 1) {
      productInCart.inCart--;
      localStorage.setItem("shoppingCart", JSON.stringify(cartProducts));
      localStorage.setItem("productAmount", productAmount - 1);
      location.reload()
    }
  }

  // Mostrar el total de la compra
  function getTotal() {
    let cartTotal = 0
    cartProducts.forEach(element => {
      cartTotal += element.price * element.inCart;
    })
    return cartTotal;
  }

  // Opciones adicionales al final de la tabla
  container.innerHTML += `
    <button id="clearCartBtn">Clear cart</button>
    <div class="cartTotal">
      <h4>Total: $${getTotal()}</h4>
    </div>
    <form>
        <input type="text" id="emailInput" placeholder="example@gmail.com" />
        <button type="button" id="confirmBtn">Continue to payment</button>
    </form>
    `;

    let emailInput = document.getElementById("emailInput")
    let confirmBtn = document.getElementById("confirmBtn");
    confirmBtn.onclick = () => {
      if (emailInput.value !== ''){
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          text: 'You will receive an email in order to proceed with the payment.',
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          localStorage.clear();
          window.location.href = '../index.html';
        })
      }
    } 

    let clearCartBtn = document.getElementById("clearCartBtn");
    clearCartBtn.onclick = () => {
      Swal.fire({
        title: 'Cart content will be deleted?',
        text: 'Are you sure?',
        showCancelButton: true,
        confirmButtonText: 'Clear',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          window.location.href = '../index.html';
        }
      })
    }
} else {
  container.innerHTML = `
  <div>You haven't added products to your shopping cart yet!</div>`
}