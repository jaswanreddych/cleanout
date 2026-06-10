#!/usr/bin/env node

import { cleanout } from "./commands/cleanout.js"
import { getVersion, loadConfig } from "./utils/config.js"
import { praseArgs } from "./utils/praseArgs.js"
import { printVersion, printHelp, printBanner } from "./utils/ui.js"
import { c } from "./constants/color.js"

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
    const config = await loadConfig(targetDir, args)
    await cleanout(targetDir, config)
}

main().catch(err => {
    console.log(`\n ${c.error} ${err.message} ${c.reset}\n`)
    process.exit(1)
})