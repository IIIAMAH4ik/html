// Функция для отображения уведомления
function showNotification() {
    const notification = document.getElementById("notification");
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000); // Уведомление исчезнет через 2 секунды
}

// Получаем ссылки на нужные элементы DOM
const cartContent = document.querySelector(".cart-content");
const checkoutButton = document.getElementById("checkout-button");
let quantityFields = document.querySelectorAll('.quantity'); // Объявляем здесь
let totalPrice = 0;

// Получаем ссылку на элемент уведомления
const notification = document.getElementById("notification");

document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => {
        const item = document.querySelectorAll("h3")[index];
        const itemName = item.textContent;
        const itemPrice = parseFloat(item.nextElementSibling.nextElementSibling.textContent.replace("Цена: $", ""));
        addToCart(itemName, itemPrice);

        // Показываем уведомление
        notification.textContent = "Вы выбрали " + itemName + "!"; // Здесь можно изменить текст уведомления
        notification.style.display = "block";

        // Закрываем уведомление через 2 секунды
        setTimeout(() => {
            notification.style.display = "none";
        }, 2000);
    });
});
// Создаем пустой объект корзины, куда будем добавлять товары
const cart = {};

cartContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        // Получаем ближайшего родителя типа .cart-item
        const cartItem = event.target.closest('.cart-item');
        if (cartItem) {
            // Получаем данные о товаре из родительского элемента .cart-item
            const itemName = cartItem.querySelector('span').textContent;
            const itemPrice = parseFloat(cartItem.querySelector('.price').textContent.replace("Цена: $", ""));
            addToCart(itemName, itemPrice);
        }
    }
});
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

    const notification = document.getElementById("notification");
    notification.style.display = "block";

    // Скрываем уведомление через несколько секунд
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000); // Уведомление исчезнет через 2 секунды (2000 миллисекунд)
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
                <button class="plus">+</button>
                <span>${item.quantity}</span>
                <button class="minus">-</button>
            </div>
        `;

        totalPrice += itemTotal;
    }

    cartContent.innerHTML += `
        <div class="cart-total">
            <span>Итого: $${totalPrice.toFixed(2)}</span>
        </div>
    `;
    const plusButtons = document.querySelectorAll('.plus');
    const minusButtons = document.querySelectorAll('.minus');

    plusButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.parentElement.querySelector("span").textContent;
            changeCartItemQuantity(itemName, 1);
        });
    });

    minusButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.parentElement.querySelector("span").textContent;
            changeCartItemQuantity(itemName, -1);
        });
    });
    
}


// Обработчик нажатия на кнопку "Добавить" для товаров


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

    cartContent.innerHTML = "";
    for (const itemName in cart) {
        delete cart[itemName];
    }
    updateCartDisplay();
        
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


// Добавлен обработчик для кнопки "Наверх"
document.querySelector(".scroll-to-top").addEventListener("click", scrollToTop);

