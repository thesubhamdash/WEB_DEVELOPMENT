let btn = document.querySelector("button");

btn.addEventListener("click", function(){
    let h3 = document.querySelector("h3");
    let div1 = document.querySelector("div");
    
    let rColor = randomColor(); 
    h3.innerText = rColor;
    div1.style.backgroundColor = rColor;

    console.log("Color updated!");
});

function randomColor(){
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    let color = `rgb(${red}, ${green}, ${blue})`;
    return color;
}