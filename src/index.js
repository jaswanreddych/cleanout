#!/usr/bin/env node

import path from "path"
import { cleanout } from "./commands/cleanout.js"
import { c } from "./constants/color.js"
import { getVersion, loadConfig } from "./utils/config.js"
import { parseArgs } from "./utils/parseArgs.js"
import { printBanner, printHelp, printVersion } from "./utils/ui.js"

async function main() {
    const args = parseArgs(process.argv.slice(2))
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
    const config = loadConfig(targetDir, args)
    await cleanout(targetDir, config)
    process.exit(0)
}

main().catch(err => {
    console.log(`\n ${c.error} ${err.message} ${c.reset}\n`)
    process.exit(1)
})