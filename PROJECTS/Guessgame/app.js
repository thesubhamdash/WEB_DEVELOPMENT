const max = prompt("Enter the max number:");

console.log(max);

const random = Math.floor(Math.random() * max) + 1;

let guess = prompt("Enter the guessed number:\nEnter quit to stop!");
if(guess == "quit"){
    console.log("You Quit!");
}
else{
    while (guess != "quit"){
        if(random == guess){
        console.log("You won! The random number was:", random);
        break;
        }
        else if(random < guess){
            guess = prompt("HINT: Please enter a smaller number!")
        }
        else if(random > guess){
            guess = prompt("HINT: Please enter a larger number!")
        }
        else{
            guess = prompt("Enter the guessed number:\nEnter quit to stop!");
        }
    }
}