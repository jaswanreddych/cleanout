import { c } from "../constants/color.js"
import { EXAMPLES, OPTIONS } from "../constants/common.js"

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
    console.log()
    console.log(`\t${c.cyan}${c.bold}cleanout${c.reset}  ${c.gray}— clean out the clutter, ship the code; one command your project is clean.${c.reset}`)
    console.log(`\t${c.gray}${'─'.repeat(85)}${c.reset}`)
    console.log()
}

export function printVersion(version) {
    // printBanner()
    console.log(`${c.bold}Version:${c.reset}  ${c.dim}${version}${c.reset}`)
}

export function printHelp() {
    // printBanner();

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