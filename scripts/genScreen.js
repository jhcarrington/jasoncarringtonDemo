const readline = require('readline');
const fileSystem = require('fs');
const { exit } = require('process');
const consoleOut = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/** @type {string} */
let fileName;

consoleOut.question('What would you like the screen to be called?', screenCallback);

function screenCallback(res) {
    fileName = res;
    consoleOut.question('Where should this be located? 1(projects) or 2(myself)', locationCallback)
}

function locationCallback(res) {
    if (res == 1 || res == 2) {
        retry = false;
        location = res;
        genScript();
    }
}

function genScript() {
    const fileSystem = require('fs');
    fileSystem.mkdir(`./src/pages/${fileName.toLowerCase()}`, (err) => {
        console.log(err);
    });
    const moduleName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    const writeStream = fileSystem.createWriteStream(`./src/pages/${fileName.toLowerCase()}/index.tsx`, {
        flags: 'w+'
    });
    writeStream.write(`
import React, { Component } from 'react';

export interface ${moduleName}Props {

}
export default class ${moduleName} extends Component<${moduleName}Props, {}> {
    constructor(props: any) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

`, (error) => {
        console.log(error)
        writeStream.close();
        exit(0);
    })
}