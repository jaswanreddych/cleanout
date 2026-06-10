import { c } from "../constants/color.js"


export function printBanner() {
    console.log()
    console.log(`\t${c.cyan}${c.bold}cleanout${c.reset}  ${c.gray}— clean out the clutter, ship the code; one command your project is clean.${c.reset}`)
    console.log(`\t${c.gray}${'─'.repeat(85)}${c.reset}`)
    console.log()
}

export function printVersion(version) {
    printBanner()
    console.log(`\t${c.bold}Version:${c.reset}  ${c.dim}${version}${c.reset}`)
}