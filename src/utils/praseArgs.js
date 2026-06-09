import { VALID_OUTPUT_FORMATS } from "../constants/validOutputFormats.js"
import { parseList, requireValue } from "./helper.js"

export function praseArgs(args) {
    const result = {
        dryRun: false,
        help: false,
        version: false,
        yes: false,
        stats: false,
        depth: Infinity,
        add: [],
        skip: [],
        target: [],
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
        } else if (arg.startsWith("--add") || arg.startsWith("-a")) {
            const value = requireValue(arg, "Invalid skip path");
            result.add.push(...parseList(value))
        } else if (arg.startsWith("--skip") || arg.startsWith("-s")) {
            const value = requireValue(arg, "Invalid skip path");
            result.skip.push(...parseList(value))
        } else if (arg.startsWith("--target") || arg.startsWith("-t")) {
            const value = requireValue(arg, "Invalid target path");
            result.target.push(...parseList(value))
        } else if (arg.startsWith("--output") || arg.startsWith("-o")) {
            const outputFormat = requireValue(
                arg,
                "Output format is required"
            ).toLowerCase();
            if (!(VALID_OUTPUT_FORMATS.includes(outputFormat))) {
                throw new Error(`Invalid output format ${outputFormat}.Use --help to see available options.`)
            }
            result.output = outputFormat
        } else {
            throw new Error(`Invalid argument: ${arg}.Use --help to see available options.`)
        }
    }
    return result
}