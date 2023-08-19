let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItems = []; // Здесь будем хранить выбранные продукты
let buyButton = document.createElement('button');
buyButton.textContent = 'Купить';


let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");
let btn7 = document.getElementById("btn7");

btn1.addEventListener('click', function () {
  selectedItems.push('Экспрессо'); // Добавляем выбранный продукт в массив
  updateCard(); // Вызываем функцию для обновления отображения корзины
});

btn2.addEventListener('click', function () {
  selectedItems.push('Капучино');
  updateCard();
});

btn3.addEventListener('click', function () {
  selectedItems.push('Американо'); // Добавляем выбранный продукт в массив
  updateCard(); // Вызываем функцию для обновления отображения корзины
});

btn4.addEventListener('click', function () {
  selectedItems.push('Мокко');
  updateCard();
});

btn5.addEventListener('click', function () {
  selectedItems.push('V-60'); // Добавляем выбранный продукт в массив
  updateCard(); // Вызываем функцию для обновления отображения корзины
});

btn6.addEventListener('click', function () {
  selectedItems.push('Латте');
  updateCard();
});

btn7.addEventListener('click', function () {
  selectedItems.push('Раф'); // Добавляем выбранный продукт в массив
  updateCard(); // Вызываем функцию для обновления отображения корзины
});




let usercard = document.getElementById("usercard");

// Создаем функцию для обновления корзины
function updateCard() {
  usercard.innerHTML = ''; // Очищаем содержимое корзины

  // Создаем элементы для отображения выбранных продуктов
  selectedItems.forEach(itemName => {
    let productItem = document.createElement('div');
    productItem.textContent = itemName;
    usercard.appendChild(productItem);
  });

  // Прикрепляем кнопку "Купить" к корзине
  usercard.appendChild(buyButton);
}

// Обработчик клика на кнопке "Купить"
buyButton.addEventListener('click', function () {
  if (selectedItems.length === 0) {
    alert('Добавьте продукты в корзину перед оплатой.');
  } else {
    let orderSummary = 'Вы выбрали:\n';

    selectedItems.forEach(itemName => {
      orderSummary += `- ${itemName}\n`;
    });

    tg.MainButton.setText('Оплатить'); // Изменяем текст кнопки на "Оплатить"
    tg.MainButton.show();

    // Отправляем информацию о заказе в Telegram
    tg.sendData(orderSummary);
  }
});

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name}
${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);



