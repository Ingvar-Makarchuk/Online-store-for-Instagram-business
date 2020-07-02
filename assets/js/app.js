"use strict";
let titleMove       = document.getElementById('title-move')
let documentHeight  = document.documentElement.scrollHeight;
let documentWidth   = document.documentElement.clientWidth;

// Menu for mobile 
let menu      = document.querySelector('.menu-burger')
let menuItems = document.querySelector('.menu-items')
let menuBg    = document.querySelector('.menu-bg')

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


// Transition scroll
const anchors = document.querySelectorAll('a.scrl-m')

for (let anchor of anchors) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href')
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

