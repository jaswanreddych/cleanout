import { parseList, requireValue } from "./helper.js"

export function parseArgs(args) {
    const result = {
        path: ".",
        dryRun: false,
        help: false,
        version: false,
        yes: false,
        stats: false,
        depth: Infinity,
        include: [],
        exclude: [],
    }

    const aliases = {
        "--dry-run": "dryRun",
        "-dr": "dryRun",

        "--help": "help",
        "-h": "help",

        "--version": "version",
        "-v": "version",

        "--yes": "yes",
        "-y": "yes",

        "--stats": "stats",
        "-st": "stats"
    }

    for (const arg of args) {
        if (aliases[arg]) {
            result[aliases[arg]] = true
        } else if (arg.startsWith("--depth") || arg.startsWith("-d")) {
            const value = requireValue(arg.split("=")[1], "Invalid depth value")
            const depth = parseInt(value, 10)
            if (!Number.isInteger(depth) || depth < 1) {
                throw new Error("Depth must be a positive integer");
            }
            result.depth = depth
        } else if (arg.startsWith("--exclude") || arg.startsWith("-e")) {
            const value = requireValue(arg?.split("=")[1], "Invalid exclude pattern");
            result.exclude.push(...parseList(value))
        } else if (arg.startsWith("--include") || arg.startsWith("-i")) {
            const value = requireValue(arg?.split("=")[1], "Invalid include patterns");
            result.include.push(...parseList(value))
        } else if (!arg.startsWith("-")) {
            result.path = arg.trim()
        } else {
            throw new Error(`Invalid argument: ${arg}. Use --help to see available options.`)
        }
    }
    return result
}