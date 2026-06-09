#!/usr/bin/env node

import { error } from "./utils/logger.js"
import { praseArgs } from "./utils/praseArgs.js"

async function main() {
    const args = praseArgs(process.argv.slice(2))
    console.log("args", args)
}

main().catch(err => {
    error(err.message)
    process.exit(1)
})