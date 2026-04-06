//======== CHECKING PRIME NUMBER ==========

// BRUTE FORCE


/*const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(' Enter a number: ', (input) => {
    const n = parseInt(input);
    
    function isPrime(num) {
        if (num <= 1) return false;
        for (let i = 2; i < num; i++) {
            if (num % i === 0) return false; 
        }
        return true;
    }

    console.log(isPrime(n) ? `${n} is Prime!` : `${n} is Not Prime.`);
    readline.close();
});
*/

//console.log(67/2) ;
//console.log(Math.sqrt(12));
//console.log(Math.round(12**0.5))

const num1 = 13
const num2 = (Math.round(num1**0.5)) +1
//console.log(num2) 
for (let i=2; i <=num2; i++){
    if (num2%i ===0){
    console.log("this is not a prime no.");
        return;
    }
    else{
        
        console.log("this is a prime no.");
        return;
    }
}


