inp = document.querySelector("input");
btn = document.querySelector("button");
ul = document.querySelector("ul");

btn.addEventListener("click", function(){
    let item = document.createElement("li");
    item.innerText = inp.value;

    let dltBtn = document.createElement("button");
    dltBtn.innerText = "delete";
    item.appendChild(dltBtn);
    dltBtn.classList.add("delete");

    ul.appendChild(item);
    inp.value="";
});

//Event Delegation through event bubbling

ul.addEventListener("click", function(event){
    if(event.target.nodeName == "BUTTON"){
        let listItem = event.target.parentElement;
        listItem.remove();
    }
});

//remove only the existing elements, not the newly added!

// let dltbtns = document.querySelectorAll(".delete");
// for (dltBtn of dltbtns){
//     dltBtn.addEventListener("click", function(){
//         let par = this.parentElement;
//         par.remove();
//     });
// }