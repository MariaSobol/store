Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'http://placehold.it/180x200/AAE99C/ecf0f1',
        }
    },
    methods: {
        filter(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products container">
            <div v-if="!products.length">Нет данных</div>
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },
    template: `
        <div class="product-item">
            <img :src="img" alt="Some img">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}}₽</p>
                <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
            </div>
        </div>
    `
});


