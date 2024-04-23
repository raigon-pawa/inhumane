const fs = require('fs');
const path = require('path');

// Function to execute JavaScript code from a file
function executeScriptFromFile(filePath) {
    try {
        const script = fs.readFileSync(filePath, 'utf8');
        const module = { exports: {} };
        const requireFunc = (moduleName) => {
            if (moduleName === 'puppeteer') {
                // Redirect puppeteer require to the global puppeteer instance
                return puppeteer;
            } else {
                // For other modules, use regular require
                return require(moduleName);
            }
        };
        const exports = module.exports;

        // Execute the script
        eval(script);
    } catch (error) {
        console.error('Error executing script:', error);
    }
}

// Function to list module files in the modules directory
function listModuleFiles() {
    const modulePath = path.resolve(__dirname, 'modules');
    const files = fs.readdirSync(modulePath);
    
    console.log('Available modules:');
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
}

// Read input from console
process.stdin.setEncoding('utf8');

listModuleFiles();
console.log('Enter the number of the module to execute:');
process.stdin.on('data', (input) => {
    const selection = parseInt(input.trim());

    if (isNaN(selection)) {
        console.error('Invalid selection. Please enter a number.');
        process.exit();
    }

    const modulePath = path.resolve(__dirname, 'modules');
    const files = fs.readdirSync(modulePath);

    if (selection < 1 || selection > files.length) {
        console.error('Invalid selection. Please enter a number between 1 and', files.length);
        process.exit();
    }

    const selectedFile = files[selection - 1];
    const filePath = path.join(modulePath, selectedFile);

    // Execute the script
    executeScriptFromFile(filePath);

    process.exit();
});
