import log from '@ajar/marker';
import { readFile } from 'fs';
import fs from 'fs/promises';
import { json } from 'stream/consumers';

// console.time(label:'benchmark')
const output = [];

async function readFiles() {
    try {
        const files = await fs.readdir("./files")
        for (const file of files) {
             const userContent = await fs.readFile(`./files/${file}`,'utf-8')
             const lines = userContent.split(`\r\n`)
            //  console.log(lines)
             for (const line of lines) {
                const [facebook_id, full_name, email] = line.split(",")
                const user = {
                    facebook_id,
                    full_name,
                    email
                 }
                //  log.obj(user)
                output.push(user)
                }
            }
            return output;
        } catch (err) {
            log.magenta(err)
        }
}

async function writeFile() {
    const data = await readFiles();
    const strData = JSON.stringify(data)
    const newData = strData.split(`\r\n`);
    fs.writeFile("./files/result.json",`${newData}`,function(err) {
        if(err) log.magenta(err);
    });
}
// readFiles()
writeFile();