const path = require('path');
const solc = require('solc');

// fs-extra = file system module with helpers
const fs = require('fs-extra')

// 1.Deletes entire build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// 2. Read 'Campaign.sol' from the 'contracts' folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

// 3. Compile both contracts with solidity computer
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// 4. Write output to the 'build' directory
fs.ensureDirSync(buildPath);
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, `${contract.replace(':', '')}.json`),
        output[contract]
    );
}