Vue.component('cart', {
    data(){
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            isVisibleCart: false,
            imgCart: 'http://placehold.it/50x80/AAE99C/ecf0f1',
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        removeProduct(product){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        if(product.quantity > 1){
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="isVisibleCart=!isVisibleCart">Корзина</button>
            <div class="cart-block" v-show="isVisibleCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="removeProduct">
                </cart-item>
            </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});
