export const DEFAULT_TARGETS = [
    {
        "name": "Node Modules",
        "patterns": [
            "node_modules"
        ],
        "color": "\x1b[36m"
    },
    {
        "name": "Build output",
        "patterns": [
            "dist",
            "build",
            "out",
            ".next",
            ".nuxt",
            ".svelte-kit",
            ".vite",
            "__pycache__"
        ],
        "color": "\x1b[33m"
    },
    {
        "name": "Log files",
        "patterns": [
            "*.log",
            "npm-debug.log*",
            "yarn-error.log"
        ],
        "color": "\x1b[90m"
    },
]