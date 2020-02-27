//Задания №1 и №2
let str = `One: 'Hi Mary.' 
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`;

let regExp1 = new RegExp('\'', 'g');
let regExp2 = new RegExp('\\B\'', 'g');

console.log(str.replace(regExp1, '\"'));
console.log(str.replace(regExp2, '\"'));

//Задание №3
let regExpName = /^[a-zа-яё ]/ig;
let regExpTel = /\+7\(\d{3}\)\d{3}-\d{4}/;
//let regExpEmail =

document.querySelector('.feedback-form').addEventListener('submit', e => {
    e.preventDefault();

    //Проверка поля имени
    if(!regExpName.test(document.querySelector('.input-field_name').value)){
        document.querySelector('.input-field_name').classList.add('input-field-error');
    }

    //Проверка поля номера телефона
    if(!regExpTel.test(document.querySelector('.input-field_tel').value)){
        document.querySelector('.input-field_tel').classList.add('input-field-error');
    }


});
