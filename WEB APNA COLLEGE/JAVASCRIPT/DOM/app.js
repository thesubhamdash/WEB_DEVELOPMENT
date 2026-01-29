let para1 = document.createElement('p');
para1.innerText = "Hey, I am red!";
document.querySelector('body').append(para1);

para1.classList.add('red');

let heading1 = document.createElement('h3');
heading1.innerText = "I'm a blue h3";
document.querySelector('body').append(heading1);

heading1.classList.add('blue');

let div1 = document.createElement('div');
document.querySelector('body').append(div1);
div1.classList.add('div1');

let h1 = document.createElement('h1');
let para2 = document.createElement('p');

h1.innerText = "I'm in a div";
para2.innerText = 'ME TOO!';

// document.querySelector('div').appendChild(h1);
div1.append(h1);
// document.querySelector('div').appendChild(para2);
div1.append(para2);