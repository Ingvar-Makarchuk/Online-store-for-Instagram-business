let cartGoodId = -1,
goodsCounter = 0,
cartDesignSrc = '',
cartDesignName = '',
userLocation = '',
userYear = '',
userMonth = '',
userDay = '',
userHour = '',
userMinute = '',
userText = '',
userComments = '',
userSize = '',
userMaterial = '',
userPrice = '',
goodsBtn = ''

// Get array with objs
// arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
// let goodsCounter = arrayCart.length;


    // var arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
    // show quantity goods
let arrayCart = JSON.parse(localStorage.getItem('arrayCart'));

function showGoodsCount(goodsCounter = arrayCart.length){
    arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
    // if there are goods in the cart 
    if(goodsCounter > 0){
        document.getElementById('main-cart-count').innerText = goodsCounter;
        document.querySelector('.main-cart').classList.remove('dn');
        document.querySelector('.cart-status').innerText = `Товаров в корзине: ${goodsCounter}` 
    }
    else{
        document.querySelector('.main-cart').classList.add('dn');
        document.querySelector('.cart-status').innerText = 'Корзина Пустая';
        // console.log('test')
    }
}
showGoodsCount();


// getCartData получает данные из хранилища в массив. В цикле вызывает функцию renderCart которая отрисовывает DOM.
function getCartData(){
    arrayCart = JSON.parse(localStorage.getItem('arrayCart'));

    arrayCart.forEach(arrayCartObj => {
        cartGoodId++;
        cartDesignSrc = arrayCartObj.thisDesignSrcCart,
        cartDesignName = arrayCartObj.thisDesignNameCart,
        userLocation = arrayCartObj.userLocation,
        userYear = arrayCartObj.userYear,
        userMonth = arrayCartObj.userMonth,
        userDay = arrayCartObj.userDay,
        userHour = arrayCartObj.userHour,
        userMinute = arrayCartObj.userMinute,
        userText = arrayCartObj.userText,
        userComments = arrayCartObj.userComments,
        userSize = arrayCartObj.userSize,
        userMaterial = arrayCartObj.userMaterial,
        userPrice = arrayCartObj.userPrice
        renderCart();
    });

    removeItem();
    showGoodsCount();
}

getCartData();


function renderCart(){    
    let out = `
    <div class="cart-good" attr-id="${cartGoodId}">
    <button class="cart-good-del" id="${cartGoodId}">&#10006;</button>
        <div class="layout-designs-block">
            <div class="designs-block">
                <div class="designs-block-frame">
                    <img src="assets/img/${cartDesignSrc}.png" alt="Предпросмотр" class="card-preview-img">
                </div>
            </div>
        </div>
        <div class="cart-good-info">
            <p><b>Карта звездного неба "<span id="cart-name">${cartDesignName}</span>"</b></p>
            <p>Размер: <span class="cart-size">${userSize}</span>cм</p>
            <p>Представление: <span class="cart-material">${userMaterial}</span></p>
            <p>Место события: <span class="cart-location">${userLocation}</span></p>
            <p>Дата и время: <span class="cart-date">${userDay} ${userMonth} ${userYear} в ${userHour}:${userMinute}</span></p>
            <p>Фраза: "<span class="cart-user-text-top">${userText}</span>"</p>
            <p>Комментарий: <span class="cart-user-text-bottom">${userComments}</span></p>
            <p>Доставка: Бесплатная</p>

            <p class="price">Стоимость: <span id="cart-good-price">${userPrice}</span>грн</p>
        </div>
    </div>`
    document.getElementById('cart-render').innerHTML += out;
}   


// Получаем все текущие кнопки и запускаем цикл
function removeItem(){
    goodsBtn = document.querySelectorAll('.cart-good-del');

    goodsBtn.forEach(item => {
        item.addEventListener('click', function(){
            // по нажатию на кнопку товара "удалить" мы получаем id кнопки который равен индексу этого товара в массиве arrayCart
            // Удаляем товар. Перезаписываем в хранилище. Очищаем DOM. 
            let id = this.id
            arrayCart.splice(id,1);
            localStorage.setItem('arrayCart', JSON.stringify(arrayCart));
            document.getElementById('cart-render').innerHTML = '';
            // cartGoodId со значением -1 нужен чтобы при перерендере id обнулялись
            cartGoodId = -1;

            getCartData();
        })
    })
}



// Delete all goods
document.getElementById('del-all-cart').addEventListener('click', function(){


    localStorage.removeItem('arrayCart')
    document.getElementById('cart-render').innerHTML = '';
    
    showGoodsCount(goodsCounter = 0);

});

// Validation order
    const form = document.getElementById('form');
    const username = document.getElementById('cart-username');
    const adress = document.getElementById('cart-post');
    const post = document.getElementById('cart-adress');
    const email = document.getElementById('cart-email');
    const phone = document.getElementById('cart-phone');
    const comment = document.getElementById('cart-comment');
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        checkInputs();
    });
    
    function checkInputs() {
        // trim to remove the whitespaces
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const adressValue = adress.value.trim();
        const postValue = post.value.trim();
        const phoneValue = phone.value.trim();
        const commentValue = comment.value.trim();
        
        if(usernameValue === '') {
            setErrorFor(username, 'Введите Имя и Фамилию получателя');
        } else {
            setSuccessFor(username);
        }
        
        if(emailValue === '') {
            setErrorFor(email, 'Введите вашу почту');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'Почта не корректна, повторите попытку');
        } else {
            setSuccessFor(email);
        }
        if(phoneValue === '') {
            setErrorFor(phone, 'Введите ваш телефон');
        } else if (!isPhone(phoneValue)) {
            setErrorFor(phone, 'Введите верный номер');
        } else {
            setSuccessFor(phone);
        }
        
        if(adressValue === '') {
            setErrorFor(adress, 'Введите адресс доставки');
        } else {
            setSuccessFor(adress);
        }
        if(postValue === '') {
            setErrorFor(post, 'Введите отделение');
        } else {
            setSuccessFor(post);
        }
        
    }
    
    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }
    
    function setSuccessFor(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }
        
    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    function isPhone(phone){
        return /^\d[\d\(\)\ -]{4,13}\d$/.test(phone);
    }

