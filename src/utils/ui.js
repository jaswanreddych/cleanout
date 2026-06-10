import { c } from "../constants/color.js"


export function printVersion(version) {
    console.log(`\n ${c.bold} cleanout version : ${c.dim}${version}${c.reset}\n`)
}