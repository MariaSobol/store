const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cart: [],
        isVisibleCart: false,
        searchLine: '',
        imgCatalog: 'http://placehold.it/180x200/AAE99C/ecf0f1',
        imgCart: 'http://placehold.it/50x80/AAE99C/ecf0f1',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cart.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cart.push(prod);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        removeProduct(product){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        if(product.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
                            product.quantity--;
                        } else { // удаляем
                            this.cart.splice(this.cart.indexOf(product), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        filter(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },

    // хук жизненного цикла
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cart.push(el);
                }
            });
    }
});

