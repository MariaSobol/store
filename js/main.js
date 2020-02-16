const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
    {id: 5},
];

//Используем деструктуризацию при передаче параметров в функцию
//Устанавливаем значения по умолчанию
const renderProduct = ({title = 'Untitled', price = 0, img = "https://dummyimage.com/80x60/707070/ffffff.png&text=Фото"}) => {
    return `<div class="product-item">
                <img class="product-img" src="${img}" alt="${title}">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
            </div>`;
};

const renderProducts = (list) => {
    //Переменная productList в данной функции избыточна и функцию можно переписать одной строкой:
    //document.querySelector('.products').innerHTML = list.map((item) => renderProduct(item)).join('');
    //Однако, такое преобразование ухудшит читаемость кода
    const productList = list.map((item) => renderProduct(item));
    document.querySelector('.products').innerHTML = productList.join(''); //убираем запятые при помощи метода join()
};

renderProducts(products);
