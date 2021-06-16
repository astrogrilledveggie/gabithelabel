if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', addToCartMaster)
} else {
    addToCartMaster()
    console.log('Ready to feel the Force')
}

function addToCartMaster() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('addtocart-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-buyNow')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for supporting our small family-owned business!')
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement.parentElement
    let name = shopItem.getElementsByClassName('product-name')[0].innerText
    let price = shopItem.getElementsByClassName('product-price')[0].innerText.slice(1)
    let image = shopItem.getElementsByClassName('product-image')[0].src
    addItemToCart(name, price, image)
    updateCartTotal()
}

function addItemToCart(name, price, image) {
    let cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row', 'd-flex', 'p-2')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-name')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == name) {
            alert('You have already added this product to your cart')
            return
        }
    }
    let cartRowContents = `
        <td class="cart-item col-5">
            <img class="cart-item-image" src="${image}" width="50" height="50">
            <input type="hidden" class="form-control" id="image" name="image" value="${image}">

            <p class="cart-item-name">${name}</p>
            <input type="hidden" class="form-control" id="name" name="name" value="${name}">
        </td>
        <td class="cart-price col-2">
            $${price}
            <input type="hidden" class="form-control" id="price" name="price" value="${price}">
        </td>
        <td class="cart-quantity input-group input-group-sm col-3">
            <input class="cart-quantity-input input-sm border-bottom border-secondary" type="number" id="quantity" name="quantity" value="1" style="width: 50px; height: 35px;">
            <button class="btn btn-danger ms-1 border-bottom border-danger" style="height: 35px;" type="button">Remove</button>
        </td>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}