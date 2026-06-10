#!/usr/bin/env node

import { getVersion, loadConfig } from "./utils/config.js"
import { error } from "./utils/logger.js"
import { praseArgs } from "./utils/praseArgs.js"
import { printVersion, printHelp, printBanner } from "./utils/ui.js"

async function main() {
    const args = praseArgs(process.argv.slice(2))
    printBanner()
    if (args.version) {
        printVersion(getVersion())
        process.exit(0)
    }

    if (args.help) {
        printHelp()
        process.exit(0)
    }

    const targetDir = args.path !== "." ? path.resolve(args.path) : process.cwd()
    console.log(`targetDir: ${targetDir}`)

    const config = await loadConfig(targetDir, args)
    console.log(`config: ${JSON.stringify(config)}`)
}

main().catch(err => {
    error(err.message)
    process.exit(1)
})