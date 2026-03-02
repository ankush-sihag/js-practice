// print no. 1 to 100
/*for (let num=0; num<=100; num++){
    console.log("num=",num)
}*/


//print even no. between 1 to 100

/*for (let num=0; num<=100; num++){
    if (num%2===0)
    console.log("num=",num)
    
}*/


//print odd No. between 1 to 100

/* for (let num=0; num<=100; num++){
    if (num%2 !==0){
        console.log("num=",num);
    }
}*/


let gameNum = 2;
let userNum = prompt("Guess the game number :")

while(userNum != gameNum){
    userNum = prompt("you entered wrong number. Guess again :")
}
console.log("Congratulations, you enterd the right number");