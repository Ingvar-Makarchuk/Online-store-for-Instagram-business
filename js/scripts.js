"use strict";
let star = document.getElementById('star-move')
let titleMove = document.getElementById('title-move')
let documentHeight = document.documentElement.scrollHeight;
let documentWidth = document.documentElement.clientWidth;


window.addEventListener('scroll', function(e) {

});
// 
let words = document.querySelectorAll(".word");
words.forEach(word => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach(letter => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
let rotateText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
    // rotate out letters of current word
    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    // reveal and rotate in letters of next word
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex =
        currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
rotateText();
setInterval(rotateText, 4000);


// 


// $('.menu-burger, .menu-items').on('click', function() {
//   $('.menu-bg, .menu-items, .menu-burger').toggleClass('fs');
//   $('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
// });
let menu = document.querySelector('.menu-burger')
let menuItems = document.querySelector('.menu-items')
let menuBg = document.querySelector('.menu-bg')


 function test(e){
    e.preventDefault;
    menu.classList.toggle("fs")
    menuBg.classList.toggle("fs")
    menuItems.classList.toggle("fs")
    menu.textContent == "☰" ? menu.textContent = "✕" : menu.textContent = "☰";
    document.querySelector('body').classList.toggle('overflow-h')
    document.querySelector('html').classList.toggle('overflow-h')
menuItems.onclick = test;

}
menu.onclick = test;

// if(menuItems.classList.contains('fs')){
//     document.querySelector('body').classList.add('dn');
// }

document.getElementById('shipping_btn').addEventListener('click', function(){
    console.log('q')
    document.getElementById('shipping_active').classList.add('wow')
    document.getElementById('shipping_active').classList.add('fadeIn')

})

const anchors = document.querySelectorAll('a.scrl-m')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href')
    
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}