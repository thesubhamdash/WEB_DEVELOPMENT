let btn = document.createElement("button");
btn.innerText = "Click Me";
btn.style.display = 'block';

document.querySelector('body').prepend(btn);

btn.addEventListener("click",function(event){
    this.style.backgroundColor = 'green';
    console.log("Button was clicked and the color changed to green!");
});

const input = document.getElementById('nameInput');
const h2 = document.getElementById('nameDisplay');

input.addEventListener('input', function(e) {

    const validChars = /^[a-zA-Z ]*$/;
    let value = input.value;


    if (validChars.test(value)) {
        h2.textContent = value;
    } else {

        const filteredValue = value.replace(/[^a-zA-Zs]/g, '');
        input.value = filteredValue;
        h2.textContent = filteredValue;
    }
})