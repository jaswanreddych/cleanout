import { scan } from "../utils/scanner.js"

export async function cleanout(targetDir, config) {
    const { dryRun, yes, stats, depth, include, exclude, output } = config

    const found = await scan(targetDir, depth, include, exclude)
    console.log(found)

}