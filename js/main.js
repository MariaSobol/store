const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

//Используем деструктуризацию при передаче параметров в функцию
//Устанавливаем значения по умолчанию
//Убираем return и лищние фигурные скобки
const renderProduct = ({title, price, img = "http://placehold.it/180x200/AAE99C/ecf0f1"}) => `<div class="product-item">
                <img class="product-img" src="${img}" alt="${title}">
                <div class="desc">
                    <h3>${title}</h3>
                    <p>${price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;


const renderProducts = (list) => {
    // const productList = list.map((item) => renderProduct(item));
    // document.querySelector('.products').innerHTML = productList.join(''); //убираем запятые при помощи метода join()
    // Используем insertAdjacentHTML вместо innerHTML
    document.querySelector('.products').insertAdjacentHTML('beforeend', list.map((item) => renderProduct(item)).join(''));
};

renderProducts(products);
