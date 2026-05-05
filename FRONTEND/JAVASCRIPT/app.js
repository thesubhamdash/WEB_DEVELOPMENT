let input = document.createElement('input');
let button = document.createElement('button');
button.innerText = 'Click Me';

document.querySelector('body').append(input,button);

input.placeholder = 'username';
button.id = 'btn';

document.querySelector('#btn').style.backgroundColor= 'blue';
document.querySelector('#btn').style.color= 'white';

h1 = document.createElement('h1');
h1.innerHTML = '<u>DOM Practice</u>';
document.querySelector('body').append(h1);
h1.style.color = 'purple';

p = document.createElement('p');
p.innerHTML = 'Apna College <b>Delta</b> Practice';
document.querySelector('body').append(p);