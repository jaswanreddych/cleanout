import { parseList, requireValue } from "./helper.js"
import { VALID_OUTPUT_FORMATS } from "../constants/common.js"

export function praseArgs(args) {
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
        output: 'text',
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
            const value = requireValue(arg, "Invalid depth value")
            const depth = Number(value)
            if (!Number.isInteger(depth) || depth < 1) {
                throw new Error("Invalid depth number");
            }
            result.depth = depth
        } else if (arg.startsWith("--exclude") || arg.startsWith("-e")) {
            const value = requireValue(arg, "Invalid exclude pattern");
            result.exclude.push(...parseList(value))
        } else if (arg.startsWith("--include") || arg.startsWith("-i")) {
            const value = requireValue(arg, "Invalid include patterns");
            result.include.push(...parseList(value))
        } else if (arg.startsWith("--output") || arg.startsWith("-o")) {
            const outputFormat = requireValue(
                arg,
                "Output format is required"
            ).toLowerCase();
            if (!(VALID_OUTPUT_FORMATS.includes(outputFormat))) {
                throw new Error(`Invalid output format ${outputFormat}.Use --help to see available options.`)
            }
            result.output = outputFormat
        } else if (!arg.startsWith("-")) {
            result.path = arg.trim()
        } else {
            throw new Error(`Invalid argument: ${arg}.Use --help to see available options.`)
        }
    }
    return result
}