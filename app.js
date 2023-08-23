// Получаем ссылки на нужные элементы DOM
const cartContent = document.querySelector(".cart-content");
const checkoutButton = document.getElementById("checkout-button");

// Создаем пустой объект корзины, куда будем добавлять товары
const cart = {};

// Функция для добавления товара в корзину
function addToCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = {
            price: itemPrice,
            quantity: 1
        };
    }
    updateCartDisplay();
}

// Функция для обновления отображения корзины
function updateCartDisplay() {
    cartContent.innerHTML = "";
    let totalPrice = 0;

    for (const itemName in cart) {
        const item = cart[itemName];
        const itemTotal = item.price * item.quantity;

        cartContent.innerHTML += `
            <div class="cart-item">
                <span>${itemName}</span>
                <span>Количество: ${item.quantity}</span>
                <span>Цена: $${itemTotal.toFixed(2)}</span>
            </div>
        `;

        totalPrice += itemTotal;
    }

    cartContent.innerHTML += `
        <div class="cart-total">
            <span>Итого: $${totalPrice.toFixed(2)}</span>
        </div>
    `;
}

// Обработчик нажатия на кнопку "Добавить" для товаров
document.querySelectorAll(".btn").forEach((button, index) => {
    button.addEventListener("click", () => {
        const item = document.querySelectorAll("h3")[index];
        const itemName = item.textContent;
        const itemPrice = parseFloat(item.nextElementSibling.nextElementSibling.textContent.replace("Цена: $", ""));
        addToCart(itemName, itemPrice);
    });
});

// Обработчик нажатия на кнопки "+" и "-" в корзине для изменения количества товара
cartContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("plus") || event.target.classList.contains("minus")) {
        const item = event.target.parentElement.parentElement.querySelector("span");
        const itemName = item.previousSibling.textContent;
        const operator = event.target.classList.contains("plus") ? 1 : -1;
        changeCartItemQuantity(itemName, operator);
    }
});

// Функция для изменения количества товара в корзине
function changeCartItemQuantity(itemName, operator) {
    if (cart[itemName]) {
        cart[itemName].quantity += operator;
        if (cart[itemName].quantity <= 0) {
            delete cart[itemName];
        }
        updateCartDisplay();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Обработчик нажатия на кнопку "Оформить заказ"
checkoutButton.addEventListener("click", () => {
    const chatId = 797915581;
    const message = "Заказ успешно оформлен! Сумма заказа: $" + totalPrice.toFixed(2);
    window.Telegram.WebApp.sendTextMessage(chatId, message);
    cartContent.innerHTML = "";
    for (const itemName in cart) {
        delete cart[itemName];
    }
    updateCartDisplay();
});

// Добавленный код для отображения полей для изменения количества товара
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const quantityFields = document.querySelectorAll('.quantity');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        button.style.display = 'none';
        quantityFields[index].style.display = 'flex';
    });
});

// Добавлен обработчик для кнопки "Наверх"
document.querySelector(".scroll-to-top").addEventListener("click", scrollToTop);

