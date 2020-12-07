require('dotenv').config();
const core = require('@actions/core');
const github = require('@actions/github');
const sequest = require('sequest');
const fs = require('fs');

(async function(){
    try {
        const inputHost = core.getInput('HOST')
        const inputUser = core.getInput('USERNAME')
        const inputKey = core.getInput('KEY')
        const inputKeyPath = core.getInput('KEYPATH')
        const inputCommand = core.getInput('COMMAND')

        const host = inputHost.length ? inputHost: process.env.HOST
        const user = inputUser.length ? inputHost: process.env.USERNAME
        const key = inputKey.length ? inputHost: process.env.KEY
        const keyPath = inputKeyPath.length ? inputHost: process.env.KEYPATH
        const command = inputKeyPath.length ? inputCommand: process.env.COMMAND

        console.log(`Connecting to ${user}@${host}`);

        // Callback API
        sequest(`${user}@${host}`, {
            command,
            privateKey: keyPath ? await fs.readFileSync(process.env.HOME + keyPath, 'utf8') : key,
        }, function (err, stdout) {
            if (err) console.error(err)
            console.log(stdout);


            core.setOutput("output", stdout);
        })

        // const time = (new Date()).toTimeString();
        // core.setOutput("time", time);
        // Get the JSON webhook payload for the event that triggered the workflow
        // const payload = JSON.stringify(github.context.payload, undefined, 2)
        // console.log(`The event payload: ${payload}`);
    } catch (error) {
        core.setFailed(error.message);
    }
})();

