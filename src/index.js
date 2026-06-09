#!/usr/bin/env node

import { praseArgs } from "./utils/praseArgs.js"

async function main() {
    const args = praseArgs(process.argv.slice(2))
    console.log(args)
}

main().catch(err => {
    console.log(`\n[Cleanout]: Error running command ${err}\n`)
    process.exit(1)
})