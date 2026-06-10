import fsp from "fs/promises"
import { c } from "../constants/color.js"
import { getSize, scan } from "../utils/scanner.js"
import { confirm, printDone, printDryRun, printEmptyMatches, printMatches, printStats, startSpinner } from "../utils/ui.js"

export async function cleanout(targetDir, config) {
    const { dryRun, yes, stats, depth, include, exclude } = config

    const spinner = startSpinner("Collecting scan info from the directories (files or folders) to clean up")

    const matches = await scan(targetDir, depth, include, exclude)

    for (const item of matches) {
        item['size'] = await getSize(item.path)
    }

    spinner.stop()

    if (!(matches.length)) {
        printEmptyMatches()
        return
    }

    let grandTotal = 0
    const groupMatches = new Map()

    for (const item of matches) {
        const category = item.category
        if (!(groupMatches.has(category))) {
            groupMatches.set(category, {
                category: category,
                color: item.color,
                items: [],
                total: 0
            })
        }

        const entry = groupMatches.get(category)
        entry.items.push(item)
        entry.total += item.size
        grandTotal += item.size
    }

    const result = [...groupMatches.values()]
    printMatches(result, grandTotal)

    if (stats) {
        printStats()
        return
    }

    if (dryRun) {
        printDryRun()
        return
    }

    if (!yes) {
        const confirmation = await confirm(`Are you sure you want to clean all the files and folders (${matches.length})?`)
        if (!confirmation) {
            console.log(`Operation cancelled (No files/folders are untouched) `)
            return
        }
    }

    const deleteSpinner = startSpinner("Deleting files and folders")

    let space = 0
    for (const item of matches) {
        try {
            await fsp.rm(item.path, { recursive: true, force: true })
            space += item.size
        } catch (error) {
            console.log(`${c.red}✖ failed to delete ${item.path}: ${error.message}${c.reset}`)
        }
    }

    deleteSpinner.stop()
    printDone(space)
}