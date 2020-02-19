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
        this._fetchProducts();
        this.render();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 1000},
            {id: 2, title: 'Mouse', price: 100},
            {id: 3, title: 'Keyboard', price: 250},
            {id: 4, title: 'Gamepad', price: 150},
        ];
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
//Проверка:
console.log(productList.getSum());

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

//Проверка:
const cart = new Cart();
cart.addProduct(productList.allProducts[1]);
cart.addProduct(productList.allProducts[2],5);
console.log(cart);
console.log(cart.getSum());
cart.clearCart();
console.log(cart);
