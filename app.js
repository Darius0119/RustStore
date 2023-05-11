const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener("click", function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

const cartTotal = document.querySelector('.navbar__cart-total');

let shoppingCart = [];

// Check local storage for saved shopping cart data
if (localStorage.getItem('shoppingCart')) {
  shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  updateCartDisplay();
}

// Step 2: Add event listeners to the "add to cart" buttons
let addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Step 3: Add the item to the shopping cart array
    let productBox = button.closest('.product__box');
    let name = productBox.querySelector('.product__name').innerText;
    let image = productBox.querySelector('.product__image').getAttribute("src");
    let price = parseFloat(productBox.querySelector('.product__price').innerText.replace('$', ''));
    shoppingCart.push({name: name, image: image, price: price});
    
    // Step 4: Update the shopping cart display and save to local storage
    updateCartDisplay();
    saveCartToLocalStorage();
  });
});

// Step 5: Add event listeners to the "remove" buttons
let removeButtons = document.querySelectorAll('.fa-trash-can');
removeButtons.forEach(function(button, index) {
  button.dataset.index = index;
  button.addEventListener('click', function() {
    // Step 6: Remove the item from the shopping cart array
    let index = parseInt(button.dataset.index);
    shoppingCart.splice(index, 1);
    
    // Step 6: Update the shopping cart display and save to local storage
    updateCartDisplay();
    saveCartToLocalStorage();
  });
});

// Helper function to update the shopping cart display
function updateCartDisplay() {
  let cartItems = document.querySelector('.navbar__cart-items');
  let cartTotal = document.querySelector('.navbar__cart-total');
  let itemCount = shoppingCart.length;
  let totalCost = shoppingCart.reduce((total, item) => total + item.price, 0);
  cartItems.innerText = itemCount;
  cartTotal.innerText = '$' + totalCost.toFixed(2);
  
  // Update the "remove" buttons with the correct data-index values
  let removeButtons = document.querySelectorAll('.fa-trash-can');
  removeButtons.forEach(function(button, index) {
    button.dataset.index = index;
  });

  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// Helper function to save the shopping cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

