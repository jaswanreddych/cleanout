import { c } from "../constants/color.js";
import { EXAMPLES, OPTIONS } from "../constants/common.js";
import { formatSize } from "./helper.js";

function printOptions(options) {
    const pad = Math.max(...options.map(o => o.flags.length));

    for (const opt of options) {
        const spacing = " ".repeat(pad - opt.flags.length + 2);

        console.log(
            `  ${c.yellow}${opt.flags}${c.reset}${spacing}${opt.desc}`
        );
    }
}

function printExamples(examples) {
    for (const ex of examples) {
        console.log(`  ${c.gray}${ex.cmd}${c.reset}`);
        console.log(`    ${c.dim}${ex.desc}${c.reset}`);
        console.log();
    }
}


export function printBanner() {
    console.log(`\n\t${c.cyan}${c.bold}cleanout${c.reset}  ${c.gray}— clean out the clutter, ship the code; one command your project is clean.${c.reset}`)
    console.log(`\t${c.gray}${'─'.repeat(85)}${c.reset}\n`)
}

export function printVersion(version) {
    console.log(`${c.bold}Version:${c.reset}  ${c.dim}${version}${c.reset}`)
}

export function printHelp() {
    console.log(`
${c.bold}Usage:${c.reset}
  cleanout ${c.yellow}[path] [options]${c.reset}

${c.bold}Description:${c.reset}
  Clean and analyze project folders by finding unnecessary files,
  generating statistics, and producing reports.

${c.bold}Arguments:${c.reset}
  ${c.yellow}path${c.reset}  Project directory to scan (Default: current directory)
`);

    console.log(`${c.bold}Options:${c.reset}`);
    printOptions(OPTIONS);

    console.log(`\n${c.bold}Examples:${c.reset}`);
    printExamples(EXAMPLES);
}

export function printEmptyMatches() {
    console.log(`${c.green}✔  Nothing found to clean!${c.reset}\n`)
}

function printCategory(group) {
    const { category, items, color, total } = group
    const noOfItems = items.length
    console.log(`${color ?? c['white']}${category} (${noOfItems}) Total Size : ${formatSize(total)} ${c.reset}`)
}

function printItem(item) {
    const { name, path, isDirectory, size } = item
    const icon = isDirectory ? "📁" : "📄"
    console.log(`   -> ${icon}  ${c.white}${name}${c.reset}${c.gray} (${formatSize(size)}) ${path}${c.reset}`)
}


function printTotal(total) {
    console.log(`${c.bold}Total: ${c.reset} ${formatSize(total)}\n`)
}

export function printMatches(groupMatches, grandTotal) {
    for (const group of groupMatches) {
        printCategory(group)
        console.log()
        for (const item of group.items) {
            printItem(item)
        }
        console.log()
    }
    printTotal(grandTotal)
}

export function printStats() {
    console.log(`${c.green}This is report of scan (files or folder) found to clean up  ${c.reset}\n`)
}

export function printDryRun() {
    console.log(`${c.green}DRY RUN - Completed (no files or folder are deleted) ${c.reset}\n`)
}

export function confirm(question) {
    process.stdout.write(` ${c.white}${question}${c.reset} ${c.gray}(y/N)${c.reset} `)
    return new Promise((resolve) => {
        process.stdin.setEncoding("utf8")
        process.stdin.once("data", (data) => {
            const answer = data.trim().toLowerCase()
            process.stdin.pause()
            resolve(answer === "y" || answer === "yes")
        })
    })
}

export function printDone(space) {
    console.log(`\n${c.green}${c.bold}✔  Done!${c.reset}  Total ${c.yellow}${formatSize(space)}${c.reset} freed`)
}

export function startSpinner(label) {
    if (!process.stdout.isTTY) {
        process.stdout.write(`  ${label}...\n`)
        return { stop: () => { } }
    }
    const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    let i = 0
    const interval = setInterval(() => {
        const frame = SPINNER_FRAMES[i % SPINNER_FRAMES.length]
        process.stdout.write(`\r  ${c.cyan}${frame}${c.reset} ${c.gray}${label}${c.reset}  `)
        i++
    }, 10)

    return {
        stop(finalMessage = '') {
            clearInterval(interval)
            process.stdout.write('\r' + ' '.repeat(label.length + 10) + '\r')
            if (finalMessage) process.stdout.write(`  ${finalMessage}\n`)
        },
    }
}