const menu      = document.querySelector('.menu-burger')
const menuItems = document.querySelector('.menu-items')
const menuBg    = document.querySelector('.menu-bg')
const anchors =   document.querySelectorAll('a.scrl-m')

for (let anchor of anchors) {
  
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    if(!anchor.classList.contains('stop_toggleMenu')){
      toggleMenu();
    }
    const blockID = anchor.getAttribute('href');
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    document.querySelector('body').classList.remove('overflow-h');
    document.querySelector('html').classList.remove('overflow-h');
  })
}

// Menu for mobile 

 function toggleMenu(){
    // e.preventDefault;
    menu.classList.toggle("fs");
    menuBg.classList.toggle("fs");
    menuItems.classList.toggle("fs");
    menu.textContent == "☰" ? menu.textContent = "✕" : menu.textContent = "☰";
    menu.classList.contains('fs') ? document.querySelector('body').classList.add('overflow-h') : document.querySelector('body').classList.remove('overflow-h');
}
menu.addEventListener('click', toggleMenu);




