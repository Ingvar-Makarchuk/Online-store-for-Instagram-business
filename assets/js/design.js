// Get attributes from local storage for render design

  let thisDesignSrc = localStorage.getItem('thisDesignSrc');
  let thisDesignName = localStorage.getItem('thisDesignName');
  document.querySelectorAll('.designs-block-frame').forEach(item => {item.innerHTML = `<img src="assets/img/${thisDesignSrc}.png" data-src="${thisDesignSrc}" data-design="${thisDesignName}" alt="Предпросмотр" class="card-preview-img">`});
  document.getElementById('card-design-name').innerText = thisDesignName;


function showGoodsCount(){
  if(localStorage.getItem('arrayCart') !== null){
  let arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
  let goodsCounter = arrayCart.length;
    if(goodsCounter > 0){
      document.getElementById('main-cart-count').innerText = goodsCounter;
      document.querySelector('.main-cart').classList.remove('dn');
    }
  }
  }
showGoodsCount();

// Add to HTML price attributes for calculating cost
function renderAttrPrice(){
  var size = document.querySelectorAll('.card-settings-sizes input')
  let y = -1;
  let price=[
    [600, 950, 800],
    [650, 1100, 950],
    [700, 1400, 1100]
  ];
  let attr = ['p','f','c']
  size.forEach(element => {
    y++
    for(let i=0; i<size.length; i++){
      element.setAttribute(`data-${attr[i]}`, price[y][i]);
    }
    element.setAttribute('data-e', 490);
  });
}
renderAttrPrice();

let getPriceAttr = ''
checkedPrice = document.querySelectorAll('.card-settings-checked input');
checkedPrice.forEach(item => {
  item.addEventListener('click', calcPrice)
  
});

// Calculation of cost depending on the chosen size and materials
function calcPrice(){
  checkedSize = document.querySelector('.card-settings-sizes input:checked')
  checkedMaterial = document.querySelector('.card-settings-material input:checked').getAttribute('data-m')
  getPriceAttr = checkedSize.getAttribute(checkedMaterial);
  
  document.getElementById('price-for-good').innerText = getPriceAttr;
}

// Checked in order slide next, prev, add to cart
let cardCount = 0;
let stepTitle = document.querySelectorAll('.card-title-step');
let stepType  = document.querySelectorAll('.card-step');

document.getElementById('btn-step-prev').addEventListener('click', prevItem);

function nextItem(e){
e.preventDefault();
  document.getElementById('btn-step-prev').classList.remove('dn')
  if(cardCount < stepType.length -1){
    stepType[cardCount].classList.add('dn')
    stepTitle[cardCount].classList.remove('title-active')
    cardCount++
    stepType[cardCount].classList.remove('dn')
    stepTitle[cardCount].classList.add('title-active')

  }
  // Check page
  if(cardCount === stepType.length -1 ){
    document.getElementById('btn-step-next').classList.add('dn');
    document.getElementById('btn-add-to-cart').classList.remove('dn');
  }
}

function prevItem(e){
  e.preventDefault();
  if(cardCount <= 1){
    document.getElementById('btn-step-prev').classList.add('dn')
  }
  if(cardCount > 0){
   
  stepType[cardCount].classList.add('dn')
  stepTitle[cardCount].classList.remove('title-active')
  cardCount--
  stepType[cardCount].classList.remove('dn')
  stepTitle[cardCount].classList.add('title-active')
  }
  if(cardCount !== stepType.length -1 ){
    document.getElementById('btn-step-next').classList.remove('dn')
    document.getElementById('btn-add-to-cart').classList.add('dn')
    document.getElementById('btn-go-to-cart').classList.add('dn');

  }
}

// Validate number in hours and minutes
document.querySelector('#hour').addEventListener('keyup', numValidate);
document.querySelector('#minute').addEventListener('keyup', numValidate);
document.querySelector('#day').addEventListener('keyup', numValidateDay);

function numValidate(){
  this.value = this.value.replace(/[^\d]/g, '');
  if(this.value > 59){
    this.value = 59
  }
  if(this.value === '000'){
    this.value = '00';
  }
}
function numValidateDay(){
  this.value = this.value.replace(/[^\d]/g, '');
  if(this.value > 31){
    this.value = 31
  }
  if(this.value === '0'){
    this.value = '1';
  }
}

let arrayCart = [];

// Validate user inputs
function validate(e){

    e.preventDefault();

    let place         = document.getElementById('place');
    let year          = document.getElementById('year');
    let month         = document.getElementById('month');
    let day           = document.getElementById('day');
    let hour          = document.getElementById('hour');
    let minute        = document.getElementById('minute');
    let textTop       = document.getElementById('user_text_top');
    let textBotttom   = document.getElementById('user_text_botttom');

    const userPlace = place.value.trim();
    const userYear = year.value.trim();
    const userMonth = month.value;
    const userDay = day.value;
    const userHour = hour.value;
    const userMinute = minute.value;
  
    const userTextTop = textTop.value.trim();
    const userTextBotttom = textBotttom.value.trim();
   
    let count = 0;
  
    function stepOne(val,node){
      if(val === '') {
        errorValidate(node);
      } else {
        successValidate(node);
        count++
        if(count === 7){
          nextItem(e);
      }
      }

      // checking to last step in order
      if(cardCount == stepTitle.length -1 ){
       document.getElementById('btn-add-to-cart').onclick = function addToCart(e){
         e.preventDefault();

         document.querySelector('.main-cart').classList.add('main-cart-animation');
         document.querySelector('.main-cart').style.opacity = "1";

         let size          = document.querySelector('input[name="size"]:checked');
         let material      = document.querySelector('input[name="material"]:checked');
         const userSize = size.getAttribute('data-size');
         const userMaterial = material.getAttribute('data-mat');

        if(localStorage.getItem('arrayCart') !== null){
          
          arrayCart = JSON.parse(localStorage.getItem('arrayCart'));

        }
        renderAttrPrice();
        calcPrice();
        showGoodsCount();

         let arrayCartObj = {
          userLocation: userPlace,
          userYear: userYear,
          userMonth: userMonth,
          userDay: userDay,
          userHour: userHour,
          userMinute: userMinute,
          userText: userTextTop,     
          userComments: userTextBotttom,
          userSize: userSize,
          userMaterial: userMaterial,
          thisDesignNameCart: thisDesignName,
          thisDesignSrcCart: thisDesignSrc,
          userPrice: getPriceAttr
          
        }
        arrayCart.push(arrayCartObj);
        localStorage.setItem('arrayCart', JSON.stringify(arrayCart));
        arrayCart = JSON.parse(localStorage.getItem('arrayCart'));
        
        let goodsCounter = arrayCart.length;
        localStorage.setItem('goodsCounter', goodsCounter);

        if (localStorage.getItem("goodsCounter") !== null) {
          goodsCounter = localStorage.getItem("goodsCounter")
          localStorage.setItem('goodsCounter', goodsCounter);

        }
        showGoodsCount();
        console.log(this)
        document.getElementById('btn-add-to-cart').classList.add('dn');
        document.getElementById('btn-go-to-cart').classList.remove('dn');

        }
      }
      
    }
  
  stepOne(userPlace, place, null);
  stepOne(userYear, year);
  stepOne(userMonth, month);
  stepOne(userHour, hour);
  stepOne(userMinute, minute);
  stepOne(userTextTop, textTop);
  stepOne(userTextBotttom, textBotttom);
  
  document.getElementById('user_text_botttom').classList.add('default_text_bottom')

}
function errorValidate(input) {
  let errors = document.querySelector('.errors');
  errors.innerText = 'Заполните все поля'
  input.className = 'form-control-error';
}
function successValidate(input) {
  input.className = 'form-control-success-warning';
}
	
document.getElementById('btn-step-next').addEventListener('click', validate);
document.getElementById('user_text_botttom').classList.add('default_text_bottom')


// Checked for defaul text in bottom canvas
let userTextDefault = document.getElementById('user_text_botttom');
document.querySelector('.check-default').onclick = function(){
  if(this.checked){
    userTextDefault.classList.add('default_text_bottom')
    userTextDefault.setAttribute('readonly','readonly');
    userTextDefault.value = 'Текст по умолчанию'
  }
  else{
    userTextDefault.classList.remove('default_text_bottom')
    userTextDefault.removeAttribute('readonly');
  }

}
