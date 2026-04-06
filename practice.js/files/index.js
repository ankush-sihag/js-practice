const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "starter.txt"), "utf8", (err, data) =>{
    if (err) throw err;
    console.log(data);
})

console.log('hello....')

fs.writeFile(path.join(__dirname, "reply.txt"), 'Nice to meet you.', (err) => {
    if (err) throw err;
    console.log('write complete');
})

fs.appendFile(path.join(__dirname, "test.txt"), 'testing text.', (err) => {
    if (err) throw err;
    console.log('append complete');
})


process.on('uncaughtException', err => {
    console.error(`there was an uncaught error: ${err}`);
    process.exit(1);
})