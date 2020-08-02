
if(localStorage.getItem('arrayCart') !== null){

let cartDesignSrc = '',
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
goodsBtnRemove = '',
goodsCost = 0,
formCount = 0,
goodsCounter = 0,
cartGoodId = -1,
cost = [],
arrayForm = [],
sendCart = [],
arrayCart = JSON.parse(localStorage.getItem('arrayCart'));

// Get array with objs
// show quantity goods
function showGoodsCount(goodsCounter = arrayCart.length){
    arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
    // if there are goods in the cart 
    
    if(goodsCounter > 0){
        document.getElementById('main-cart-count').innerText = goodsCounter;
        document.querySelector('.form').classList.remove('dn');
        document.getElementById('del-all-cart').classList.remove('dn');
        document.querySelector('.cart-exit').classList.add('dn')
        document.querySelector('.cart-status').innerText = `Товаров в корзине: ${goodsCounter}`;
        // if(!localStorage.getItem('sendCart')){
        //     console.log('no')
        // }

    }
    else{
        document.querySelector('.form').classList.add('dn');
        document.getElementById('del-all-cart').classList.add('dn');
        document.querySelector('.cart-status').innerText = 'В корзине совсем пусто';
        document.querySelector('.cart-exit').classList.remove('dn')  
        document.querySelector('.cart-render-lay').innerHTML = '';
    }
    
    let countOrderGoods = 0;
    arrayCart.forEach(arrayCartObj => {
        if(arrayCartObj.statusOrder){
            countOrderGoods++
            console.log(arrayCart.length);
        }
    })
    if(countOrderGoods === goodsCounter){
        document.querySelector('.form').classList.add('dn');
    }
    else{
        document.querySelector('.form').classList.remove('dn');
    }

}


// getCartData получает данные о заказе из хранилища в массив. В цикле вызывает функцию renderCart которая отрисовывает DOM.
function getCartData(){
    document.getElementById('cart-render').innerHTML = '';

    cost = [];
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
        userPrice = arrayCartObj.userPrice,
        statusOrder = arrayCartObj.statusOrder
        if(!statusOrder){cost.push(arrayCartObj.userPrice)};
        renderCart();
    });
    showGoodsCount();
    removeItem();
    goodsCostCalc()
}
getCartData();

function renderCart(){   
    // statusOrder == true ? statusOrder = 'Заказ отправлен' : statusOrder = 'Заказ не оформлен';
    let statusOrderClass = 'cart-status-order';
    if(statusOrder){
        statusOrder = 'Заказ отправлен'
        statusOrderClass = 'cart-status-order cart-status-order-done'
    }else{
        statusOrder = 'Заказ не оформлен';
        statusOrderClass = 'cart-status-order'
    }
    
    let out = `
    <div class="cart-good cart-good${cartGoodId}" data-id="${cartGoodId}"> 
    <button class="cart-good-del" id="${cartGoodId}" title="Удалить из корзины">&#10006;</button>
    <span class="${statusOrderClass}">${statusOrder}</span>
        <div class="layout-designs-block">
            <div class="designs-block">
                <div class="designs-block-frame">
                    <img src="assets/img/${cartDesignSrc}.png" alt="Звездная карта" class="card-preview-img">
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
    // statusOrder == true ? document.querySelector('.cart-status-order').classList.add('cart-status-order-done') : document.querySelector('.cart-status-order').classList.add('cart-status-order-done');

    if(statusOrder == 'Заказ отправлен'){
        document.querySelector(`.cart-good${cartGoodId} .price`).innerText = '';
    }
    else{
        // statusOrder = 'Оплатите заказ';
    }
}   

// Получаем все текущие кнопки и запускаем цикл
function removeItem(){
    goodsBtnRemove = document.querySelectorAll('.cart-good-del');
    goodsBtnRemove.forEach(item => {
        item.addEventListener('click', function(){
            // по нажатию на кнопку товара "удалить" мы получаем id кнопки который равен индексу этого товара в массиве arrayCart
            // Удаляем товар. Перезаписываем в хранилище. Очищаем DOM. 
            let id = this.id
            arrayCart.splice(id,1);
            localStorage.setItem('arrayCart', JSON.stringify(arrayCart));
            // cartGoodId со значением -1 нужен чтобы при перерендере id обнулялись
            cartGoodId = -1;
            getCartData();
        })
        
    })
}

// Delete all goods
function removeAllItems(){
    localStorage.removeItem('arrayCart')
    document.getElementById('cart-render').innerHTML = '';
    showGoodsCount(goodsCounter = 0);
}
document.getElementById('del-all-cart').addEventListener('click', removeAllItems);

// calc goods cost
function goodsCostCalc(){
    goodsCost = 0;
    cost.forEach(price => {
        price = +price;
        goodsCost += price;
    })
    document.getElementById('cart-calc').innerText = goodsCost;
    cost = [];
}

// Validation order
    const form = document.getElementById('form');
    const username = document.getElementById('cart-username');
    const adress = document.getElementById('cart-post');
    const post = document.getElementById('cart-adress');
    const phone = document.getElementById('cart-phone');
    const phoneDelivery = document.getElementById('cart-phone-delivery');
    const usernameDelivery = document.getElementById('cart-username-delivery');

    const comment = document.getElementById('cart-comment');
    
    
    document.getElementById('send-order').addEventListener('click', e => {
        e.preventDefault();
        checkInputs();
    });

    function checkInputs() {
        formCount = 0;
        const usernameValue = username.value.trim();
        const adressValue = adress.value.trim();
        const postValue = post.value.trim();
        const phoneValue = phone.value.trim();
        const commentValue = comment.value.trim();
        const phoneDeliveryValue = phoneDelivery.value.trim();
        const usernameDeliveryValue = usernameDelivery.value.trim();

        arrayFormObj = {
            usernameValue: usernameValue,
            adressValue: adressValue,
            postValue: postValue,
            phoneValue: phoneValue,
            commentValue: commentValue,
            phoneDeliveryValue: phoneDeliveryValue,
            usernameDeliveryValue: usernameDeliveryValue,
            goodsCost: goodsCost  
          }
        
        if(usernameValue === '') {
            setErrorFor(username, '');
        } else {
            setSuccessFor(username);   
        }
        if(usernameDeliveryValue === '') {
            setErrorFor(usernameDelivery, 'Введите Ф.И.О получателя');
        }
        else if(usernameDeliveryValue.length < 11){
            setErrorFor(usernameDelivery, 'Введите Ф.И.О');
        }
         else {setSuccessFor(usernameDelivery);}

        if(phoneValue === '') {
            setErrorFor(phone, 'Введите телефон');
        } else if (!isPhone(phoneValue)) {
            setErrorFor(phone, 'Введите верный номер');
        } else {setSuccessFor(phone);}

        if(phoneDeliveryValue === '') {
            setErrorFor(phoneDelivery, 'Введите телефон');
        } else if (!isPhone(phoneDeliveryValue)) {
            setErrorFor(phoneDelivery, 'Введите верный телефон');
        } else {setSuccessFor(phoneDelivery);}
        
        if(adressValue === '') {
            setErrorFor(adress, 'Введите адресс доставки');
        } else {setSuccessFor(adress);}

        if(postValue === '') {
            setErrorFor(post, 'Введите отделение');
        } else {setSuccessFor(post);}
    }
    function isPhone(phone){
            return /^\d[\d\(\)\ -]{4,13}\d$/.test(phone);
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
        formCount++;
        
        if(formCount >= 6){
            // Send Delivery and contact data
            arrayForm = [];
            localStorage.removeItem('arrayForm');
            arrayForm.push(arrayFormObj);
            localStorage.setItem('arrayForm', JSON.stringify(arrayForm));
    
            // send order data
            sendCart = []
            arrayCart.forEach(arrayCartObj => {
                if(arrayCartObj.statusOrder != true){
                    sendCart.push(arrayCartObj)
                    arrayCartObj.statusOrder = true;
                }
                localStorage.setItem('arrayCart', JSON.stringify(arrayCart));
            })
           
            localStorage.setItem('sendCart', JSON.stringify(sendCart));
            getCartData();

            if(sendCart.length > 0){
                ajaxSendForm();
            }
        }
    }
    function ajaxSendForm(){
        $.ajax({
            url: 'assets/php/sendToTelegram.php',
            type: 'POST',
            data: {
                myJson : localStorage.getItem('sendCart'),
                myFormJson : localStorage.getItem('arrayForm')
            }
        });
    } 
   
}
else{console.log('empty')}