export const EXAMPLES = [
    {
        cmd: "cleanout",
        desc: "Scan current directory",
    },
    {
        cmd: "cleanout src --dry-run",
        desc: "Preview cleanup without deleting files",
    },
    {
        cmd: "cleanout . --yes --depth=3",
        desc: "Quick cleanup with depth limit",
    },
    {
        cmd: "cleanout . --exclude=node_modules,dist",
        desc: "Skip build folders",
    },
    {
        cmd: "cleanout . --include=*.log,tmp",
        desc: "Include extra cleanup patterns",
    },
    {
        cmd: "cleanout . --output=json",
        desc: "Export results for CI/CD",
    },
];

export const OPTIONS = [
    {
        flags: "-h, --help",
        desc: "Show help information",
    },
    {
        flags: "-v, --version",
        desc: "Show current version",
    },
    {
        flags: "-dr, --dry-run",
        desc: "Preview actions without deleting files",
    },
    {
        flags: "-y, --yes",
        desc: "Skip confirmation prompts",
    },
    {
        flags: "-st, --stats",
        desc: "Display folder statistics",
    },
    {
        flags: "-d, --depth=<number>",
        desc: "Maximum folder scan depth (Default: Infinity)",
    },
    {
        flags: "-i, --include=<list>",
        desc: "Additional patterns to include (e.g. dist,tmp,*.log)",
    },
    {
        flags: "-e, --exclude=<list>",
        desc: "Patterns to ignore (e.g. node_modules,build,vendor)",
    },
    {
        flags: "-o, --output=<format>",
        desc: "Output format (text | json, Default: text)",
    },
];

export const VALID_OUTPUT_FORMATS = ["json", "text"]