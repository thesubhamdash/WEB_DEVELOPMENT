let gameSeq = [];
let userSeq = [];
let maxScore = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if (started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInd = Math.floor(Math.random() * 3);
    let randClr = btns[randInd];
    randBtn = document.querySelector(`.${randClr}`);
    gameSeq.push(randClr);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkSeq(index){
    if(userSeq[index] === gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        maxScore.push(level-1);
        let Maximum = maxScore.reduce((res,el) => Math.max(res,el));
        h2.innerHTML = `Game Over! Your Score was <b>${level-1}</b>. Highest = <b>${Maximum}! <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSeq(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn")
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}