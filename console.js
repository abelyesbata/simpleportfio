const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.clear();
console.log("\n\x1b[1m\x1b[32m╔════════════════════════════════╗");
console.log("║      SIMPLE CALCULATOR         ║");
console.log("╚════════════════════════════════╝\x1b[0m\n");
console.log("\x1b[33mSupported operations: +  -  *  /\x1b[0m");
console.log("Type \x1b[1mexit\x1b[0m or \x1b[1mquit\x1b[0m to stop\n");

function ask() {
    rl.question("\x1b[36mEnter calculation → \x1b[0m", (input) => {
        const trimmed = input.trim();
        const lower = trimmed.toLowerCase();

        if (trimmed === '') {
            ask(); // just reprompt on empty line
            return;
        }

        if (lower === 'exit' || lower === 'quit') {
            console.log("\n\x1b[34mGoodbye! Thanks for using the calculator! 👋\x1b[0m\n");
            rl.close();
            return;
        }

        // Better regex – handles 5., .5, 5.0, -5, etc.
        const match = trimmed.match(/^([-+]?(?:\d+\.?\d*|\.\d+))\s*([+\-*/])\s*([-+]?(?:\d+\.?\d*|\.\d+))$/);

        if (!match) {
            console.log("\x1b[31mInvalid format! Examples: 15 + 3, -5.5 * 2, 10 / 4\x1b[0m\n");
            ask();
            return;
        }

        const num1 = parseFloat(match[1]);
        const op = match[2];
        const num2 = parseFloat(match[3]);

        let result;

        switch (op) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/':
                if (num2 === 0) {
                    console.log("\x1b[31mError: Cannot divide by zero!\x1b[0m\n");
                    ask();
                    return;
                }
                result = num1 / num2;
                break;
        }

        console.log(`\n\x1b[1m\x1b[42m\x1b[30m ${num1} ${op} ${num2} = ${result} \x1b[0m\n`);

        ask();
    });
}

ask();