#!/usr/bin/env node

import { getVersion } from "./utils/config.js"
import { error } from "./utils/logger.js"
import { praseArgs } from "./utils/praseArgs.js"
import { printVersion } from "./utils/ui.js"

async function main() {
    const args = praseArgs(process.argv.slice(2))
    if (args.version) {
        printVersion(getVersion())
        process.exit(0)
    }
}

main().catch(err => {
    error(err.message)
    process.exit(1)
})