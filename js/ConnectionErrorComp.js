Vue.component('error', {
    data(){
        return {
            textError: '',
        }
    },
    methods: {
        setError(error) {
            this.textError = error
        }
    },
    computed: {
        isVisible() {
            return this.textError !== ''
        }
    },
    template: `<div v-if ="isVisible">
                    <p>Отсутствует соединение с сервером.</p>
                    <p>Ошибка: {{textError}}</p><br>
                    <button @click="setError('')">&times;</button>    
                </div>
                `
});