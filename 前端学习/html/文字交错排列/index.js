const overlay = document.querySelector('.overlap');
overlay.innerHTML = overlay.textContent
.split('')
.map((letter,i,  arr) => `<span style="z-index: ${arr.length - i}">${ letter }</span>`)
.join('');