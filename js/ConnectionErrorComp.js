Vue.component('error', {
    data(){
        return {
            textError: '',
        }
    },

    template: `<div v-if ="textError!== ''">
                    <p>Отсутствует соединение с сервером.</p>
                    <p>Ошибка: {{textError}}</p><br>
                    <button @click="textError=''">&times;</button>    
                </div>
                `
});