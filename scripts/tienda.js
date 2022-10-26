document.addEventListener('click',event =>{
    if(event.target && event.target.className.includes('addToCart')){
        addToCardClicked(event)
    }
})


const comprarButton = document.querySelector('.comprarButton')
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
    );

function addToCardClicked(event){
    const button = event.target;
    const item =  button.closest('.item');
    
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage){

    const elementTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
        );
    for( let i = 0; i < elementTitle.length; i++){
        if(elementTitle[i].innerText === itemTitle){
            let elementQuantity = elementTitle[i].parentElement.parentElement.parentElement. 
            querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            $('.toast').toast('show')
            updateShoppingCartTotal();
            return;
        }
    }

    const shoppingCardRow = document.createElement('div');
    const shoppingCardContent = `<div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${itemImage} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>
</div>`;
    shoppingCardRow.innerHTML = shoppingCardContent
    shoppingCartItemsContainer.append(shoppingCardRow)

    shoppingCardRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

    shoppingCardRow.querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

    updateShoppingCartTotal()
}

function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('€',''));

        const shoppingCartItemQuantityElement =  shoppingCartItem.querySelector('.shoppingCartItemQuantity');

        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });

    shoppingCartTotal.innerHTML = `${total.toFixed(2)} €`
}

function removeShoppingCartItem(event){
    const buttonClicked = event.target
    buttonClicked.closest('.shoppingCartItem').remove();

    updateShoppingCartTotal();
}

function quantityChanged(event){
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}