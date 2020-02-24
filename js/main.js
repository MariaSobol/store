const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.log('Error');
            } else {
                cb(xhr.responseText);
            }
        }
    };
    xhr.send();
};

class ProductItem {
    constructor({title, price, id}, img = "http://placehold.it/180x200/AAE99C/ecf0f1") {
        this.title = title;
        this.price = price;
        this.id = id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-img" src="${this.img}" alt="${this.title}">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    // _fetchProducts() {
    //   getRequest(`${API}/catalogData.json`, (data) => {
    //     this.goods = JSON.parse(data);
    //     this.render();
    //     console.log(this.goods);
    //   });
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('Error:', error);
            });
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    getSum() {
        return this.allProducts.reduce((sum, product) => sum + product.price, 0);
    }
}

productList = new ProductList();

class ProductInCart extends ProductItem{
    constructor(productItem, quantity = 1){
        super(productItem, productItem.img);
        this.quantity = quantity;
    }

    render(){/*...*/}

    getSum() {
        return this.price*this.quantity;
    }
}

class Cart {
    constructor() {
        this.ProductsInCart = [];
    }

    render(){/*...*/}

    addProduct(addedProduct, quantity){
        const productObject = new ProductInCart(addedProduct, quantity);
        this.ProductsInCart.push(productObject);
    }

    deleteProduct() {/*...*/} //пока не придумала рабочий метод

    clearCart() {
        this.ProductsInCart = [];
    }

    getSum() {
        return this.ProductsInCart.reduce((sum, product) => sum + product.getSum(), 0);
    }
}
