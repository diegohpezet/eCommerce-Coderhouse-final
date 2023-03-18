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
    if (element.inCart >= 1) {
      productContainer.innerHTML += `<tr>
      <td><img src="${element.img}"></td>
      <td>${element.title}</td>
      <td><a onclick="decrease(${element.id})">-</a> <span id="amountOf${element.id}">${element.inCart}</span> <a onclick="increase(${element.id})">+</a></td>
      <td>$${element.price}</td>
      <td><b id="singleTotal">$${element.price * element.inCart}</b></td>
      </tr>`;
    }
  })

  // Funciones de los botones de más y menos
  function increase(id) {
    const productInCart = cartProducts.find(element => element.id === id)
    productInCart.inCart++;

    localStorage.setItem("shoppingCart", JSON.stringify(cartProducts));
    localStorage.setItem("productAmount", productAmount + 1);

    // Actualizar los valores del carrito, total y cantidad
    cartCount.innerHTML = productAmount += 1;
    updateValues(id);
    getTotal();
  }

  function decrease(id) {
    const productInCart = cartProducts.find(element => element.id === id)
    /* 
      En caso de que haya varios elementos iguales, quitar 1
      Caso contrario, quitar el elemento del carrito
    */
    if (productInCart.inCart > 1) {
      productInCart.inCart--;

      localStorage.setItem("shoppingCart", JSON.stringify(cartProducts));
      localStorage.setItem("productAmount", productAmount - 1);

      // Actualizar los valores del carrito, total y cantidad
      cartCount.innerHTML = productAmount -= 1;
      updateValues(id)
      getTotal()
    } else {
      let index = cartProducts.findIndex(element => {
        return element.id === productInCart.id;
      })
      cartProducts.splice(index, 1)
      localStorage.setItem("productAmount", productAmount - 1);

      if (cartProducts.length === 0){
        localStorage.removeItem("shoppingCart")
        window.location.href = 'mart.html';
      } else {
        localStorage.setItem("shoppingCart", JSON.stringify(cartProducts));
        location.reload();
      }
    }
  }

  function updateValues(id) {
    const productInCart = cartProducts.find(element => element.id === id)
    const amountTag = document.getElementById(`amountOf${id}`)
    amountTag.innerHTML = productInCart.inCart
    const singleTotal = document.getElementById("singleTotal")
    singleTotal.innerHTML = productInCart.price * productInCart.inCart
  }

  // Mostrar el total de la compra
  function getTotal() {
    const total = document.getElementById("total");

    let cartTotal = 0
    cartProducts.forEach(element => {
      cartTotal += element.price * element.inCart;
    })
    total.innerHTML = cartTotal;
  }

  // Borrar carrito al final de la tabla
  container.innerHTML += `
    <button id="clearCartBtn">Clear cart</button>
    <div class="cartTotal">
      <h4>Total: $<span id="total">0</span></h4>
    </div>
    <form>
        <input type="text" id="emailInput" placeholder="example@gmail.com" />
        <button type="button" id="confirmBtn">Continue to payment</button>
    </form>
    `;

    // Formulario de compra
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
          window.location.href = 'mart.html';
        }
      })
    }
} else {
  container.innerHTML = `
  <div>You haven't added products to your shopping cart yet!</div>`
}

getTotal()