
import fs from "fs"

fs.writeFile('dist/cjs/package.json', 
    `{ "type": "commonjs" }`, function (err) {
    if (err) return console.log(err);
})

fs.writeFile('dist/mjs/package.json', 
    `{ "type": "module" }`, function (err) {
    if (err) return console.log(err);
})